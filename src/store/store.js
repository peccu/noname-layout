import { createStore } from 'vuex'

import {
  sampleLayout,
  nearestHLayout,
  nearestVLayout,
} from './layouts.js'

// Create a new store instance.
export default createStore({
  state () {
    return {
      count: 0,
      frames: [],
      size: [
        30,
        50
      ],
      activeWindow: 0,
      layout: sampleLayout,
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
    otherWindow (state) {
      state.activeWindow = (state.activeWindow + 1) % state.windows.length
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
    },
    enlargeWindow (state) {
      let result = nearestVLayout(state.layout, state.activeWindow)
      if(!result){return}
      state.size[result.layer] += result.direction * 10
    },
    shrinkWindow (state) {
      let result = nearestVLayout(state.layout, state.activeWindow)
      if(!result){return}
      state.size[result.layer] -= result.direction * 10
    },
    enlargeWindowHorizontally (state) {
      let result = nearestHLayout(state.layout, state.activeWindow)
      if(!result){return}
      state.size[result.layer] += result.direction * 10
    },
    shrinkWindowHorizontally (state) {
      let result = nearestHLayout(state.layout, state.activeWindow)
      if(!result){return}
      state.size[result.layer] -= result.direction * 10
    }
  }
})
