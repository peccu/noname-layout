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

import {
  findLayoutNo,
  nearestHLayout,
  nearestVLayout
} from './find'

import {
  splitWindowBelow,
  splitWindowRight
} from './split'

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
