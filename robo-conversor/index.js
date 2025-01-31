import puppeteer from "puppeteer";
import readlineSync from "readline-sync";

const robo = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const moedaBase = readlineSync.question("informe a moeda base: ") || "dolar";

  const urlPrincipal = `https://wise.com/br/currency-converter/${moedaBase}-hoje`;
  await page.goto(urlPrincipal);
  //   await page.screenshot({ path: "example.png" });

  const resultado = await page.evaluate(() => {
    return document.querySelector("#target-input").value;
  });

  console.log(`O valor de 1 ${moedaBase} é ${resultado}`);

  await browser.close();
};

robo();

// input de convertido id - id="target-input"
// input de conversão = id="source-input"
