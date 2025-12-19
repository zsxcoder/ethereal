<template>
  <div class="author-content-item creativityMain">
    <div class="author-content-item-tips">
      技能
    </div>
    <div class="author-content-item-list">
      <div class="cardInfo" v-for="item in skills" :key="item.name">
        <div class="creativityIcon" :style="{background: item.color}">
          <img :src="item.icon" :alt="item.name">
        </div>
        <div class="creativityTitle">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skillinfo',
  data() {
    return {
      skills: [
        {
          name: 'Vue',
          color: '#b8f0ae',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/Vue.3uvait8kyx.webp',
        },
        {
          name: 'Java',
          color: '#fff',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/java.5c1fkkttn4.webp',
        },
        {
          name: 'Nuxt',
          color: '#59ff00ff',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/nuxt.5j4nbqnu6h.webp',
        },
        {
          name: 'Markdown',
          color: '#4082c3',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/markdown.1apg1xvcq1.webp',
        },
        {
          name: 'PNPM',
          color: '#eb6840',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/pnpm.9kgmq5mfiu.webp',
        },
        {
          name: 'Astro',
          color: '#5c5c5cff',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/astro.1sfhqi4crl.webp',
        },
        {
          name: 'Node',
          color: '#fff',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/Nodejs.7pqvb9wtd.webp',
        },
        {
          name: 'Git',
          color: '#fff',
          icon: 'https://imgbed.mcyzsx.top/file/custom/MwCNwosm.svg',
        },
        {
          name: 'Css',
          color: '#2c51db',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/css3.7lkfzsnjgu.webp',
        },
        {
          name: 'Js',
          color: '#f7cb4f',
          icon: 'https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/custom/js.6wr6fs3bs6.webp',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.creativityMain {
  .author-content-item-tips {
    opacity: 0.8;
    font-size: 12px;
    margin-bottom: 0.5rem;
    color: var(--minor);
  }
  
  .author-content-item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
    .cardInfo {
      align-items: center;
      color: inherit;
      display: flex;
      line-height: 1.3;
      border-radius: 1rem;
      padding: 0.45rem 1rem;
      text-decoration: none;
      transition: 0.2s;
      border-color: var(--bg-weak);
      background-color: var(--bg-weak);
      
      &:hover {
        transform: translateY(-2px);
        background-color: var(--bg-thin);
      }
      
      .creativityIcon {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        user-select: none;

        img {
          width: 18px;
          height: 18px;
        }
      }
      
      .creativityTitle {
        color: var(--accent);
      }
    }
  }
}
</style>