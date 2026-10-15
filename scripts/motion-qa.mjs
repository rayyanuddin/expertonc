import { chromium } from "@playwright/test";

const executablePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await chromium.launch({ executablePath, headless: true });

async function checkViewport(name, viewport, reducedMotion = "no-preference") {
  const context = await browser.newContext({ viewport, reducedMotion });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    const text = message.text();
    const developmentTransportNoise = text.includes("/_next/hmr") || text.includes("status of 404");
    if (message.type() === "error" && !developmentTransportNoise) errors.push(text);
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1100);

  const initial = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    pinSpacers: document.querySelectorAll(".pin-spacer").length,
    motionMode: document.querySelector("[data-motion]")?.getAttribute("data-motion"),
    stageTransform: getComputedStyle(document.querySelector(".screenStage")).transform,
  }));

  await page.locator(".steps").scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 520);
  await page.waitForTimeout(350);
  const forwardY = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, -260);
  await page.waitForTimeout(350);
  const reverseY = await page.evaluate(() => window.scrollY);

  const final = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    pinSpacers: document.querySelectorAll(".pin-spacer").length,
    stageTransform: getComputedStyle(document.querySelector(".screenStage")).transform,
    stepsParentClass: document.querySelector(".steps")?.parentElement?.className,
    stepsParentStyle: document.querySelector(".steps")?.parentElement?.getAttribute("style"),
  }));

  if (errors.length) throw new Error(`${name}: browser errors: ${errors.join(" | ")}`);
  if (initial.overflow > 1 || final.overflow > 1) throw new Error(`${name}: horizontal overflow detected`);
  if (!(reverseY < forwardY)) throw new Error(`${name}: reverse scrolling did not move backward`);
  if (reducedMotion === "reduce") {
    if (initial.motionMode !== "reduced") throw new Error(`${name}: reduced-motion mode was not honored`);
    if (final.pinSpacers !== 0) throw new Error(`${name}: reduced-motion mode created a pin`);
  } else if (viewport.width >= 900 && final.pinSpacers < 1) {
    throw new Error(`${name}: desktop pinned story was not created: ${JSON.stringify({ initial, final })}`);
  }

  console.log(JSON.stringify({ name, initial, final, reverseScrollVerified: true }));
  await context.close();
}

try {
  await checkViewport("desktop", { width: 1440, height: 900 });
  await checkViewport("mobile", { width: 390, height: 844 });
  await checkViewport("reduced-motion", { width: 1440, height: 900 }, "reduce");
} finally {
  await browser.close();
}
