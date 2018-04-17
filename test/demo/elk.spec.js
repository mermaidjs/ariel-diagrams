/* eslint-env jest */
import ELK from 'elkjs'
import fs from 'fs'
import path from 'path'

const elk = new ELK()

describe('elk', () => {
  test('', async () => {
    const options = await elk.knownLayoutOptions()
    fs.writeFileSync(path.join(__dirname, 'output', 'layoutOptions.json'), JSON.stringify(options, null, 2))
  })
})
