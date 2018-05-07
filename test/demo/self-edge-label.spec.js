/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import xmlFormat from 'xml-formatter'

import { graph2svg } from '../../src/index'

describe('generate SVG', () => {
  test('hello world', async () => {
    const graph = {
      id: 'root',
      children: [
        {
          id: 'n1',
          width: 100,
          height: 100,
          labels: [{ text: 'n1' }]
        },
        {
          id: 'n2',
          width: 100,
          height: 100,
          labels: [{ text: 'n2' }]
        }
      ],
      edges: [
        {
          markers: [
            {
              id: '>',
              position: 'end'
            }
          ],
          id: 'e1',
          sources: ['n1'],
          targets: ['n2'],
          labels: [
            {
              width: 80,
              height: 20,
              text: 'hello'
            }
          ]
        },
        {
          markers: [
            {
              id: '>',
              position: 'end'
            }
          ],
          id: 'e2',
          sources: ['n2'],
          targets: ['n2'],
          labels: [
            {
              width: 80,
              height: 20,
              text: 'world'
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'self-edge-label.svg'), xmlFormat(svg))
  })
})
