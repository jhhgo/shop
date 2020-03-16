export default {
  totalCount(state) {
    return state.cart.reduce((preTotal, food) => preTotal + food.count, 0)
  },

  totalPrice(state) {
    return state.cart.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
  },

  greatRating(state) {
    return state.ratings.filter(rating => {
      return rating.rateType == 0
    })
  }
}
