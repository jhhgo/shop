import ajax from './ajax.js'
const BASE_PATH = '/api'

// 1根据经纬度获取位置
export const reqAddress = (geohash) => ajax(`${BASE_PATH}/position/${geohash}`)
// 2获取食品分类列表
export const reqFoodList = () => ajax(BASE_PATH + '/index_category')
// 3根据经纬度获取商铺列表
export const reqShopList = ({
  latitude,
  longitude
}) => ajax(BASE_PATH + '/shops', {
  latitude,
  longitude
})
// 4根据经纬度和关键字搜索商铺列表
export const reqStoreListByKey = ({
  latitude,
  longitude,
  keyword
}) => ajax(BASE_PATH + '/search_shops', {
  latitude,
  longitude,
  keyword
})
// 5获取一次性验证码
export const reqCode = () => ajax(BASE_PATH + '/captcha')
// 6用户名密码登陆
export const reqLogin = ({
  name,
  pwd,
  captcha
}) => ajax(BASE_PATH + 'login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')
// 7发送短信验证码
export const reqMsg = ({
  phone
}) => ajax(BASE_PATH + '/sendcode', {
  phone
})
// 8手机号验证码登陆
export const reqLoginByMsg = ({
  phone,
  code
}) => ajax(BASE_PATH + '/login_sms', {
  phone,
  code
}, 'POST')
// 9根据会话获取用户信息
export const reqSession = () => ajax(BASE_PATH + '/userinfo')
// 10用户登出
export const reqLogout = () => ajax(BASE_PATH + '/logout')

// 获取商家信息
export const reqShopInfo = () => ajax('/info')

//  获取商家评价
export const reqShopRatings = () => ajax('/ratings')

export const reqShopGoods = () => ajax('/goods')