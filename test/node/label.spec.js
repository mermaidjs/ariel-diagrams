/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('node label', () => {
  test('one node label', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100,
          labels: [{
            text: 'hello world'
          }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-node-label.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '150', height: '150' },
        ['svg', { x: '25', y: '25', width: '100', height: '100' },
          ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }],
          ['text', { x: '50%', y: '50%', stroke: 'black', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, 'hello world']
        ]
      ])
  })

  test('nested node labels', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          labels: [{
            text: 'aaa'
          }],
          children: [
            {
              id: 'n1',
              width: 100,
              height: 100,
              labels: [{
                text: 'bbb'
              }]
            },
            {
              id: 'n2',
              width: 100,
              height: 100,
              labels: [{
                text: 'ccc🤓'
              }]
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'nested-node-labels.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '325', height: '200' },
        ['svg', { x: '25', y: '25', width: '275', height: '150' },
          ['rect', { x: '1', y: '1', width: '273', height: '148', stroke: 'black', fill: 'none' }],
          ['svg', { width: '275', height: '25' },
            ['text', { x: '50%', y: '50%', stroke: 'black', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, 'aaa']
          ],
          ['svg', { x: '25', y: '25', width: '100', height: '100' },
            ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }],
            ['text', { x: '50%', y: '50%', stroke: 'black', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, 'bbb']
          ],
          ['svg', { x: '150', y: '25', width: '100', height: '100' },
            ['rect', { x: '1', y: '1', width: '98', height: '98', stroke: 'black', fill: 'none' }],
            ['text', { x: '50%', y: '50%', stroke: 'black', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, 'ccc🤓']
          ]
        ]
      ])
  })
})
