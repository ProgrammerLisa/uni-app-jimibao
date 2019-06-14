import Vue from 'vue'
import App from './App'
import url from './utils/request/config.js'

Vue.config.productionTip = false

Vue.prototype.$imageUrl = url.uploadImgUrl
Vue.prototype.$socketUrl = url.socketUrl
Vue.prototype.$version = url.version

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
