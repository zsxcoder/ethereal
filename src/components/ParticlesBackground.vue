<template>
    <canvas
      ref="canvasRef"
      class="particles-canvas"
      :style="{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        transition: 'opacity 1000ms',
        zIndex: 99999
      }"
    />
</template>

<script>
export default {
  name: 'ParticlesBackground',
  data() {
    return {
      canvasRef: null,
      animationFrameId: null,
      particles: [],
      isDark: false,
      colors: [],
      particleCount: 35,
      observer: null
    }
  },
  mounted() {
    this.initCanvas()
    this.setupDarkModeObserver()
    window.addEventListener('resize', this.resizeCanvas)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas)
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvasRef
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      this.canvas = canvas
      this.ctx = ctx

      this.isDark = document.documentElement.classList.contains('dark')
      this.colors = this.getColors(this.isDark)
      this.resizeCanvas()
      this.initParticles()
      this.animate()
    },

    getColors(dark) {
      // Dark Mode: Gold, White, Deep Blue
      if (dark) return [
        'rgba(211, 188, 142, 0.6)', // Gold (Primogem-like)
        'rgba(255, 255, 255, 0.5)', // White
        'rgba(66, 133, 244, 0.4)',  // Blue
        'rgba(252, 211, 77, 0.4)',  // Amber
      ]
      // Light Mode: Darker Gold, Blue, Slate (Visible on white)
      return [
        'rgba(180, 83, 9, 0.3)',    // Dark Amber/Gold
        'rgba(59, 130, 246, 0.3)',  // Blue
        'rgba(148, 163, 184, 0.4)'  // Slate
      ]
    },

    resizeCanvas() {
      if (!this.canvas) return
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    },

    initParticles() {
      this.particles = []
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle())
      }
    },

    createParticle() {
      const particle = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 5 + 3,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        speedY: Math.random() * -0.5 - 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: 0,
        fadeSpeed: Math.random() * 0.01 + 0.005,
        type: Math.random() > 0.7 ? 'star' : 'circle',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        parent: this
      };
      
      particle.reset = function(initial = false) {
        this.x = Math.random() * this.parent.canvas.width
        this.y = initial ? Math.random() * this.parent.canvas.height : this.parent.canvas.height + 20
        this.opacity = 0
      };
      
      particle.draw = function() {
        if (!this.parent.ctx) return
        const ctx = this.parent.ctx
        
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color

        if (this.type === 'star') {
          ctx.rotate(this.rotation)
          ctx.beginPath()
          const r = this.size * 2
          ctx.moveTo(0, -r)
          ctx.quadraticCurveTo(0.5, -0.5, r, 0)
          ctx.quadraticCurveTo(0.5, 0.5, 0, r)
          ctx.quadraticCurveTo(-0.5, 0.5, -r, 0)
          ctx.quadraticCurveTo(-0.5, -0.5, 0, -r)
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      };
      
      particle.update = function() {
        this.y += this.speedY
        this.x += this.speedX
        this.rotation += this.rotationSpeed

        if (this.y < this.parent.canvas.height * 0.2) {
          this.opacity -= this.fadeSpeed
        } else if (this.opacity < 1) {
          this.opacity += this.fadeSpeed
        }

        if (this.y < -20 || this.opacity <= 0) {
          this.reset()
        }

        this.draw()
      };
      
      return particle;
    },

    animate() {
      if (!this.ctx || !this.canvas) return
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.particles.forEach(p => p.update())
      this.animationFrameId = requestAnimationFrame(this.animate)
    },

    setupDarkModeObserver() {
      this.observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const newIsDark = document.documentElement.classList.contains('dark')
            if (newIsDark !== this.isDark) {
              this.isDark = newIsDark
              this.colors = this.getColors(this.isDark)
              // Update existing particles with new colors
              this.particles.forEach(p => {
                p.color = this.colors[Math.floor(Math.random() * this.colors.length)]
              })
            }
          }
        })
      })

      this.observer.observe(document.documentElement, { attributes: true })
    },


  }
}
</script>

<style scoped>
/* 组件样式 */
</style>
