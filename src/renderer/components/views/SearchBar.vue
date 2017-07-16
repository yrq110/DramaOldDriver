<template>
  <div class="searchBar">
    <input class="search-input" type="text" name="search" v-model="searchStr" placeholder="搜索"/>
    <i class="material-icons icon" @click="closeSearchBar">close</i>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  computed: {
    searchStr: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    closeSearchBar () {
      this.$emit('search-bar-close')
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../styles/SearchBar.less';
</style>
