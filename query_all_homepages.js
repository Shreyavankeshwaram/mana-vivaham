const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function run() {
  const docs = await client.fetch(`*[_type == "homePage"]{
    _id,
    _updatedAt,
    "hasCinematicDifference": defined(cinematicDifference),
    "cinematicDifferenceHeading": cinematicDifference.heading,
    "bottomCaption": cinematicDifference.bottomCaption
  }`);
  console.log(JSON.stringify(docs, null, 2));
}

run();
