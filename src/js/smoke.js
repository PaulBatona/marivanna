export function initSmoke(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let w, h
  let particles = []
  let embers = []
  let animId

  function resize() {
    w = canvas.width = canvas.offsetWidth
    h = canvas.height = canvas.offsetHeight
  }

  class SmokeParticle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * w
      this.y = h + Math.random() * 100
      this.size = Math.random() * 120 + 60
      this.speedY = -(Math.random() * 0.4 + 0.15)
      this.speedX = (Math.random() - 0.5) * 0.3
      this.opacity = 0
      this.maxOpacity = Math.random() * 0.15 + 0.08
      this.fadeIn = true
      this.life = 0
      this.maxLife = Math.random() * 400 + 300
      this.rotation = Math.random() * Math.PI * 2
      this.rotSpeed = (Math.random() - 0.5) * 0.002
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.rotation += this.rotSpeed
      this.life++

      if (this.fadeIn && this.opacity < this.maxOpacity) {
        this.opacity += 0.0005
        if (this.opacity >= this.maxOpacity) this.fadeIn = false
      }

      if (this.life > this.maxLife * 0.7) {
        this.opacity -= 0.0003
      }

      if (this.opacity <= 0 || this.life > this.maxLife) {
        this.reset()
      }
    }

    draw() {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      ctx.globalAlpha = this.opacity

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size)
      gradient.addColorStop(0, 'rgba(230, 230, 230, 1)')
      gradient.addColorStop(0.4, 'rgba(180, 180, 180, 0.5)')
      gradient.addColorStop(1, 'rgba(120, 120, 120, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  class Ember {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = w * 0.3 + Math.random() * w * 0.4
      this.y = h * 0.5 + Math.random() * h * 0.3
      this.size = Math.random() * 2.5 + 0.5
      this.speedY = -(Math.random() * 0.5 + 0.2)
      this.speedX = (Math.random() - 0.5) * 0.4
      this.opacity = 0
      this.maxOpacity = Math.random() * 0.8 + 0.2
      this.life = 0
      this.maxLife = Math.random() * 120 + 60
      this.flicker = Math.random() * 0.05
    }

    update() {
      this.x += this.speedX + Math.sin(this.life * 0.05) * 0.2
      this.y += this.speedY
      this.life++

      const progress = this.life / this.maxLife
      if (progress < 0.2) {
        this.opacity = (progress / 0.2) * this.maxOpacity
      } else if (progress > 0.7) {
        this.opacity = ((1 - progress) / 0.3) * this.maxOpacity
      }

      this.opacity += Math.sin(this.life * this.flicker * 10) * 0.1

      if (this.life > this.maxLife) this.reset()
    }

    draw() {
      ctx.save()
      ctx.globalAlpha = Math.max(0, this.opacity)

      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 3
      )
      gradient.addColorStop(0, '#ff8c00')
      gradient.addColorStop(0.3, '#ff6a00')
      gradient.addColorStop(1, 'rgba(255, 106, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = Math.max(0, this.opacity * 1.5)
      ctx.fillStyle = '#ffaa44'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }
  }

  function init() {
    resize()
    particles = []
    embers = []

    const particleCount = Math.min(Math.floor(w / 10), 100)
    for (let i = 0; i < particleCount; i++) {
      const p = new SmokeParticle()
      p.y = Math.random() * h
      p.life = Math.random() * p.maxLife
      p.opacity = Math.random() * p.maxOpacity
      p.fadeIn = false
      particles.push(p)
    }

    const emberCount = Math.min(Math.floor(w / 60), 20)
    for (let i = 0; i < emberCount; i++) {
      const e = new Ember()
      e.life = Math.random() * e.maxLife
      embers.push(e)
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h)

    for (const p of particles) {
      p.update()
      p.draw()
    }

    for (const e of embers) {
      e.update()
      e.draw()
    }

    animId = requestAnimationFrame(animate)
  }

  init()
  animate()

  window.addEventListener('resize', () => {
    resize()
    particles.length = 0
    embers.length = 0
    init()
  })

  return () => cancelAnimationFrame(animId)
}
