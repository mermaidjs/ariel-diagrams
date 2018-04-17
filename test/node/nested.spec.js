/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('node nested', () => {
  test('one nested node', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          children: [
            {
              id: 'n1-1',
              width: 100,
              height: 100
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-nested-node.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '148', height: '148' },
        ['svg', { x: '12', y: '12', width: '124', height: '124' },
          ['rect', { width: '124', height: '124', stroke: 'black', fill: 'none' }],
          ['svg', { x: '12', y: '12', width: '100', height: '100' },
            ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
          ]
        ]
      ])
  })

  test('two nested nodes', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          children: [
            {
              id: 'n1-1',
              width: 100,
              height: 100
            },
            {
              id: 'n1-2',
              width: 100,
              height: 100
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'two-nested-nodes.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '260', height: '148' },
        ['svg', { x: '12', y: '12', width: '236', height: '124' },
          ['rect', { width: '236', height: '124', stroke: 'black', fill: 'none' }],
          ['svg', { x: '12', y: '12', width: '100', height: '100' },
            ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
          ],
          ['svg', { x: '124', y: '12', width: '100', height: '100' },
            ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }]
          ]
        ]
      ])
  })
})
