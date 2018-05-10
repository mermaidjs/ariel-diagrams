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
    layoutOptions: {
    'elk.direction': 'DOWN',
    'elk.layered.crossingMinimization.semiInteractive': true
    },
    children: [
    {
        id: 'n1',
        label: 'Chrismas'
    },
    {
        id: 'n2',
        label: 'Go shopping'
    },
    {
        id: 'n3',
        label: 'Let me think'
    },
    {
        id: 'n4',
        label: 'Laptop',
        layoutOptions: { 'elk.position': '(1,0)' }
    },
    {
        id: 'n5',
        label: 'iPhone',
        layoutOptions: { 'elk.position': '(2,0)' }
    },
    {
        id: 'n6',
        label: 'Car',
        layoutOptions: { 'elk.position': '(3,0)' }
    }
    ],
    edges: [
    {
        expr: 'n1 ==> n2',
        label: { width: 80, text: 'Get money' }
    },
    {
        expr: 'n2 ==> n3'
    },
    {
        expr: 'n3 ==> n4',
        label: 'One'
    },
    {
        expr: 'n3 ==> n5',
        label: 'Two'
    },
    {
        expr: 'n3 ==> n6',
        label: 'Three'
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
