import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_USERINFO,
  CLEAR_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from "./mutations-type";

export default {
  [RECEIVE_ADDRESS](state, {
    address
  }) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {
    categorys
  }) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {
    shops
  }) {
    state.shops = shops
  },
  [RECEIVE_USERINFO](state, {
    userInfo
  }) {
    state.userInfo = userInfo
  },
  [CLEAR_USERINFO](state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO](state, {
    info
  }) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {
    ratings
  }) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {
    goods
  }) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {
    food
  }) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cart.push(food)
    } else {
      food.count++
    }

  },
  [DECREMENT_FOOD_COUNT](state, {
    food
  }) {
    if (!food.count) {
      return
    }
    food.count--
    if (food.count == 0) {
      state.cart.splice(state.cart.indexOf(food), 1)
    }
  },
  [CLEAR_CART](state) {
    state.cart.forEach(food => food.count = 0);
    state.cart = []
  }
}
