const app = {
  state: {
    // 保存详情页信息，使详情页可刷新
    blackMenu: {
      path: '',
      id: ''
    },
    PhoneVersion: null,
    inited: false,
    // 储存商品信息
    productionid: null,
    lotteryInit: false,
    orderTabIndex: 0,
    fromPath: null,
    mineScrollTop: null,
    socketObj: null
  },
  mutations: {
    // blackMenu
    setBlackMenu (state, val) {
      state.blackMenu = val
    },
    clearBlackMenu (state) {
      state.blackMenu = { path: '', id: '' }
    },
    setPhoneVersion (state, val) {
      state.PhoneVersion = val
    },
    clearPhoneVersion (state) {
      state.PhoneVersion = null
    },
    // 记录初始化状态值
    inited (state) {
      state.inited = true
    },
    // 清除初始化记录
    clearInit (state) {
      state.inited = false
    },
    // 存入商品信息
    setProductionid (state, val) {
      state.productionid = val
    },
    // 清除商品信息
    clearProductionid (state) {
      state.productionid = null
    },
    // 初始化抽奖专区弹框
    setLotteryInit (state) {
      state.lotteryInit = true
    },
    // 清除弹框初始化
    clearLottery (state) {
      state.lotteryInit = false
    },
    // 设置交换中心订单的tab默认值
    setOrderTabIndex (state, val) {
      state.orderTabIndex = val
    },
    // 设置商品详情-地址的状态
    setBusinessAddress (state, val) {
      state.fromPath = val
    },
    clearBusinessAddress (state) {
      state.fromPath = null
    },
    // 记录我的-界面滚动高度
    setMineScrollTop (state, val) {
      state.mineScrollTop = val
    },
    clearMineScrollTop (state) {
      state.mineScrollTop = null
    },
    setSocketObj (state, val) {
      state.socketObj = val
    },
    clearSocketObj (state) {
      state.socketObj = null
    }
  },
  actions: {},
  getters: {
    black: state => state.blackMenu,
    PhoneVersion: state => state.PhoneVersion,
    inited: state => state.inited,
    productionid: state => state.productionid,
    lotteryInit: state => state.lotteryInit,
    orderTabIndex: state => state.orderTabIndex,
    fromPath: state => state.fromPath,
    mineScrollTop: state => state.mineScrollTop,
    socketObj: state => state.socketObj
  }
}

export default app
