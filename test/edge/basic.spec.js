/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('edge basic', () => {
  test('one edge', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
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
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-edge.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['svg', { x: '12', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '132', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 112 62 L 132 62', stroke: 'black' }]
      ])
  })

  test('two edges', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'LEFT' },
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
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ]
        },
        {
          id: 'e2',
          sources: [ 'n2' ],
          targets: [ 'n1' ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'two-edges.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['svg', { x: '12', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['svg', { x: '132', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
        ],
        ['path', { d: 'M 112 78.66666666666666 L 132 78.66666666666666', stroke: 'black' }],
        ['path', { d: 'M 132 45.33333333333333 L 112 45.33333333333333', stroke: 'black' }]
      ])
  })
})
