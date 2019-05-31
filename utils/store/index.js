import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}

const requireModule = require.context('./modules', false, /\.js$/)
requireModule.keys().forEach((fileName) => {
  const module = requireModule(fileName)
  fileName = fileName.replace(/(\.[\\/]|\.js)/g, '')
  modules[fileName] = module.default
})

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {},

  plugins: [],

  modules
})

export default store
