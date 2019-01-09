import Store from './store'

const $ = global.$

$.fn.select = function ({ onChange }) {
  const store = new Store()
  const items = this.children('li')

  store.listen('itemSelected', (value) => {
    if (onChange) {
      onChange(value)
    }
  })

  /* Update active class */
  items.each((idx, el) => {
    const li = $(el)
    const value = li.data('value')
    store.listen('itemSelected', (newValue) => {
      li.toggleClass('active', value === newValue)
    })
  })

  /* Listen click events */
  items.on('click', (evt) => {
    const li = $(evt.target)
    const value = li.data('value')
    store.dispatch('itemSelected', value)
  })

  return this
}
