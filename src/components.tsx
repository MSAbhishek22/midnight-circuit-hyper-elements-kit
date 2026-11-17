import {
  Circle,
  Column,
  Divider,
  Grid,
  Heading,
  Line,
  LineBreak,
  Menu,
  MergeTag,
  Polygon,
  Rect,
  Row,
  Social,
  Svg,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { event, judges, schedule, ticket, tracks } from "./event";

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

export function Kicker({ children, align }: { children: string; align?: "left" | "center" }) {
  return <Text style={{ apply: ["kicker"], textAlign: align ?? "left" }}>{children}</Text>;
}

export function Masthead() {
  return (
    <Row style={{ gap: 16 }}>
      <Text style={{ apply: ["kicker"], flex: 1 }}>
        {event.name} · {event.edition}
      </Text>
      <Text
        style={{
          width: 212,
          fontSize: 11,
          letterSpacing: 2,
          color: token("colors.muted"),
          textTransform: "uppercase",
          textAlign: "right",
        }}
      >
        {event.city} — Est. 2023
      </Text>
    </Row>
  );
}

export function MetaLine({ align }: { align?: "left" | "center" }) {
  return (
    <Text style={{ color: token("colors.muted"), textAlign: align ?? "left" }}>
      {event.doors} · {event.venue}
      <LineBreak />
      {event.hackers}
    </Text>
  );
}

export function ScheduleTable() {
  return (
    <Table
      style={{
        cellPadding: [10, 12],
        rowBorder: { width: 1, style: "solid", color: token("colors.border") },
      }}
    >
      <TableRow header>
        <TableCell style={{ width: 84, color: token("colors.primary"), fontWeight: 700 }}>Time</TableCell>
        <TableCell style={{ color: token("colors.primary"), fontWeight: 700 }}>Running order</TableCell>
      </TableRow>
      {schedule.map((row) => (
        <TableRow key={row.time}>
          <TableCell style={{ fontWeight: 700, letterSpacing: 1 }}>{row.time}</TableCell>
          <TableCell>{row.item}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export function TrackCards() {
  return (
    <Grid columns={3} style={{ gap: 16 }}>
      {tracks.map((track) => (
        <Column key={track.name} style={{ apply: ["glass"], padding: 22, gap: 10 }}>
          <Heading level={3}>{track.name}</Heading>
          <Text style={{ color: token("colors.muted"), fontSize: 15 }}>{track.brief}</Text>
          <Text style={{ color: token("colors.primary"), fontWeight: 700, fontSize: 18 }}>{track.prize}</Text>
        </Column>
      ))}
    </Grid>
  );
}

export function JudgeRow() {
  return (
    <Row style={{ gap: 16 }}>
      {judges.map((judge) => (
        <Column key={judge.name} style={{ apply: ["glass"], padding: 22, gap: 8, alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Oswald, 'Arial Narrow', Arial, sans-serif",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 2,
              color: token("colors.primary"),
              textAlign: "center",
            }}
          >
            {judge.initials}
          </Text>
          <Text style={{ fontWeight: 700, textAlign: "center" }}>{judge.name}</Text>
          <Text style={{ color: token("colors.muted"), fontSize: 13, textAlign: "center" }}>{judge.role}</Text>
        </Column>
      ))}
    </Row>
  );
}

/**
 * The paper ticket — a bone-coloured card inside the dark kit.
 * `qr` drops the scannable-style code beside the details (Document only:
 * Svg is not an email element, so the email shows the code as text).
 */
export function TicketBlock({ qr }: { qr?: boolean }) {
  return (
    <Column style={{ apply: ["ticket"] }}>
      <Row style={{ gap: 20 }}>
        <Column style={{ gap: 6, flex: 1 }}>
          <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: token("colors.crimson") }}>
            Admit one — {event.edition}
          </Text>
          <Heading level={3} style={{ color: token("colors.ink") }}>
            {event.name}
          </Heading>
          <Text style={{ color: token("colors.inkMuted"), fontSize: 14 }}>
            Prepared for <MergeTag name="first_name" /> · {ticket.tier}
          </Text>
          <Text style={{ color: token("colors.inkMuted"), fontSize: 14 }}>
            {event.runs} · {event.venue}
          </Text>
          <Text style={{ fontWeight: 700, letterSpacing: 1.5, fontSize: 15 }}>
            {ticket.code} · {ticket.row} · {ticket.seat}
          </Text>
        </Column>
        {qr ? <TicketCodeSvg /> : null}
      </Row>
    </Column>
  );
}

export function FooterBlock() {
  return (
    <Column style={{ gap: 14, alignItems: "center" }}>
      <Divider />
      <Menu
        items={[
          { text: "Schedule", href: `${event.url}/#schedule` },
          { text: "Tracks", href: `${event.url}/#tracks` },
          { text: "FAQ", href: `${event.url}/#faq` },
          { text: "Code of conduct", href: `${event.url}/#conduct` },
        ]}
        separator="·"
        style={{ justifyContent: "center", color: token("colors.muted") }}
      />
      <Social
        icons={[
          { name: "Instagram", href: "https://instagram.com" },
          { name: "LinkedIn", href: "https://linkedin.com" },
          { name: "YouTube", href: "https://youtube.com" },
        ]}
        iconType="circle"
        size={30}
      />
      <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "center" }}>
        {event.name} is a fictional sample event. This kit is a template — swap the data in
        src/event.ts and every output is yours.
      </Text>
    </Column>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn art (Canvas / Document only — Svg is not an email element)    */
/* ------------------------------------------------------------------ */

/** Deterministic pseudo-random from a seed, so the skyline never changes. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * A noir skyline drawn with Svg shapes: rooftops, lit windows, a crescent
 * moon, two searchlight beams and rain. Used on the Canvas hero/social art,
 * which is then rendered to PNG and reused as the Email/Page hero image.
 */
export function Skyline({
  width,
  height,
  seed = 7,
  moonY = 86,
  moonR = 44,
}: {
  width: number;
  height: number;
  seed?: number;
  moonY?: number;
  moonR?: number;
}) {
  const rand = seeded(seed);
  const ground = height;
  const buildings: React.ReactNode[] = [];
  const windows: React.ReactNode[] = [];
  let x = -10;
  let i = 0;
  while (x < width + 10) {
    const bw = 46 + rand() * 90;
    const bh = height * (0.34 + rand() * 0.5);
    const top = ground - bh;
    buildings.push(
      <Rect key={`b${i}`} x={x} y={top} width={bw} height={bh} style={{ fill: "#050508" }} />,
    );
    // Lit windows
    const cols = Math.max(2, Math.floor(bw / 16));
    const rows = Math.max(3, Math.floor(bh / 22));
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rand() > 0.42) continue;
        windows.push(
          <Rect
            key={`w${i}-${c}-${r}`}
            x={x + 7 + c * 16}
            y={top + 10 + r * 22}
            width={6}
            height={9}
            style={{ fill: "#e3a82b", opacity: 0.25 + rand() * 0.65 }}
          />,
        );
      }
    }
    x += bw + 4 + rand() * 14;
    i++;
  }
  const rain: React.ReactNode[] = [];
  for (let r = 0; r < 90; r++) {
    const rx = rand() * width;
    const ry = rand() * height * 0.8;
    rain.push(
      <Line
        key={`r${r}`}
        x1={rx}
        y1={ry}
        x2={rx - 5}
        y2={ry + 16}
        style={{ stroke: "#9a94b8", strokeWidth: 1, opacity: 0.16 }}
      />,
    );
  }
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* searchlight beams */}
      <Polygon
        points={`${width * 0.16},${ground} ${width * 0.34},0 ${width * 0.44},0`}
        style={{ fill: "#e3a82b", opacity: 0.06 }}
      />
      <Polygon
        points={`${width * 0.86},${ground} ${width * 0.6},0 ${width * 0.7},0`}
        style={{ fill: "#ffffff", opacity: 0.045 }}
      />
      {buildings}
      {windows}
      {/* crescent moon, drawn last so no rooftop swallows it */}
      <Circle cx={width - 150} cy={moonY} r={moonR} style={{ fill: "#f3eee1" }} />
      <Circle cx={width - 150 + moonR * 0.5} cy={moonY - moonR * 0.32} r={moonR * 0.91} style={{ fill: "#0a0a10" }} />
      {rain}
      {/* the street */}
      <Rect x={0} y={ground - 3} width={width} height={3} style={{ fill: "#e3a82b", opacity: 0.5 }} />
    </Svg>
  );
}

