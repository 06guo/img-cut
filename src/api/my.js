import http from '@/untils/http/'
/**
 * 获取列表数据
 */
export function getListServer () {
  return http('/getList')
}
