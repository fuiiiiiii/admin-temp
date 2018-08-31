import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 30 })
}

export function setTokenWithTime(token, time) {
  return Cookies.set(TokenKey, token, { expires: time })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}