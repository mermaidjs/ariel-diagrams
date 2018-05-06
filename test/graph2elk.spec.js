/* eslint-env jest */
import * as logLevel from 'loglevel'
import * as R from 'ramda'

import { graph2elk } from '../src/index'
import { defaultLayoutOptions } from '../src/constants'

logLevel.getLogger('ariel/index').setLevel('DEBUG')

describe('graph to elk', () => {
  test('empty', () => {
    const graph = {}
    const { elkGraph, layoutOptions } = graph2elk(graph)
    expect(R.omit(['id'], elkGraph)).toEqual({ width: 100, height: 50 })
    expect(layoutOptions).toEqual(defaultLayoutOptions)
  })

  test('size options as method params', () => {
    const graph = {}
    const { elkGraph, layoutOptions } = graph2elk(graph, { size: { node: { width: 120, height: 60 } } })
    expect(R.omit(['id'], elkGraph)).toEqual({ width: 120, height: 60 })
    expect(layoutOptions).toEqual(defaultLayoutOptions)
  })

  test('size options as graph props', () => {
    const graph = { width: 140, height: 70 }
    const { elkGraph, layoutOptions } = graph2elk(graph, { size: { node: { width: 120, height: 60 } } })
    expect(R.omit(['id'], elkGraph)).toEqual({ width: 140, height: 70 })
    expect(layoutOptions).toEqual(defaultLayoutOptions)
  })

  describe('inheritance', () => {
    test('empty', () => {
      const graph = {
        children: [
          {
          }
        ]
      }
      const { elkGraph, layoutOptions } = graph2elk(graph)
      expect(R.omit(['id'], elkGraph.children[0])).toEqual({ width: 100, height: 50 })
      expect(layoutOptions).toEqual(defaultLayoutOptions)
    })

    test('inherit size', () => {
      const graph = {
        sizeOptions: {
          node: {
            width: 120,
            height: 60
          }
        },
        children: [
          {
          },
          {
          }
        ]
      }
      const { elkGraph, layoutOptions } = graph2elk(graph)
      expect(R.omit(['id'], elkGraph.children[0])).toEqual({ width: 120, height: 60 })
      expect(R.omit(['id'], elkGraph.children[1])).toEqual({ width: 120, height: 60 })
      expect(layoutOptions).toEqual(defaultLayoutOptions)
    })

    test('multiple level inherit size', () => {
      const graph = {
        sizeOptions: {
          node: {
            width: 120,
            height: 60
          }
        },
        children: [
          {
            children: [
              {
                children: [
                  {
                  },
                  {
                  }
                ]
              }
            ]
          }
        ]
      }
      const { elkGraph, layoutOptions } = graph2elk(graph)
      expect(R.omit(['id'], elkGraph.children[0].children[0].children[0])).toEqual({ width: 120, height: 60 })
      expect(R.omit(['id'], elkGraph.children[0].children[0].children[1])).toEqual({ width: 120, height: 60 })
      expect(layoutOptions).toEqual(defaultLayoutOptions)
    })

    test('override inheritance', () => {
      const graph = {
        sizeOptions: {
          node: {
            width: 120,
            height: 60
          }
        },
        children: [
          {
            children: [
              {
                sizeOptions: {
                  node: {
                    width: 140
                  }
                },
                children: [
                  {
                  },
                  {
                    width: 160
                  }
                ]
              }
            ]
          }
        ]
      }
      const { elkGraph, layoutOptions } = graph2elk(graph)
      expect(R.omit(['id'], elkGraph.children[0].children[0].children[0])).toEqual({ width: 140, height: 60 })
      expect(R.omit(['id'], elkGraph.children[0].children[0].children[1])).toEqual({ width: 160, height: 60 })
      expect(layoutOptions).toEqual(defaultLayoutOptions)
    })
  })

  describe('layoutOptions', () => {
    test('simple', () => {
      const graph = {
        layoutOptions: {
          'elk.direction': 'DOWN'
        },
        children: [
          {
            children: [
              {
                layoutOptions: {
                  'elk.direction': 'UP'
                },
                children: [
                  {
                  },
                  {
                    layoutOptions: {
                      'elk.direction': 'RIGHT'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
      const { elkGraph, layoutOptions } = graph2elk(graph)
      expect(elkGraph.layoutOptions['elk.direction']).toBe('DOWN')
      expect(elkGraph.children[0].layoutOptions['elk.direction']).toBe('DOWN')
      expect(elkGraph.children[0].children[0].layoutOptions['elk.direction']).toBe('UP')
      expect(elkGraph.children[0].children[0].children[0].layoutOptions['elk.direction']).toBe('UP')
      expect(elkGraph.children[0].children[0].children[1].layoutOptions).toBeUndefined()
      expect(layoutOptions).toEqual(defaultLayoutOptions)
    })
  })
})
