import { findLayoutNo, sampleLayout } from './layouts.js'

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
const v = (no, primary, secondary) => {
  return split(no, 'horizontal', primary, secondary)
}
const h = (no, primary, secondary) => {
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

const vsplitlayout = v(0, buffer(0), buffer(1))
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

const hsplitlayout = h(0, buffer(0), buffer(1))
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

const vhsplitlayout = v(0, buffer(0), h(1, buffer(1), buffer(2)))
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

test('', () => {

})
