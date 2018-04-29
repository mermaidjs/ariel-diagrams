import * as R from 'ramda'
import uuid from 'uuid/v1'

export const hasDirectedEdge = node => {
  if (node.edges && R.any(e => e.type === 'DIRECTED', node.edges)) {
    return true
  }
  if (node.children && R.any(n => hasDirectedEdge(n), node.children)) {
    return true
  }
  return false
}

const defaultSizeOptions = {
  node: { width: 100, height: 50 },
  edgeLabel: { width: 60, height: 20 }
}
export const preprocess = node => {
  // preprocess nodes
  if (R.isNil(node.id)) {
    node.id = uuid()
  }
  if (R.isNil(node.children) || R.isEmpty(node.children)) {
    node.width = node.width || defaultSizeOptions.node.width
    node.height = node.height || defaultSizeOptions.node.height
  } else { // has children
    node.children = R.map(c => preprocess(c), node.children)
  }

  // preprocess edges
  if (!R.isNil(node.edges) && !R.isEmpty(node.edges)) {
    node.edges = R.map(edge => {
      if (R.isNil(edge.id)) {
        edge.id = uuid()
      }
      if (!R.isNil(edge.labels) && !R.isEmpty(edge.labels)) {
        edge.labels = R.map(label => {
          label.width = label.width || defaultSizeOptions.edgeLabel.width
          label.height = label.height || defaultSizeOptions.edgeLabel.height
          return label
        }, edge.labels)
      }
      return edge
    }, node.edges)
  }
  return node
}
