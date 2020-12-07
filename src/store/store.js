import { createStore } from 'vuex'

// const traverse = (tree, nth, action, i) => {
//   if(i === null){
//     console.log('null')
//   }else{
//     console.log('foo', i)
//   }
// }

const foundinPrimary = (layout, nth) => {
  return layout.type != 'buffer'
    && (layout.primary.type == 'buffer' && layout.primary.no == nth)
}

const foundinSecondary = (layout, nth) => {
  return layout.type != 'buffer'
    && (layout.secondary.type == 'buffer' && layout.secondary.no == nth)
}

const findLayoutNo = (layout, nth) => {
  if(foundinPrimary(layout, nth)){
    return {layer: layout.no, direction: 1}
  }
  if(foundinSecondary(layout, nth)){
    return {layer: layout.no, direction: -1}
  }
  if(layout.type == 'buffer' && layout.no != nth){
    return false
  }
  const primary = findLayoutNo(layout.primary, nth)
  if(primary != false){
    return primary
  }
  const secondary = findLayoutNo(layout.secondary, nth)
  if(secondary != false){
    return secondary
  }
}

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
      layout: {
        no: 0,
        type: 'horizontal',
        primary: {
          no: 0,
          type: 'buffer',
          buffer: "some buffer left"
        },
        secondary: {
          no: 1,
          type: 'vertical',
          primary: {
            no: 1,
            type: 'buffer',
            buffer: "some buffer right top"
          },
          secondary: {
            no: 2,
            type: 'buffer',
            buffer: "some buffer right bottom"
          }
        }
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
      let result = findLayoutNo(state.layout, state.activeWindow)
      state.size[result.layer] += result.direction * 10
    },
    shrinkWindow (state) {
      let result = findLayoutNo(state.layout, state.activeWindow)
      state.size[result.layer] -= result.direction * 10
    },
    enlargeWindowHorizontally (state) {
      let result = findLayoutNo(state.layout, state.activeWindow)
      state.size[result.layer] += result.direction * 10
    },
    shrinkWindowHorizontally (state) {
      let result = findLayoutNo(state.layout, state.activeWindow)
      state.size[result.layer] -= result.direction * 10
    }
  }
})
