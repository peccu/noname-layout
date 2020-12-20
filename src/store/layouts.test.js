import {
  findLayoutNo,
  sampleLayout,
  nearestHLayout,
  nearestVLayout,
  splitWindowBelow,
  splitWindowRight,
} from './layouts.js'

// find layoutno
const makeBuffer = (no, buffer) => {
  return {
    no,
    type: 'buffer',
    buffer: buffer
  }
}
const buffer = (no) => {
  return makeBuffer(no, "some buffer left")
}

const split = (no, type, primary, secondary) => {
  return {
    no,
    type,
    primary,
    secondary
  }
}
const splitRight = (no, primary, secondary) => {
  return split(no, 'horizontal', primary, secondary)
}
const splitBelow = (no, primary, secondary) => {
  return split(no, 'vertical', primary, secondary)
}


/* first layout
 * +-----+
 * |  0  |
 * +-----+
 * */
const _firstlayout = () => buffer(0)
const firstlayout = buffer(0)
/* horizontal layout (first -> split right(0))
 * +-----+-----+
 * |  0  |  1  |
 * +-----+-----+
 * */
const _horizontalLayout = () => splitRight(0, buffer(0), buffer(1))
const horizontalLayout = splitRight(0, buffer(0), buffer(1))
/* vertical layout (first -> split below(0))
 * +---+
 * | 0 |
 * +---+
 * | 1 |
 * +---+
 * */
const _verticalLayout = () => splitBelow(0, buffer(0), buffer(1))
const verticalLayout = splitBelow(0, buffer(0), buffer(1))
/* hv layout (horizontal -> split below(1))
 * +-----+-----+
 * |     |  1  |
 * |  0  +-----+
 * |     |  2  |
 * +-----+-----+
 * */
const _hvlayout = () => splitRight(0, buffer(0), splitBelow(1, buffer(1), buffer(2)))
const hvlayout = splitRight(0, buffer(0), splitBelow(1, buffer(1), buffer(2)))
/* vh layout (vertical -> split right(1))
 * +-------+
 * |   0   |
 * +---+---+
 * | 1 | 2 |
 * +---+---+
 * */
const _vhlayout = () => splitBelow(0, buffer(0), splitRight(1, buffer(1), buffer(2)))
const vhlayout = splitBelow(0, buffer(0), splitRight(1, buffer(1), buffer(2)))
/* nearest1 (nearest3 -> split right(1) -> split below (2))
 * +---+---+---+
 * |   |   | 2 |
 * |   | 1 +---+
 * | 0 |   | 3 |
 * |   +---+---+
 * |   |   4   |
 * +---+---+---+
 */
const _nearest1 = () => splitRight(0, buffer(0), splitBelow(1, splitRight(2, buffer(1), splitBelow(3, buffer(2), buffer(3))), buffer(4)))
const nearest1 = splitRight(0, buffer(0), splitBelow(1, splitRight(2, buffer(1), splitBelow(3, buffer(2), buffer(3))), buffer(4)))
/* nearest2 (horizontal -> split below(0))
 * +-----+-----+
 * |  0  |     |
 * +-----+  2  |
 * |  1  |     |
 * +-----+-----+
 * */
const _nearest2 = () => splitRight(0, splitBelow(1, buffer(0), buffer(1)), buffer(2))
const nearest2 = splitRight(0, splitBelow(1, buffer(0), buffer(1)), buffer(2))
/* nearest3 (vertical -> split right(0))
 * +---+---+
 * | 0 | 1 |
 * +---+---+
 * |   2   |
 * +-------+
 * */
const _nearest3 = () => splitBelow(0, splitRight(1, buffer(0), buffer(1)), buffer(2))
const nearest3 = splitBelow(0, splitRight(1, buffer(0), buffer(1)), buffer(2))