/** A scannable-style code drawn from the ticket number (decorative). */
export function TicketCodeSvg({ size = 132 }: { size?: number }) {
  const modules = 25;
  const cell = size / modules;
  const rand = seeded(ticket.code.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
  const cells: React.ReactNode[] = [];
  const inFinder = (cx: number, cy: number) =>
    (cx < 8 && cy < 8) || (cx >= modules - 8 && cy < 8) || (cx < 8 && cy >= modules - 8);
  for (let cy = 0; cy < modules; cy++) {
    for (let cx = 0; cx < modules; cx++) {
      if (inFinder(cx, cy)) continue;
      if (rand() > 0.52) {
        cells.push(
          <Rect key={`${cx}-${cy}`} x={cx * cell} y={cy * cell} width={cell} height={cell} style={{ fill: "#17171d" }} />,
        );
      }
    }
  }
  const finder = (fx: number, fy: number, key: string) => [
    <Rect key={`${key}a`} x={fx} y={fy} width={cell * 7} height={cell * 7} style={{ fill: "#17171d" }} />,
    <Rect key={`${key}b`} x={fx + cell} y={fy + cell} width={cell * 5} height={cell * 5} style={{ fill: "#f3eee1" }} />,
    <Rect key={`${key}c`} x={fx + cell * 2} y={fy + cell * 2} width={cell * 3} height={cell * 3} style={{ fill: "#17171d" }} />,
  ];
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Rect x={0} y={0} width={size} height={size} style={{ fill: "#f3eee1" }} />
      {cells}
      {finder(0, 0, "f1")}
      {finder(size - cell * 7, 0, "f2")}
      {finder(0, size - cell * 7, "f3")}
    </Svg>
  );
}
