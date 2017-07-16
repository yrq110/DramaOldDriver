<template>
  <div class="card-view" @scroll="handleScroll($event)">
    <div class="movie-card" v-for="(item, index) in list" @click="cardClick(item)" v-show="!isSearch&&!isFavorite">
      <i class="material-icons star" @click="cardCollect(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
      <div class="thumb">
        <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
    <div class="movie-card" v-for="item in searchResult" @click="cardClick(item)" v-show="isSearch&&(searchResult.length !== 0)">
      <i class="material-icons star" @click="cardCollect(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
      <div class="thumb">
        <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
      </div>
      <div class="title">{{ item.title }}</div> 
    </div>
    <div class="nothing-message" v-show="isSearch&&(searchResult.length == 0)">
        _(:3 」∠)_ Nothing found
    </div>
    <div class="movie-card" v-for="(item, index) in storage" @click="cardClick(item)" v-show="!isSearch&&isFavorite&&item.collected">
      <i class="material-icons star" @click="cardCollect(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
      <div class="thumb">
        <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  props: {
    list: {
      type: Array
    },
    searchResult: {
      type: Array
    },
    storage: {
      type: Array
    },
    isSearch: {
      type: Boolean
    },
    isFavorite: {
      type: Boolean
    }
  },
  methods: {
    handleScroll (e) {
      this.$emit('card-view-scroll', e)
    },
    cardClick (e) {
      this.$emit('card-click', e)
    },
    cardCollect (index, e) {
      this.$emit('card-collect', index, e)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/CardView.less';
</style>
