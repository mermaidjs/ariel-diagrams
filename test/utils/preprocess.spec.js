/* eslint-env jest */
import { preprocess } from '../../src/utils'

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

  test('explicit edge label size', () => {
    let graph = {
      id: 'root',
      children: [
        {
          id: 'n1'
        },
        {
          id: 'n2'
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: ['n1'],
          targets: ['n2'],
          labels: [
            {
              width: 70,
              height: 30,
              text: 'hello'
            }
          ]
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.edges[0].labels[0].width).toBe(70)
    expect(graph.edges[0].labels[0].height).toBe(30)
  })

  test('implicit edge label size', () => {
    let graph = {
      id: 'root',
      children: [
        {
          id: 'n1'
        },
        {
          id: 'n2'
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: ['n1'],
          targets: ['n2'],
          labels: [
            {
              text: 'hello'
            }
          ]
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.edges[0].labels[0].width).toBe(60)
    expect(graph.edges[0].labels[0].height).toBe(20)
  })

  test('explicit node id', () => {
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
    expect(graph.id).toBe('root')
    expect(graph.children[0].id).toBe('n1')
    expect(graph.children[1].id).toBe('n2')
  })

  test('implicit node id', () => {
    let graph = {
      children: [
        {
        },
        {
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.id).toBeDefined()
    expect(graph.children[0].id).toBeDefined()
    expect(graph.children[1].id).toBeDefined()
  })

  test('explicit edge id', () => {
    let graph = {
      id: 'root',
      children: [
        {
          id: 'n1'
        },
        {
          id: 'n2'
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: ['n1'],
          targets: ['n2'],
          labels: [
            {
              text: 'hello'
            }
          ]
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.edges[0].id).toBe('e1')
  })

  test('auto generate edge id', () => {
    let graph = {
      id: 'root',
      children: [
        {
          id: 'n1'
        },
        {
          id: 'n2'
        }
      ],
      edges: [
        {
          sources: ['n1'],
          targets: ['n2'],
          labels: [
            {
              text: 'hello'
            }
          ]
        }
      ]
    }
    graph = preprocess(graph)
    expect(graph.edges[0].id).toBeDefined()
  })
})
