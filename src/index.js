import ELK from 'elkjs'
import * as R from 'ramda'

import X from './xml/Element'
import { hasDirectedEdge } from './utils'

const elk = new ELK({
  defaultLayoutOptions: {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',
    'elk.padding': '[top=12,left=12,bottom=12,right=12]'
  }
})

const createNode = n => {
  // node
  const node = new X('svg', R.pick(['x', 'y', 'width', 'height'], n))
  node.append(new X('rect', R.merge(R.pick(['width', 'height'], n), { fill: 'none', stroke: 'black' })))

  // node label
  if (!R.isNil(n.labels) && !R.isEmpty(n.labels)) {
    R.forEach(l => {
      node.append(
        new X('text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', stroke: 'black' }, l.text)
      )
    }, n.labels) // todo: do not support multiple labels
  }

  // sub nodes, recursive
  if (!R.isNil(n.children) && !R.isEmpty(n.children)) {
    R.forEach(subN => {
      const subNode = createNode(subN)
      node.append(subNode)
    }, n.children)
  }

  // edges
  if (!R.isNil(n.edges) && !R.isEmpty(n.edges)) {
    R.forEach(e => {
      const d = R.pipe(
        R.map(s => `M ${s.startPoint.x} ${s.startPoint.y} L ${s.endPoint.x} ${s.endPoint.y}`),
        R.join(' ')
      )(e.sections)
      const edge = new X('path', { d, stroke: 'black' })
      if (e.type === 'DIRECTED') {
        edge.set('marker-end', 'url(#arrow)')
      }
      node.append(edge)

      // edge label
      if (!R.isNil(e.labels) && !R.isEmpty(e.labels)) {
        R.forEach(l => {
          node.append(new X('svg', R.pick(['x', 'y', 'width', 'height'], l), [
            new X('rect', { width: l.width, height: l.height, fill: 'gray' }),
            new X('text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', stroke: 'black' }, l.text)
          ]))
        }, e.labels) // todo: do not support multiple labels
      }
    }, n.edges)
  }

  return node
}

export const graph2svg = async (graph) => {
  const root = await elk.layout(graph)
  console.log(JSON.stringify(root, null, 2))
  const rootNode = createNode(root)
  rootNode.delete(['x', 'y'])
  rootNode.update({ xmlns: 'http://www.w3.org/2000/svg' })

  // remove rect for root node
  rootNode.shift()

  // arrow marker def
  if (hasDirectedEdge(root)) {
    rootNode.prepend(new X('defs', null,
      new X('marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
        new X('path', { d: 'M 0 0 L 0 6 L 8 3 Z' }))))
  }

  return rootNode.toString()
}
