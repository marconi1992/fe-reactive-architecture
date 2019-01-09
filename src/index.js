import Store from './store'
import {
  withBinding
} from './app'

import './select'

const $ = global.$

/**
 * Imperative Way
 */

// $(document).ready(() => {
//   const input = $('input')
//   const listItems = $('ul > li')

//   listItems.on('click', (evt) => {
//     const li = $(evt.target)
//     const newValue = li.data('value')

//     console.info('itemSelected', newValue)
//     input.val(newValue)

//     listItems.each((idx, el) => {
//       const li = $(el)
//       const value = li.data('value')
//       li.toggleClass('active', value === newValue)
//     })
//   })
// })

/**
 * Reactive Way
 */

$(document).ready(() => {
  const store = new Store()

  const product = withBinding({
    type: ''
  })(store)

  const input = $('input')

  store.listen('@type', (value) => {
    input.val(value)
  })

  input.change(() => {
    store.dispatch('type', input.val())
  })

  $('.select').select({
    onChange: (value) => {
      product.type = value
    }
  })

  $('#saveBtn').on('click', () => {
    console.log(product.type)
  })
})
