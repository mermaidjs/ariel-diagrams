/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('node basic', () => {
  test('one node', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100,
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-node.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '124', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
      ])
  })

  test('two nodes', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100,
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
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'two-nodes.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '236', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '124', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
      ])
  })
})
