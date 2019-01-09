// import Store from './store'
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
  const input = $('input')
  $('.select').select({
    onChange: (value) => {
      input.val(value)
    }
  })
})
