/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('edge label', () => {
  test('non-inline edge label', async () => {
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
              'elk.edgeLabels.inline': false
            }
          }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'non-inline-edge-label.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '380', height: '150' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '25', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '255', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 125 75 L 255 75', stroke: 'black', 'marker-end': 'url(#arrow)' }],
        ['svg', { x: '150', y: '78', width: '80', height: '20' },
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
            height: 20
          }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'inline-edge-label.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '380', height: '150' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['svg', { x: '25', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '255', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 125 75 L 255 75', stroke: 'black', 'marker-end': 'url(#arrow)' }],
        ['svg', { x: '150', y: '64.5', width: '80', height: '20' },
          ['rect', { width: '80', height: '20', fill: 'gray' }],
          ['text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', 'stroke': 'black' }, 'hello world']
        ]
      ])
  })
})
