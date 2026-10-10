// Automated Headless Search Engine Submission Script (IndexNow + Google Sitemap Ping)
// 100% Zero-registration instant crawling protocol for Bing, Yandex, Seznam & Google

const HOST = 'doc.irisproject.dpdns.org';
const KEY = '57656e7a6875616e2d6c6f63616c646f';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function main() {
  console.log('🚀 [SEO Automation] Fetching all live URLs from sitemap...');
  let urls = [`https://${HOST}/`];
  try {
    const res = await fetch(SITEMAP_URL);
    if (res.ok) {
      const xml = await res.text();
      const matches = xml.match(/<loc>(.*?)<\/loc>/g);
      if (matches) {
        urls = matches.map((m) => m.replace(/<\/?loc>/g, ''));
      }
    }
  } catch (err) {
    console.warn('Could not fetch remote sitemap, falling back to core paths');
  }

  console.log(`📌 Found ${urls.length} URLs to submit to Search Engines.`);

  // 1. Submit to IndexNow (Bing / Yandex / Seznam)
  const indexNowPayload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Ping IndexNow endpoint: ${endpoint}...`);
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(indexNowPayload),
      });
      console.log(`✅ [${endpoint}] Response status: ${resp.status} ${resp.statusText}`);
    } catch (err) {
      console.error(`❌ [${endpoint}] Error:`, err.message);
    }
  }

  // 2. Google Sitemap Ping
  try {
    const googlePing = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    console.log(`📡 Ping Google Sitemap: ${googlePing}...`);
    const gResp = await fetch(googlePing);
    console.log(`✅ [Google] Status: ${gResp.status}`);
  } catch (err) {
    console.warn(`⚠️ [Google Ping]`, err.message);
  }

  console.log('🎉 [SEO Automation] Instant ping submission completed!');
}

main();
