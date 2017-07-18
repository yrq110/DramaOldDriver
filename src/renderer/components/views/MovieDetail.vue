<template>
  <div class="movie-detail">
    <RzButton class="close-btn" type="mg" @click="close">Close</RzButton>
    <ul class="link-list" v-for="item in selectItem.resource">
      <li v-for="source in item">
        <span>{{source.type}}</span>
        <checkbox :label="combineLabel(source.name, source.link)" :name="selectItem.title" v-model="batchMovie" @input-click="checkClick"></checkbox>
        <a :href="source.link" >{{ source.name }}</a>
      </li>
    </ul>
    <span @click="selectAll">{{ selectAllStatus[selectItem.title] ? '反选' : '全选' }}  </span>
  </div>
</template>

<script>
import Checkbox from './Checkbox'
export default {
  name: 'MovieDetail',
  data () {
    return {
      batchMovie: [],
      selectAllStatus: {}
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
  computed: {
    currentSelectAll: () => {
      if (typeof (this.selectAllStatus[this.selectItem.title]) === 'undefined') {
        this.selectAllStatus[this.selectItem.title] = false
        return false
      } else {
        return this.selectAllStatus[this.selectItem.title]
      }
    }
  },
  methods: {
    close () {
      this.$emit('detail-close')
    },
    checkClick () {
      this.$emit('check-click', this.batchMovie)
      // this.$emit('check-click', this.batchMovie, this.selectItem.title)
      // console.log(this.batchMovie)
    },
    combineLabel (name, link) {
      return `${name}+${link}`
    },
    selectAll () {
      this.selectAllStatus[this.selectItem.title] = typeof (this.selectAllStatus[this.selectItem.title]) === 'undefined' ? false : this.selectAllStatus[this.selectItem.title]
      let isSelectAll = this.selectAllStatus[this.selectItem.title]

      // clear current movie resource
      this.selectItem.resource.forEach((e) => {
        e.forEach((a) => {
          this.batchMovie = this.batchMovie.filter((el) => {
            return el !== this.combineLabel(a.name, a.link)
          })
        })
      })

      // add all selected movie resource to batch links
      if (!isSelectAll) {
        this.selectItem.resource.forEach((e) => {
          e.forEach((a) => {
            this.batchMovie.push(this.combineLabel(a.name, a.link))
          })
        })
      }

      this.selectAllStatus[this.selectItem.title] = !this.selectAllStatus[this.selectItem.title]
      this.$emit('check-click', this.batchMovie)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/MovieDetail.less';
</style>
