import ELK from 'elkjs'
import * as R from 'ramda'
import * as logLevel from 'loglevel'
import xmlFormat from 'xml-formatter'

import X from './xml/Element'
import { uniqMarkers, preprocess } from './utils'
import { defaultLayoutOptions, defaultSizeOptions, defaultMarkers } from './constants'

const log = logLevel.getLogger('ariel/index')

const elk = new ELK()

const createNode = (n, defaultLayoutOptions) => {
  // node
  const node = new X('svg', R.pick(['x', 'y', 'width', 'height'], n))
  const strokeWidth = 1
  const padding = Math.ceil(strokeWidth / 2) // padding to avoid cliping: https://stackoverflow.com/questions/7241393
  const shape = new X('rect', { x: padding, y: padding, width: n.width - padding * 2, height: n.height - padding * 2, fill: 'none', stroke: 'black', 'stroke-width': strokeWidth })
  if (shape.get('stroke-width') === 1) {
    shape.delete('stroke-width') // omit default value
  }
  node.append(shape)

  // node label
  if (!R.isNil(n.labels) && !R.isEmpty(n.labels)) {
    R.forEach(l => {
      let text = new X('text', { x: '50%', y: '50%', 'text-anchor': 'middle', 'dominant-baseline': 'central', stroke: 'black' }, l.text)
      if (!R.isNil(n.children) && !R.isEmpty(n.children)) { // has children, put label on top
        const padding = R.path(['layoutOptions', 'elk.padding'], node) || R.path(['elk.padding'], defaultLayoutOptions)
        const paddingTop = padding.split(/top=/)[1].split(',')[0]
        text = new X('svg', { width: n.width, height: paddingTop }, text)
      }
      node.append(text)
    }, n.labels) // todo: do not support multiple labels
  }

  // sub nodes, recursive
  if (!R.isNil(n.children) && !R.isEmpty(n.children)) {
    R.forEach(subN => {
      const subNode = createNode(subN, defaultLayoutOptions)
      node.append(subNode)
    }, n.children)
  }

  // edges
  if (!R.isNil(n.edges) && !R.isEmpty(n.edges)) {
    R.forEach(e => {
      const d = R.pipe(
        R.map(s => {
          let path = `M ${s.startPoint.x} ${s.startPoint.y}`
          R.forEach(p => {
            path += ` L ${p.x} ${p.y}`
          }, s.bendPoints || [])
          path += ` L ${s.endPoint.x} ${s.endPoint.y}`
          return path
        }),
        R.join(' ')
      )(e.sections)
      const edge = new X('path', { d, stroke: 'black', fill: 'none' })
      R.forEach(m => {
        edge.set(`marker-${m.position}`, `url(#${m.id})`)
      })(e.markers || [])
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

export const graph2elk = (graph, defaultOptions = {}) => {
  const layoutOptions = R.mergeDeepRight(defaultLayoutOptions, defaultOptions.layout || {})
  const sizeOptions = R.mergeDeepRight(defaultSizeOptions, defaultOptions.size || {})
  const elkGraph = preprocess(graph, sizeOptions, layoutOptions)
  if (log.getLevel() <= log.levels.DEBUG) {
    console.log(JSON.stringify(elkGraph, null, 2))
    console.log(JSON.stringify(layoutOptions, null, 2))
  }
  return { elkGraph, layoutOptions }
}

export const graph2svg = async (graph, defaultOptions = {}) => {
  const { elkGraph, layoutOptions } = graph2elk(graph, defaultOptions)
  const root = await elk.layout(elkGraph, { layoutOptions })
  if (log.getLevel() <= log.levels.DEBUG) {
    console.log(JSON.stringify(root, null, 2))
  }
  const rootNode = createNode(root, layoutOptions)
  rootNode.delete(['x', 'y'])
  rootNode.update({ xmlns: 'http://www.w3.org/2000/svg' })

  // remove rect for root node
  rootNode.shift()

  // arrow marker def
  const markers = uniqMarkers(root)
  if (!R.isEmpty(markers)) {
    rootNode.prepend(new X('defs', null, markers.map(m => defaultMarkers[m])))
  }

  const svg = rootNode.toString()
  if (log.getLevel() <= log.levels.DEBUG) {
    console.log(xmlFormat(svg))
  }
  return svg
}
