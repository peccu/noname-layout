import {
  findLayoutNo,
  sampleLayout,
  nearestHLayout,
  nearestVLayout,
} from './layouts.js'

// find layoutno
const buffer = (no) => {
  return {
    no,
    type: 'buffer',
    buffer: "some buffer left"
  }
}

const split = (no, type, primary, secondary) => {
  return {
    no,
    type,
    primary,
    secondary
  }
}
const vsplit = (no, primary, secondary) => {
  return split(no, 'horizontal', primary, secondary)
}
const hsplit = (no, primary, secondary) => {
  return split(no, 'vertical', primary, secondary)
}

const firstlayout = buffer(0)
test('first', () => {
  // with 0 returns 0
  expect(findLayoutNo(firstlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with -1 throws not found
  expect(findLayoutNo(firstlayout, -1)).toStrictEqual(false)
  // with 1 throus not found
  expect(findLayoutNo(firstlayout, 1)).toStrictEqual(false)
})

const vsplitlayout = vsplit(0, buffer(0), buffer(1))
test('vsplit', () => {
  // with 0 returns 0 left
  expect(findLayoutNo(vsplitlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with 1 returns 0 right
  expect(findLayoutNo(vsplitlayout, 1)).toStrictEqual({layer: 0, direction: -1})
  // with -1 throws not found
  expect(findLayoutNo(vsplitlayout, -1)).toStrictEqual(false)
  // with 2 throus not found
  expect(findLayoutNo(vsplitlayout, 2)).toStrictEqual(false)
})

const hsplitlayout = hsplit(0, buffer(0), buffer(1))
test('hsplit', () => {
  // with 0 returns 0 top
  expect(findLayoutNo(hsplitlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with 1 returns 0 bottom
  expect(findLayoutNo(hsplitlayout, 1)).toStrictEqual({layer: 0, direction: -1})
  // with -1 throws not found
  expect(findLayoutNo(hsplitlayout, -1)).toStrictEqual(false)
  // with 2 throus not found
  expect(findLayoutNo(hsplitlayout, 2)).toStrictEqual(false)
})

const vhsplitlayout = vsplit(0, buffer(0), hsplit(1, buffer(1), buffer(2)))
test('vhsplit', () => {
  // with 0 returns 0 left(primary)
  expect(findLayoutNo(vhsplitlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with 1 returns 1 top(primary)
  expect(findLayoutNo(vhsplitlayout, 1)).toStrictEqual({layer: 1, direction: 1})
  // with 2 returns 1 bottom(secondary)
  expect(findLayoutNo(vhsplitlayout, 2)).toStrictEqual({layer: 1, direction: -1})
  // with -1 throws not found
  expect(findLayoutNo(vhsplitlayout, -1)).toStrictEqual(false)
  // with 3 throus not found
  expect(findLayoutNo(vhsplitlayout, 3)).toStrictEqual(false)
})

const nearest = vsplit(0, buffer(0), hsplit(1, vsplit(2, buffer(1), hsplit(3, buffer(2), buffer(3))), buffer(4)))
test('find horizontal nearest layout no for resize vertical', () => {
  expect(nearestHLayout(firstlayout, 0)).toStrictEqual(false)
  expect(nearestHLayout(hsplitlayout, 0)).toStrictEqual(false)
  expect(nearestHLayout(vsplitlayout, -1)).toStrictEqual(false)
  expect(nearestHLayout(vsplitlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestHLayout(vsplitlayout, 1)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestHLayout(vsplitlayout, 2)).toStrictEqual(false)

  console.log(nearest)
  expect(nearestHLayout(nearest, 0)).toStrictEqual(false)
  expect(nearestHLayout(nearest, 1)).toStrictEqual({layer: 1, direction: 1})
  expect(nearestHLayout(nearest, 2)).toStrictEqual({layer: 3, direction: 1})
  expect(nearestHLayout(nearest, 3)).toStrictEqual({layer: 3, direction: -1})
  expect(nearestHLayout(nearest, 4)).toStrictEqual({layer: 1, direction: -1})
})

test('find vertical nearest layout no for resize horizontal', () => {
  expect(nearestVLayout(firstlayout, 0)).toStrictEqual(false)
  expect(nearestVLayout(vsplitlayout, 0)).toStrictEqual(false)
  expect(nearestVLayout(hsplitlayout, -1)).toStrictEqual(false)
  expect(nearestVLayout(hsplitlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestVLayout(hsplitlayout, 1)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestVLayout(hsplitlayout, 2)).toStrictEqual(false)

  expect(nearestVLayout(nearest, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestVLayout(nearest, 1)).toStrictEqual({layer: 2, direction: 1})
  expect(nearestVLayout(nearest, 2)).toStrictEqual({layer: 2, direction: -1})
  expect(nearestVLayout(nearest, 3)).toStrictEqual({layer: 2, direction: -1})
  expect(nearestVLayout(nearest, 4)).toStrictEqual({layer: 0, direction: -1})
})

test('', () => {
  expect().toStrictEqual()
})

test('', () => {
  expect().toStrictEqual()
})

test('', () => {
  expect().toStrictEqual()
})
