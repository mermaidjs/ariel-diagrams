/* eslint-env jest */
import * as logLevel from 'loglevel'

import { graph2svg } from '../src/index'

logLevel.getLogger('ariel/index').setLevel('DEBUG')

describe('graph to svg', () => {
  test('simple', async () => {
    const graph = {

    }
    await graph2svg(graph)
  })
})
