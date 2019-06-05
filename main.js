import Vue from 'vue'
import App from './App'
import url from './utils/request/config.js'

Vue.config.productionTip = false

Vue.prototype.$imageUrl = url.uploadImgUrl
Vue.prototype.$version = '集米宝1.4'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
