<script>
import { mapActions } from 'vuex'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Comment from '@/components/comment/index.vue'
import Markdown from '@/components/markdown/index.vue'
import config from '@/config'
import { getBlogFriendUrlAPI } from '@/api/github'

const isBlogFriends = config.friendsRepo === '' || config.friendsRepo === undefined

export default {
  name: 'Friend',
  components: {
    Comment,
    Markdown,
  },
  data() {
    return {
      filterFriends: [],
      loseContact: [],
      notAdded: [],
      loading: true,
      // 友链朋友圈数据
      fcLoading: true,
      allArticles: [],
      displayedArticles: [],
      stats: {
        friends_num: 0,
        active_num: 0,
        article_num: 0,
        last_updated_time: ''
      },
      start: 0,
      hasMoreArticles: true,
      randomArticle: null,
      showModal: false,
      currentAuthor: '',
      currentAuthorAvatar: '',
      authorOrigin: '',
      authorArticles: [],
    }
  },
  computed: {
    friendInfo() {
      const string = '```js' + '\n'
        + `name: ${this.$config.name}` + '\n'
        + `url: ${this.$config.url}` + '\n'
        + `avatar: ${this.$config.avatar}` + '\n'
        + `desc: ${this.$config.desc}` + '\n'
        + '```'
      return string
    },
    showLoseContact() {
      return this.loseContact.length > 0
    },
    showNotAdded() {
      return this.notAdded.length > 0
    },
  },
  created() {
    this.getFriendsFn()
    this.initializeFC()
  },
  beforeUnmount() {
    // 确保在组件销毁前移除事件监听器
    if (this.showModal) {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('click', this.globalClickHandler)
    }
  },
  methods: {
    ...mapActions({
      getFriendsCountAction: 'github/getFriendsCountAction',
      getFriendsAction: 'github/getFriendsAction',
      getBlogFriendsAction: 'github/getBlogFriendsAction',
    }),
    // 友链朋友圈方法
    initializeFC() {
      this.loadMoreArticles()
    },
    async loadMoreArticles() {
      const cacheKey = 'friend-circle-lite-cache'
      const cacheTimeKey = 'friend-circle-lite-cache-time'
      const now = new Date().getTime()
      
      try {
        // 检查缓存
        if (typeof localStorage !== 'undefined') {
          const cacheTime = localStorage.getItem(cacheTimeKey)
          if (cacheTime && (now - cacheTime < 10 * 60 * 1000)) {
            const cachedData = JSON.parse(localStorage.getItem(cacheKey))
            if (cachedData) {
              this.processArticles(cachedData)
              return
            }
          }
        }
        
        // 从API获取数据
        const private_api_url = 'https://fc.mcyzsx.top/'
        const response = await fetch(`${private_api_url}all.json`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // 验证数据结构
        if (!data || !data.article_data || !data.statistical_data) {
          throw new Error('Invalid data structure received from API')
        }
        
        // 更新缓存
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(cacheKey, JSON.stringify(data))
          localStorage.setItem(cacheTimeKey, now.toString())
        }
        
        this.processArticles(data)
      } catch (error) {
        console.error('加载文章失败:', error)
        this.fcLoading = false
        
        // 提供用户反馈
        this.$message({
          content: '加载友链朋友圈数据失败，请稍后再试',
          type: 'error'
        })
      }
    },
    processArticles(data) {
      // 更新统计数据
      this.stats.friends_num = data.statistical_data.friends_num
      this.stats.active_num = data.statistical_data.active_num
      this.stats.article_num = data.statistical_data.article_num
      this.stats.last_updated_time = data.statistical_data.last_updated_time
      
      // 合并新旧文章
      const newArticles = data.article_data
      const mergedArticles = [...this.allArticles, ...newArticles]
      this.allArticles = mergedArticles
      
      // 更新显示的列表
      const page_turning_number = 20
      const newDisplayed = mergedArticles.slice(
        this.start, 
        this.start + page_turning_number
      )
      this.displayedArticles = [...this.displayedArticles, ...newDisplayed]
      
      // 更新起始位置
      this.start += page_turning_number
      
      // 检查是否有更多文章
      this.hasMoreArticles = this.start < mergedArticles.length
      
      // 显示随机文章
      if (!this.randomArticle) {
        this.displayRandomArticle()
      }
      
      this.fcLoading = false
    },
    formatDate(dateString) {
      return dateString ? dateString.substring(0, 10) : ''
    },
    displayRandomArticle() {
      if (this.allArticles.length > 0) {
        // 确保不会连续选择相同的文章
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * this.allArticles.length)
        } while (
          this.randomArticle && 
          randomIndex === this.allArticles.indexOf(this.randomArticle) && 
          this.allArticles.length > 1
        )
        
        this.randomArticle = this.allArticles[randomIndex]
      }
    },
    avatarOrDefault(avatar) {
      return avatar || "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"
    },
    handleAvatarError(event) {
      event.target.src = "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"
    },
    openArticle(link) {
      window.open(link, '_blank')
    },
    openRandomArticle() {
      if (this.randomArticle) {
        window.open(this.randomArticle.link, '_blank')
      }
    },
    showAuthorArticles(author, avatar, link) {
      this.currentAuthor = author
      this.currentAuthorAvatar = avatar
      
      // 安全处理URL，避免出错
      try {
        this.authorOrigin = new URL(link).origin
      } catch (e) {
        console.error('Invalid URL:', link)
        this.authorOrigin = '#'
      }
      
      this.authorArticles = this.allArticles
        .filter(article => article.author === author)
        .slice(0, 4)
      
      this.showModal = true
      document.body.classList.add('overflow-hidden')
      window.addEventListener('click', this.globalClickHandler)
    },
    globalClickHandler(event) {
      if (event.target.id === 'modal') {
        this.hideModal()
      }
    },
    hideModal() {
      this.showModal = false
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('click', this.globalClickHandler)
    },
    parseFriends(friends) {
      friends.forEach((friend) => {
        const labels = friend.labels
        const labelsNames = labels.map(label => label.name)
        if (labelsNames.includes('未添加'))
          this.notAdded.push(friend)
        else if (labelsNames.includes('失联'))
          this.loseContact.push(friend)
        else
          this.filterFriends.push(friend)
      })
    },
    parseBlogFriends(friends) {
      friends.forEach((friend) => {
        const tag = friend.tag
        if (tag.name === '未添加')
          this.notAdded.push(friend)
        else if (tag.name === '失联')
          this.loseContact.push(friend)
        else
          this.filterFriends.push(friend)
      })
    },
    async getFriendsCountFn() {
      return await this.getFriendsCountAction().catch((err) => {
        this.$message({
          content: '获取友链总数失败',
          type: 'error',
        })
        throw new Error(err)
      })
    },
    async getFriendsFn() {
      if (isBlogFriends) {
        const { url, pageSize } = await getBlogFriendUrlAPI().catch((err) => {
          this.$message({
            content: '获取友链失败',
            type: 'error',
          })
          throw new Error(err)
        })
        const friends = await this.getBlogFriendsAction({ url, page: 1, pageSize }).catch((err) => {
          this.$message({
            content: '获取友链失败',
            type: 'error',
          })
          throw new Error(err)
        }).finally(() => {
          this.loading = false
        })
        this.parseBlogFriends(friends)
      }
      else {
        const totalCount = await this.getFriendsCountFn().catch((err) => {
          this.$message({
            content: '获取友链总数失败',
            type: 'error',
          })
          throw new Error(err)
        })
        const friends = await this.getFriendsAction({ page: 1, pageSize: totalCount }).catch((err) => {
          this.$message({
            content: '获取友链失败',
            type: 'error',
          })
          throw new Error(err)
        }).finally(() => {
          this.loading = false
        })
        this.parseFriends(friends)
      }
    },
  },
}
</script>

