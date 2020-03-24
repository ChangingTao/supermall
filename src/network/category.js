import {getRequest} from "./request";
import axios from "../../../t/HYMall/src/network/axios";

export function getCategory() {
  return getRequest('/category', null)
}

export function getSubcategory(maitKey) {
  return getRequest('/subcategory', {maitKey})
}

export function getCategoryDetail(miniWallkey, type) {
  return getRequest('/subcategory/detail', {miniWallkey, type})
}
