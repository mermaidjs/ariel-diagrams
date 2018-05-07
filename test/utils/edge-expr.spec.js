/* eslint-env jest */
import { parseEdgeExpr } from '../../src/utils/edge'

describe('edge expr', () => {
  test('simple', () => {
    const edge = parseEdgeExpr('A ==> B')
    expect(edge).toEqual({
      sources: ['A'],
      targets: ['B'],
      markers: [{
        id: '>',
        position: 'end'
      }]
    })
  })

  test('no marker', () => {
    const edge = parseEdgeExpr('A == B')
    expect(edge).toEqual({
      sources: ['A'],
      targets: ['B']
    })
  })

  test('complicated', () => {
    const edge = parseEdgeExpr('A <=<=> B')
    expect(edge).toEqual({
      sources: ['A'],
      targets: ['B'],
      markers: [
        {
          id: '<',
          position: 'start'
        },
        {
          id: '<',
          position: 'mid'
        },
        {
          id: '>',
          position: 'end'
        }
      ]
    })
  })

  test('white spaces', () => {
    const edge = parseEdgeExpr('A  <  =  <  =  >  B')
    expect(edge).toEqual({
      sources: ['A'],
      targets: ['B'],
      markers: [
        {
          id: '<',
          position: 'start'
        },
        {
          id: '<',
          position: 'mid'
        },
        {
          id: '>',
          position: 'end'
        }
      ]
    })
  })
})
