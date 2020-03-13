import ajax from './ajax.js'

// 1根据经纬度获取位置
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)
// 2获取食品分类列表
export const reqFoodList = () => ajax('/index_category')
// 3根据经纬度获取商铺列表
export const reqStoreList = ({latitude, longitude}) => ajax('/shops', {latitude, longitude})
// 4根据经纬度和关键字搜索商铺列表
export const reqStoreListByKey = ({latitude, longitude, keyword}) => ajax('/search_shops', {latitude, longitude, keyword})
// 5获取一次性验证码
export const reqCode = () => ajax('/captcha')
// 6用户名密码登陆
export const reqLogin = ({name, pwd, captcha}) => ajax('login_pwd', {name, pwd, captcha}, 'POST')
// 7发送短信验证码
export const reqMsg = ({phone}) => ajax('/sendcode', {phone})
// 8手机号验证码登陆
export const reqLoginByMsg = ({phone, code}) => ajax('/login_sms', {phone, code}, 'POST')
// 9根据会话获取用户信息
export const reqUser = () => ajax('/userinfo')
// 10用户登出
export const reqLogout = () => ajax('/logout')
