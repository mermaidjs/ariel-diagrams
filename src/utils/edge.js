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

// remove unnecessary points from path
export const simplifyPath = points => {
  let lastPoint = {}
  const temp = []

  // remove adjacent duplicates
  R.forEach(p => {
    if (p.x !== lastPoint.x || p.y !== lastPoint.y) {
      temp.push(p)
      lastPoint = p
    }
  }, points)

  // remove middle point if three points on the same line
  // todo: can only detect vertical and horizontal lines:
  // https://stackoverflow.com/questions/3813681/checking-to-see-if-3-points-are-on-the-same-line
  const toRemoveIndexes = []
  for (let i = 1; i < temp.length - 1; i++) {
    if ((temp[i - 1].x === temp[i].x && temp[i].x === temp[i + 1].x) || (temp[i - 1].y === temp[i].y && temp[i].y === temp[i + 1].y)) {
      toRemoveIndexes.push(i)
    }
  }

  return R.addIndex(R.reject)((p, idx) => R.contains(idx, toRemoveIndexes))(temp)
}
