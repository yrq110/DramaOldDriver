<template>
  <div class="toolkit">
    <div class="tool-btn" @click="search"><i class="material-icons icon">search</i></div>
    <div class="tool-btn" @click="favorite"><i class="material-icons icon" :class="{active: isFavorite}">bookmark_border</i></div>
    <div class="tool-btn" @click="close"><i class="material-icons icon">close</i></div>
  </div>
</template>

<script>
export default {
  name: 'ToolKit',
  props: {
    isFavorite: {
      type: Boolean
    }
  },
  methods: {
    search () {
      this.$emit('search-show')
    },
    favorite () {
      this.$emit('favorite-show')
    },
    close () {
      this.$emit('window-close')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/ToolKit.less';
</style>
