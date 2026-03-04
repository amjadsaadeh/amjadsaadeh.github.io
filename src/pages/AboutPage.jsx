import { fonts, colors } from '../theme'
import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'
import NavLink from '../components/NavLink'
import { Link } from 'react-router-dom'

const timelineItems = [
  {
    period: '2023 →',
    company: 'Sennheiser',
    role: 'Senior Software Engineer — Video Processing / Embedded',
    color: colors.accent,
  },
  {
    period: '2020 – 23',
    company: 'CARIAD (VW Group)',
    role: 'Data Scientist / ML Engineer — Autonomous Driving',
    color: colors.warm,
  },
  {
    period: '2019 – 20',
    company: 'Carmeq GmbH',
    role: 'ML Engineer — Driver Assistance Systems',
    color: colors.warm,
  },
  {
    period: '2017 – 19',
    company: 'Leica Microsystems',
    role: 'Software Engineer — Image Processing',
    color: colors.green,
  },
  {
    period: '2014 – 17',
    company: 'Freie Universität Berlin',
    role: 'M.Sc. Computer Science — Thesis on acoustic DoA estimation',
    color: colors.green,
  },
]

function InlineLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: colors.accent,
        textDecoration: 'none',
        borderBottom: '1px solid ' + colors.accent + '55',
        paddingBottom: 1,
        transition: 'border-color 0.2s',
      }}
    >
      {children}
    </a>
  )
}

function ProseSection({ title, color, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {title && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: color || colors.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ color: colors.textMuted }}>&gt;</span>
          {title}
        </div>
      )}
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 15,
          color: colors.text,
          lineHeight: 1.85,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function SidebarCard({ title, color, children }) {
  return (
    <div
      style={{
        background: colors.surface,
        border: '1px solid ' + colors.border,
        borderRadius: 8,
        padding: '16px 18px',
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: color || colors.accent,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ color: colors.textMuted }}>&gt;</span>
        {title}
      </div>
      {children}
    </div>
  )
}

function SidebarItem({ label, sub, color }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          color: colors.text,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: color || colors.textMuted,
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  )
}

