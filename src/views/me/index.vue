<script>
import Skillinfo from './components/skillinfo.vue'
import Social from './components/social.vue'
import Aboutsitetips from './components/aboutsitetips.vue'
import Maxim from './components/maxim.vue'
import MyInfoAndSayHello from './components/myInfoAndSayHello.vue'
import Single from './components/single.vue'

export default {
  name: 'Me',
  components: {
    Skillinfo,
    Social,
    Aboutsitetips,
    Maxim,
    MyInfoAndSayHello,
    Single,
  },
  mounted() {
    // 动态加载外部 JS 脚本
    this.loadScript('https://www.myxz.top/assets/js/about.js')
      .then(() => {
        console.log('友链顶部重要JS加载完毕');
      })
      .catch((err) => {
        console.error('友链顶部重要JS加载失败', err);
      });
  },
  methods: {
    loadScript(url, callback) {
      return new Promise((resolve, reject) => {
        // 检查是否已加载
        if (document.querySelector(`script[src="${url}"]`)) {
          console.log('JS脚本已加载');
          resolve();
          return;
        }

        // 创建 script 标签
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = true; // 异步加载（不阻塞页面渲染）

        // 加载成功回调
        script.onload = () => {
          console.log('脚本加载完成');
          callback?.();
          resolve();
        };

        // 加载失败回调
        script.onerror = (err) => {
          console.error('脚本加载失败', err);
          reject(err);
        };

        // 添加到 DOM（推荐添加到 head 或 body 末尾）
        document.head.appendChild(script);
      });
    }
  }
}
</script>

<template>
  <div class="me-wrap">
    <div class="me">
      <div id="about-page">
        <div class="author-info">
          <div class="author-tag-left">
            <span class="author-tag">💻 博客写作者</span>
            <span class="author-tag">🥣 干饭魂 干饭人</span>
            <span class="author-tag">🕊 咕咕咕咕咕咕~</span>
            <span class="author-tag">⚒️ 自动化技术专业</span>
          </div>
          <div class="mainports">
            <div class="avatar-container">
              <img class="avatar-img" src="https://gravatar.mcyzsx.top/avatar/me" alt="Avatar">
            </div>
          </div>
          <div class="author-tag-right">
            <span class="author-tag">吃饭不如碎觉 💤</span>
            <span class="author-tag">乐观 积极 向上 🤝</span>
            <span class="author-tag">活到老，学到老 🔨</span>
            <span class="author-tag">空闲分享资源和教程 🌐</span>
          </div>
        </div>
        
        <div class="author-page-content">
          <div class="author-content">
            <MyInfoAndSayHello />
          </div>
          <div class="author-content">
            <Aboutsitetips />
            <Maxim />
          </div>
          <div class="author-content">
            <!-- 来自于主流HEO主题的衍生版本 -->
            <Skillinfo />
            <!-- 来自于柳神的关于页面版本 -->
            <Social />
          </div>
          <!-- <div class="author-content">
            <Technology />
            <Game />
          </div> -->
          <div class="author-content">
            <Single />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>