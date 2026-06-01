export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { shop, endpoint } = req.query;
  const tokens = {
    metanek: process.env.SHOPIFY_TOKEN_METANEK,
    metahome: process.env.SHOPIFY_TOKEN_METAHOME,
  };
  const domains = {
    metanek: 'metanek.myshopify.com',
    metahome: 'metahome.myshopify.com',
  };

  const token = tokens[shop];
  if (!token) return res.status(400).json({ error: 'Invalid shop: ' + shop });

  try {
    const url = 'https://' + domains[shop] + '/admin/api/2024-04/' + endpoint;
    const r = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' }
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}