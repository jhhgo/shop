import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_USERINFO,
  CLEAR_USERINFO
} from "./mutations-type";
import {
  reqAddress,
  reqFoodList,
  reqShopList,
  reqSession,
  reqLogout
} from '../api/index'

export default {
  async getAddress({
    commit,
    state
  }) {
    const geohash = state.latitude + ',' + state.longtitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {
        address
      })
    }
  },
  async getFood({
    commit
  }) {
    const result = await reqFoodList()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {
        categorys
      })
    }
  },
  async getShops({
    commit,
    state
  }) {
    const {
      latitude,
      longtitude
    } = state
    const result = await reqShopList({
      latitude,
      longtitude
    })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {
        shops
      })
    }
  },
  recordUser({
    commit
  }, userInfo) {
    commit(RECEIVE_USERINFO, {
      userInfo
    })
  },

  async getSession({
    commit
  }) {
    const result = await reqSession()
    if (result.code === 1) {
      return
    }
    const userInfo = result.data
    commit(RECEIVE_USERINFO, {
      userInfo
    })
  },

  async logout({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(CLEAR_USERINFO)
    }
  }

}
