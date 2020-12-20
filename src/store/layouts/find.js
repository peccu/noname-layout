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

// find nearest hlayout for resizing horizontal
const nearestHLayout = (layout, nth, found) => {
  return _nearestLayout('horizontal', layout, nth, found)
}

// find nearest vlayout for resizeing horizontal
const nearestVLayout = (layout, nth, found) => {
  return _nearestLayout('vertical', layout, nth, found)
}

export {
  foundinPrimary,
  foundinSecondary,
  findLayoutNo,
  findBuffer,
  nearestHLayout,
  nearestVLayout
}
