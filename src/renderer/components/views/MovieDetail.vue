<template>
  <div class="movie-detail">
    <RzButton class="close-btn" type="mg" @click="close">Close</RzButton>
    <ul class="link-list" v-for="item in selectItem">
      <li v-for="source in item">
        <span>{{source.type}}</span>
        <checkbox :label="source.link" name="batch" v-model="batchMovie"></checkbox>
        <a :href="source.link" >{{ source.name }}</a></li>
    </ul>
  </div>
</template>

<script>
import Checkbox from './Checkbox'
export default {
  name: 'MovieDetail',
  data () {
    return {
      batchMovie: []
    }
  },
  props: {
    selectItem: {
      type: Object
    }
  },
  components: {
    Checkbox
  },
  methods: {
    close () {
      this.$emit('detail-close')
    }
  },
  watch: {
    batchMovie () {
      console.log(this.batchMovie.length)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/MovieDetail.less';
</style>
