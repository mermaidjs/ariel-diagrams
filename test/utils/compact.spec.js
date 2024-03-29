/* eslint-env jest */
import { graph2elk } from '../../src/index'
import { noId } from '../shared'

describe('compact graph JSON format', () => {
  test('hello', () => {
    const graph1 = {
      id: 'root',
      layoutOptions: {
        'elk.direction': 'DOWN',
        'elk.layered.crossingMinimization.semiInteractive': true
      },
      children: [
        {
          id: 'n1',
          width: 100,
          height: 50,
          labels: [{ text: 'Christmas' }]
        },
        {
          id: 'n2',
          width: 100,
          height: 50,
          labels: [{ text: 'Go shopping' }]
        },
        {
          id: 'n3',
          width: 100,
          height: 50,
          labels: [{ text: 'Let me think' }]
        },
        {
          id: 'n4',
          width: 100,
          height: 50,
          labels: [{ text: 'Laptop' }],
          layoutOptions: { 'elk.position': '(1,0)' }
        },
        {
          id: 'n5',
          width: 100,
          height: 50,
          labels: [{ text: 'iPhone' }],
          layoutOptions: { 'elk.position': '(2,0)' }
        },
        {
          id: 'n6',
          width: 100,
          height: 50,
          labels: [{ text: 'Car' }],
          layoutOptions: { 'elk.position': '(3,0)' }
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: ['n1'],
          targets: ['n2'],
          type: 'DIRECTED',
          labels: [{ width: 80, height: 20, text: 'Get money' }]
        },
        {
          id: 'e2',
          sources: ['n2'],
          targets: ['n3'],
          type: 'DIRECTED'
        },
        {
          id: 'e3',
          sources: ['n3'],
          targets: ['n4'],
          type: 'DIRECTED',
          labels: [{ width: 60, height: 20, text: 'One' }]
        },
        {
          id: 'e4',
          sources: ['n3'],
          targets: ['n5'],
          type: 'DIRECTED',
          labels: [{ width: 60, height: 20, text: 'Two' }]
        },
        {
          id: 'e5',
          sources: ['n3'],
          targets: ['n6'],
          type: 'DIRECTED',
          labels: [{ width: 60, height: 20, text: 'Three' }]
        }
      ]
    }

    const graph2 = {
      layoutOptions: {
        'elk.direction': 'DOWN',
        'elk.layered.crossingMinimization.semiInteractive': true
      },
      children: [
        {
          id: 'n1',
          labels: [{ text: 'Christmas' }]
        },
        {
          id: 'n2',
          labels: [{ text: 'Go shopping' }]
        },
        {
          id: 'n3',
          labels: [{ text: 'Let me think' }]
        },
        {
          id: 'n4',
          labels: [{ text: 'Laptop' }],
          layoutOptions: { 'elk.position': '(1,0)' }
        },
        {
          id: 'n5',
          labels: [{ text: 'iPhone' }],
          layoutOptions: { 'elk.position': '(2,0)' }
        },
        {
          id: 'n6',
          labels: [{ text: 'Car' }],
          layoutOptions: { 'elk.position': '(3,0)' }
        }
      ],
      edges: [
        {
          sources: ['n1'],
          targets: ['n2'],
          type: 'DIRECTED',
          labels: [{ width: 80, text: 'Get money' }]
        },
        {
          sources: ['n2'],
          targets: ['n3'],
          type: 'DIRECTED'
        },
        {
          sources: ['n3'],
          targets: ['n4'],
          type: 'DIRECTED',
          labels: [{ text: 'One' }]
        },
        {
          sources: ['n3'],
          targets: ['n5'],
          type: 'DIRECTED',
          labels: [{ text: 'Two' }]
        },
        {
          sources: ['n3'],
          targets: ['n6'],
          type: 'DIRECTED',
          labels: [{ text: 'Three' }]
        }
      ]
    }

    const r1 = graph2elk(graph1)
    const r2 = graph2elk(graph2)

    expect(r1.layoutOptions).toEqual(r2.layoutOptions)
    expect(noId(r1.elkGraph)).toEqual(noId(r2.elkGraph))
  })
})
