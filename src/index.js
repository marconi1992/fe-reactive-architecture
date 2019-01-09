import Store from './store'

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

  store.listen('itemSelected', (value) => {
    console.info('itemSelected', value)
  })

  const input = $('input')

  store.listen('itemSelected', (value) => {
    input.val(value)
  })

  const listItems = $('ul > li')

  listItems.each((idx, el) => {
    const li = $(el)
    const value = li.data('value')
    store.listen('itemSelected', (newValue) => {
      li.toggleClass('active', value === newValue)
    })
  })

  listItems.on('click', (evt) => {
    const li = $(evt.target)
    const value = li.data('value')
    store.dispatch('itemSelected', value)
  })
})
