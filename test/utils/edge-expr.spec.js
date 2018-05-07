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

  test('numbers in id', () => {
    const edge = parseEdgeExpr('n1  <  =  <  =  >  n2')
    expect(edge).toEqual({
      sources: ['n1'],
      targets: ['n2'],
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
