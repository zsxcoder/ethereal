<template>
  <div class="author-content-item myInfoAndSayHello" style="text-align: center; width: 100%">
    <div class="title1 white-text">
      你好，很高兴认识你👋
    </div>
    <div class="title2 white-text">
      我叫
      <span class="inline-word">
        钟神秀
      </span>
    </div>
    <div class="title1 white-text">
      是一名 小说爱好者、学生、
      <span class="inline-word">
        博主
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInfoAndSayHello'
}
</script>

<style lang="scss" scoped>
#about-page {
  .myInfoAndSayHello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--bg-color);
    background: linear-gradient(120deg, #5b27ff 0, #00d4ff 100%);
    background-size: 200%;
    min-height: 175px;
    
    .title1 {
      opacity: .8;
      line-height: 1.3;
    }
    
    .title2 {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      margin: .5rem 0;
    }
  }
}

.inline-word {
  word-break: keep-all;
  white-space: nowrap;
}

.white-text {
  color: #ffffff !important;
}
</style>