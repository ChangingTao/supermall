import {request, getRequest, postRequest, putRequest, deleteRequest} from "./request";

export function getHomeMultidata() {
  return getRequest('/home/multidata', null)
}


export function getHomeGoods(type, page) {
  return getRequest('/home/data', {type,page})
  
}
