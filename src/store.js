class Store {
  listenerMap = {}

  listen (event, listener) {
    if (!this.listenerMap[event]) {
      this.listenerMap[event] = []
    }
    this.listenerMap[event].push(listener)
  }

  dispatch (event, payload) {
    const listeners = this.listenerMap[event]
    if (listeners) {
      const promises = listeners.reduce((acc, cur) => {
        acc.push(new Promise((resolve) => {
          resolve(cur(payload))
        }))
        return acc
      }, [])
      Promise.all(promises)
    }
  }
}

export default Store