<template>
  <div class="friend-wrap">
    <div class="friend">
      <section>
        <h2><SvgIcon name="lianjie" /> {{ $t('friend_info') }}</h2>
        <div class="info-wrap">
          <p>{{ $t('exchange_link') }}</p>
          <p>{{ $t('this_is_my_friend') }}</p>
          <Markdown :content="friendInfo" :need-parsed="true" />
        </div>
      </section>
      <section>
        <h2><SvgIcon name="zhinan" /> {{ $t('my_friends') }}</h2>
        <p>※ {{ $t('randomly_sorted') }}</p>
        <p>※ {{ $t('own_storage_space') }}</p>
        <ul v-loading="loading" class="content">
          <li v-for="friend in filterFriends" :key="friend.number">
            <a :href="friend.url" rel="noopener noreferrer" class="info" target="_blank">
              <figure class="avatar">
                <img :src="friend.avatar" alt="avatar" loading="lazy">
              </figure>
              <div class="text">
                <h3 class="name">{{ friend.name }}</h3>
                <p class="desc">{{ friend.desc }}</p>
              </div>
            </a>
          </li>
        </ul>
      </section>
      <section v-if="showLoseContact">
        <p class="strong">
          {{ $t('cannot_visit') }}
        </p>
        <ul class="content">
          <li v-for="friend in loseContact" :key="friend.number">
            <a :href="friend.url" rel="noopener noreferrer" class="info" target="_blank">
              <figure class="avatar">
                <img :src="friend.avatar" alt="avatar" loading="lazy">
              </figure>
              <div class="text">
                <h3 class="name">{{ friend.name }}</h3>
                <p class="desc">{{ friend.desc }}</p>
              </div>
            </a>
          </li>
        </ul>
        <p>{{ $t('please_restore') }}</p>
      </section>
      <section v-if="showNotAdded">
        <p class="strong">
          {{ $t('unblied_friends') }}
        </p>
        <ul class="not-added">
          <li v-for="friend in notAdded" :key="friend.number">
            <h3 class="name">
              {{ friend.name }}
            </h3>
          </li>
        </ul>
        <p>{{ $t('continue_include') }}</p>
      </section>

      <!-- 友链朋友圈 -->
      <section class="friend-circle">
        <h2><SvgIcon name="wechat" /> 友链朋友圈</h2>
        <p>※ 发现更多有趣的博主</p>
        <div class="friend-stats" v-if="!fcLoading">
          <span>共收录 {{ stats.friends_num }} 位友链博主，活跃 {{ stats.active_num }} 位，收录文章 {{ stats.article_num }} 篇，最后更新于 {{ formatDate(stats.last_updated_time) }}</span>
        </div>
        
        <div class="article-list" v-loading="fcLoading">
          <!-- 随机文章区域 -->
          <div v-if="randomArticle" class="random-article">
            <div class="random-container-title">随机钓鱼</div>
            <a href="#" @click.prevent="openRandomArticle" class="article-item">
              <div class="article-container gradient-card">
                <div class="article-author">{{ randomArticle.author }}</div>
                <div class="article-title">{{ randomArticle.title }}</div>
                <div class="article-date">{{ randomArticle.created }}</div>
              </div>
            </a>
            <button class="refresh-btn gradient-card" @click="displayRandomArticle">
              <SvgIcon name="shuaxin" />
            </button>
          </div>

          <!-- 文章列表区域 -->
          <div class="articles-list">
            <div v-for="(article, index) in displayedArticles" :key="index" class="article-item">
              <div class="article-image" @click="showAuthorArticles(article.author, article.avatar, article.link)">
                <img 
                  :src="avatarOrDefault(article.avatar)" 
                  @error="handleAvatarError" 
                />
              </div>
              <div class="article-container gradient-card">
                <div class="article-author">{{ article.author }}</div>
                <div class="article-title" @click="openArticle(article.link)">
                  {{ article.title }}
                </div>
                <div class="article-date">{{ formatDate(article.created) }}</div>
              </div>
            </div>
          </div>

          <div class="load-more-container">
            <!-- 加载更多按钮 -->
            <button 
              v-show="hasMoreArticles" 
              class="load-more gradient-card" 
              @click="loadMoreArticles"
            >
              再来亿点
            </button>
          </div>

          <!-- 作者模态框 -->
          <div 
            v-if="showModal" 
            id="modal" 
            class="modal" 
            :class="{'modal-open': showModal}"
            @click.self="hideModal"
          >
            <div class="modal-content">
              <div class="modal__header">
                <img 
                  id="modal-author-avatar" 
                  :src="avatarOrDefault(currentAuthorAvatar)" 
                  @error="handleAvatarError" 
                />
                <a id="modal-author-name-link" :href="authorOrigin" target="_blank">
                  {{ currentAuthor }}
                </a>
              </div>
              
              <div id="modal-articles-container">
                <div 
                  v-for="(article, index) in authorArticles" 
                  :key="index" 
                  class="modal-article"
                >
                  <a 
                    class="modal-article-title" 
                    :href="article.link" 
                    target="_blank"
                  >
                    {{ article.title }}
                  </a>
                  <div class="modal-article-date">📅{{ formatDate(article.created) }}</div>
                </div>
              </div>
              
              <img 
                id="modal-bg" 
                :src="avatarOrDefault(currentAuthorAvatar)" 
                @error="handleAvatarError" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    <Comment />
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss'
</style>
