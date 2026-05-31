export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      if (req.method === 'OPTIONS') return res.status(200).end();
        const { shop, endpoint } = req.query;
          const tokens = {
              'metanek': process.env.SHOPIFY_TOKEN_METANEK,
                  'metahome': process.env.SHOPIFY_TOKEN_METAHOME,
                    };
                      const token = tokens[shop];
                        if (!token) return res.status(400).json({ error: 'Invalid shop' });
                          const domains = { 'metanek': 'metanek.myshopify.com', 'metahome': 'metahome.myshopify.com' };
                            try {
                                const url = `https://${domains[shop]}/admin/api/2024-04/${endpoint}`;
                                    const r = await fetch(url, { headers: { 'X-Shopify-Access-Token': token } });
                                        const data = await r.json();
                                            res.status(200).json(data);
                                              } catch (e) {
                                                  res.status(500).json({ error: e.message });
                                                    }
                                                    }
