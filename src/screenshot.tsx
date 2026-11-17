import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render } from "@hyper-elements/react";
import { renderImage } from "@hyper-elements/react/image";
import { chromium } from "playwright-core";
import { HeroArt, InviteEmail } from "./templates";

const font = (file: string) => readFile(new URL(`../assets/fonts/${file}`, import.meta.url));
const fonts = [
  { family: "Oswald", src: await font("oswald-v57-latin-500.ttf"), weight: 500 },
  { family: "Oswald", src: await font("oswald-v57-latin-600.ttf"), weight: 600 },
  { family: "Oswald", src: await font("oswald-v57-latin-700.ttf"), weight: 700 },
  { family: "Inter", src: await font("inter-v20-latin-regular.ttf"), weight: 400 },
  { family: "Inter", src: await font("inter-v20-latin-600.ttf"), weight: 600 },
  { family: "Inter", src: await font("inter-v20-latin-700.ttf"), weight: 700 },
  { family: "Inter", src: await font("inter-v20-latin-italic.ttf"), weight: 400, style: "italic" as const },
  { family: "Noto Sans", src: await font("NotoSans-Regular.ttf"), weight: 400 },
  { family: "Noto Sans", src: await font("NotoSans-Bold.ttf"), weight: 700 },
];

/* The email screenshot uses an inlined hero so it is self-contained —
   the same trick the client previews in out/clients/ use. */
const hero = await renderImage(<HeroArt />, { fonts });
const heroSrc = `data:image/png;base64,${Buffer.from(hero.image).toString("base64")}`;
const { html } = await render(<InviteEmail heroSrc={heroSrc} />);
await mkdir(new URL("../screenshots", import.meta.url), { recursive: true });
await writeFile(new URL("../screenshots/.email-preview.html", import.meta.url), html);

const exe =
  process.env.CHROMIUM_PATH ??
  `${process.env.HOME}/.cache/ms-playwright/chromium-1254/chrome-linux64/chrome`;
const proxy = process.env.https_proxy ?? process.env.HTTPS_PROXY;
const browser = await chromium.launch({
  executablePath: exe,
  args: ["--no-sandbox", ...(proxy ? [`--proxy-server=${proxy}`] : [])],
});

async function shot(url: string, width: number, name: string) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
  /* The Social element's icons live on Unlayer's CDN, which this sandbox's
     Chromium cannot reach through the authenticated proxy. Serve the exact
     CDN bytes (downloaded with curl) so the screenshot is faithful. */
  await page.route("**cdn.tools.unlayer.com/**", async (route) => {
    const fileName = route.request().url().split("/").pop() ?? "";
    try {
      const body = await readFile(`/tmp/social-icons/${fileName}`);
      await route.fulfill({ body, contentType: "image/png" });
    } catch {
      await route.continue();
    }
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: new URL(`../screenshots/${name}`, import.meta.url).pathname, fullPage: true });
  console.log("screenshots/" + name);
  await page.close();
}

const file = (p: string) => `file://${process.env.HOME}/workspace/hackathons/hyper-elements/build/${p}`;
await shot(file("screenshots/.email-preview.html"), 680, "email.png");
await shot(file("out/page.html"), 1180, "page.png");
await shot(file("out/ticket.html"), 900, "ticket.png");
await browser.close();
