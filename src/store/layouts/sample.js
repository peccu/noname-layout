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
  sampleLayout,
  sampleLayout2
}
