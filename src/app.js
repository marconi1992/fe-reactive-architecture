const $ = global.$

export const withBinding = (target) => {
  return (store) => {
    Object.keys(target).forEach(prop => {
      store.listen(prop, (value) => {
        target[prop] = value
      })
    })

    return new Proxy(target, {
      get: (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
          return obj[prop]
        }
      },
      set: (obj, prop, value) => {
        if (obj.hasOwnProperty(prop)) {
          obj[prop] = value
          store.dispatch(`@${prop}`, value)
          return true
        }
        return false
      }
    })
  }
}

export const app = (store) => {
  $(['[data-bind]']).each(function () {
    var el = $(this)
    var bindingStr = el.data('bind')
    el.change(function () {
      store.dispatch(bindingStr, el.val())
    })

    store.listen('@' + bindingStr, function (value) {
      el.val(value)
    })
  })
}
