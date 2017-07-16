<template>
  <div class="movie-detail">
    <RzButton class="close-btn" type="mg" @click="close">Close</RzButton>
    <ul class="link-list" v-for="item in selectItem">
      <li v-for="source in item"><span>{{source.type}}</span><a :href="source.link" >{{ source.name }}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  props: {
    selectItem: {
      type: Object
    }
  },
  methods: {
    close () {
      this.$emit('detail-close')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/MovieDetail.less';
</style>
