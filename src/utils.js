import * as R from 'ramda'
import uuid from 'uuid/v1'

import { defaultSizeOptions as constantSizeOptions, defaultLayoutOptions as constantLayoutOptions } from './constants'

export const hasDirectedEdge = node => {
  if (node.edges && R.any(e => e.type === 'DIRECTED', node.edges)) {
    return true
  }
  if (node.children && R.any(n => hasDirectedEdge(n), node.children)) {
    return true
  }
  return false
}

export const preprocess = (node, defaultSizeOptions = constantSizeOptions, defaultLayoutOptions = constantLayoutOptions, parentLayoutOptions = {}) => {
  const layoutOptions = R.pipe(
    R.mergeDeepRight(parentLayoutOptions), // inherit parent layoutOptions
    R.pickBy((val, key) => !R.isNil(val) && val !== defaultLayoutOptions[key]) // Omit default values
  )(node.layoutOptions || {})
  if (R.isEmpty(layoutOptions)) {
    delete node['layoutOptions']
  } else {
    node.layoutOptions = layoutOptions
  }

  const sizeOptions = R.mergeDeepRight(defaultSizeOptions, node.sizeOptions || {})

  // preprocess nodes
  if (R.isNil(node.id)) {
    node.id = uuid()
  }
  if (R.isNil(node.children) || R.isEmpty(node.children)) {
    node.width = node.width || sizeOptions.node.width
    node.height = node.height || sizeOptions.node.height
  } else { // has children
    node.children = R.map(c => preprocess(c, sizeOptions, defaultLayoutOptions, layoutOptions), node.children)
  }

  // preprocess edges
  if (!R.isNil(node.edges) && !R.isEmpty(node.edges)) {
    node.edges = R.map(edge => {
      if (R.isNil(edge.id)) {
        edge.id = uuid()
      }
      if (!R.isNil(edge.labels) && !R.isEmpty(edge.labels)) {
        edge.labels = R.map(label => {
          label.width = label.width || sizeOptions.edgeLabel.width
          label.height = label.height || sizeOptions.edgeLabel.height
          return label
        }, edge.labels)
      }
      return edge
    }, node.edges)
  }
  return node
}
