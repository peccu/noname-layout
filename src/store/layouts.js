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
  if(nth < 0){
    return false
  }
  if(layout.type == 'buffer' && layout.no != nth){
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

const sum = (a, b) => {
  return a + b
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
export {
  sum,
  findLayoutNo,
  sampleLayout
}
