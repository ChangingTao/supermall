/** request.js **/
import axios from 'axios'

/** 设置默认内容 **/
axios.defaults.baseURL = 'http://123.207.32.32:8000/api/wh';
// axios.defaults.baseURL = 'http://106.54.54.237:8000/api/wh';
axios.defaults.timeout = 10000;

axios.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err);
});

axios.interceptors.response.use(res => {
  return res.data
}, err => {
  console.log(err);
});

/** axios请求区域 **/

/* 特殊请求区域 */
export function request(config) {
  return axios(config)
}

/* 下面封装常见请求方式 */
export function getRequest(url, params) {
  return axios({
    method: 'get',
    url: url,
    params: params
  })
}

export function putRequest(url, data) {
  return axios({
    method: 'put',
    url: url,
    data: data
  })
}

export function postRequest(url, data) {
  return axios({
    method: 'post',
    url: url,
    data: data
  })
}

export function deleteRequest(url, data) {
  return axios({
    method: 'delete',
    url: url,
    data: data
  })
}