function Timeline() {
  return (
    <div style={{ position: 'relative', paddingLeft: 24 }}>
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          left: 7,
          top: 8,
          bottom: 8,
          width: 2,
          background: 'linear-gradient(to bottom, ' + colors.accent + ', ' + colors.green + '22)',
          borderRadius: 2,
        }}
      />
      {timelineItems.map(function (item, i) {
        return (
          <div
            key={i}
            style={{
              position: 'relative',
              display: 'flex',
              gap: 20,
              paddingBottom: i < timelineItems.length - 1 ? 28 : 0,
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: -24,
                top: 5,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: item.color,
                border: '2px solid ' + colors.bg,
                boxShadow: '0 0 0 2px ' + item.color + '44',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  flexWrap: 'wrap',
                  marginBottom: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    color: item.color,
                  }}
                >
                  {item.period}
                </span>
                <span
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  {item.company}
                </span>
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 12,
                  color: colors.textMuted,
                  lineHeight: 1.4,
                }}
              >
                {item.role}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function AboutPage() {
  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: colors.bg + 'ee',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid ' + colors.border,
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: fonts.mono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.accent,
              textDecoration: 'none',
            }}
          >
            saadeh<span style={{ color: colors.textMuted }}>.dev</span>
          </Link>
          <div style={{ display: 'flex', gap: 24 }}>
            <NavLink href="/">home</NavLink>
            <NavLink href="/about" active>about</NavLink>
            <NavLink href="/#projects">projects</NavLink>
            <NavLink href="/#contact">contact</NavLink>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Page header */}
        <FadeIn>
          <section style={{ paddingTop: 64, paddingBottom: 48 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
              &gt; cat about.md
            </div>
            <h1
              style={{
                fontFamily: fonts.sans,
                fontSize: 36,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 10px 0',
                lineHeight: 1.15,
              }}
            >
              About me
            </h1>
            <p
              style={{
                fontFamily: fonts.sans,
                fontSize: 16,
                color: colors.textMuted,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Engineer, tinkerer, and lifelong learner — somewhere between signal processing and shipping products.
            </p>
          </section>
        </FadeIn>

        {/* Main two-column layout */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* Prose content */}
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            <FadeIn delay={80}>
              <ProseSection>
                I wrote my first lines of code at 14, building websites and small apps. It was not
                sophisticated — but it was the first time I realized I could make something out of
                nothing but logic and patience. A great computer science teacher at school helped
                turn that spark into a direction.
              </ProseSection>
            </FadeIn>

            <FadeIn delay={120}>
              <ProseSection>
                I started university trying Physics, quickly realized I wanted to build things rather
                than only theorize about them, and switched to Computer Science at{' '}
                <InlineLink href="https://www.fu-berlin.de">Freie Universität Berlin</InlineLink>.
                That turned out to be the right call. The curriculum pushed me into unfamiliar
                territory — from operating systems to pattern recognition — and I discovered that I
                am happiest at the intersection of theory and application.
              </ProseSection>
            </FadeIn>

            <FadeIn delay={160}>
              <ProseSection>
                My master thesis became a turning point. I worked on estimating the direction of
                traffic sounds using{' '}
                <InlineLink href="https://github.com/amjadsaadeh">
                  microphone arrays and statistical signal processing
                </InlineLink>
                . It was my first real taste of translating scientific methods into something that
                works in the physical world. I have been chasing that feeling ever since.
              </ProseSection>
            </FadeIn>

            <FadeIn delay={200}>
              <ProseSection title="From microscopy to the road" color={colors.green}>
                After graduating, I joined Leica Microsystems, working on image processing for
                microscopy — 3D visualization, optical distortion correction, and early experiments
                with deep learning for life science applications. It was technically demanding and
                intellectually rich, and it deepened my conviction that image processing is where I
                belong.
              </ProseSection>
            </FadeIn>

            <FadeIn delay={230}>
              <ProseSection>
                In 2019 I moved back to Berlin and into the automotive world, first at Carmeq and
                then at CARIAD (Volkswagen Group). There, I worked on bringing machine learning into
                advanced driver assistance systems — from feasibility studies to production-ready
                pipelines. The work involved everything from Python prototyping to building
                abstraction layers for running AI models on embedded hardware. It taught me a lot
                about the gap between a working model and a shippable product.
              </ProseSection>
            </FadeIn>

            <FadeIn delay={260}>
              <ProseSection title="Where I am now" color={colors.accent}>
                Since 2023, I have been at Sennheiser, working on video processing for unified
                communication solutions — the kind of systems found in modern meeting rooms. I
                evaluate embedded platforms, design video processing algorithms, and shape how these
                products are built. It is a role that brings together nearly everything I have
                learned: image processing, embedded systems, and the pragmatic engineering mindset
                you need to ship real products.
              </ProseSection>
            </FadeIn>

            <FadeIn delay={290}>
              <ProseSection title="Beyond work" color={colors.warm}>
                I am endlessly curious outside of work too. I run a fairly involved{' '}
                <InlineLink href="https://www.home-assistant.io">Home Assistant</InlineLink> setup,
                I have{' '}
                <InlineLink href="https://github.com/amjadsaadeh">
                  trained a neural network to detect my doorbell sound
                </InlineLink>{' '}
                (because rewiring it seemed boring), and I regularly dig into topics like edge AI,
                signal processing, and whatever else catches my attention. I also contribute to
                open-source projects like{' '}
                <InlineLink href="https://github.com/bramstroker/homeassistant-powercalc">
                  Home Assistant Power Calc
                </InlineLink>
                . My motto — <em>progress, not perfection</em> — is not just a tagline. It is
                genuinely how I approach learning and building things.
              </ProseSection>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div
            style={{
              width: 240,
              flexShrink: 0,
              position: 'sticky',
              top: 80,
            }}
          >
            <FadeIn delay={150}>
              <SidebarCard title="Currently reading" color={colors.warm}>
                <SidebarItem
                  label="The Art of Doing Science and Engineering"
                  sub="Richard Hamming"
                  color={colors.warm}
                />
                <SidebarItem
                  label="Designing Data-Intensive Applications"
                  sub="Martin Kleppmann"
                  color={colors.warm}
                />
              </SidebarCard>

              <SidebarCard title="Recently explored" color={colors.accent}>
                <SidebarItem label="TensorRT + ONNX on ARM" sub="edge inference optimization" color={colors.accent} />
                <SidebarItem label="AV1 codec internals" sub="video compression deep-dive" color={colors.accent} />
                <SidebarItem label="ESPHome + BLE sensors" sub="home automation tinkering" color={colors.accent} />
                <SidebarItem label="MUSIC algorithm variants" sub="spatial audio / DoA" color={colors.accent} />
              </SidebarCard>

              <SidebarCard title="Links" color={colors.green}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a
                    href="https://github.com/amjadsaadeh"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      color: colors.green,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ color: colors.textMuted }}>&gt;</span> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/amjad-saadeh-86a934187"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      color: colors.green,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ color: colors.textMuted }}>&gt;</span> LinkedIn
                  </a>
                  <a
                    href="mailto:amjad@saadeh.dev"
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      color: colors.green,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <span style={{ color: colors.textMuted }}>&gt;</span> Email
                  </a>
                </div>
              </SidebarCard>
            </FadeIn>
          </div>
        </div>

        {/* Timeline */}
        <FadeIn delay={320}>
          <section style={{ marginTop: 64, marginBottom: 64 }}>
            <SectionLabel color={colors.green}>career timeline</SectionLabel>
            <Timeline />
          </section>
        </FadeIn>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid ' + colors.border,
            padding: '20px 0 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted }}>
            &copy; {new Date().getFullYear()} Amjad Saadeh
          </span>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted }}>
            progress, not perfection
          </span>
        </footer>
      </div>
    </div>
  )
}

export default AboutPage
