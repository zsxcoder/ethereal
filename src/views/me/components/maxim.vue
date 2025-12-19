<template>
  <div class="author-content-item maxim">
    <div class="author-content-item-tips">座右铭</div>
    <span class="maxim-title">
      <span style="opacity:.6;margin-bottom:8px">
        造化钟神秀，
      </span>
      <span>
        阴阳割昏晓。
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Maxim'
}
</script>

<style lang="scss" scoped>
.maxim {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  
  .maxim-title {
    display: flex;
    flex-direction: column;
    color: var(--accent);
  }
  
  .author-content-item-tips {
    opacity: .8;
    font-size: .6rem;
    margin-bottom: .5rem;
    color: var(--minor);
  }
}
</style>