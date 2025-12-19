<script>
import chronoboxData from '@/chronobox.json'

export default {
  name: 'Chronobox',
  data() {
    return {
      allItems: [],
      filteredItems: [],
      activeFilter: 'all',
      groupedItems: {},
      statusCounts: {},
      loaded: false
    }
  },
  computed: {
    categories() {
      return Object.keys(this.groupedItems)
    }
  },
  watch: {
    activeFilter() {
      this.filterItems()
      this.updateCategoryVisibility()
    }
  },
  mounted() {
    this.processData()
    this.filterItems()
    
    // 等待 DOM 更新后初始化筛选功能
    this.$nextTick(() => {
      setTimeout(() => {
        this.initializeFilters()
      }, 100)
    })
    
    // 监听路由变化
    this.$router.afterEach(() => {
      setTimeout(() => {
        this.initializeFilters()
      }, 100)
    })
  },
  methods: {
    processData() {
      // 按类型分组
      const grouped = this.allItems.reduce((acc, item) => {
        const type = item.type || '其他'
        if (!acc[type]) {
          acc[type] = []
        }
        acc[type].push(item)
        return acc
      }, {})
      
      // 对每个类型的数组按ID降序排列
      Object.keys(grouped).forEach(type => {
        grouped[type].sort((a, b) => b.id - a.id)
      })
      
      this.groupedItems = grouped
      
      // 统计各状态数量
      this.statusCounts = this.allItems.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      }, {})
      
      this.loaded = true
    },
    
    filterItems() {
      if (this.activeFilter === 'all') {
        this.filteredItems = this.allItems
      } else {
        this.filteredItems = this.allItems.filter(item => item.status === this.activeFilter)
      }
      
      // 重新分组过滤后的项目
      const filteredGrouped = this.filteredItems.reduce((acc, item) => {
        const type = item.type || '其他'
        if (!acc[type]) {
          acc[type] = []
        }
        acc[type].push(item)
        return acc
      }, {})
      
      this.groupedItems = filteredGrouped
    },
    
    updateCategoryVisibility() {
      this.$nextTick(() => {
        const categories = document.querySelectorAll('[data-category]')
        categories.forEach(category => {
          const visibleCards = category.querySelectorAll('.entertainment-card:not(.hidden)')
          if (visibleCards.length === 0) {
            category.style.display = 'none'
          } else {
            category.style.display = 'block'
          }
        })
      })
    },
    
    getStarRating(rating) {
      return Array.from({ length: 5 }, (_, i) => i < rating)
    },
    
    getStatusColor(status) {
      switch (status) {
        case '在看':
          return 'bg-blue-500 text-white'
        case '看过':
          return 'bg-green-500 text-white'
        case '想看':
          return 'bg-yellow-500 text-white'
        case '搁置':
          return 'bg-gray-500 text-white'
        default:
          return 'bg-gray-400 text-white'
      }
    },
    
    setFilter(status) {
      this.activeFilter = status
      
      // 更新按钮状态
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active')
      })
      document.querySelector(`[data-status="${status}"]`).classList.add('active')
      
      // 筛选卡片
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.entertainment-card')
        cards.forEach(card => {
          const cardStatus = card.getAttribute('data-status')
          if (status === 'all' || cardStatus === status) {
            card.classList.remove('hidden')
          } else {
            card.classList.add('hidden')
          }
        })
        
        this.updateCategoryVisibility()
      })
    },
    
    initializeFilters() {
      const filterBtns = document.querySelectorAll('.filter-btn')
      
      filterBtns.forEach(btn => {
        // 移除旧的事件监听器
        const newBtn = btn.cloneNode(true)
        btn.parentNode.replaceChild(newBtn, btn)
      })
      
      // 添加新的事件监听器
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault()
          const status = btn.getAttribute('data-status')
          this.setFilter(status)
        })
      })
    }
  },
  created() {
    this.allItems = chronoboxData
    this.processData()
  }
}
</script>

<template>
<div class="chronobox-wrap">
  <div class="chronobox-page">
    <div class="container">
      <div class="page-header">
        <h1>时间盒</h1>
        <p class="page-description">记录观看的番剧、电影等内容</p>
      </div>
      
      <!-- 统计信息和筛选 -->
      <div class="filter-section">
        <button 
          class="filter-btn active"
          data-status="all"
          @click="setFilter('all')"
        >
          <span class="text-sm font-medium">全部</span>
          <span class="text-lg font-bold">{{ allItems.length }}</span>
        </button>
        
        <button 
          v-for="(count, status) in statusCounts"
          :key="status"
          class="filter-btn"
          :data-status="status"
          @click="setFilter(status)"
        >
          <span class="text-sm font-medium">{{ status }}</span>
          <span class="text-lg font-bold">{{ count }}</span>
        </button>
      </div>
      
      <!-- 内容列表 -->
      <div v-if="loaded" class="content-list">
        <div 
          v-for="(typeItems, type) in groupedItems"
          :key="type"
          class="category-section"
          :data-category="type"
        >
          <h2 class="category-title">
            <SvgIcon name="play-circle" class="w-6 h-6" />
            {{ type }}
            <span class="count">({{ typeItems.length }})</span>
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              v-for="item in typeItems"
              :key="item.id"
              class="entertainment-card"
              :data-status="item.status"
            >
              <!-- 封面图片 -->
              <div class="cover-container">
                <template v-if="item.url">
                  <a :href="item.url" target="_blank" rel="noopener noreferrer" class="cover-link">
                    <img 
                      :src="item.cover" 
                      :alt="item.title"
                      class="cover-image"
                      loading="lazy"
                    />
                    <!-- 链接指示器 -->
                    <div class="link-overlay">
                      <div class="link-icon">
                        <SvgIcon name="arrow-up-right" class="w-5 h-5" />
                      </div>
                    </div>
                  </a>
                </template>
                <template v-else>
                  <img 
                    :src="item.cover" 
                    :alt="item.title"
                    class="cover-image"
                    loading="lazy"
                  />
                </template>
                
                <!-- 状态标签 -->
                <div :class="['status-badge', getStatusColor(item.status)]">
                  {{ item.status }}
                </div>
                
                <!-- 年份 -->
                <div class="year-badge">
                  {{ item.year }}
                </div>
              </div>
              
              <!-- 内容信息 -->
              <div class="content-info">
                <template v-if="item.url">
                  <a :href="item.url" target="_blank" rel="noopener noreferrer" class="title-link">
                    <h3 class="title">{{ item.title }}</h3>
                  </a>
                </template>
                <template v-else>
                  <h3 class="title">{{ item.title }}</h3>
                </template>
                
                <!-- 评分 -->
                <div class="rating">
                  <span class="rating-label">评分:</span>
                  <div class="stars">
                    <SvgIcon 
                      v-for="(filled, index) in getStarRating(item.rating)" 
                      :key="index"
                      :name="filled ? 'star' : 'star-outline'" 
                      :class="['star', { 'filled': filled }]" 
                    />
                  </div>
                </div>
                
                <!-- 描述 -->
                <p class="description">{{ item.description }}</p>
                
                <!-- 标签 -->
                <div class="tags">
                  <span 
                    v-for="tag in item.tags"
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div v-else class="loading">
        <Loading />
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';

