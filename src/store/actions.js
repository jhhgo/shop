import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS
} from "./mutations-type";
import {
  reqAddress,
  reqFoodList,
  reqShopList
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
  }
}
