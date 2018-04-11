import ELK from 'elkjs'
import * as R from 'ramda'

import X from './xml/Element'

const elk = new ELK()

export const graph2svg = async (graph) => {
  const root = await elk.layout(graph)
  console.log(JSON.stringify(root, null, 2))
  const svg = new X('svg', { xmlns: 'http://www.w3.org/2000/svg', width: root.width, height: root.height })
  R.forEach(n => {
    svg.add(new X('rect', { x: n.x, y: n.y, width: n.width, height: n.height, stroke: 'black', fill: 'white' }))
  }, root.children || [])
  R.forEach(e => {
    const d = R.pipe(
      R.map(s => `M ${s.startPoint.x} ${s.startPoint.y} L ${s.endPoint.x} ${s.endPoint.y}`),
      R.join(' ')
    )(e.sections)
    svg.add(new X('path', { d, stroke: 'black' }))
  }, root.edges || [])
  return svg.toString()
}
