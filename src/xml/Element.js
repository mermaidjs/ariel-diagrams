class Element {
  constructor (tagName) {
    this.tagName = tagName
  }

  toString () {
    return `<${this.tagName}/>`
  }
}

export default Element
