const user = {
  state: {
    userInfo: {},
		Authorization: null,
    socketData: null
  },
  mutations: {
    setUser (state, val) {
      state.userInfo = val
    },
    clearUser (state) {
      state.userInfo = {}
    },
	setAuthorization (state, val) {
	  state.Authorization = val
	},
	clearAuthorization (state) {
	  state.Authorization = null
	},
	// 同步设置socket接收到的消息 并监听
    dataPush (state, val) {
      state.socketData = val
    }
  },
  actions: {
  },
  getters: {
    user: state => state.userInfo,
    Authorization: state => state.Authorization,
    socketData: state => state.socketData
  }
}

export default user
