import ELK from 'elkjs'
import * as R from 'ramda'

import X from './xml/Element'

const elk = new ELK()

export const graph2svg = async (graph) => {
  const root = await elk.layout(graph)
  console.log(JSON.stringify(root, null, 2))
  const svg = new X('svg', { xmlns: 'http://www.w3.org/2000/svg', width: root.width, height: root.height })
  R.forEach(n => {
    svg.append(new X('rect', { x: n.x, y: n.y, width: n.width, height: n.height, stroke: 'black', fill: 'white' }))
  }, root.children || [])
  if (R.any(e => e.type === 'DIRECTED', root.edges || [])) {
    svg.prepend(new X('defs', null,
      new X('marker', { id: 'arrow', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
        new X('path', { d: 'M 0 0 L 0 6 L 8 3 Z' }))))
  }
  R.forEach(e => {
    const d = R.pipe(
      R.map(s => `M ${s.startPoint.x} ${s.startPoint.y} L ${s.endPoint.x} ${s.endPoint.y}`),
      R.join(' ')
    )(e.sections)
    const edge = new X('path', { d, stroke: 'black' })
    if (e.type === 'DIRECTED') {
      edge.set('marker-end', 'url(#arrow)')
    }
    svg.append(edge)
  }, root.edges || [])
  return svg.toString()
}
