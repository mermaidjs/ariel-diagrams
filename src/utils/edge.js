import * as R from 'ramda'

export const parseEdgeExpr = expr => {
  const regex = /([A-Za-z_-]+)\s*([><]*)\s*=\s*([><]*)\s*=\s*([><]*)\s*([A-Za-z_-]+)/
  const [, source, start, mid, end, target] = R.match(regex, expr)
  const result = {
    sources: [source],
    targets: [target],
    markers: R.reject(m => R.isEmpty(m.id), [
      {
        id: start,
        position: 'start'
      },
      {
        id: mid,
        position: 'mid'
      },
      {
        id: end,
        position: 'end'
      }
    ])
  }
  if (R.isEmpty(result.markers)) {
    delete result['markers']
  }
  return result
}
