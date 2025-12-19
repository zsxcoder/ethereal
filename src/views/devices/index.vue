<script>
import devices from '@/devices'
import DeviceCard from '@/components/DeviceCard/index.vue'

export default {
  name: 'Devices',
  components: {
    DeviceCard
  },
  data() {
    return {
      brands: devices.brands || [],
      allDevices: devices.items || [],
      brand: '',
      routerChanged: true
    }
  },
  computed: {
    list() {
      return this.allDevices.filter(d => d.brand === this.brand)
    }
  },
  watch: {
    '$route.query.brand': function(val) {
      if (val && this.brands.includes(val)) {
        this.brand = val
      } else {
        this.brand = this.brands[0]
      }
    }
  },
  mounted() {
    this.initBrand()
    // 监听路由变化
    this.$router.afterEach(() => {
      this.routerChanged = true
      this.initBrand()
    })
  },
  methods: {
    initBrand() {
      const brandFromQuery = this.$route.query.brand
      if (brandFromQuery && this.brands.includes(brandFromQuery)) {
        this.brand = brandFromQuery
      } else {
        this.brand = this.brands[0]
        // 如果没有品牌参数，设置默认品牌到URL
        if (!brandFromQuery) {
          const q = { ...this.$route.query, brand: this.brand }
          this.$router.replace({ path: this.$route.path, query: q })
        }
      }
      this.routerChanged = false
    },
    changeBrand(val) {
      this.brand = val
      const q = { ...this.$route.query, brand: val }
      this.$router.push({ path: this.$route.path, query: q })
    }
  }
}
</script>

<template>
  <div class="devices-wrap">
    <div class="devices-page">
      <div class="container">
        <div class="page-header">
          <h1>我的设备</h1>
          <p class="page-description">记录使用的各种数码设备和配件</p>
        </div>
        
        <div class="tabs">
          <button
            v-for="b in brands"
            :key="b"
            :class="['tab', { active: b === brand }]"
            @click="changeBrand(b)"
          >
            {{ b }}
          </button>
        </div>

        <div class="grid">
          <DeviceCard v-for="item in list" :key="item.name" :item="item"></DeviceCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.devices-wrap {
	min-height: calc(100vh - 180px);
	padding: 2rem 0;
}

.devices-page {
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}
	
	.page-header {
		text-align: center;
		margin-bottom: 2rem;
		
		h1 {
			font-size: 2.5rem;
			font-weight: 700;
			color: var(--c-text-1);
			margin: 0 0 0.5rem 0;
			background: linear-gradient(135deg, var(--c-primary), var(--secondary));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		
		.page-description {
			font-size: 1.125rem;
			color: var(--c-text-2);
			magin: 0;
		}
	}
	
	.tabs {
		display: inline-flex;
		gap: 0.5rem;
		margin: 0.5rem 0 2rem;
		flex-wrap: wrap;
		justify-content: center;

		.tab {
			padding: 0.75rem 1.5rem;
			border-radius: 0.75rem;
			background: var(--bg-weak);
			border: 1px solid var(--c-border);
			box-shadow: 0 2px 10px var(--ld-shadow);
			transition: all 0.2s;
			font-weight: 600;
			color: var(--c-text-1);
			cursor: pointer;

			&:hover {
				transform: translateY(-1px);
				box-shadow: 0 6px 16px var(--ld-shadow);
				border-color: var(--c-primary);
			}

			&.active {
				background: var(--c-primary);
				border-color: transparent;
				color: white;
				box-shadow: 0 8px 20px var(--ld-shadow);
			}

			&:focus-visible {
				outline: 2px solid color-mix(in oklab, var(--c-primary) 60%, white);
				outline-offset: 2px;
			}
		}
	}

	.grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		justify-items: center;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
}
</style>
