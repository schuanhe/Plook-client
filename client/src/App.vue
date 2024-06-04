<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
#index {
  height: 100%;
  width: 100%;
}
uni-page-body {
  height: 100%;
  width: 100%;
  padding-bottom: 0;
  padding-top: 0;
  background-color: #f5f5f5;
}
</style>
