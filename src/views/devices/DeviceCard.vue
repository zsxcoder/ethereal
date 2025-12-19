<script>
export default {
  name: 'DeviceCard',
  props: {
    item: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.brand && value.name && value.image
      }
    }
  },
  methods: {
    handleClick() {
      if (this.item.url) {
        window.open(this.item.url, '_blank', 'noopener,noreferrer')
      }
    }
  }
}
</script>

<template>
<div 
  v-if="item.url" 
  class="device-card clickable" 
  @click="handleClick"
>
	<div class="cover-box">
		<img 
      class="cover" 
      :src="item.image" 
      :alt="item.name" 
      loading="lazy"
      :style="{ '--img-scale': String(item.scale ?? 1) }"
    />
	</div>
	<div class="meta">
		<h4 class="name">{{ item.name }}</h4>
		<div class="series" v-if="item.series">{{ item.series }}</div>
		<p class="desc" v-if="item.desc">{{ item.desc }}</p>
	</div>
</div>
<div v-else class="device-card">
	<div class="cover-box">
		<img 
      class="cover" 
      :src="item.image" 
      :alt="item.name" 
      loading="lazy"
      :style="{ '--img-scale': String(item.scale ?? 1) }"
    />
	</div>
	<div class="meta">
		<h4 class="name">{{ item.name }}</h4>
		<div class="series" v-if="item.series">{{ item.series }}</div>
		<p class="desc" v-if="item.desc">{{ item.desc }}</p>
	</div>
</div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
@import '@/assets/style/mixins.scss';

.device-card {
	/* 字体抗锯齿优化 */
	-webkit-font-smoothing: subpixel-antialiased;
	-moz-osx-font-smoothing: auto;
	text-rendering: geometricPrecision;
	
	padding: 1.25rem;
	border-radius: 1rem;
	background: transparent;
	border: 1px solid var(--c-border);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	min-height: 220px;
	width: 100%;
	max-width: none;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-4px) scale(1.02);
		border-color: var(--c-primary);
		box-shadow: 
			0 8px 24px var(--ld-shadow),
			0 2px 6px var(--ld-shadow);
	}

	.cover-box {
		width: 100%;
		height: 140px;
		border-radius: 0.375rem;
		overflow: hidden;
		background: var(--c-bg-2);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.cover {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: 0.125rem;
		background-color: transparent;
		image-rendering: crisp-edges;
		transition: all 0.3s ease;
	}

	&.clickable {
		cursor: pointer;
	}

	.meta {
		width: 100%;
		text-align: center;
		
		.name {
			margin: 0 0 0.5rem 0;
			font-weight: 600;
			font-size: 1rem;
			line-height: 1.3;
			color: var(--c-text-1);
			letter-spacing: -0.01em;
		}

		.series {
			font-size: 0.875rem;
			color: var(--c-text-2);
			font-weight: 500;
			opacity: 0.8;
			margin-bottom: 0.5rem;
		}

		.desc {
			font-size: 0.8125rem;
			color: var(--c-text-3);
			line-height: 1.4;
			opacity: 0.7;
		}
	}
}

@media (max-width: 640px) {
	.device-card {
		padding: 1rem;
		min-height: 200px;

		.cover-box {
			height: 120px;
		}

		.meta {
			.name {
				font-size: 0.9375rem;
			}
			
			.series {
				font-size: 0.8125rem;
			}
			
			.desc {
				font-size: 0.75rem;
			}
		}
	}
}
</style>
