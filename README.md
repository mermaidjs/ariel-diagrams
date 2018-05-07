# Ariel

Create diagrams from text in a similar manner as markdown

Ariel is the sister project of [mermaid](https://github.com/knsv/mermaid).

> Ariel is a fictional character and the title character of Walt Disney Pictures' 28th animated film The Little Mermaid (1989).

![Ariel](https://upload.wikimedia.org/wikipedia/en/7/77/Ariel_disney.png)


## Install

```
yarn add ariel-diagrams
```


## Usage

```js
import { graph2svg } from 'ariel-diagrams'

const graph = {
    children: [
        {
            labels: [{ text: 'Chrismas' }]
        }
    ]
}

const svg = await graph2svg(graph)
```


## Graph format

Ref: https://www.eclipse.org/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html


## FAQ

#### What are the differences between ariel-diagrams and mermaid?

The underlying layout engines are different. arield-diagrams is powered by [elkjs](https://github.com/OpenKieler/elkjs) while mermaid is powered by [dagre](https://github.com/dagrejs)

ariel is a node library, it can work without a browser. mermaid requires browser to work. [mermaid.cli](https://github.com/mermaidjs/mermaid.cli) is for node, but it also depends on headless browser solution puppeteer.
