/* eslint-env jest */
import { preprocess } from '../../src/index'

describe('processor', () => {
  test('explicit node size', () => {
    let graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100
        },
        {
          id: 'n2',
          width: 100,
          height: 100
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.children[0].width).toBe(100)
    expect(graph.children[0].height).toBe(100)
    expect(graph.children[1].width).toBe(100)
    expect(graph.children[1].height).toBe(100)
  })

  test('implicit node size', () => {
    let graph = {
      id: 'root',
      children: [
        {
          id: 'n1'
        },
        {
          id: 'n2'
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.children[0].width).toBe(100)
    expect(graph.children[0].height).toBe(50)
    expect(graph.children[1].width).toBe(100)
    expect(graph.children[1].height).toBe(50)
  })
})
