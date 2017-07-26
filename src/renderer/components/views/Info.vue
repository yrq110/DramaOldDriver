<template>
  <div>
    <i class="material-icons info-btn">info_outline</i>
    <div class="info-content">
      <ul class="info-list">
        <li><span>Core:</span>  <span>Vue + Electron</span></li>
        <li><span>UI:</span>  <span>Custom + RizuUI</span></li>
        <li><span>Author:</span> <span>yrq110</span></li>
        <li><span>Version:</span> <span>{{ version }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    version: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/Info.less';
</style>
