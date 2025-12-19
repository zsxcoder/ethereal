<template>
  <div class="aboutsiteTips author-content-item">
    <div class="author-content-item-tips">追求</div>
    <h2>
      源于
      <br />
      热爱而去
      <span class="inline-word">
        感受
      </span>
      <div class="mask">
        <span class="first-tips">
          学习
        </span>
        <span>
          生活
        </span>
        <span data-up="data-up">
          博客
        </span>
        <span data-show="data-show">
          小说
        </span>
      </div>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'Aboutsitetips'
}
</script>

<style lang="scss" scoped>
.aboutsiteTips {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex: 3;
  
  .author-content-item-tips {
    opacity: .8;
    font-size: .6rem;
    margin-bottom: .5rem;
  }
  
  h2 {
    margin-right: auto;
    font-size: 36px;
    font-family: Helvetica;
    line-height: 1.06;
    letter-spacing: -.02em;
    color: var(--accent);
    margin-top: 0;
  }
  
  .mask {
    height: 36px;
    position: relative;
    overflow: hidden;
    margin-top: 4px;
    
    span {
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 36px;
      padding-bottom: var(--offset);
      background-size: 100% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-repeat: no-repeat;
      
      &:nth-child(1) {
        background-image: linear-gradient(45deg,#0ecffe 50%,#07a6f1);
      }
      
      &:nth-child(2) {
        background-image: linear-gradient(45deg,#18e198 50%,#0ec15d);
      }
      
      &:nth-child(3) {
        background-image: linear-gradient(45deg,#8a7cfb 50%,#633e9c);
      }
      
      &:nth-child(4) {
        background-image: linear-gradient(45deg,#fa7671 50%,#f45f7f);
      }
    }
    
    span[data-show] {
      transform: translateY(-100%);
      transition: .5s transform ease-in-out;
    }
    
    span[data-up] {
      transform: translateY(-200%);
      transition: .5s transform ease-in-out;
    }
  }
}

.inline-word {
  word-break: keep-all;
  white-space: nowrap;
}
</style>