.chronobox-wrap {
  min-height: calc(100vh - 180px);
  padding: 2rem 0;
  background: var(--bg-thin);
}

.chronobox-page {
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
      margin: 0;
    }
  }
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-weak);
  border-radius: var(--rounded-lg);
  border: 1px solid var(--c-border);
  position: sticky;
  top: 80px;
  z-index: 100;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px var(--ld-shadow);
  
  .filter-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: var(--rounded-md);
    background: var(--bg-card);
    border: 1px solid var(--c-border);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--c-text-2);
    
    &:hover {
      background: var(--btn-card-bg);
      border-color: var(--c-primary);
      transform: translateY(-1px);
    }
    
  &.active {
    background: var(--c-primary);
    border-color: var(--c-primary);
    color: var(--c-bg-1);
    box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);
  }
    
    .text-sm {
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .text-lg {
      font-size: 1.125rem;
      font-weight: 700;
    }
  }
}

.category-section {
  margin-bottom: 3rem;
  
  .category-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--c-text-1);
    margin-bottom: 1.5rem;
    
    .count {
      font-size: 1rem;
      font-weight: 400;
      color: var(--c-text-3);
      margin-left: 0.5rem;
    }
  }
}

.grid {
  display: grid;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.entertainment-card {
  display: flex;
  background: var(--bg-card);
  border-radius: var(--rounded-lg);
  overflow: hidden;
  box-shadow: 0 2px 8px var(--ld-shadow);
  border: 1px solid var(--c-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px var(--ld-shadow);
    border-color: var(--c-primary);
  }
  
  .cover-container {
    position: relative;
    width: 8rem;
    height: 12rem;
    flex-shrink: 0;
    background: var(--c-bg-2);
    overflow: hidden;
    
    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .cover-link:hover .cover-image {
      transform: scale(1.05);
    }
    
    .link-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      
      .cover-link:hover & {
        background: rgba(0, 0, 0, 0.2);
      }
      
      .link-icon {
        opacity: 0;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        padding: 0.5rem;
        transition: all 0.3s ease;
        color: var(--text-secondary);
        
        .cover-link:hover & {
          opacity: 1;
        }
      }
    }
    
    .status-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--rounded-sm);
      font-size: 0.75rem;
      font-weight: 500;
      backdrop-filter: blur(4px);
    }
    
    .year-badge {
      position: absolute;
      bottom: 0.5rem;
      left: 0.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--rounded-sm);
      font-size: 0.75rem;
      font-weight: 500;
      background: rgba(0, 0, 0, 0.7);
      color: white;
    }
  }
  
  .content-info {
    flex: 1;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    
    .title-link {
      text-decoration: none;
      
      .title {
        font-size: 1.125rem;
        font-weight: 700;
        color: var(--c-text-1);
        margin: 0 0 0.75rem 0;
        line-height: 1.3;
        transition: color 0.2s ease;
        
        &:hover {
          color: var(--c-primary);
        }
      }
    }
    
    .title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--c-text-1);
      margin: 0 0 0.75rem 0;
      line-height: 1.3;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      
      .rating-label {
        font-size: 0.875rem;
        color: var(--c-text-2);
      }
      
      .stars {
        display: flex;
        gap: 0.125rem;
        
        .star {
          width: 1rem;
          height: 1rem;
          
          &.filled {
            color: #fbbf24;
          }
          
          &:not(.filled) {
            color: var(--c-text-3);
          }
        }
      }
    }
    
    .description {
      font-size: 0.875rem;
      color: var(--c-text-2);
      line-height: 1.5;
      margin: 0 0 1rem 0;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
      
      .tag {
        padding: 0.25rem 0.75rem;
        border-radius: var(--rounded-full);
        font-size: 0.75rem;
        background: var(--btn-card-bg);
        color: var(--c-text-2);
        border: 1px solid var(--c-border);
        white-space: nowrap;
      }
    }
  }
}

.hidden {
  display: none;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

// 图标样式
.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }

// 响应式设计
@media (max-width: 768px) {
  .entertainment-card {
    flex-direction: column;
    
    .cover-container {
      width: 100%;
      height: 200px;
    }
  }
  
  .filter-section {
    flex-direction: column;
    
    .filter-btn {
      justify-content: space-between;
    }
  }
}
</style>