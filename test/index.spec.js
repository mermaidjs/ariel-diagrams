/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'

import { graph2svg } from '../src/index'

describe('generate SVG', () => {
  test('hello world', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100
    }
    const svg = await graph2svg(graph)
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '100', height: '100' }])
  })

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
    fs.writeFileSync(path.join(__dirname, 'output', 'one-node.svg'), svg)
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
    fs.writeFileSync(path.join(__dirname, 'output', 'two-nodes.svg'), svg)
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '236', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '124', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
      ])
  })

  test('one edge', async () => {
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
    fs.writeFileSync(path.join(__dirname, 'output', 'one-edge.svg'), svg)
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '132', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['line', { x1: '112', y1: '62', x2: '132', y2: '62', stroke: 'black' }]
      ])
  })

  test('two edges', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'LEFT' },
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
    fs.writeFileSync(path.join(__dirname, 'output', 'two-edges.svg'), svg)
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '132', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['line', { x1: '112', y1: '78.66666666666666', x2: '132', y2: '78.66666666666666', stroke: 'black' }],
        ['line', { x1: '132', y1: '45.33333333333333', x2: '112', y2: '45.33333333333333', stroke: 'black' }]
      ])
  })
})
