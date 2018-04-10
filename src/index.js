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
    R.forEach(s => {
      console.log('section')
      svg.add(new X('line', { x1: s.startPoint.x, y1: s.startPoint.y, x2: s.endPoint.x, y2: s.endPoint.y, stroke: 'black' }))
    }, e.sections)
  }, root.edges || [])

  return svg.toString()
}
