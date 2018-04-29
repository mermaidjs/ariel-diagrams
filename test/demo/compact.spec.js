/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('generate SVG', () => {
  test('hello world', async () => {
    const graph = {
      id: 'root',
      layoutOptions: {
        'elk.direction': 'DOWN',
        'elk.layered.crossingMinimization.semiInteractive': true
      },
      children: [
        {
          id: 'n1',
          labels: [{ text: 'Chrismas' }]
        },
        {
          id: 'n2',
          labels: [{ text: 'Go shopping' }]
        },
        {
          id: 'n3',
          labels: [{ text: 'Let me think' }]
        },
        {
          id: 'n4',
          labels: [{ text: 'Laptop' }],
          layoutOptions: { 'elk.position': '(1,0)' }
        },
        {
          id: 'n5',
          labels: [{ text: 'iPhone' }],
          layoutOptions: { 'elk.position': '(2,0)' }
        },
        {
          id: 'n6',
          labels: [{ text: 'Car' }],
          layoutOptions: { 'elk.position': '(3,0)' }
        }
      ],
      edges: [
        {
          id: 'e1',
          sources: ['n1'],
          targets: ['n2'],
          type: 'DIRECTED',
          labels: [{ width: 80, height: 20, text: 'Get money' }]
        },
        {
          id: 'e2',
          sources: ['n2'],
          targets: ['n3'],
          type: 'DIRECTED'
        },
        {
          id: 'e3',
          sources: ['n3'],
          targets: ['n4'],
          type: 'DIRECTED',
          labels: [{ width: 60, height: 20, text: 'One' }]
        },
        {
          id: 'e4',
          sources: ['n3'],
          targets: ['n5'],
          type: 'DIRECTED',
          labels: [{ width: 60, height: 20, text: 'Two' }]
        },
        {
          id: 'e5',
          sources: ['n3'],
          targets: ['n6'],
          type: 'DIRECTED',
          labels: [{ width: 60, height: 20, text: 'Three' }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    expect(xmlFormat(svg)).toBe(fs.readFileSync(path.join(__dirname, 'output', 'classic.svg'), 'utf-8'))
    fs.writeFileSync(path.join(__dirname, 'output', 'compact.svg'), xmlFormat(svg))
  })
})
