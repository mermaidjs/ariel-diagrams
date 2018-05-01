/* eslint-env jest */
import * as logLevel from 'loglevel'

import { graph2elk } from '../src/index'

logLevel.getLogger('ariel/index').setLevel('DEBUG')

describe('graph to elk', () => {
  test('simple', () => {
    const graph = {

    }
    graph2elk(graph)
  })
})
