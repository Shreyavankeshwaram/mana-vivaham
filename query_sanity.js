const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function run() {
  const docs = await client.fetch(`*[_type == "homePage"][0]`);
  console.log(JSON.stringify(docs, null, 2));
}

run();
