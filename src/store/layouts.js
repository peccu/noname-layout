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


const sampleLayout = {
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
}
const sampleLayout2 = {
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
}
export {
  findLayoutNo,
  nearestHLayout,
  nearestVLayout,
  sampleLayout,
  sampleLayout2
}
