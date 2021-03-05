import http from '@/untils/http/'

/**
 * 根据SSO认证中心，获得用户信息，包括权限信息
 */
export function getUserInfoServer () {
  return http('/getUserInfo')
}
