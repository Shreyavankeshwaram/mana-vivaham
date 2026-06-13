const projectId = "a57w9a4x";
const dataset = "production";
const apiVersion = "2024-03-12";
const query = encodeURIComponent(`*[_type == "homePage"][0]{ premiumSlides }`);
const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error(err);
  });
