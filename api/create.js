const SYSTEM = `You are the creative intelligence engine inside IMPROMPTTU. You transform a client brief into a sharp, useful creative direction. Never mention model or provider names. Return ONLY valid JSON with this shape: {"territory":"","concept":"","rationale":"","copy":{"headline":"","support":"","cta":""},"visualDirection":{"mood":"","composition":"","details":[""]},"storyboard":[{"beat":"","visual":"","copy":""}],"router":{"route":"","reason":""}}. Write in the same language as the user's brief. Be concise, specific, brand-aware, non-generic and commercially useful.`;

function cors(req, res) {
  const allowed = new Set([
    'https://giancobianco-star.github.io',
    'https://imprompttu.com',
    'https://www.imprompttu.com'
  ]);
  const origin = req.headers.origin;
  if (origin && allowed.has(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req, res) {
  cors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const brief = String(req.body?.brief || '').trim();
  const tier = ['create','pro','studio'].includes(req.body?.tier) ? req.body.tier : 'create';
  const brand = req.body?.brand || null;
  if (brief.length < 12) return res.status(400).json({ error: 'Brief too short' });
  if (brief.length > 8000) return res.status(400).json({ error: 'Brief too long' });

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: 'AI provider not configured',
      code: 'MISSING_AI_KEY'
    });
  }

  const input = `Tier: ${tier}\nBrand context: ${brand ? JSON.stringify(brand) : 'No persistent brand context supplied'}\nClient brief: ${brief}`;

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.IMPROMPTTU_REASONING_MODEL || 'gpt-5-mini',
        instructions: SYSTEM,
        input,
        text: { format: { type: 'json_object' } }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('AI error', response.status, data?.error?.message || 'unknown');
      return res.status(502).json({ error: 'Creative engine unavailable' });
    }

    const raw = data.output_text || data.output?.flatMap(x => x.content || []).find(x => x.type === 'output_text')?.text;
    if (!raw) return res.status(502).json({ error: 'Empty creative response' });
    const result = JSON.parse(raw);

    return res.status(200).json({
      ok: true,
      tier,
      result,
      meta: { premiumConsumed: false, stage: 'creative_direction' }
    });
  } catch (error) {
    console.error('IMPROMPTTU create error', error);
    return res.status(500).json({ error: 'Unable to create proposal' });
  }
}
