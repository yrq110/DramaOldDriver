<template>
  <div class="list-view">
    <ul class="movie-list">
      <li v-for="(item, index) in storage" @click="cardClick(item)" v-show="!isSearch&&!isFavorite"> 
        {{ index + 1 }}. {{ item.title }}
        <i class="material-icons star" @click="cardCollect(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
      </li>
      <li v-for="item in searchResult" @click="cardClick(item)" v-show="isSearch&&(searchResult.length !== 0)">
        {{ index + 1 }}. {{ item.title }}
        <i class="material-icons star" @click="cardCollect(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
      </li>
      <li v-for="(item, index) in storage" @click="cardClick(item)" v-show="!isSearch&&isFavorite&&item.collected">
        {{ index + 1 }}. {{ item.title }}
        <i class="material-icons star" @click="cardCollect(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
      </li>
    </ul>
    <div class="nothing-message" v-show="isSearch&&(searchResult.length == 0)">
      _(:3 」∠)_ Nothing found
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
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
  @import '../../styles/ListView.less';
</style>
