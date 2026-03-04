import { useState, useEffect } from 'react'
import { fonts, colors } from '../theme'
import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'
import Tag from '../components/Tag'
import NavLink from '../components/NavLink'
import ExpItem from '../components/ExpItem'
import ProjectCard from '../components/ProjectCard'
import InterestCard from '../components/InterestCard'

function HomePage() {
  var [cursorBlink, setCursorBlink] = useState(true)

  useEffect(function() {
    var interval = setInterval(function() {
      setCursorBlink(function(b) { return !b })
    }, 530)
    return function() { clearInterval(interval) }
  }, [])

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
          <span style={{ fontFamily: fonts.mono, fontSize: 15, fontWeight: 600, color: colors.accent }}>
            saadeh<span style={{ color: colors.textMuted }}>.dev</span>
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            <NavLink href="#" active>home</NavLink>
            <NavLink href="#about">about</NavLink>
            <NavLink href="#projects">projects</NavLink>
            <NavLink href="#contact">contact</NavLink>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <FadeIn>
          <section style={{ paddingTop: 80, paddingBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  padding: 3,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: fonts.sans,
                    fontSize: 32,
                    fontWeight: 700,
                    color: colors.accent,
                  }}
                >
                  <img
                    src="/logo.svg"
                    alt="Amjad Saadeh Logo"
                    style={{ width: "100%" }}
                />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>
                  Hello, I am
                </div>
                <h1 style={{ fontFamily: fonts.sans, fontSize: 42, fontWeight: 700, color: '#fff', margin: '0 0 6px 0', lineHeight: 1.1 }}>
                  Amjad Saadeh
                </h1>
                <p style={{ fontFamily: fonts.sans, fontSize: 18, color: colors.textMuted, margin: '0 0 16px 0', lineHeight: 1.5 }}>
                  Software Engineer specializing in image processing, video systems, and AI &mdash; building things that see and understand.
                </p>
                <div style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.warm, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: colors.textMuted }}>$</span> motto
                  <span style={{ color: colors.textMuted }}>&rarr;</span>
                  &quot;progress, not perfection&quot;
                  <span style={{ opacity: cursorBlink ? 1 : 0, transition: 'opacity 0.1s', color: colors.accent }}>
                    &#9610;
                  </span>
                </div>
                <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Tag color={colors.green}>Berlin</Tag>
                  <Tag color={colors.accent}>Sennheiser</Tag>
                  <Tag color={colors.warm}>Senior Engineer</Tag>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Currently exploring */}
        <FadeIn delay={100}>
          <div
            style={{
              background: colors.accentDim,
              border: '1px solid ' + colors.accent + '22',
              borderRadius: 8,
              padding: '12px 18px',
              marginBottom: 48,
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.accent,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: colors.textMuted }}>currently exploring:</span>
            <span>edge AI on embedded platforms</span>
            <span style={{ color: colors.textMuted }}>&middot;</span>
            <span>video processing pipelines</span>
            <span style={{ color: colors.textMuted }}>&middot;</span>
            <span>Home Assistant automations</span>
          </div>
        </FadeIn>

        {/* About preview */}
        <FadeIn delay={150}>
          <section id="about" style={{ marginBottom: 64 }}>
            <SectionLabel>about</SectionLabel>
            <p style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.text, lineHeight: 1.75, margin: 0, maxWidth: 700 }}>
              I have been writing code since I was 14 &mdash; first for fun, then to understand how the
              world works through data. With a background in computer science from Freie
              Universit&auml;t Berlin and nearly a decade of professional experience, I have moved from
              microscopy image analysis to autonomous driving to video communication systems. What
              drives me is the moment where scientific ideas become something tangible and useful.
            </p>
            <a
              href="/about"
              style={{
                fontFamily: fonts.mono,
                fontSize: 13,
                color: colors.accent,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 14,
              }}
            >
              {'>'} read the full story &rarr;
            </a>
          </section>
        </FadeIn>

        {/* Interests */}
        <FadeIn delay={200}>
          <section style={{ marginBottom: 64 }}>
            <SectionLabel color={colors.warm}>interests</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-start' }}>
              <InterestCard icon="&#129504;" label="Machine Learning" color={colors.warm} />
              <InterestCard icon="&#128247;" label="Image Processing" color={colors.accent} />
              <InterestCard icon="&#128225;" label="Signal Processing" color={colors.green} />
              <InterestCard icon="&#127919;" label="Computer Vision" color={colors.warm} />
              <InterestCard icon="&#127968;" label="Smart Home" color={colors.accent} />
              <InterestCard icon="&#129302;" label="Embedded AI" color={colors.green} />
            </div>
          </section>
        </FadeIn>

        {/* Experience */}
        <FadeIn delay={250}>
          <section style={{ marginBottom: 64 }}>
            <SectionLabel color={colors.green}>experience</SectionLabel>
            <div>
              <ExpItem
                period="2023 &rarr;"
                company="Sennheiser SE & Co. KG"
                role="Senior Software Engineer - Video Processing / Embedded"
                tags={['C++', 'OpenCV', 'Embedded', 'Video']}
              />
              <ExpItem
                period="2020 - 23"
                company="CARIAD SE (Volkswagen Group)"
                role="Data Scientist / ML Engineer - Autonomous Driving"
                tags={['Python', 'MLFlow', 'TFLite', 'AzureML']}
              />
              <ExpItem
                period="2019 - 20"
                company="Carmeq GmbH"
                role="ML Engineer - Driver Assistance Systems"
                tags={['Python', 'OpenCV', 'Simulink']}
              />
              <ExpItem
                period="2017 - 19"
                company="Leica Microsystems"
                role="Software Engineer - Image Processing"
                tags={['C++', 'Python', 'DirectX', 'Deep Learning']}
              />
            </div>
            <a
              href="/cv"
              style={{
                fontFamily: fonts.mono,
                fontSize: 13,
                color: colors.green,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 16,
              }}
            >
              {'>'} full CV &rarr;
            </a>
          </section>
        </FadeIn>

        {/* Projects */}
        <FadeIn delay={300}>
          <section id="projects" style={{ marginBottom: 64 }}>
            <SectionLabel>projects</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <ProjectCard
                title="DoA Estimation with MUSIC Algorithm"
                description="Master thesis: estimating the direction of arrival of traffic objects using acoustic data from a microphone array and statistical analysis."
                tags={['Rust', 'Signal Processing', 'Statistics']}
                color={colors.accent}
              />
              <ProjectCard
                title="Doorbell Detector"
                description="Full lifecycle ML project - instead of rewiring my doorbell, I trained a model to recognize its sound and trigger smart home automations."
                tags={['Python', 'ML', 'Home Assistant']}
                color={colors.warm}
              />
              <ProjectCard
                title="Home Assistant Power Calc"
                description="Open-source contribution for estimating power consumption of smart home devices based on their state and known characteristics."
                tags={['Python', 'IoT', 'Open Source']}
                color={colors.green}
              />
            </div>
          </section>
        </FadeIn>

        {/* Contact */}
        <FadeIn delay={350}>
          <section id="contact" style={{ marginBottom: 80 }}>
            <SectionLabel color={colors.warm}>contact</SectionLabel>
            <div
              style={{
                background: colors.surface,
                border: '1px solid ' + colors.border,
                borderRadius: 10,
                padding: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div>
                <p style={{ fontFamily: fonts.sans, fontSize: 15, color: colors.text, margin: '0 0 6px 0' }}>
                  Interested in working together or just want to say hello?
                </p>
                <p style={{ fontFamily: fonts.mono, fontSize: 13, color: colors.textMuted, margin: 0 }}>
                  Always happy to chat about image processing, ML, or embedded systems.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="mailto:amjad@saadeh.dev"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '1px solid ' + colors.accent + '44',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  Email
                </a>
                <a
                  href="https://github.com/amjadsaadeh"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '1px solid ' + colors.accent + '44',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/amjad-saadeh-86a934187"
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '1px solid ' + colors.accent + '44',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
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

export default HomePage
