import request from "request";
import cheerio from "cheerio";

const formURL: string =
  "https://docs.google.com/forms/d/e/1FAIpQLSfYroBk6rCP2CbWbqJXhFrYupo25_VeFVEab-gy5_VtJ5fvgA/viewform";

request(formURL, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
  }
});
