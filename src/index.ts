import puppeteer from "puppeteer";

const app = async () => {
  const formURL: string =
    "https://docs.google.com/forms/d/e/1FAIpQLSfYroBk6rCP2CbWbqJXhFrYupo25_VeFVEab-gy5_VtJ5fvgA/viewform";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(formURL, { waitUntil: "networkidle2" });

  const d = await page.$$eval(
    ".quantumWizTextinputPaperinputInputArea",
    (arr) => {
      let inputElements: any = [];

      arr.forEach((e, i) => {
        e.querySelector("input[type=text]")?.classList.add(
          `puppeteer-input-${i}`
        );
      });

      return inputElements;
    }
  );

  console.log(d);

  const x = await page.$$eval(
    ".quantumWizTextinputPaperinputInputArea",
    (arr) => {
      let inputElements: any = [];

      arr.forEach((e) => {
        inputElements.push(e.querySelector("input[type=text]")?.classList);
      });

      return inputElements;
    }
  );

  console.log(x);

  debugger;

  await browser.close();
};

app();
