const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
});

async function run() {
  const types = ['homePage', 'homepageExperience', 'globalSettings', 'portfolio', 'testimonials', 'brandingSettings', 'heroSection', 'cinematicStorytelling'];
  
  for (const type of types) {
    const docs = await client.fetch(`*[_type == "${type}"]{_id, _updatedAt, "title": title, "heading": heading}`);
    console.log(`\n--- Type: ${type} ---`);
    if (docs.length === 0) {
      console.log('No documents found.');
    } else {
      docs.forEach(doc => {
        console.log(`- ID: ${doc._id} | Updated: ${doc._updatedAt} | Title/Heading: ${doc.title || doc.heading || 'N/A'}`);
      });
    }
  }
}

run();
