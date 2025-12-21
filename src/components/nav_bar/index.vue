<script>
export default {
  name: 'NavBar',
      data() {
    return {
      menus: [
        { id: 0, title: this.$t('home'), path: '/', icon: 'home' },
        { id: 1, title: this.$t('archives'), path: '/archives', icon: 'archives' },
        { id: 2, title: this.$t('inspiration'), path: '/inspiration', icon: 'inspire' },
        { id: 3, title: this.$t('friends'), path: '/friend', icon: 'friends' },
        // { id: 4, title: this.$t('about'), path: '/about', icon: 'about' },
        { id: 4, title: '关于', path: '/me', icon: 'gerenziliao' },
        { id: 5, title: '时间盒', path: '/chronobox', icon: 'anime' },
        { id: 6, title: '相册', path: 'https://plog.zsxcoder.top', icon: 'photo', isExternal: true },
        { id: 7, title: '设备', path: '/devices', icon: 'devices' },
        // 示例：外部链接，isExternal: true
            { id: 8, title: 'TG-Memos', path: 'https://tg.mcyzsx.top', icon: 'telegram', isExternal: true },
            { id: 9, title: 'Mastodon', path: 'https://m.mcyzsx.top', icon: 'mastodon', isExternal: true },
        { id: 10, title: 'Notion-Nav', path: 'https://nav.zsxcoder.top', icon: 'nav', isExternal: true },
      ],
      routerChanged: true,
      theme: 'light',
      isMenuExpanded: false,
      maxVisibleItems: 5,
    }
  },
  computed: {
    darkMode() {
      return this.theme === 'dark'
    },
    visibleMenus() {
      return this.menus.slice(0, this.maxVisibleItems)
    },
    hiddenMenus() {
      return this.menus.slice(this.maxVisibleItems)
    },
    hasMoreItems() {
      return this.menus.length > this.maxVisibleItems
    }
  },
  watch: {
    '$store.state.style.theme': function () {
      this.getCurrentTheme()
    },
  },
  mounted() {
    this.initCurrentMenu()
    this.getCurrentTheme()
    this.setCurrentMenu()
    this.$router.afterEach(() => {
      this.routerChanged = true
      this.setCurrentMenu()
    })
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', this.handleClickOutside)
  },
  methods: {
    getCurrentTheme() {
      const theme = this.$store.state.style.theme
      this.theme = theme
    },
    changeTheme() {
      this.getCurrentTheme()
      this.$store.commit('style/setTheme', this.theme === 'light' ? 'dark' : 'light')
    },
    initCurrentMenu() {
      this.routerChanged = true
      this.setCurrentMenu()
    },
    setCurrentMenu() {
      const path = this.routerChanged ? this.$route.path : this.$store.state.style.currentMenu.path
      const menu = this.menus.find(item => item.path === path)
      if (menu) {
        const leftDu = `${menu.id * 100 / this.menus.length}%`
        const menuWrap = this.$refs['menu-wrap']
        menuWrap.style.setProperty('--left-du', leftDu)
        this.$store.commit('style/setCurrentMenu', menu)
      }
      this.routerChanged = false
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    toggleMenu() {
      this.isMenuExpanded = !this.isMenuExpanded
    },
    closeMenu() {
      this.isMenuExpanded = false
    },
    handleClickOutside(event) {
      // 如果点击的不是下拉菜单或其内部元素，则关闭菜单
      if (this.isMenuExpanded && !event.target.closest('.more-menu-item')) {
        this.closeMenu()
      }
    },
  },
  beforeDestroy() {
    // 移除事件监听
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>

<template>
  <div class="nav-bar" @dblclick="backToTop">
    <div class="site-title">
      <h1>
        <RouterLink class="title" to="/">
          {{ $config.title }}
        </RouterLink>
        <span class="subtitle">{{ $config.subtitle }}</span>
      </h1>
    </div>
    <nav class="site-nav">
      <ul ref="menu-wrap" :class="{ 'has-more': hasMoreItems }">
        <li v-for="menu in visibleMenus" :key="menu.id">
          <template v-if="menu.isExternal">
            <a :href="menu.path" target="_blank" rel="noopener noreferrer">
              <SvgIcon :name="menu.icon" color="currentColor" /> {{ menu.title }}
            </a>
          </template>
          <template v-else>
            <RouterLink :to="menu.path">
              <SvgIcon :name="menu.icon" color="currentColor" /> {{ menu.title }}
            </RouterLink>
          </template>
        </li>
        <li v-if="hasMoreItems" class="more-menu-item">
          <a href="#" @click.prevent="toggleMenu" :class="{ 'is-active': isMenuExpanded }">
            <SvgIcon name="gengduo" color="currentColor" />
            <span>更多</span>
          </a>
          <transition name="dropdown">
            <div class="dropdown-menu" v-show="isMenuExpanded">
              <div 
                v-for="menu in hiddenMenus" 
                :key="menu.id"
                class="dropdown-item"
              >
                <template v-if="menu.isExternal">
                  <a :href="menu.path" target="_blank" rel="noopener noreferrer" @click="closeMenu">
                    <SvgIcon :name="menu.icon" color="currentColor" /> {{ menu.title }}
                  </a>
                </template>
                <template v-else>
                  <RouterLink :to="menu.path" @click.native="closeMenu">
                    <SvgIcon :name="menu.icon" color="currentColor" /> {{ menu.title }}
                  </RouterLink>
                </template>
              </div>
            </div>
          </transition>
        </li>
      </ul>
    </nav>
    <div class="site-control">
      <div class="change-theme" @click="changeTheme">
        <span class="theme__toggle-wrap">
          <span class="theme__icon">
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
            <span class="theme__icon-part" />
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
