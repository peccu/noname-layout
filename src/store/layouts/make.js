// make buffer
const makeBuffer = (no, buffer) => {
  return {
    no,
    type: 'buffer',
    buffer: buffer
  }
}

const makeLayout = (no, type, primary, secondary) => {
  return {
    no,
    type,
    primary,
    secondary
  }
}

export {
  makeBuffer,
  makeLayout
}
