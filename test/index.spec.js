/* eslint-env jest */
import fs from 'fs'
import path from 'path'

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
    expect(svg).toBe('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>')
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
    expect(svg).toBe('<svg xmlns="http://www.w3.org/2000/svg" width="124" height="124"><rect x="12" y="12" width="100" height="100" stroke="black" fill="white"></rect></svg>')
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
    expect(svg).toBe('<svg xmlns="http://www.w3.org/2000/svg" width="236" height="124"><rect x="12" y="12" width="100" height="100" stroke="black" fill="white"></rect><rect x="124" y="12" width="100" height="100" stroke="black" fill="white"></rect></svg>')
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
    expect(svg).toBe('<svg xmlns="http://www.w3.org/2000/svg" width="244" height="124"><rect x="12" y="12" width="100" height="100" stroke="black" fill="white"></rect><rect x="132" y="12" width="100" height="100" stroke="black" fill="white"></rect><line x1="112" y1="62" x2="132" y2="62" stroke="black"></line></svg>')
  })
})
