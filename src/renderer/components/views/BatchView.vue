<template>
  <div class="batch">
    <ul class="list">
      <li v-for="(batchLink, index) in batchLinks">
        <div class="del-section" @click="deleteLink(index)">
          <i class="material-icons del-btn">delete</i>
        </div>
        <div class="name">{{ parseStr(batchLink).name }}</div>
      </li>
    </ul>
    <div class="dl-section">
      <i class="material-icons dl-btn" @click="batchDownload">vertical_align_bottom</i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BatchView',
  props: {
    batchLinks: {
      type: Array
    }
  },
  methods: {
    deleteLink (index) {
      this.$emit('delete-batch-link', index)
      console.log(index)
    },
    batchDownload () {
      this.$emit('batch-download')
    },
    parseStr (str) {
      if (typeof (str) === 'string') {
        return {
          name: str.split('+')[0],
          link: str.split('+')[1]
        }
      } else {
        return {}
      }
    }
  }
}
</script>
<style lang="less">
  @import '../../styles/BatchView.less';
</style>
