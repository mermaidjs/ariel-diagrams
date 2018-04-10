/* eslint-env jest */
import Element from '../../src/xml/Element'

describe('XML Element', () => {
  test('Hello world', () => {
    expect(new Element('br').toString()).toBe('<br/>')
  })
})
