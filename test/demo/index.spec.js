/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('generate SVG', () => {
  test('hello world', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'hello-world.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '100', height: '100' }])
  })

  test('one node label', async () => {
    const graph = {
      id: 'root',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'RIGHT'
      },
      width: 100,
      height: 100,
      children: [
        {
          id: 'n1',
          label: {
            text: 'n1',
            width: 40,
            height: 20
          },
          width: 100,
          height: 100
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-node-label.svg'), xmlFormat(svg))
  })

  test('one nested node', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100,
      children: [
        {
          id: 'n0',
          width: 100,
          height: 100
        },
        {
          id: 'n1',
          layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' },
          children: [
            {
              id: 'n1-1',
              width: 60,
              height: 60
            },
            {
              id: 'n1-2',
              width: 60,
              height: 60
            }
          ],
          edges: [
            {
              type: 'DIRECTED',
              id: 'e2',
              sources: [ 'n1-2' ],
              targets: [ 'n1-1' ]
            }
          ]
        }
      ],
      edges: [
        {
          type: 'DIRECTED',
          id: 'e1',
          sources: [ 'n0' ],
          targets: [ 'n1' ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-nested-node.svg'), xmlFormat(svg))
  })
})
