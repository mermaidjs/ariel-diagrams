/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('layoutOptions inheritance', () => {
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
          children: [
            {
              id: 'n4',
              labels: [{ text: 'Laptop' }]
            },
            {
              id: 'n5',
              labels: [{ text: 'iPhone' }]
            }
          ],
          edges: [
            {
              sources: ['n4'],
              targets: ['n5'],
              type: 'DIRECTED',
              labels: [{ text: 'One' }]
            }
          ]
        }
      ],
      edges: [
        {
          sources: ['n1'],
          targets: ['n2'],
          type: 'DIRECTED',
          labels: [{ width: 80, text: 'Get money' }]
        },
        {
          sources: ['n2'],
          targets: ['n3'],
          type: 'DIRECTED'
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'layoutOptionsInheritance.svg'), xmlFormat(svg))
  })
})
