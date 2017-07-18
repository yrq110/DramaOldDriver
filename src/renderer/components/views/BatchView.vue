<template>
  <div class="batch">
    <ul class="list">
      <li v-for="(batchLink, index) in batchLinks">
        <div class="del-link" @click="deleteLink(index)">
          <i class="material-icons del-btn">delete</i>
        </div>
        <div class="name">{{ parseStr(batchLink).name }}</div>
      </li>
    </ul>
    <div class="del-section section">
      <i class="material-icons tool-btn" @click="batchClear">delete_forever</i>
    </div>
    <div class="dl-section section">
      <i class="material-icons tool-btn" @click="batchDownload">vertical_align_bottom</i>
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
      // console.log(index)
    },
    batchClear () {
      this.$emit('batch-clear')
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
