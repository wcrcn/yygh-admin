import request from '@/utils/request'
const api_name = '/admin/hosp/hospitalSet'
export default {
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/findPageHospSet/${page}/${limit}`,
      method: 'POST',
      data: searchObj
    })
  },
  deleteHospSet(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'DELETE'
    })
  },
  removeRows(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'DELETE',
      data: idList
    })
  },
  // 锁定和取消锁定
  lockHospSet(id, status) {
    return request({
      url: `${api_name}/lockHospitalSet/${id}/${status}`,
      method: 'PUT'
    })
  },
  // 添加医院设置
  saveHospSet(hospitalSet) {
    return request({
      url: `${api_name}/saveHospitalSet`,
      method: 'POST',
      data: hospitalSet
    })
  },
  // 医院设置id查询
  getHospSet(id) {
    return request({
      url: `${api_name}/getHospSet/${id}`,
      method: 'GET'
    })
  },
  updateHospSet(hospitalSet) {
    return request({
      url: `${api_name}/updateHospitalSet`,
      method: 'POST',
      data: hospitalSet
    })
  }
}
