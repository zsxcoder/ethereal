<template>
  <div class="create-site-post author-content-item single" style="width: 100%">
    <div class="author-content-item-tips">
      建站历程
    </div>
    <div class="author-content-item-title">
      魔改建站记录
    </div>
    <div class="lishi">
      『ZSXの小站』的魔改进程
    </div>
    <p class="author-content-item-content">
      『ZSXの小站』的魔改记录
    </p>
    <div class="singlePost">
      <p class="text-center">
        从最初的选择模板，到现在的个性化定制，博客经历了多次大的改动。每次改动都为了让用户体验更好，内容展示更加清晰。
        <br><br>
        这个博客基于 Vue + Vite 构建，使用了响应式设计，适配多种设备。未来还会继续完善，添加更多有趣的功能。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Single'
}
</script>

<style lang="scss" scoped>
.single {
  width: 100%;
  
  .author-content-item-tips {
    opacity: .8;
    font-size: 12px;
    margin-bottom: .5rem;
    color: var(--minor);
  }
  
  .author-content-item-title {
    font-size: 1.875rem;
    line-height: 2.25rem;
    color: var(--accent);
  }
  
  .lishi {
    font-size: 1.875rem;
    line-height: 2.25rem;
    color: var(--accent);
  }
  
  .author-content-item-content {
    margin-bottom: 1rem;
    margin-top: .5rem;
    vertical-align: middle;
    color: var(--minor);
  }
  
  .singlePost {
    .text-center {
      text-align: center;
    }
  }
}
</style>