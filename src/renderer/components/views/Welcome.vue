<template>
  <div class="mask">
    <RzAnima type="text-1" :textStroke="textStroke" class="logo-anime">
      <template slot="text">Drama</template>
    </RzAnima>
    <div class="go-btn">
      <RzButton type="ace" @click="getAll"><template slot="inner-txt">Go</template></RzButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      textStroke: ['white', '#222', 'grey']
    }
  },
  methods: {
    getAll () {
      this.$emit('getAll')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/Welcome.less';
</style>
