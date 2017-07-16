<template>
  <div class="viewtype">
    <section @click="change">
      <i class="material-icons icon" :class="{ off: !toggle }">view_module</i>
      <i class="material-icons icon" :class="{ off: toggle }">list</i>
      <div class="move-rect" :class="{ right: !toggle }"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TypeToggle',
  props: {
    toggle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    change () {
      this.$emit('view-toggle')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../styles/TypeToggle.less';
</style>
