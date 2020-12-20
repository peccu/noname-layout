import {
  foundinPrimary,
  foundinSecondary,
  findBuffer
} from './find'

import {
  renumbering
} from './numbering'

import {
  makeBuffer,
  makeLayout
} from './make'

const split = (no, type, current) => {
  const primary = makeBuffer(0, current.buffer)
  const secondary = makeBuffer(0, current.buffer)
  return makeLayout(no, type, primary, secondary)
}

const putLayoutBufNo = (layout, bufNo, newLayout) => {
  if(bufNo < 0){
    return false
  }
  if(layout.type == 'buffer' && layout.no != bufNo){
    return layout
  }
  if(layout.type == 'buffer' && layout.no == bufNo){
    return newLayout
  }
  if(foundinPrimary(layout, bufNo)){
    return makeLayout(0, layout.type, newLayout, layout.secondary)
  }
  if(foundinSecondary(layout, bufNo)){
    return makeLayout(0, layout.type, layout.primary, newLayout)
  }
  const primary = putLayoutBufNo(layout.primary, bufNo, newLayout)
  if(primary != false){
    return primary
  }
  const secondary = putLayoutBufNo(layout.secondary, bufNo, newLayout)
  if(secondary != false){
    return secondary
  }
  return layout
}

const splitWindow = (prev, bufNo, type) => {
  const currentBuffer = findBuffer(prev, bufNo)
  if(!currentBuffer){
    console.error('error in find buffer')
    return false
  }
  const put = putLayoutBufNo(prev, bufNo, split(0, type, currentBuffer))
  const layout = renumbering(put)
  return layout
}

const splitWindowBelow = (layout, bufNo) => {
  return splitWindow(layout, bufNo, 'vertical')
}
const splitWindowRight = (layout, bufNo) => {
  return splitWindow(layout, bufNo, 'horizontal')
}

export {
  splitWindowBelow,
  splitWindowRight
}
