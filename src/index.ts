import puppeteer from "puppeteer";

const app = async () => {
  const formURL: string =
    "https://docs.google.com/forms/d/e/1FAIpQLSfYroBk6rCP2CbWbqJXhFrYupo25_VeFVEab-gy5_VtJ5fvgA/viewform";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(formURL, { waitUntil: "networkidle2" });

  await page.$$eval(".quantumWizTextinputPaperinputInputArea", (arr) => {
    arr.forEach((e, i) => {
      e.querySelector("input[type=text]")?.classList.add(
        `puppeteer-input-${i}`
      );
    });
  });

  await page.$eval(".puppeteer-input-0", (el) => {
    (el as HTMLInputElement).value = "Carlos";
  });

  await page.$eval(".puppeteer-input-1", (el) => {
    (el as HTMLInputElement).value = "Dubon";
  });

  const myVal = await page.$eval(".puppeteer-input-0", (el) => {
    const x: string = (el as HTMLInputElement).value;
    return x;
  });

  console.log(myVal);

  debugger;

  await browser.close();
};

app();
