/* eslint-env jest */
import fs from 'fs'
import path from 'path'
import onml from 'onml'
import xmlFormat from 'xml-formatter'

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
    fs.writeFileSync(path.join(__dirname, 'output', 'one-edge.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '132', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['path', { d: 'M 112 62 L 132 62', stroke: 'black' }]
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
    fs.writeFileSync(path.join(__dirname, 'output', 'two-edges.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '132', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['path', { d: 'M 112 78.66666666666666 L 132 78.66666666666666', stroke: 'black' }],
        ['path', { d: 'M 132 45.33333333333333 L 112 45.33333333333333', stroke: 'black' }]
      ])
  })

  test('one arrow', async () => {
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
          type: 'DIRECTED',
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-arrow.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '132', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['path', { d: 'M 112 62 L 132 62', stroke: 'black', 'marker-end': 'url(#arrow)' }]
      ])
  })

  test('two arrows', async () => {
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
          type: 'DIRECTED',
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ]
        },
        {
          type: 'DIRECTED',
          id: 'e2',
          sources: [ 'n2' ],
          targets: [ 'n1' ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'two-arrows.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '244', height: '124' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '132', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['path', { d: 'M 112 78.66666666666666 L 132 78.66666666666666', stroke: 'black', 'marker-end': 'url(#arrow)' }],
        ['path', { d: 'M 132 45.33333333333333 L 112 45.33333333333333', stroke: 'black', 'marker-end': 'url(#arrow)' }]
      ])
  })

  test('one nested node', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100,
      children: [
        {
          id: 'n1',
          children: [
            {
              id: 'n1-1',
              width: 100,
              height: 100
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-nested-node.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '148', height: '148' },
        ['rect', { x: '12', y: '12', width: '124', height: '124', stroke: 'black', fill: 'white' }],
        ['svg', { x: '12', y: '12', width: '124', height: '124' },
          ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
        ]
      ])
  })

  test('two nested nodes', async () => {
    const graph = {
      id: 'root',
      layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
      width: 100,
      height: 100,
      children: [
        {
          id: 'n1',
          children: [
            {
              id: 'n1-1',
              width: 100,
              height: 100
            },
            {
              id: 'n1-2',
              width: 100,
              height: 100
            }
          ]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'two-nested-nodes.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '260', height: '148' },
        ['rect', { x: '12', y: '12', width: '236', height: '124', stroke: 'black', fill: 'white' }],
        ['svg', { x: '12', y: '12', width: '236', height: '124' },
          ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
          ['rect', { x: '124', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
        ]
      ])
  })

  test('one edge label', async () => {
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
          type: 'DIRECTED',
          id: 'e1',
          sources: [ 'n1' ],
          targets: [ 'n2' ],
          labels: [{
            text: 'hello world',
            width: 80,
            height: 20
          }]
        }
      ]
    }
    const svg = await graph2svg(graph)
    fs.writeFileSync(path.join(__dirname, 'output', 'one-edge-label.svg'), xmlFormat(svg))
    expect(onml.parse(svg)).toEqual(
      ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '344', height: '124' },
        ['defs', {},
          ['marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
            ['path', { d: 'M 0 0 L 0 6 L 8 3 Z' }]
          ]
        ],
        ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['rect', { x: '232', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }],
        ['path', { d: 'M 112 62 L 232 62', stroke: 'black', 'marker-end': 'url(#arrow)' }],
        ['svg', { x: '132', y: '65', width: '80', height: '20' },
          ['rect', { x: '0', y: '0', width: '80', height: '20', fill: 'gray' }],
          ['text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', 'stroke': 'black' }, 'hello world']
        ]
      ])
  })

  // test('one node label', async () => {
  //   const graph = {
  //     id: 'root',
  //     layoutOptions: {
  //       'elk.algorithm': 'layered',
  //       'elk.direction': 'RIGHT',
  //       'elk.nodeLabels.placement': 'INSIDE H_CENTER V_CENTER'
  //     },
  //     width: 100,
  //     height: 100,
  //     children: [
  //       {
  //         id: 'n1',
  //         label: { text: 'n1',
  //           width: 40,
  //           height: 20,
  //           layoutOptions: {
  //             'elk.nodeLabels.placement': 'INSIDE H_CENTER V_CENTER'
  //           } },
  //         width: 100,
  //         height: 100
  //       }
  //     ]
  //   }
  //   const svg = await graph2svg(graph)
  //   fs.writeFileSync(path.join(__dirname, 'output', 'one-node-label.svg'), xmlFormat(svg))
  //   expect(onml.parse(svg)).toEqual(
  //     ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '124', height: '124' },
  //       ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
  //     ])
  // })

  // test('one nested node', async () => {
  //   const graph = {
  //     id: 'root',
  //     layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'RIGHT' },
  //     width: 100,
  //     height: 100,
  //     children: [
  //       {
  //         id: 'n0',
  //         width: 100,
  //         height: 100
  //       },
  //       {
  //         id: 'n1',
  //         layoutOptions: { 'elk.algorithm': 'layered', 'elk.direction': 'DOWN' },
  //         children: [
  //           {
  //             id: 'n1-1',
  //             width: 60,
  //             height: 60
  //           },
  //           {
  //             id: 'n1-2',
  //             width: 60,
  //             height: 60
  //           }
  //         ],
  //         edges: [
  //           {
  //             type: 'DIRECTED',
  //             id: 'e2',
  //             sources: [ 'n1-2' ],
  //             targets: [ 'n1-1' ]
  //           }
  //         ]
  //       }
  //     ],
  //     edges: [
  //       {
  //         type: 'DIRECTED',
  //         id: 'e1',
  //         sources: [ 'n0' ],
  //         targets: [ 'n1' ]
  //       }
  //     ]
  //   }
  //   const svg = await graph2svg(graph)
  //   fs.writeFileSync(path.join(__dirname, 'output', 'one-nested-node.svg'), xmlFormat(svg))
  //   expect(onml.parse(svg)).toEqual(
  //     ['svg', { xmlns: 'http://www.w3.org/2000/svg', width: '124', height: '124' },
  //       ['rect', { x: '12', y: '12', width: '100', height: '100', stroke: 'black', fill: 'white' }]
  //     ])
  // })
})
