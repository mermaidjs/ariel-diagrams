import * as R from 'ramda'

export const hasDirectedEdge = node => {
  if (node.edges && R.any(e => e.type === 'DIRECTED', node.edges)) {
    return true
  }
  if (node.children && R.any(n => hasDirectedEdge(n), node.children)) {
    return true
  }
  return false
}
