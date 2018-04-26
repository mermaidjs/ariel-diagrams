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
    id: 'root',
    layoutOptions: {
        'elk.direction': 'DOWN',
        'elk.layered.crossingMinimization.semiInteractive': true
    },
    children: [
    {
        id: 'n1',
        width: 100,
        height: 50,
        labels: [{ text: 'Chrismas' }]
    },
    {
        id: 'n2',
        width: 100,
        height: 50,
        labels: [{ text: 'Go shopping' }]
    },
    {
        id: 'n3',
        width: 100,
        height: 50,
        labels: [{ text: 'Let me think' }]
    },
    {
        id: 'n4',
        width: 100,
        height: 50,
        labels: [{ text: 'Laptop' }],
        layoutOptions: { 'elk.position': '(1,0)' }
    },
    {
        id: 'n5',
        width: 100,
        height: 50,
        labels: [{ text: 'iPhone' }],
        layoutOptions: { 'elk.position': '(2,0)' }
    },
    {
        id: 'n6',
        width: 100,
        height: 50,
        labels: [{ text: 'Car' }],
        layoutOptions: { 'elk.position': '(3,0)' }
    }
    ],
    edges: [
    {
        id: 'e1',
        sources: ['n1'],
        targets: ['n2'],
        type: 'DIRECTED',
        labels: [{ width: 80, height: 20, text: 'Get money' }]
    },
    {
        id: 'e2',
        sources: ['n2'],
        targets: ['n3'],
        type: 'DIRECTED'
    },
    {
        id: 'e3',
        sources: ['n3'],
        targets: ['n4'],
        type: 'DIRECTED',
        labels: [{ width: 60, height: 20, text: 'One' }]
    },
    {
        id: 'e4',
        sources: ['n3'],
        targets: ['n5'],
        type: 'DIRECTED',
        labels: [{ width: 60, height: 20, text: 'Two' }]
    },
    {
        id: 'e5',
        sources: ['n3'],
        targets: ['n6'],
        type: 'DIRECTED',
        labels: [{ width: 60, height: 20, text: 'Three' }]
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
