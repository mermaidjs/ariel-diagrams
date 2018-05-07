import X from './xml/Element'

export const defaultLayoutOptions = {
  'elk.algorithm': 'layered',
  'elk.direction': 'RIGHT',
  'elk.padding': '[top=25,left=25,bottom=25,right=25]',
  'elk.spacing.componentComponent': 25, // unconnected nodes are individual subgraphs, referred to as named components
  'elk.layered.spacing.nodeNodeBetweenLayers': 25, // this has effect, but only if there are edges.
  'elk.edgeLabels.inline': true,
  'elk.edgeRouting': 'SPLINES' // https://github.com/eclipse/elk/blob/master/plugins/org.eclipse.elk.core/src/org/eclipse/elk/core/options/EdgeRouting.java,
}

export const defaultSizeOptions = {
  node: { width: 100, height: 50 },
  edgeLabel: { width: 60, height: 20 }
}

export const defaultMarkers = {
  '>': new X('marker', { id: '>', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
    new X('path', { d: 'M 0 0 L 0 6 L 8 3 Z' })),
  '<': new X('marker', { id: '<', markerWidth: '8', markerHeight: '6', refX: '8', refY: '3', markerUnits: 'strokeWidth', orient: 'auto' },
    new X('path', { d: 'M 0 0 L 0 6 L 8 3 Z' }))
}
