<script>
  export default {
    onLaunch: function () {
      console.log('App Launch')
    },
    onShow: function () {
      if (process.env.NODE_ENV === 'development') {
        console.log('App Show')
      }
    },
    onHide: function () {
      if (process.env.NODE_ENV === 'development') {
        console.log('App Hide')
      }
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import 'nutui-uniapp/styles/index.scss';
  page,
  html,
  body {
    height: 100%;
  }
</style>
