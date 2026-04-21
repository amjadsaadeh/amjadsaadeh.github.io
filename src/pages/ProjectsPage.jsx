import { useState } from 'react'
import { fonts, colors } from '../theme'
import Navbar from '../components/Navbar'
import SectionLabel from '../components/SectionLabel'
import FadeIn from '../components/FadeIn'

function MoreLink() {
  var [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      onClick={function(e) { e.preventDefault() }}
      onMouseEnter={function() { setHovered(true) }}
      onMouseLeave={function() { setHovered(false) }}
      style={{
        fontFamily: fonts.mono,
        fontSize: 11,
        color: hovered ? colors.accent : colors.textMuted,
        textDecoration: 'none',
        letterSpacing: '0.08em',
        transition: 'color 0.2s',
        display: 'inline-block',
        marginTop: 12,
      }}
    >
      more &rarr;
    </a>
  )
}

function ProjectsPage() {
  var [feat, setFeat] = useState(false)
  var [card1, setCard1] = useState(false)
  var [card2, setCard2] = useState(false)
  var [card3, setCard3] = useState(false)

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', color: colors.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Navbar activePage="projects" />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <FadeIn>
          <section style={{ paddingTop: 64, paddingBottom: 80 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>
              &gt; cat projects
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
              Projects
            </h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
              }}
            >
              {/* 01 — Real-Time Video AI */}
              <div
                onMouseEnter={function() { setFeat(true) }}
                onMouseLeave={function() { setFeat(false) }}
                style={{
                  position: 'relative',
                  background: colors.surface,
                  border: '1px solid ' + (feat ? colors.accent + '66' : colors.accent + '33'),
                  borderRadius: 10,
                  padding: '24px 20px 20px',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, ' + colors.accent + ', transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted }}>01 / 04</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[
                    { label: 'Featured', color: colors.accent },
                    { label: 'Computer Vision', color: colors.accent },
                    { label: 'Embedded AI', color: '#f4b942' },
                  ].map(function(b) {
                    return (
                      <span key={b.label} style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '2px 8px', border: '1px solid ' + b.color + '44', color: b.color }}>
                        {b.label}
                      </span>
                    )
                  })}
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.1em', padding: '2px 7px', border: '1px solid rgba(255,71,87,0.25)', color: '#ff4757', opacity: 0.8 }}>NDA</span>
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.3 }}>Real-Time Video AI on Qualcomm SoC</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.textMuted, marginBottom: 10, letterSpacing: '0.03em' }}>{'// object detection at full framerate on embedded hardware'}</div>
                <p style={{ fontFamily: fonts.sans, fontSize: 13, lineHeight: 1.65, color: colors.text, marginBottom: 14 }}>
                  Architected and shipped the full video AI pipeline for an embedded product — from GStreamer
                  pipeline design through custom model quantization down to on-device inference on the Qualcomm Neural
                  Processing SDK.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                  {['C / C++', 'GStreamer', 'Qualcomm NPU SDK', 'tflite', 'OpenCV', 'Yocto'].map(function(t, i) {
                    return <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9.5, padding: '2px 6px', border: '1px solid ' + colors.border, color: colors.textMuted }}>{t}</span>
                  })}
                </div>
                <MoreLink />
              </div>

              {/* 02 — Doorbell Detector */}
              <div
                onMouseEnter={function() { setCard1(true) }}
                onMouseLeave={function() { setCard1(false) }}
                style={{
                  background: card1 ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (card1 ? 'rgba(255,255,255,0.14)' : colors.border),
                  borderTop: '1px solid ' + (card1 ? colors.warm + '88' : colors.border),
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <a href="https://github.com/amjadsaadeh/doorbell-detector" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.accent, textDecoration: 'none', opacity: 0.65, letterSpacing: '0.08em' }}>
                    github.com →
                  </a>
                  <MoreLink />
                </div>
              </div>

              {/* 03 — ADAS ML Pipeline */}
              <div
                onMouseEnter={function() { setCard2(true) }}
                onMouseLeave={function() { setCard2(false) }}
                style={{
                  background: card2 ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (card2 ? 'rgba(255,255,255,0.14)' : colors.border),
                  borderTop: '1px solid ' + (card2 ? colors.warm + '88' : colors.border),
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
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}>
                  {['Azure ML', 'Python', 'PostgreSQL', 'Terraform', 'MLFlow'].map(function(t, i) {
                    return <span key={i} style={{ fontFamily: fonts.mono, fontSize: 9.5, padding: '2px 6px', border: '1px solid ' + colors.border, color: colors.textMuted }}>{t}</span>
                  })}
                </div>
                <MoreLink />
              </div>

              {/* 04 — pyMUSIC */}
              <div
                onMouseEnter={function() { setCard3(true) }}
                onMouseLeave={function() { setCard3(false) }}
                style={{
                  background: card3 ? colors.surfaceLight : colors.surface,
                  border: '1px solid ' + (card3 ? 'rgba(255,255,255,0.14)' : colors.border),
                  borderTop: '1px solid ' + (card3 ? '#ff9f43' + '88' : colors.border),
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <a href="https://github.com/amjadsaadeh/pyMUSIC" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.accent, textDecoration: 'none', opacity: 0.65, letterSpacing: '0.08em' }}>
                    github.com →
                  </a>
                  <MoreLink />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  )
}

export default ProjectsPage
