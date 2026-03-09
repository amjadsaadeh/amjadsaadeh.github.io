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
  var [featHovered, setFeatHovered] = useState(false)
  var [card1Hovered, setCard1Hovered] = useState(false)
  var [card2Hovered, setCard2Hovered] = useState(false)
  var [card3Hovered, setCard3Hovered] = useState(false)
  var [domain1Hovered, setDomain1Hovered] = useState(false)
  var [domain2Hovered, setDomain2Hovered] = useState(false)
  var [domain3Hovered, setDomain3Hovered] = useState(false)
  var [domain4Hovered, setDomain4Hovered] = useState(false)

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
            <NavLink href="/" active>home</NavLink>
            <NavLink href="/about">about</NavLink>
            <NavLink href="/projects">projects</NavLink>
            <NavLink href="/contact">contact</NavLink>
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
            <span>AI Agents</span>
            <span style={{ color: colors.textMuted }}>&middot;</span>
            <span>vibe coding</span>
            <span style={{ color: colors.textMuted }}>&middot;</span>
            <span>edge AI on embedded platforms</span>
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

        {/* Projects */}
        <FadeIn delay={200}>
          <section id="projects" style={{ marginBottom: 64 }}>
            <SectionLabel>projects</SectionLabel>

            {/* Featured card */}
            <div
              onMouseEnter={function() { setFeatHovered(true) }}
              onMouseLeave={function() { setFeatHovered(false) }}
              style={{
                position: 'relative',
                background: colors.surface,
                border: '1px solid ' + (featHovered ? colors.accent + '66' : colors.accent + '33'),
                borderRadius: 10,
                padding: '36px 36px 32px',
                marginBottom: 16,
                overflow: 'hidden',
                transition: 'border-color 0.3s',
              }}
            >
              {/* top gradient line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, ' + colors.accent + ', transparent 60%)' }} />
              {/* card index */}
              <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, letterSpacing: '0.1em' }}>01 / 04</div>

              {/* badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                {[
                  { label: 'Featured', color: colors.accent },
                  { label: 'Computer Vision', color: colors.accent },
                  { label: 'Embedded AI', color: '#f4b942' },
                ].map(function(b) {
                  return (
                    <span key={b.label} style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 9px', border: '1px solid ' + b.color + '55', color: b.color }}>
                      {b.label}
                    </span>
                  )
                })}
                <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.1em', padding: '2px 7px', border: '1px solid rgba(255,71,87,0.25)', color: '#ff4757', opacity: 0.8 }}>NDA</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted, marginLeft: 'auto' }}>2023 - 2025</span>
              </div>

              <h3 style={{ fontFamily: fonts.sans, fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1.15 }}>
                Real-Time Video AI on Qualcomm SoC
              </h3>
              <div style={{ fontFamily: fonts.mono, fontSize: 11.5, color: colors.accent, opacity: 0.75, marginBottom: 12, letterSpacing: '0.03em' }}>
                {'// How do you run object detection at full framerate on embedded hardware?'}
              </div>
              <p style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 1.7, color: colors.text, maxWidth: 680, marginBottom: 24, margin: '0 0 24px 0' }}>
                Architected and shipped the full video AI pipeline for an embedded product — from GStreamer
                pipeline design through custom model quantization down to on-device inference on the Qualcomm Neural
                Processing SDK. Bridged the gap between ML models and the constraints of a real SoC: memory
                budget, computer power and latency targets. Includes integration into toolchain (Yocto/CMake), evaluation harness, and
                a concept for continuous model retraining and data management.
              </p>

              {/* stack chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {[
                  ['C / C++', true], ['GStreamer', true], ['Qualcomm NPU SDK', true], ['tflite / quantization', true],
                  ['OpenCV', false], ['Yocto', false], ['CMake', false], ['CVAT', false], ['Python', false],
                ].map(function(item, i) {
                  var label = item[0]; var highlight = item[1]
                  return (
                    <span key={i} style={{
                      fontFamily: fonts.mono, fontSize: 10.5, padding: '3px 8px',
                      background: highlight ? colors.accentDim : 'rgba(255,255,255,0.04)',
                      border: '1px solid ' + (highlight ? colors.accent + '33' : 'rgba(255,255,255,0.07)'),
                      color: highlight ? colors.accent : colors.text,
                      letterSpacing: '0.04em',
                    }}>{label}</span>
                  )
                })}
              </div>

              {/* outcome */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderLeft: '2px solid ' + colors.accent, background: colors.accentDim, fontSize: 13, color: colors.text }}>
                <span style={{ color: colors.accent, flexShrink: 0, marginTop: 1 }}>▸</span>
                <span>Prototype showcased internally - real-time inference and image manipulation demonstrated live on hardware with full video pipeline running on target SoC.</span>
              </div>
            </div>

            {/* Secondary cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 16 }}>

              {/* Doorbell Detector */}
              <div
                onMouseEnter={function() { setCard1Hovered(true) }}
                onMouseLeave={function() { setCard1Hovered(false) }}
                style={{
                  background: card1Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (card1Hovered ? 'rgba(255,255,255,0.14)' : colors.border),
                  borderTop: '1px solid ' + (card1Hovered ? colors.warm + '88' : colors.border),
                  borderRadius: 10,
                  padding: '24px 20px 20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted }}>02 / 04</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[{ label: 'ML', color: colors.warm }, { label: 'Deployment', color: colors.green }, { label: 'Open Source', color: '#a8e6cf' }].map(function(b) {
                    return <span key={b.label} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid ' + b.color + '44', color: b.color }}>{b.label}</span>
                  })}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.3 }}>Doorbell Detector</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, marginBottom: 10, letterSpacing: '0.03em' }}>{'// end-to-end ML for a real annoyance'}</div>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, lineHeight: 1.65, color: colors.text, marginBottom: 14 }}>
                  Sound-based ML system to detect my doorbell - covering the full lifecycle:
                  data collection &amp; management, model training, and self-hosted deployment.
                  A progressing project, not a notebook demo.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                  {['Python', 'Audio ML', 'Data Mgmt', 'Deployment'].map(function(t, i) {
                    return <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9.5, padding: '2px 6px', border: '1px solid ' + colors.border, color: colors.textMuted }}>{t}</span>
                  })}
                </div>
                <a href="https://github.com/amjadsaadeh/doorbell-detector" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.accent, textDecoration: 'none', opacity: 0.65, letterSpacing: '0.08em' }}>
                  github.com →
                </a>
              </div>

              {/* ADAS MLOps Pipeline */}
              <div
                onMouseEnter={function() { setCard2Hovered(true) }}
                onMouseLeave={function() { setCard2Hovered(false) }}
                style={{
                  background: card2Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (card2Hovered ? 'rgba(255,255,255,0.14)' : colors.border),
                  borderTop: '1px solid ' + (card2Hovered ? colors.warm + '88' : colors.border),
                  borderRadius: 10,
                  padding: '24px 20px 20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted }}>03 / 04</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[{ label: 'MLOps', color: colors.warm }, { label: 'ADAS', color: colors.accent }].map(function(b) {
                    return <span key={b.label} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid ' + b.color + '44', color: b.color }}>{b.label}</span>
                  })}
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.1em', padding: '2px 7px', border: '1px solid rgba(255,71,87,0.25)', color: '#ff4757', opacity: 0.8 }}>NDA</span>
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.3 }}>ADAS ML Pipeline @ CARIAD</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, marginBottom: 10, letterSpacing: '0.03em' }}>{'// production ML for autonomous driving data'}</div>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, lineHeight: 1.65, color: colors.text, marginBottom: 14 }}>
                  End-to-end automated training and evaluation pipeline for a driver-assistance function.
                  Includes a custom time-series data management framework for car trip data,
                  integrated with Azure ML and internal MLOps tooling.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['Azure ML', 'Python', 'PostgreSQL', 'Terraform', 'MLFlow'].map(function(t, i) {
                    return <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9.5, padding: '2px 6px', border: '1px solid ' + colors.border, color: colors.textMuted }}>{t}</span>
                  })}
                </div>
              </div>

              {/* pyMUSIC */}
              <div
                onMouseEnter={function() { setCard3Hovered(true) }}
                onMouseLeave={function() { setCard3Hovered(false) }}
                style={{
                  background: card3Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (card3Hovered ? 'rgba(255,255,255,0.14)' : colors.border),
                  borderTop: '1px solid ' + (card3Hovered ? '#ff9f43' + '88' : colors.border),
                  borderRadius: 10,
                  padding: '24px 20px 20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted }}>04 / 04</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[{ label: 'DSP', color: '#ff9f43' }, { label: 'Open Source', color: '#a8e6cf' }].map(function(b) {
                    return <span key={b.label} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid ' + b.color + '44', color: b.color }}>{b.label}</span>
                  })}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.3 }}>pyMUSIC</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, marginBottom: 10, letterSpacing: '0.03em' }}>{'// signal subspace methods made accessible'}</div>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, lineHeight: 1.65, color: colors.text, marginBottom: 14 }}>
                  Clean Python implementation of the MUSIC algorithm (MUltiple SIgnal Classification)
                  for direction-of-arrival estimation. Shows the algorithmic depth beneath the CV/ML work —
                  rooted in classical signal processing theory.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                  {['Python', 'NumPy', 'Array Signal Processing'].map(function(t, i) {
                    return <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9.5, padding: '2px 6px', border: '1px solid ' + colors.border, color: colors.textMuted }}>{t}</span>
                  })}
                </div>
                <a href="https://github.com/amjadsaadeh/pyMUSIC" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.accent, textDecoration: 'none', opacity: 0.65, letterSpacing: '0.08em' }}>
                  github.com →
                </a>
              </div>
            </div>

            {/* All projects link */}
            <div style={{ textAlign: 'right', marginBottom: 12 }}>
              <a
                href="/projects"
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: colors.accent,
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  opacity: 0.8,
                }}
              >
                more projects &rarr;
              </a>
            </div>

            {/* More bar */}
            <div style={{ border: '1px solid ' + colors.border, borderRadius: 10, background: colors.surface, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, fontFamily: fonts.mono, fontSize: 11, color: colors.textMuted, flexWrap: 'wrap' }}>
              <span style={{ color: colors.accent, opacity: 0.5 }}>▸</span>
              More experiments and open-source contributions on{' '}
              <a href="https://github.com/amjadsaadeh" target="_blank" rel="noreferrer" style={{ color: colors.accent, textDecoration: 'none', opacity: 0.7 }}>
                github.com/amjadsaadeh
              </a>
            </div>
          </section>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={225}>
          <section id="skills" style={{ marginBottom: 64 }}>
            <SectionLabel>skills</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>

              {/* Computer Vision */}
              <div
                onMouseEnter={function() { setDomain1Hovered(true) }}
                onMouseLeave={function() { setDomain1Hovered(false) }}
                style={{
                  background: domain1Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (domain1Hovered ? colors.accent + '44' : colors.border),
                  borderRadius: 10,
                  padding: '28px 24px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: colors.accent, transform: domain1Hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: colors.accent, opacity: domain1Hovered ? 0.08 : 0, filter: 'blur(60px)', transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0, opacity: 0.9 }}>
                    <circle cx="18" cy="18" r="7" stroke="#22d3ee" strokeWidth="1.5"/>
                    <circle cx="18" cy="18" r="1.5" fill="#22d3ee"/>
                    <path d="M18 4v4M18 28v4M4 18h4M28 18h4" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                    <path d="M9 9l2.5 2.5M24.5 24.5l2.5 2.5M9 27l2.5-2.5M24.5 11.5l2.5-2.5" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
                  </svg>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Computer Vision</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.accent, letterSpacing: '0.05em', marginTop: 3, opacity: 0.7 }}>image · video · spatial</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {[
                    ['OpenCV', true], ['GStreamer', true], ['Object Detection', true], ['Segmentation', true],
                    ['Image Registration', false], ['Camera Calibration', false], ['Phase Contrast Imaging', false],
                    ['Fluorescence Microscopy', false], ['Visual Odometry', false], ['3D Visualization', false],
                  ].map(function(item, i) {
                    var label = item[0]; var core = item[1]
                    return (
                      <span key={i} style={{
                        fontFamily: fonts.mono, fontSize: 10, padding: '4px 9px',
                        border: '1px solid ' + (core ? colors.accent + '55' : 'rgba(255,255,255,0.08)'),
                        color: core ? colors.accent : colors.text,
                        background: core ? colors.accentDim : 'rgba(255,255,255,0.02)',
                        letterSpacing: '0.03em',
                      }}>{label}</span>
                    )
                  })}
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 14, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted, letterSpacing: '0.1em', opacity: 0.4 }}>CV</div>
              </div>

              {/* ML & MLOps */}
              <div
                onMouseEnter={function() { setDomain2Hovered(true) }}
                onMouseLeave={function() { setDomain2Hovered(false) }}
                style={{
                  background: domain2Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (domain2Hovered ? '#9b5de544' : colors.border),
                  borderRadius: 10,
                  padding: '28px 24px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#9b5de5', transform: domain2Hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: '#9b5de5', opacity: domain2Hovered ? 0.08 : 0, filter: 'blur(60px)', transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0, opacity: 0.9 }}>
                    <circle cx="6" cy="18" r="2" fill="#9b5de5" opacity="0.6"/>
                    <circle cx="18" cy="6" r="2" fill="#9b5de5" opacity="0.6"/>
                    <circle cx="30" cy="18" r="2" fill="#9b5de5" opacity="0.6"/>
                    <circle cx="18" cy="30" r="2" fill="#9b5de5" opacity="0.6"/>
                    <circle cx="18" cy="18" r="3" fill="#9b5de5"/>
                    <line x1="8" y1="18" x2="15" y2="18" stroke="#9b5de5" strokeWidth="1.5" opacity="0.5"/>
                    <line x1="21" y1="18" x2="28" y2="18" stroke="#9b5de5" strokeWidth="1.5" opacity="0.5"/>
                    <line x1="18" y1="8" x2="18" y2="15" stroke="#9b5de5" strokeWidth="1.5" opacity="0.5"/>
                    <line x1="18" y1="21" x2="18" y2="28" stroke="#9b5de5" strokeWidth="1.5" opacity="0.5"/>
                    <circle cx="10" cy="10" r="1.5" fill="#9b5de5" opacity="0.4"/>
                    <circle cx="26" cy="10" r="1.5" fill="#9b5de5" opacity="0.4"/>
                    <circle cx="10" cy="26" r="1.5" fill="#9b5de5" opacity="0.4"/>
                    <circle cx="26" cy="26" r="1.5" fill="#9b5de5" opacity="0.4"/>
                  </svg>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>ML & MLOps</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#9b5de5', letterSpacing: '0.05em', marginTop: 3, opacity: 0.7 }}>train · version · deploy</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {[
                    ['TensorFlow / tflite', true], ['Model Quantization', true], ['MLFlow', true], ['DVC', true],
                    ['Azure ML', false], ['Scikit-learn', false], ['Keras', false], ['Continual Learning', false],
                    ['Data Versioning', false], ['CVAT / Labelstudio', false],
                  ].map(function(item, i) {
                    var label = item[0]; var core = item[1]
                    return (
                      <span key={i} style={{
                        fontFamily: fonts.mono, fontSize: 10, padding: '4px 9px',
                        border: '1px solid ' + (core ? '#9b5de555' : 'rgba(255,255,255,0.08)'),
                        color: core ? '#9b5de5' : colors.text,
                        background: core ? 'rgba(155,93,229,0.08)' : 'rgba(255,255,255,0.02)',
                        letterSpacing: '0.03em',
                      }}>{label}</span>
                    )
                  })}
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 14, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted, letterSpacing: '0.1em', opacity: 0.4 }}>ML</div>
              </div>

              {/* Embedded & Edge */}
              <div
                onMouseEnter={function() { setDomain3Hovered(true) }}
                onMouseLeave={function() { setDomain3Hovered(false) }}
                style={{
                  background: domain3Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (domain3Hovered ? '#f4b94244' : colors.border),
                  borderRadius: 10,
                  padding: '28px 24px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#f4b942', transform: domain3Hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: '#f4b942', opacity: domain3Hovered ? 0.08 : 0, filter: 'blur(60px)', transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0, opacity: 0.9 }}>
                    <rect x="10" y="10" width="16" height="16" stroke="#f4b942" strokeWidth="1.5"/>
                    <rect x="13" y="13" width="10" height="10" fill="#f4b942" opacity="0.15"/>
                    <line x1="13" y1="7" x2="13" y2="10" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="18" y1="7" x2="18" y2="10" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="23" y1="7" x2="23" y2="10" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="13" y1="26" x2="13" y2="29" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="18" y1="26" x2="18" y2="29" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="23" y1="26" x2="23" y2="29" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="7" y1="13" x2="10" y2="13" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="7" y1="18" x2="10" y2="18" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="7" y1="23" x2="10" y2="23" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="26" y1="13" x2="29" y2="13" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="26" y1="18" x2="29" y2="18" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="26" y1="23" x2="29" y2="23" stroke="#f4b942" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Embedded & Edge</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: '#f4b942', letterSpacing: '0.05em', marginTop: 3, opacity: 0.7 }}>silicon · firmware · real-time</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {[
                    ['C / C++', true], ['Yocto / Bitbake', true], ['Qualcomm NPU', true], ['CMake / Conan', true],
                    ['Texas Instruments', false], ['On-device Inference', false], ['Torch / tflite runtime', false],
                    ['Linux Kernel', false], ['Real-time Pipelines', false],
                  ].map(function(item, i) {
                    var label = item[0]; var core = item[1]
                    return (
                      <span key={i} style={{
                        fontFamily: fonts.mono, fontSize: 10, padding: '4px 9px',
                        border: '1px solid ' + (core ? '#f4b94255' : 'rgba(255,255,255,0.08)'),
                        color: core ? '#f4b942' : colors.text,
                        background: core ? 'rgba(244,185,66,0.08)' : 'rgba(255,255,255,0.02)',
                        letterSpacing: '0.03em',
                      }}>{label}</span>
                    )
                  })}
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 14, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted, letterSpacing: '0.1em', opacity: 0.4 }}>EMB</div>
              </div>

              {/* Infrastructure */}
              <div
                onMouseEnter={function() { setDomain4Hovered(true) }}
                onMouseLeave={function() { setDomain4Hovered(false) }}
                style={{
                  background: domain4Hovered ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (domain4Hovered ? colors.green + '44' : colors.border),
                  borderRadius: 10,
                  padding: '28px 24px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: colors.green, transform: domain4Hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s ease' }} />
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: colors.green, opacity: domain4Hovered ? 0.08 : 0, filter: 'blur(60px)', transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0, opacity: 0.9 }}>
                    <rect x="4" y="6" width="28" height="7" rx="1" stroke="#4ade80" strokeWidth="1.5" opacity="0.5"/>
                    <rect x="4" y="16" width="28" height="7" rx="1" stroke="#4ade80" strokeWidth="1.5"/>
                    <rect x="4" y="26" width="28" height="4" rx="1" stroke="#4ade80" strokeWidth="1" opacity="0.4"/>
                    <circle cx="28" cy="9.5" r="1.5" fill="#4ade80" opacity="0.6"/>
                    <circle cx="23" cy="9.5" r="1.5" fill="#4ade80" opacity="0.4"/>
                    <circle cx="28" cy="19.5" r="1.5" fill="#4ade80"/>
                    <circle cx="23" cy="19.5" r="1.5" fill="#4ade80" opacity="0.6"/>
                  </svg>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Infrastructure</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.green, letterSpacing: '0.05em', marginTop: 3, opacity: 0.7 }}>cloud · k8s · pipelines</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {[
                    ['Python', true], ['Docker', true], ['k3s / Kubernetes', true], ['Azure / Terraform', true],
                    ['PostgreSQL', false], ['Ansible', false], ['GitHub Actions', false], ['REST APIs', false],
                    ['Linux Sysadmin', false],
                  ].map(function(item, i) {
                    var label = item[0]; var core = item[1]
                    return (
                      <span key={i} style={{
                        fontFamily: fonts.mono, fontSize: 10, padding: '4px 9px',
                        border: '1px solid ' + (core ? colors.green + '55' : 'rgba(255,255,255,0.08)'),
                        color: core ? colors.green : colors.text,
                        background: core ? colors.greenDim : 'rgba(255,255,255,0.02)',
                        letterSpacing: '0.03em',
                      }}>{label}</span>
                    )
                  })}
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 14, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted, letterSpacing: '0.1em', opacity: 0.4 }}>OPS</div>
              </div>

            </div>
          </section>
        </FadeIn>

        {/* Interests */}
        <FadeIn delay={250}>
          <section style={{ marginBottom: 64 }}>
            <SectionLabel color={colors.warm}>interests</SectionLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-start' }}>
              <InterestCard icon="&#129504;" label="AI & Agents" color={colors.warm} />
              <InterestCard icon="&#128247;" label="Image Processing" color={colors.accent} />
              <InterestCard icon="&#127919;" label="Computer Vision" color={colors.warm} />
              <InterestCard icon="&#127968;" label="Smart Home" color={colors.accent} />
              <InterestCard icon="&#129302;" label="Embedded AI" color={colors.green} />
            </div>
          </section>
        </FadeIn>

        {/* Experience */}
        <FadeIn delay={300}>
          <section style={{ marginBottom: 64 }}>
            <SectionLabel color={colors.green}>experience</SectionLabel>
            <div>
              <ExpItem
                period="2023 &rarr;"
                company="Sennheiser SE & Co. KG"
                role="Senior Software Engineer - Video Processing / Embedded"
                tags={['C++', 'OpenCV', 'Embedded', 'Video', 'Qualcomm Neural Processing SDK']}
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
              href="/about#career-timeline"
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
                  href="https://www.linkedin.com/in/amjad-saadeh"
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
