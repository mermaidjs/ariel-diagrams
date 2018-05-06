import * as R from 'ramda'

export const noId = (graph) => {
  let r = R.dissoc(['id'], graph)
  if (!R.isNil(r.children) && !R.isEmpty(r.children)) {
    r.children = R.map(n => noId(n), r.children)
  }
  if (!R.isNil(r.edges) && !R.isEmpty(r.edges)) {
    r.edges = R.map(R.dissoc(['id']), r.edges)
  }
  return r
}
