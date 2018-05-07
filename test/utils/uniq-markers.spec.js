/* eslint-env jest */
import { uniqMarkers } from '../../src/utils/index'

describe('uniq markers', () => {
  test('simple', () => {
    const markers = uniqMarkers({
      edges: [
        {
          markers: [{
            id: '>',
            position: 'mid'
          }]
        }
      ]
    })
    expect(markers).toEqual(['>'])
  })

  test('none', () => {
    const markers = uniqMarkers({
    })
    expect(markers).toEqual([])
  })

  test('two', () => {
    const markers = uniqMarkers({
      edges: [
        {
          markers: [
            {
              id: '>',
              position: 'mid'
            },
            {
              id: '<',
              position: 'end'
            }
          ]
        }
      ]
    })
    expect(markers).toEqual(['>', '<'])
  })

  test('no duplicate', () => {
    const markers = uniqMarkers({
      edges: [
        {
          markers: [
            {
              id: '>',
              position: 'mid'
            },
            {
              id: '<',
              position: 'end'
            },
            {
              id: '<',
              position: 'start'
            }
          ]
        }
      ]
    })
    expect(markers).toEqual(['>', '<'])
  })

  test('children', () => {
    const markers = uniqMarkers({
      children: [{
        children: [{
          edges: [
            {
              markers: [{
                id: '<',
                position: 'mid'
              }]
            }
          ]
        }]
      }],
      edges: [
        {
          markers: [{
            id: '>',
            position: 'mid'
          }]
        }
      ]
    })
    expect(markers).toEqual(['>', '<'])
  })
})
