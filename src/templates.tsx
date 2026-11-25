import {
  Button,
  Canvas,
  Column,
  Divider,
  Document,
  Email,
  Heading,
  Image,
  List,
  ListItem,
  Page,
  PageBreak,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Section,
  Text,
  token,
} from "@hyper-elements/react";
import {
  FooterBlock,
  JudgeRow,
  Kicker,
  Masthead,
  MetaLine,
  ScheduleTable,
  Skyline,
  TicketBlock,
  TrackCards,
} from "./components";
import { event } from "./event";
import { noirMarquee, noirMarqueePrint } from "./theme";

/* ------------------------------------------------------------------ */
/* Canvas art — rendered to PNG first, then reused as the hero image   */
/* ------------------------------------------------------------------ */

export function HeroArt() {
  return (
    <Canvas width={1200} height={540} theme={noirMarquee} title={`${event.name} — night skyline`}>
      <Skyline width={1200} height={540} seed={7} />
    </Canvas>
  );
}

export function SocialCard() {
  return (
    <Canvas
      width={1200}
      height={630}
      theme={noirMarquee}
      title={`${event.name} — ${event.runs}`}
      style={{ padding: [48, 56], gap: 16, justifyContent: "start" }}
    >
      <Row style={{ justifyContent: "space-between" }}>
        <Text style={{ apply: ["kicker"] }}>
          {event.name} · {event.edition}
        </Text>
        <Text style={{ fontSize: 12, letterSpacing: 3, color: token("colors.muted"), textTransform: "uppercase" }}>
          Registrations open
        </Text>
      </Row>
      <Heading level={1} style={{ fontSize: 84, letterSpacing: 2 }}>
        {event.name}
      </Heading>
      <Text style={{ fontSize: 24, fontStyle: "italic", color: token("colors.muted") }}>{event.tagline}</Text>
      <Row style={{ gap: 12 }}>
        <Column
          style={{
            border: { width: 1, style: "solid", color: token("colors.primary") },
            borderRadius: 999,
            padding: [8, 20],
          }}
        >
          <Text style={{ fontWeight: 700, letterSpacing: 2, fontSize: 15, color: token("colors.primary") }}>
            {event.runs.toUpperCase()}
          </Text>
        </Column>
        <Column
          style={{
            border: { width: 1, style: "solid", color: token("colors.border") },
            borderRadius: 999,
            padding: [8, 20],
          }}
        >
          <Text style={{ fontWeight: 700, letterSpacing: 2, fontSize: 15 }}>
            {event.city.toUpperCase()} · {event.prizePool} IN PRIZES
          </Text>
        </Column>
      </Row>
      <Skyline width={1088} height={196} seed={11} moonY={46} moonR={30} />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/* The invitation email                                                */
/* ------------------------------------------------------------------ */

export function InviteEmail({ heroSrc }: { heroSrc: string }) {
  return (
    <Email
      width={600}
      theme={noirMarquee}
      title={`${event.name} — registrations open`}
      previewText={`${event.tagline} ${event.runs}, ${event.city}. ${event.prizePool} in prizes.`}
      style={{ gap: 22 }}
    >
      <Masthead />
      <Image
        src={{ src: heroSrc, width: 1200, height: 540 }}
        alt="A night skyline under a crescent moon, drawn for Midnight Circuit"
        style={{ width: 600, borderRadius: 18 }}
      />
      <Column style={{ apply: ["glass"] }}>
        <Kicker>Registrations open</Kicker>
        <Heading level={1}>{event.name}</Heading>
        <Text style={{ fontSize: 19, fontStyle: "italic", color: token("colors.muted") }}>{event.tagline}</Text>
        <MetaLine />
        <Text>
          One venue, one night, no retakes. Three hundred hackers walk into a century-old
          projection house at dusk; the best of them walk out at dawn with a film, a product,
          and their share of {event.prizePool}. Bring a laptop and a sleeping bag. We bring
          the coffee, the mentors and the midnight screening.
        </Text>
        <Row style={{ gap: 12 }}>
          <Button href={event.registerUrl}>Claim your seat</Button>
          <Button href={event.url} variant="ghost">
            Watch last year
          </Button>
        </Row>
      </Column>

      <Column style={{ gap: 14 }}>
        <Kicker>The running order</Kicker>
        <Heading level={2}>Seven frames, 24 hours</Heading>
        <ScheduleTable />
      </Column>

      <Column style={{ gap: 14 }}>
        <Kicker>Prize tracks</Kicker>
        <Heading level={2}>Three tracks, {event.prizePool}</Heading>
        <TrackCards />
      </Column>

      <Column style={{ gap: 14 }}>
        <Kicker>In the jury box</Kicker>
        <Heading level={2}>Judged by people who ship</Heading>
        <JudgeRow />
      </Column>

      <TicketBlock />
      <FooterBlock />
    </Email>
  );
}

/* ------------------------------------------------------------------ */
/* The web version — same components, wider stage                      */
/* ------------------------------------------------------------------ */

export function EventPage({ heroSrc }: { heroSrc: string }) {
  return (
    <Page
      width={1080}
      theme={noirMarquee}
      title={`${event.name} — ${event.runs}, ${event.city}`}
      description={`${event.tagline} A 24-hour hackathon in ${event.city}, ${event.runs}. ${event.prizePool} in prizes.`}
      style={{ gap: 0 }}
    >
      <Section style={{ padding: [36, 0, 8] }}>
        <Masthead />
      </Section>
      <Section style={{ padding: [8, 0, 40] }}>
        <Column style={{ gap: 22, alignItems: "center" }}>
          <Image
            src={{ src: heroSrc, width: 1200, height: 540 }}
            alt="A night skyline under a crescent moon, drawn for Midnight Circuit"
            style={{ width: 1080, borderRadius: 22 }}
          />
          <Kicker align="center">Registrations open — {event.edition}</Kicker>
          <Heading level={1} style={{ fontSize: 76, textAlign: "center" }}>
            {event.name}
          </Heading>
          <Text style={{ fontSize: 22, fontStyle: "italic", color: token("colors.muted"), textAlign: "center" }}>
            {event.tagline}
          </Text>
          <MetaLine align="center" />
          <Row style={{ gap: 12, justifyContent: "center" }}>
            <Button href={event.registerUrl}>Claim your seat</Button>
            <Button href={`${event.url}#schedule`} variant="ghost">
              See the running order
            </Button>
          </Row>
        </Column>
      </Section>

      <Section id="schedule" style={{ padding: [16, 0, 40] }}>
        <Row style={{ gap: 28 }}>
          <Column style={{ gap: 14, flex: 1 }}>
            <Kicker>How it works</Kicker>
            <Heading level={2}>Show up. Build. Screen it.</Heading>
            <Text style={{ color: token("colors.muted") }}>
              No slides about your idea — the demo is the pitch. Teams of two to four, or fly
              solo and find your crew at the door.
            </Text>
            <List type="number" style={{ gap: 8 }}>
              <ListItem>Register and get your paper ticket by email</ListItem>
              <ListItem>Arrive at 18:00 — teams lock at 20:00 sharp</ListItem>
              <ListItem>Build for 22 hours, with mentors on the floor all night</ListItem>
              <ListItem>Demo live at 18:00 next day — three minutes, no exceptions</ListItem>
            </List>
          </Column>
          <Column style={{ apply: ["glass"], flex: 1.2 }}>
            <Kicker>The running order</Kicker>
            <ScheduleTable />
          </Column>
        </Row>
      </Section>

      <Section id="tracks" style={{ padding: [16, 0, 40] }}>
        <Column style={{ gap: 14 }}>
          <Kicker>Prize tracks</Kicker>
          <Heading level={2}>Three tracks, {event.prizePool}</Heading>
          <TrackCards />
        </Column>
      </Section>

      <Section style={{ padding: [16, 0, 48] }}>
        <Column style={{ gap: 14 }}>
          <Kicker>In the jury box</Kicker>
          <Heading level={2}>Judged by people who ship</Heading>
          <JudgeRow />
        </Column>
      </Section>

      <Section
        tokens={{ colors: { background: "#571d1d", foreground: "#f7e9e4" } }}
        style={{ padding: [44, 0] }}
      >
        <Column style={{ gap: 16, alignItems: "center" }}>
          <Heading level={2} style={{ textAlign: "center" }}>
            Seats are a rumour until you book one
          </Heading>
          <Text style={{ textAlign: "center", color: "#e8cfc8" }}>
            Last year the house sold out in nine days. {event.ends}.
          </Text>
          <Button href={event.registerUrl}>Claim your seat</Button>
        </Column>
      </Section>

      <Section style={{ padding: [40, 0, 44] }}>
        <Column style={{ gap: 22 }}>
          <TicketBlock />
          <FooterBlock />
        </Column>
      </Section>
    </Page>
  );
}

/* ------------------------------------------------------------------ */
/* The e-ticket document — print cut of the brand                      */
/* ------------------------------------------------------------------ */

export function TicketDocument() {
  return (
    <Document size="A4" margin={52} theme={noirMarqueePrint} title={`${event.name} — e-ticket`}>
      <PageHeader style={{ padding: [0, 0, 14] }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            {event.name} — E-ticket
          </Text>
          <Text style={{ fontSize: 11, letterSpacing: 3, color: token("colors.muted"), textTransform: "uppercase" }}>
            {event.edition}
          </Text>
        </Row>
      </PageHeader>

      <Column style={{ gap: 18 }}>
        <Kicker>Your pass</Kicker>
        <Heading level={1} style={{ fontSize: 36 }}>You are on the list.</Heading>
        <Text style={{ color: token("colors.muted") }}>
          Show this ticket at the door of {event.venue} from 18:00 on Fri 11 Dec 2026. The
          code below is yours alone — one wristband per ticket.
        </Text>
        <TicketBlock qr />
        <Heading level={3} style={{ color: token("colors.ink") }}>
          At the door
        </Heading>
        <List type="number" style={{ gap: 6 }}>
          <ListItem>Bring a photo ID that matches the name on this ticket</ListItem>
          <ListItem>Doors 18:00, opening frame 19:00 — late seats are given away at 19:30</ListItem>
          <ListItem>Laptop, charger, sleeping bag. We provide desks, Wi-Fi, food and coffee</ListItem>
        </List>
      </Column>

      <PageBreak />

      <Column style={{ gap: 16 }}>
        <Kicker>The running order</Kicker>
        <Heading level={2}>Seven frames, 24 hours</Heading>
        <ScheduleTable />
        <Divider />
        <Heading level={3} style={{ color: token("colors.ink") }}>
          Getting there
        </Heading>
        <Text style={{ color: token("colors.muted") }}>
          {event.venue}. Nearest metro: MG Road, a four-minute walk. Parking is closed for the
          night — the street is ours. Cloakroom opens at 17:30.
        </Text>
        <Text style={{ fontSize: 12, color: token("colors.muted") }}>
          Tickets are transferable until 9 Dec 2026 from your registration page. The venue is
          step-free; tell us anything you need and we will make it happen.
        </Text>
      </Column>

      <PageFooter style={{ padding: [14, 0, 0] }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Text style={{ fontSize: 11, color: token("colors.muted") }}>msabhishek22.github.io/midnight-circuit-hyper-elements-kit/out/page.html</Text>
          <Text style={{ fontSize: 11, color: token("colors.muted") }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>
    </Document>
  );
}
