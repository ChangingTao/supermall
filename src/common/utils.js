export function debounce(func, delay) {
  // 防抖动方法 执行内容，延迟多久
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
