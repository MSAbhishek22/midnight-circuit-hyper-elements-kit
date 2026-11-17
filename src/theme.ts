import { defineTheme, extendTheme } from "@hyper-elements/react";

/**
 * "Noir Marquee" — the kit's brand, written once.
 *
 * Film noir gives the palette (near-black, warm bone, marquee amber, a single
 * crimson accent) and the type (condensed Oswald headlines, letterspaced
 * kickers). Glassmorphism gives the surfaces: translucent cards with a 1px
 * light border over the dark ground. Every root that takes this theme —
 * Email, Page, Document, Canvas — inherits both.
 */
export const noirMarquee = defineTheme({
  colors: {
    background: "#0a0a10",
    foreground: "#f3eee1",
    primary: "#e3a82b",
    primaryForeground: "#1a1206",
    muted: "#a49db4",
    border: "rgba(243, 238, 225, 0.16)",
    // Kit-specific tokens
    glass: "rgba(255, 255, 255, 0.055)",
    glassStrong: "rgba(255, 255, 255, 0.09)",
    crimson: "#c93b3b",
    bone: "#f3eee1",
    ink: "#17171d",
    inkMuted: "#5d594d",
  },
  fonts: {
    body: "Inter, 'Noto Sans', Arial, sans-serif",
    heading: "Oswald, 'Arial Narrow', Arial, sans-serif",
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.55 },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 46, lineHeight: 1.04, letterSpacing: 1.5, textTransform: "uppercase", mobile: { fontSize: 34 } },
          2: { fontSize: 26, lineHeight: 1.15, letterSpacing: 1.2, textTransform: "uppercase", mobile: { fontSize: 22 } },
          3: { fontSize: 18, lineHeight: 1.25, letterSpacing: 0.8, textTransform: "uppercase" },
        },
      },
    },
    Button: {
      borderRadius: 999,
      padding: [14, 30],
      fontWeight: 700,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      hover: { backgroundColor: "#c98f1d" },
      variants: {
        ghost: {
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          color: "#f3eee1",
          border: { width: 1, style: "solid", color: "rgba(243, 238, 225, 0.35)" },
          hover: { backgroundColor: "rgba(255, 255, 255, 0.14)" },
        },
      },
    },
    Divider: { borderTop: { width: 1, style: "solid", color: "rgba(243, 238, 225, 0.16)" } },
  },
  styles: {
    /** Frosted glass panel on the dark ground. */
    glass: {
      backgroundColor: "rgba(255, 255, 255, 0.055)",
      border: { width: 1, style: "solid", color: "rgba(243, 238, 225, 0.16)" },
      borderRadius: 18,
      padding: 30,
      gap: 16,
    },
    /** Small letterspaced label that sits above a heading. */
    kicker: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "#e3a82b",
    },
    /** The paper ticket: bone stock, dark ink, punched edge feel. */
    ticket: {
      backgroundColor: "#f3eee1",
      color: "#17171d",
      borderRadius: 14,
      padding: 28,
      gap: 12,
    },
  },
  formats: {
    // Email clients drop rgba backgrounds on table cells; give the glass a
    // solid near-black tint there instead. The web page and the image keep
    // the true translucent glass over the page ground.
    email: {
      styles: {
        glass: { backgroundColor: "#15151d" },
      },
    },
  },
});

/**
 * The print cut of the same brand: bone paper, dark ink, a deeper amber that
 * survives on paper. The PDF ticket uses this; everything else uses the dark
 * theme — one brand, two stocks, via extendTheme.
 */
export const noirMarqueePrint = extendTheme(noirMarquee, {
  colors: {
    background: "#f7f2e6",
    foreground: "#17171d",
    muted: "#5d594d",
    primary: "#96690d",
    border: "rgba(23, 23, 29, 0.2)",
  },
  styles: {
    glass: {
      backgroundColor: "rgba(23, 23, 29, 0.045)",
      border: { width: 1, style: "solid", color: "rgba(23, 23, 29, 0.2)" },
    },
  },
});
