/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('edge label', () => {
  test('one edge label', async () => {
    const graph = {
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
      ],
      edges: [
        {
          type: 'DIRECTED',
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ],
          labels: [{
            text: 'hello world',
            width: 80,
            height: 20
          }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-edge-label.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '344', height: '124' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '12', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '232', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 112 62 L 232 62', stroke: 'black', 'marker-end': 'url(#arrow)' }],
        ['svg', { x: '132', y: '65', width: '80', height: '20' },
          ['rect', { width: '80', height: '20', fill: 'gray' }],
          ['text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', 'stroke': 'black' }, 'hello world']
        ]
      ])
  })

  test('inline edge label', async () => {
    const graph = {
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
      ],
      edges: [
        {
          type: 'DIRECTED',
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ],
          labels: [{
            text: 'hello world',
            width: 80,
            height: 20,
            layoutOptions: {
              inline: true
            }
          }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'inline-edge-label.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '344', height: '124' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '12', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '232', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 112 62 L 232 62', stroke: 'black', 'marker-end': 'url(#arrow)' }],
        ['svg', { x: '132', y: '51.5', width: '80', height: '20' },
          ['rect', { width: '80', height: '20', fill: 'gray' }],
          ['text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', 'stroke': 'black' }, 'hello world']
        ]
      ])
  })
})
