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
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }],
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
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '124', height: '124' },
        ['svg', { x: '12', y: '12', width: '100', height: '100' },
          ['rect', { width: '100', height: '100', stroke: 'black', fill: 'none' }],
          ['text', { x: '50%', y: '50%', stroke: 'black', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, 'hello world']
        ]
      ])
  })
})
