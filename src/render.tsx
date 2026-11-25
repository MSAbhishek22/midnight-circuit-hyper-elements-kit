import { readFile, writeFile, mkdir } from "node:fs/promises";
import { formatDiagnostics, outline, render, validate } from "@hyper-elements/react";
import { renderImage } from "@hyper-elements/react/image";
import { renderPdf } from "@hyper-elements/react/pdf";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import { EventPage, HeroArt, InviteEmail, SocialCard, TicketDocument } from "./templates";
import { HERO3D_BODY, HERO3D_STYLE } from "./hero3d";

const font = (file: string) => readFile(new URL(`../assets/fonts/${file}`, import.meta.url));

const fonts = [
  { family: "Oswald", src: await font("oswald-v57-latin-500.ttf"), weight: 500 },
  { family: "Oswald", src: await font("oswald-v57-latin-600.ttf"), weight: 600 },
  { family: "Oswald", src: await font("oswald-v57-latin-700.ttf"), weight: 700 },
  { family: "Inter", src: await font("inter-v20-latin-regular.ttf"), weight: 400 },
  { family: "Inter", src: await font("inter-v20-latin-600.ttf"), weight: 600 },
  { family: "Inter", src: await font("inter-v20-latin-700.ttf"), weight: 700 },
  { family: "Inter", src: await font("inter-v20-latin-italic.ttf"), weight: 400, style: "italic" as const },
  // Fallback for glyphs the Inter subset lacks (e.g. ₹) in image/PDF renders.
  { family: "Noto Sans", src: await font("NotoSans-Regular.ttf"), weight: 400 },
  { family: "Noto Sans", src: await font("NotoSans-Bold.ttf"), weight: 700 },
];

await mkdir(new URL("../out/clients", import.meta.url), { recursive: true });
const out = (name: string) => new URL(`../out/${name}`, import.meta.url);
const log: string[] = [];
const say = (s = "") => {
  console.log(s);
  log.push(s);
};

/* 1 — Canvas art first: the skyline becomes the hero image everywhere. */
say("== Hero art (Canvas → PNG) ==");
const hero = await renderImage(<HeroArt />, { fonts });
await writeFile(out("hero.png"), hero.image);
say(`hero.png ${hero.width}×${hero.height}`);
say(formatDiagnostics(hero.diagnostics));
const heroSrc = `data:image/png;base64,${Buffer.from(hero.image).toString("base64")}`;

say("== Social card (Canvas → PNG) ==");
const card = await renderImage(<SocialCard />, { fonts });
await writeFile(out("social-card.png"), card.image);
say(`social-card.png ${card.width}×${card.height}`);
say(formatDiagnostics(card.diagnostics));

/* 2 — The email, validated plain and against real email clients.
   The shipping email references the hero by URL (host out/hero.png next to
   it): inlining it as a data URI pushes the file to ~125 KB and Gmail clips
   messages after 100 KB. The previews below use an inlined copy so each
   client preview is self-contained. */
const email = <InviteEmail heroSrc="https://midnightcircuit.example.com/hero.png" />;
const emailInline = <InviteEmail heroSrc={heroSrc} />;
say("\n== Email — validate() ==");
const plain = validate(email);
say(formatDiagnostics(plain.diagnostics));
say(`valid: ${plain.valid}`);

say("\n== Email — validate() with the email-client emulator ==");
const withClients = validate(email, { plugins: [await emailClients()] });
say(formatDiagnostics(withClients.diagnostics));
say(`valid: ${withClients.valid}`);

say("\n== Email — outline() ==");
say(outline(email));

say("\n== Email — render() ==");
const emailOut = await render(email);
await writeFile(out("invite.html"), emailOut.html);
await writeFile(out("invite.txt"), emailOut.text);
say(`invite.html ${emailOut.html.length} bytes · invite.txt ${emailOut.text.length} bytes`);
say(formatDiagnostics(emailOut.diagnostics));

say("\n== Email — client previews (Outlook / Gmail / Apple Mail, hero inlined) ==");
const previews = await renderInEmailClients(emailInline, {
  emailClients: ["outlook", "gmail", "apple-mail"],
});
for (const preview of previews.previews) {
  await writeFile(new URL(`../out/clients/${preview.filename}`, import.meta.url), preview.html);
  say(`clients/${preview.filename}`);
}
say(formatDiagnostics(previews.diagnostics));

/* 3 — The web page. */
say("\n== Page — render() ==");
const page = <EventPage heroSrc={heroSrc} />;
say(formatDiagnostics(validate(page).diagnostics));
const pageOut = await render(page);
/* Splice the 3D hero (src/hero3d.ts) into the generated page: its styles go
   in <head>, and the scene markup goes inside the masthead section, right
   before its closing tag — the same spot it occupies on the shipped page. */
let pageHtml = pageOut.html.replace("</head>", `<style>\n${HERO3D_STYLE}\n</style>\n</head>`);
const mastheadEnd = pageHtml.indexOf("</section>");
if (mastheadEnd === -1) throw new Error("page render: masthead </section> not found for hero3d splice");
pageHtml = pageHtml.slice(0, mastheadEnd) + HERO3D_BODY + "\n" + pageHtml.slice(mastheadEnd);
await writeFile(out("page.html"), pageHtml);
say(`page.html ${pageHtml.length} bytes (incl. hero3d splice)`);
say(formatDiagnostics(pageOut.diagnostics));

/* 4 — The ticket document: print HTML + a real PDF. */
say("\n== Document — render() + renderPdf() ==");
const doc = <TicketDocument />;
say(formatDiagnostics(validate(doc).diagnostics));
const docOut = await render(doc);
await writeFile(out("ticket.html"), docOut.html);
say(`ticket.html ${docOut.html.length} bytes`);
const pdf = await renderPdf(doc, { fonts });
await writeFile(out("ticket.pdf"), pdf.pdf);
say(`ticket.pdf ${pdf.pdf.length} bytes`);
say(formatDiagnostics(pdf.diagnostics));

await writeFile(out("render-log.txt"), log.join("\n"));
say("\nAll outputs written to out/");
