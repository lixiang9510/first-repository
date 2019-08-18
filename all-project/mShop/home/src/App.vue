<template>
  <div id="App" class="App">
      <router-view></router-view>
      <TabBar />
  </div>
</template>

<script>
import TabBar from './components/TabBar/TabBar'
export default {
  name: 'App',
  components:{
    TabBar
  }
}
</script>

<style scoped lang="less">
  #App{
    .rem(padding-bottom,60)
  }
</style>
