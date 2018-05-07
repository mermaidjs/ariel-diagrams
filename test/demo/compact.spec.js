/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import xmlFormat from 'xml-formatter'
// import * as logLevel from 'loglevel'

import { graph2svg } from '../../src/index'

// logLevel.getLogger('ariel/index').setLevel('DEBUG')

describe('compact graph syntax', () => {
  test('hello world', async () => {
    const graph = {
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
          expr: 'n1 ==> n2',
          labels: [{ width: 80, text: 'Get money' }]
        },
        {
          expr: 'n2 ==> n3'
        },
        {
          expr: 'n3 ==> n4',
          labels: [{ text: 'One' }]
        },
        {
          expr: 'n3 ==> n5',
          labels: [{ text: 'Two' }]
        },
        {
          expr: 'n3 ==> n6',
          labels: [{ text: 'Three' }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    expect(xmlFormat(svg)).toBe(fs.readFileSync(path.join(__dirname, 'output', 'classic.svg'), 'utf-8'))
    fs.writeFileSync(path.join(__dirname, 'output', 'compact.svg'), xmlFormat(svg))
  })
})
