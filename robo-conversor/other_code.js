import puppeteer from "puppeteer";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    const page = await browser.newPage();
    console.log("Navegador iniciado");

    await page.goto("https://www.google.com", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    console.log("Página carregada");

    // Screenshot da página inteira
    await page.screenshot({
      path: "resultado.png",
      fullPage: true,
    });
    console.log("Screenshot salvo");

    await browser.close();
  } catch (error) {
    console.error("Erro:", error);
    process.exit(1);
  }
})();
