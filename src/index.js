import ELK from 'elkjs'
import * as R from 'ramda'

import X from './xml/Element'

const elk = new ELK()

const createSVG = (nodes, edges) => {
  const svg = new X('svg')
  if (R.isNil(nodes) || R.isEmpty(nodes)) {
    return svg
  }

  R.forEach(n => {
    // node
    const node = new X('rect', R.merge(R.pick(['x', 'y', 'width', 'height'], n), { stroke: 'black', fill: 'none' }))
    svg.append(node)

    // sub nodes
    if (!R.isNil(n.children) && !R.isEmpty(n.children)) {
      const innerSVG = createSVG(n.children, n.edges)
      innerSVG.update(R.pick(['x', 'y', 'width', 'height'], n))
      svg.append(innerSVG)
    }
  }, nodes)

  if (R.isNil(edges) || R.isEmpty(edges)) {
    return svg
  }

  // arrow marker def
  if (R.any(e => e.type === 'DIRECTED', edges)) {
    svg.prepend(new X('defs', null,
      new X('marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
        new X('path', { d: 'M 0 0 L 0 6 L 8 3 Z' }))))
  }

  R.forEach(e => {
    // edge
    const d = R.pipe(
      R.map(s => `M ${s.startPoint.x} ${s.startPoint.y} L ${s.endPoint.x} ${s.endPoint.y}`),
      R.join(' ')
    )(e.sections)
    const edge = new X('path', { d, stroke: 'black' })
    if (e.type === 'DIRECTED') {
      edge.set('marker-end', 'url(#arrow)')
    }
    svg.append(edge)

    // edge label
    if (!R.isNil(e.labels) && !R.isEmpty(e.labels)) {
      R.forEach(l => {
        svg.append(new X('svg', R.pick(['x', 'y', 'width', 'height'], l), [
          new X('rect', { x: 0, y: 0, width: l.width, height: l.height, fill: 'gray' }),
          new X('text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', stroke: 'black' }, l.text)
        ]))
      }, e.labels)
    }
  }, edges)
  return svg
}

export const graph2svg = async (graph) => {
  // console.log(await elk.knownLayoutOptions())
  const root = await elk.layout(graph)
  console.log(JSON.stringify(root, null, 2))
  const svg = createSVG(root.children, root.edges)
  svg.update({ xmlns: 'http://www.w3.org/2000/svg', width: root.width, height: root.height })
  return svg.toString()
}