test('first', () => {
  // with 0 returns 0
  expect(findLayoutNo(firstlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with -1 throws not found
  expect(findLayoutNo(firstlayout, -1)).toStrictEqual(false)
  // with 1 throus not found
  expect(findLayoutNo(firstlayout, 1)).toStrictEqual(false)
})

test('vseparator', () => {
  // with 0 returns 0 left
  expect(findLayoutNo(horizontalLayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with 1 returns 0 right
  expect(findLayoutNo(horizontalLayout, 1)).toStrictEqual({layer: 0, direction: -1})
  // with -1 throws not found
  expect(findLayoutNo(horizontalLayout, -1)).toStrictEqual(false)
  // with 2 throus not found
  expect(findLayoutNo(horizontalLayout, 2)).toStrictEqual(false)
})

test('hseparator', () => {
  // with 0 returns 0 top
  expect(findLayoutNo(verticalLayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with 1 returns 0 below
  expect(findLayoutNo(verticalLayout, 1)).toStrictEqual({layer: 0, direction: -1})
  // with -1 throws not found
  expect(findLayoutNo(verticalLayout, -1)).toStrictEqual(false)
  // with 2 throus not found
  expect(findLayoutNo(verticalLayout, 2)).toStrictEqual(false)
})

test('vhseparator', () => {
  // with 0 returns 0 left(primary)
  expect(findLayoutNo(hvlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  // with 1 returns 1 top(primary)
  expect(findLayoutNo(hvlayout, 1)).toStrictEqual({layer: 1, direction: 1})
  // with 2 returns 1 below(secondary)
  expect(findLayoutNo(hvlayout, 2)).toStrictEqual({layer: 1, direction: -1})
  // with -1 throws not found
  expect(findLayoutNo(hvlayout, -1)).toStrictEqual(false)
  // with 3 throus not found
  expect(findLayoutNo(hvlayout, 3)).toStrictEqual(false)
})

// nearest H Layout
test('find horizontal nearest layout no for resize horizontal from no layout', () => {
  expect(nearestHLayout(firstlayout, 0)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from vertical layout', () => {
  expect(nearestHLayout(verticalLayout, -1)).toStrictEqual(false)
  expect(nearestHLayout(verticalLayout, 0)).toStrictEqual(false)
  expect(nearestHLayout(verticalLayout, 1)).toStrictEqual(false)
  expect(nearestHLayout(verticalLayout, 2)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from horizontal layout', () => {
  expect(nearestHLayout(horizontalLayout, -1)).toStrictEqual(false)
  expect(nearestHLayout(horizontalLayout, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestHLayout(horizontalLayout, 1)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestHLayout(horizontalLayout, 2)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from hvlayout', () => {
  expect(nearestHLayout(hvlayout, -1)).toStrictEqual(false)
  expect(nearestHLayout(hvlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestHLayout(hvlayout, 1)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestHLayout(hvlayout, 2)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestHLayout(hvlayout, 3)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from vhlayout', () => {
  expect(nearestHLayout(vhlayout, -1)).toStrictEqual(false)
  expect(nearestHLayout(vhlayout, 0)).toStrictEqual(false)
  expect(nearestHLayout(vhlayout, 1)).toStrictEqual({layer: 1, direction: 1})
  expect(nearestHLayout(vhlayout, 2)).toStrictEqual({layer: 1, direction: -1})
  expect(nearestHLayout(vhlayout, 3)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from hvhvlayout', () => {
  expect(nearestHLayout(nearest1, -1)).toStrictEqual(false)
  expect(nearestHLayout(nearest1, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestHLayout(nearest1, 1)).toStrictEqual({layer: 2, direction: 1})
  expect(nearestHLayout(nearest1, 2)).toStrictEqual({layer: 2, direction: -1})
  expect(nearestHLayout(nearest1, 3)).toStrictEqual({layer: 2, direction: -1})
  expect(nearestHLayout(nearest1, 4)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestHLayout(nearest1, 5)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from v in hlayout', () => {
  expect(nearestHLayout(nearest2, -1)).toStrictEqual(false)
  expect(nearestHLayout(nearest2, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestHLayout(nearest2, 1)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestHLayout(nearest2, 2)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestHLayout(nearest2, 3)).toStrictEqual(false)
})
test('find horizontal nearest layout no for resize horizontal from h in vlayout', () => {
  expect(nearestHLayout(nearest3, -1)).toStrictEqual(false)
  expect(nearestHLayout(nearest3, 0)).toStrictEqual({layer: 1, direction: 1})
  expect(nearestHLayout(nearest3, 1)).toStrictEqual({layer: 1, direction: -1})
  expect(nearestHLayout(nearest3, 2)).toStrictEqual(false)
  expect(nearestHLayout(nearest3, 3)).toStrictEqual(false)
})

// nearest V Layout
test('find vertical nearest layout no for resize vertical from no layout', () => {
  expect(nearestVLayout(firstlayout, 0)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from horizontal layout', () => {
  expect(nearestVLayout(horizontalLayout, -1)).toStrictEqual(false)
  expect(nearestVLayout(horizontalLayout, 0)).toStrictEqual(false)
  expect(nearestVLayout(horizontalLayout, 1)).toStrictEqual(false)
  expect(nearestVLayout(horizontalLayout, 2)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from vertical layout', () => {
  expect(nearestVLayout(verticalLayout, -1)).toStrictEqual(false)
  expect(nearestVLayout(verticalLayout, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestVLayout(verticalLayout, 1)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestVLayout(verticalLayout, 2)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from vhlayout', () => {
  expect(nearestVLayout(vhlayout, -1)).toStrictEqual(false)
  expect(nearestVLayout(vhlayout, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestVLayout(vhlayout, 1)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestVLayout(vhlayout, 2)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestVLayout(vhlayout, 3)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from hvlayout', () => {
  expect(nearestVLayout(hvlayout, -1)).toStrictEqual(false)
  expect(nearestVLayout(hvlayout, 0)).toStrictEqual(false)
  expect(nearestVLayout(hvlayout, 1)).toStrictEqual({layer: 1, direction: 1})
  expect(nearestVLayout(hvlayout, 2)).toStrictEqual({layer: 1, direction: -1})
  expect(nearestVLayout(hvlayout, 3)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from hvhvlayout', () => {
  expect(nearestVLayout(nearest1, -1)).toStrictEqual(false)
  expect(nearestVLayout(nearest1, 0)).toStrictEqual(false)
  expect(nearestVLayout(nearest1, 1)).toStrictEqual({layer: 1, direction: 1})
  expect(nearestVLayout(nearest1, 2)).toStrictEqual({layer: 3, direction: 1})
  expect(nearestVLayout(nearest1, 3)).toStrictEqual({layer: 3, direction: -1})
  expect(nearestVLayout(nearest1, 4)).toStrictEqual({layer: 1, direction: -1})
  expect(nearestVLayout(nearest1, 5)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from v in hlayout', () => {
  expect(nearestVLayout(nearest2, -1)).toStrictEqual(false)
  expect(nearestVLayout(nearest2, 0)).toStrictEqual({layer: 1, direction: 1})
  expect(nearestVLayout(nearest2, 1)).toStrictEqual({layer: 1, direction: -1})
  expect(nearestVLayout(nearest2, 2)).toStrictEqual(false)
  expect(nearestVLayout(nearest2, 3)).toStrictEqual(false)
})
test('find vertical nearest layout no for resize vertical from h in vlayout', () => {
  expect(nearestVLayout(nearest3, -1)).toStrictEqual(false)
  expect(nearestVLayout(nearest3, 0)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestVLayout(nearest3, 1)).toStrictEqual({layer: 0, direction: 1})
  expect(nearestVLayout(nearest3, 2)).toStrictEqual({layer: 0, direction: -1})
  expect(nearestVLayout(nearest3, 3)).toStrictEqual(false)
})

test('split below from no split', () => {
  var a = splitWindowBelow(firstlayout, 0)
  console.log('splitbelow first', a)
  console.log('verticalLayout', verticalLayout)
  expect(a).toStrictEqual(verticalLayout)
  expect(firstlayout).toStrictEqual(_firstlayout())
  a = splitWindowBelow(horizontalLayout, 1)
  console.log('splitbelow horizontal', a)
  console.log('hvlayout', hvlayout)
  expect(a).toStrictEqual(hvlayout)
  expect(horizontalLayout).toStrictEqual(_horizontalLayout())
  a = splitWindowBelow(horizontalLayout, 0)
  console.log('splitwindowbelow horizontal', a)
  console.log('nearest2', nearest2)
  expect(splitWindowBelow(horizontalLayout, 0)).toStrictEqual(nearest2)
  expect(horizontalLayout).toStrictEqual(_horizontalLayout())
})
test('split right from no split', () => {
  expect(splitWindowRight(firstlayout, 0)).toStrictEqual(horizontalLayout)
  expect(splitWindowRight(verticalLayout, 1)).toStrictEqual(vhlayout)
})

// test('', () => {
//   expect().toStrictEqual()
// })

// test('', () => {
//   expect().toStrictEqual()
// })

// test('', () => {
//   expect().toStrictEqual()
// })
