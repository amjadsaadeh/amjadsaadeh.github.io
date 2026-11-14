import { useEffect, useRef } from 'react'
import { fonts, colors } from '../theme'

const DISK_COLORS = [colors.accent, colors.warm, colors.violet, colors.orange]
const DISK_COUNT = 260
const DISK_INNER = 1.2 // in hole radii
const DISK_OUTER = 2.9
const MAX_DEBRIS = 400
const REPEL_RADIUS = 70

function rgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16)
  return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')'
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function makeDiskParticle(atOuterEdge) {
  return {
    angle: Math.random() * Math.PI * 2,
    r: atOuterEdge ? DISK_OUTER : DISK_INNER + Math.random() * (DISK_OUTER - DISK_INNER),
    size: 1 + Math.random() * 1.8,
    color: pick(DISK_COLORS),
    // displacement caused by the pointer, springs back to 0
    ox: 0,
    oy: 0,
    vx: 0,
    vy: 0,
  }
}

/**
 * Stylized black hole standing in for the "0" of 404.
 * - An accretion disk orbits the hole and tilts towards the pointer.
 * - The pointer pushes disk particles aside.
 * - Moving the pointer (or dragging a finger) sheds debris that spirals in;
 *   a click / tap throws a burst.
 */
function BlackHole() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(function() {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let cx = 0
    let cy = 0
    let R = 48
    let tilt = 0.3
    let rotation = -0.2
    let pulse = 0
    let rafId = 0
    let last = 0

    const pointer = { x: 0, y: 0, active: false }
    const disk = []
    for (let i = 0; i < DISK_COUNT; i++) disk.push(makeDiskParticle(false))
    let debris = []

    function resize() {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = w / 2
      cy = h / 2
      R = Math.min(48, w * 0.14)
      if (reducedMotion) draw()
    }

    // Project a disk coordinate (angle, radius in hole radii) to the screen.
    function project(angle, r) {
      const dx = r * R * Math.cos(angle)
      const dy = r * R * Math.sin(angle) * tilt
      const cos = Math.cos(rotation)
      const sin = Math.sin(rotation)
      return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos }
    }

    function angularSpeed(r) {
      return 1.5 * Math.pow(r, -1.5)
    }

    function spawnDebris(x, y, vx, vy) {
      if (debris.length >= MAX_DEBRIS) return
      debris.push({ x: x, y: y, vx: vx, vy: vy, age: 0, size: 1.2 + Math.random() * 1.8, color: pick(DISK_COLORS) })
    }

    function update(dt) {
      // Disk leans towards the pointer
      let tiltTarget = 0.3
      let rotationTarget = -0.2
      if (pointer.active) {
        tiltTarget = 0.3 + Math.max(-0.5, Math.min(0.5, (pointer.y - cy) / h)) * 0.35
        rotationTarget = -0.2 + Math.max(-0.5, Math.min(0.5, (pointer.x - cx) / w)) * 0.5
      }
      const ease = 1 - Math.exp(-4 * dt)
      tilt += (tiltTarget - tilt) * ease
      rotation += (rotationTarget - rotation) * ease
      pulse *= Math.exp(-3 * dt)

      for (const p of disk) {
        p.angle += angularSpeed(p.r) * dt
        p.r -= 0.035 * dt
        if (p.r < DISK_INNER) Object.assign(p, makeDiskParticle(true))

        if (pointer.active) {
          const pos = project(p.angle, p.r)
          const dx = pos.x + p.ox - pointer.x
          const dy = pos.y + p.oy - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < REPEL_RADIUS && d > 0.01) {
            const push = (1 - d / REPEL_RADIUS) * 900
            p.vx += (dx / d) * push * dt
            p.vy += (dy / d) * push * dt
          }
        }
        // spring back into orbit
        p.vx += (-30 * p.ox - 6 * p.vx) * dt
        p.vy += (-30 * p.oy - 6 * p.vy) * dt
        p.ox += p.vx * dt
        p.oy += p.vy * dt
      }

      const gm = 2.2e6 * (R / 48)
      const limit = Math.max(w, h)
      debris = debris.filter(function(p) {
        const dx = cx - p.x
        const dy = cy - p.y
        const d = Math.hypot(dx, dy)
        if (d < R) {
          pulse = Math.min(1, pulse + 0.12)
          return false
        }
        const acc = gm / Math.max(d * d, R * R)
        const drag = Math.exp(-0.5 * dt)
        p.vx = (p.vx + (dx / d) * acc * dt) * drag
        p.vy = (p.vy + (dy / d) * acc * dt) * drag
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.age += dt
        return p.age < 12 && d < limit
      })
    }

    function drawDisk(front) {
      ctx.lineCap = 'round'
      for (const p of disk) {
        if ((Math.sin(p.angle) > 0) !== front) continue
        const head = project(p.angle, p.r)
        const tail = project(p.angle - angularSpeed(p.r) * 0.14, p.r)
        // fade in at the outer edge, fade out just before the horizon
        const fade = Math.min(1, (DISK_OUTER - p.r) / 0.4, (p.r - DISK_INNER) / 0.15 + 0.2)
        ctx.strokeStyle = rgba(p.color, 0.8 * Math.max(0, fade))
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(tail.x + p.ox, tail.y + p.oy)
        ctx.lineTo(head.x + p.ox, head.y + p.oy)
        ctx.stroke()
      }
    }

    function drawDebris() {
      ctx.lineCap = 'round'
      for (const p of debris) {
        ctx.strokeStyle = rgba(p.color, 0.85 * Math.min(1, p.age * 6 + 0.2))
        ctx.lineWidth = p.size
        ctx.beginPath()
        ctx.moveTo(p.x - p.vx * 0.05, p.y - p.vy * 0.05)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
    }

    function drawHole() {
      const radius = R * (1 + pulse * 0.07)

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 2.3)
      glow.addColorStop(0, rgba(colors.accent, 0.22 + pulse * 0.2))
      glow.addColorStop(0.5, rgba(colors.warm, 0.07 + pulse * 0.08))
      glow.addColorStop(1, rgba(colors.warm, 0))
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 2.3, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = colors.textStrong
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      // photon ring
      const ring = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
      ring.addColorStop(0, colors.accent)
      ring.addColorStop(1, colors.warm)
      ctx.strokeStyle = ring
      ctx.lineWidth = 2 + pulse * 2
      ctx.shadowColor = rgba(colors.accent, 0.6)
      ctx.shadowBlur = 10 + pulse * 14
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0

      ctx.strokeStyle = rgba(colors.warm, 0.3)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.17, 0, Math.PI * 2)
      ctx.stroke()
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      drawDisk(false)
      drawDebris()
      drawHole()
      drawDisk(true)
    }

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      update(dt)
      draw()
      rafId = requestAnimationFrame(frame)
    }

    function localPoint(e) {
      const rect = wrap.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function onPointerMove(e) {
      const pos = localPoint(e)
      if (pointer.active) {
        const mx = pos.x - pointer.x
        const my = pos.y - pointer.y
        const count = Math.min(3, Math.floor(Math.hypot(mx, my) / 6))
        for (let i = 0; i < count; i++) {
          // a nudge sideways relative to the hole so debris orbits before falling in
          const dx = pos.x - cx
          const dy = pos.y - cy
          const d = Math.hypot(dx, dy) || 1
          const swirl = 90 + Math.random() * 50
          spawnDebris(
            pos.x + (Math.random() - 0.5) * 10,
            pos.y + (Math.random() - 0.5) * 10,
            mx * 4 + (-dy / d) * swirl + (Math.random() - 0.5) * 40,
            my * 4 + (dx / d) * swirl + (Math.random() - 0.5) * 40
          )
        }
      }
      pointer.x = pos.x
      pointer.y = pos.y
      pointer.active = true
    }

    function onPointerDown(e) {
      const pos = localPoint(e)
      pointer.x = pos.x
      pointer.y = pos.y
      pointer.active = true
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 60 + Math.random() * 160
        spawnDebris(pos.x, pos.y, Math.cos(angle) * speed, Math.sin(angle) * speed)
      }
    }

    function onPointerEnd(e) {
      // a finger lifting ends the interaction; a mouse button release does not
      if (e.type === 'pointerup' && e.pointerType === 'mouse') return
      pointer.active = false
    }

    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    resize()

    if (reducedMotion) {
      return function() {
        observer.disconnect()
      }
    }

    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointerup', onPointerEnd)
    wrap.addEventListener('pointerleave', onPointerEnd)
    wrap.addEventListener('pointercancel', onPointerEnd)
    rafId = requestAnimationFrame(frame)

    return function() {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointerup', onPointerEnd)
      wrap.removeEventListener('pointerleave', onPointerEnd)
      wrap.removeEventListener('pointercancel', onPointerEnd)
    }
  }, [])

  return (
    <div ref={wrapRef} role="img" aria-label="404" style={styles.wrap}>
      <span aria-hidden="true" style={styles.digit}>4</span>
      <span aria-hidden="true" style={styles.gap} />
      <span aria-hidden="true" style={styles.digit}>4</span>
      <canvas ref={canvasRef} aria-hidden="true" style={styles.canvas} />
    </div>
  )
}

const styles = {
  wrap: {
    position: 'relative',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'crosshair',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    // let the canvas own drags so a finger can stir the disk
    touchAction: 'none',
  },
  digit: {
    fontFamily: fonts.mono,
    fontSize: 'min(120px, 30vw)',
    fontWeight: 600,
    color: colors.accent,
    lineHeight: 1,
  },
  gap: {
    display: 'inline-block',
    width: 'min(140px, 36vw)',
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
}

export default BlackHole
