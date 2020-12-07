import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
  state () {
    return {
      count: 0,
      frames: [],
      left: [
        50,
        50,
        50
      ],
      layouts: {
        type: 'horizontal',
        left: {
          type: 'buffer',
          buffer: "some buffer"
        },
        right: {
          type: 'vertical',
          top: {
            type: 'buffer',
            buffer: "some buffer"
          },
          bottom: {
            type: 'buffer',
            buffer: "some buffer"
          },
          size: 50
        },
        size: 50
      },
      windows: [
        {buffer: "some buffer"},
        {buffer: "some buffer"},
        {buffer: "some buffer"}
      ],
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
