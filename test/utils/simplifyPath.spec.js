/* eslint-env jest */
import { simplifyPath } from '../../src/utils/edge'

describe('edge expr', () => {
  test('simple', () => {
    expect(simplifyPath([{ x: 1, y: 1 }])).toEqual([{ x: 1, y: 1 }])
  })

  test('real', () => {
    expect(simplifyPath([
      { x: 150, y: 91.66666666666666 },
      { x: 137.5, y: 91.66666666666666 },
      { x: 125, y: 91.66666666666666 },
      { x: 125, y: 91.66666666666666 }
    ])).toEqual([{ x: 150, y: 91.66666666666666 }, { x: 125, y: 91.66666666666666 }])
  })
})
