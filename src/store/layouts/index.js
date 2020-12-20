/*
 * horizontal layout
 *
 * +-----------+-----------+
 * |           |           |
 * |  Primary  | Secondary |
 * |           |           |
 * +-----------+-----------+
 *
 * { type: 'horizontal',
 *   no, primary, secondary }
 *
 * */
/*
 * vertical layout
 *
 * +-----------+
 * |           |
 * |  Primary  |
 * |           |
 * +-----------+
 * |           |
 * | Secondary |
 * |           |
 * +-----------+
 *
 * { type: 'vertical',
 *   no, primary, secondary }
 *
 * */



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
  if(nth < 0 || (layout.type == 'buffer' && layout.no != nth)){
    // maybe not found
    return false
  }
  if(layout.type == 'buffer' && layout.no == nth){
    // maybe no split
    return {layer: 0, direction: 1}
  }
  if(foundinPrimary(layout, nth)){
    return {layer: layout.no, direction: 1}
  }
  if(foundinSecondary(layout, nth)){
    return {layer: layout.no, direction: -1}
  }
  const primary = findLayoutNo(layout.primary, nth)
  if(primary != false){
    return primary
  }
  const secondary = findLayoutNo(layout.secondary, nth)
  if(secondary != false){
    return secondary
  }
  return false
}

const findBuffer = (layout, nth) => {
  if(nth < 0 || (layout.type == 'buffer' && layout.no != nth)){
    // maybe not found
    return false
  }
  if(layout.type == 'buffer' && layout.no == nth){
    // this is it
    return layout
  }
  if(foundinPrimary(layout, nth)){
    return layout.primary
  }
  if(foundinSecondary(layout, nth)){
    return layout.secondary
  }
  const primary = findLayoutNo(layout.primary, nth)
  if(primary != false){
    return primary
  }
  const secondary = findLayoutNo(layout.secondary, nth)
  if(secondary != false){
    return secondary
  }
  return false
}

const opposite = (type) => {
  return type == 'horizontal' && 'vertical' || 'horizontal'
}

const _nearestLayout = (type, layout, nth, found) => {
  if(!found){
    found = false
  }
  if(nth < 0 || layout.type == 'buffer'){
    // no split means no separator
    return false
  }
  if(layout.type == type && foundinPrimary(layout, nth)){
    // fund in left
    return {layer: layout.no, direction: 1}
  }
  if(layout.type == type && foundinSecondary(layout, nth)){
    // fund in right
    return {layer: layout.no, direction: -1}
  }
  if(layout.type == opposite(type) &&
     (foundinPrimary(layout, nth) || foundinSecondary(layout, nth))){
    // fund with vertical separator
    return found
  }
  const primaryFound = {layer: layout.no, direction: 1}
  const primary = _nearestLayout(type, layout.primary, nth, primaryFound)
  if(primary != false){
    return primary
  }
  const secondaryFound = {layer: layout.no, direction: -1}
  const secondary = _nearestLayout(type, layout.secondary, nth, secondaryFound)
  if(secondary != false){
    return secondary
  }
  return false
}

// make buffer
const makeBuffer = (no, buffer) => {
  return {
    no,
    type: 'buffer',
    buffer: buffer
  }
}

// find nearest hlayout for resizing horizontal
const nearestHLayout = (layout, nth, found) => {
  return _nearestLayout('horizontal', layout, nth, found)
}

// find nearest vlayout for resizeing horizontal
const nearestVLayout = (layout, nth, found) => {
  return _nearestLayout('vertical', layout, nth, found)
}

const makeLayout = (no, type, primary, secondary) => {
  return {
    no,
    type,
    primary,
    secondary
  }
}

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

import {
  sampleLayout,
  sampleLayout2
} from './sample'

export {
  findLayoutNo,
  nearestHLayout,
  nearestVLayout,
  splitWindowBelow,
  splitWindowRight,
  sampleLayout,
  sampleLayout2
}
