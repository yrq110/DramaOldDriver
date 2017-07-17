<template>
  <div class="movie-detail">
    <RzButton class="close-btn" type="mg" @click="close">Close</RzButton>
    <ul class="link-list" v-for="item in selectItem.resource">
      <li v-for="source in item">
        <span>{{source.type}}</span>
        <checkbox :label="combineLabel(source.name, source.link)" :name="selectItem.title" v-model="batchMovie" @input-click="checkClick"></checkbox>
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
      type: [Array, Object]
    }
  },
  components: {
    Checkbox
  },
  methods: {
    close () {
      this.$emit('detail-close')
    },
    checkClick () {
      this.$emit('check-click', this.batchMovie)
      // this.$emit('check-click', this.batchMovie, this.selectItem.title)
      console.log(this.batchMovie)
    },
    combineLabel (name, link) {
      return `${name}+${link}`
    }
  },
  watch: {
    batchMovie () {
      // console.log(this.batchMovie.length)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/MovieDetail.less';
</style>
