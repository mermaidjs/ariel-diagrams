import ELK from 'elkjs'
import * as R from 'ramda'
import * as logLevel from 'loglevel'
import xmlFormat from 'xml-formatter'

import X from './xml/Element'
import { hasDirectedEdge, preprocess } from './utils'
import { defaultLayoutOptions, defaultSizeOptions } from './constants'

const log = logLevel.getLogger('ariel/index')

const createNode = n => {
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
        const padding = R.path(['layoutOptions', 'elk.padding'], node) || R.path(['defaultLayoutOptions', 'elk.padding'], elk)
        const paddingTop = padding.split(/top=/)[1].split(',')[0]
        text = new X('svg', { width: n.width, height: paddingTop }, text)
      }
      node.append(text)
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

export const graph2elk = (graph, defaultOptions = {}) => {
  if (R.isNil(defaultOptions.layout)) {
    defaultOptions.layout = {}
  }
  if (R.isNil(defaultOptions.size)) {
    defaultOptions.size = {}
  }
  const elkGraph = preprocess(graph, R.merge(defaultSizeOptions, defaultOptions.size))
  const elk = new ELK({ defaultLayoutOptions: R.merge(defaultLayoutOptions, defaultOptions.layout) })
  if (log.getLevel() <= log.levels.DEBUG) {
    console.log(elk.defaultLayoutOptions)
    console.log(elkGraph)
  }
  return { elk, elkGraph }
}

export const graph2svg = async (graph, defaultOptions = {}) => {
  const { elk, elkGraph } = graph2elk(graph, defaultOptions)
  const root = await elk.layout(elkGraph)
  if (log.getLevel() <= log.levels.DEBUG) {
    console.log(root)
  }
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

  const svg = rootNode.toString()
  if (log.getLevel() <= log.levels.DEBUG) {
    console.log(xmlFormat(svg))
  }
  return svg
}
