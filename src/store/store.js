import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
  state () {
    return {
      count: 0,
      frames: [],
      windows: [],
      buffers: []
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    splitBelow (state, payload) {
      const newWindow = {
        buffer: payload.currentWindow.buffer
      }
      state.windows.splice(payload.nth, 0, newWindow)
    },
    splitRight (state, payload) {
      const newWindow = {
        buffer: payload.currentWindow.buffer
      }
      state.windows.splice(payload.nth, 0, newWindow)
    }
  }
})
