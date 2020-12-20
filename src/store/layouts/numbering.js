import {
  makeBuffer,
  makeLayout
} from './make'

const renumberingLayout = (prev, current) => {
  if(current < 0){
    return {layout: false, max: 0}
  }
  if(prev.type == 'buffer'){
    // currently numbering to layout, so buffer is no effect
    return {layout: prev, max: current}
  }
  const {layout: primary, max: pMax} = renumberingLayout(prev.primary, current + 1)
  const {layout: secondary, max: sMax} = renumberingLayout(prev.secondary, pMax)
  const layout = makeLayout(current, prev.type, primary, secondary)
  return {layout: layout, max: sMax}
}

const renumberingBuffer = (prev, current) => {
  if(current < 0){
    return {layout: false, max: 0}
  }
  if(prev.type == 'buffer'){
    const layout = makeBuffer(current, prev.buffer)
    return {layout: layout, max: current}
  }
  const {layout: primary, max: pMax} = renumberingBuffer(prev.primary, current)
  const {layout: secondary, max: sMax} = renumberingBuffer(prev.secondary, pMax + 1)
  const layout = makeLayout(prev.no, prev.type, primary, secondary)
  return {layout: layout, max: sMax}
}

const renumbering = (original) => {
  const {layout: layoutNumbered} = renumberingLayout(original, 0)
  const {layout: bufferNumbered} = renumberingBuffer(layoutNumbered, 0)
  return bufferNumbered
}

export {
  renumbering
}
