import { CircleStyle, CSSStyle } from './shape/style';

// ********************************************************************************
export const SVGNS = 'http://www.w3.org/2000/svg';

export const ROUGHJS_SEED = 870349/*no particular significance -- just must be >0*/;

// == Sizes =======================================================================
export const SHAPE_SELECTION_PADDING = 10/*svgViewBoxUnits*/;
export const MIN_RESIZER_DISTANCE = 100/*svgViewBoxUnits - T&E*/;
export const RESIZER_SIDE_LENGTH = 15/*T&E*/;
export const ROTATOR_DISTANCE = RESIZER_SIDE_LENGTH + (4 * SHAPE_SELECTION_PADDING)/*T&E*/;
export const ROTATOR_RADIUS = 7.5;

// == Handler =====================================================================
// -- Mouse -----------------------------------------------------------------------
export const MOUSEDOWN = 'mousedown';
export const MOUSEMOVE = 'mousemove';
export const MOUSEUP = 'mouseup';
export const MOUSELEAVE = 'mouseleave';

// == SVG =========================================================================
// -- Layout ----------------------------------------------------------------------
export const SVG_CANVAS = 'svgCanvas';
export const SVG_CANVAS_WIDTH = '2000';
export const SVG_CANVAS_HEIGHT = '1000';
export const SVG_CANVAS_STYLE = 'width: 100%; height: 100%;';
export const DRAWING_LAYER = 'drawingLayer';
export const SELECTION_LAYER = 'selectionLayer';

export const SVG_CONTAINER = 'svgContainer';
export const SVG_CONTAINER_STYLE = 'flex-basis: 80%; display: flex; flex-direction: column; outline: 2px solid black';

// -- Selection -------------------------------------------------------------------
export const SELECTION_G = 'selectionG';

// == Style =======================================================================
// -- Selection -------------------------------------------------------------------
// NOTE: the selection is never made 'hidden' since it's used for hit-testing. It
//       always remains 'visibility: visible'. The stroke is simply made transparent
//       when hidden.
export const visibleSelectionStyle: CSSStyle = {
  'visibility': 'visible',

  'fill': 'transparent',
  'stroke': 'black',
  'stroke-width': '2px',
  'stroke-dasharray': '9',
  'rx': '0',
  'ry': '0',
  'opacity': '1',
} as const;
export const hiddenSelectionStyle: CSSStyle = {
  ...visibleSelectionStyle,

  // NOTE: because hit-testing is performed against the selection layer
  //       (specifically, this style), the selection *must* remain 'visible'
  //       so that hit-testing occurs but is transparent
  'stroke': 'transparent',
} as const;

// -- Resizer ---------------------------------------------------------------------
export const resizerStyle: CSSStyle = {
  'visibility': 'hidden',

  'fill': 'transparent',
  'stroke': 'black',
  'stroke-width': '2px',
  'rx': '0',
  'ry': '0',
  'opacity': '1',
} as const;

// -- Rotator ---------------------------------------------------------------------
export const rotatorStyle: CircleStyle = {
  'visibility': 'hidden',

  'fill': 'transparent',
  'stroke': 'black',
  'stroke-width': '2px',
  'opacity': '1',
  'cursor': 'grab',
};
export const ROTATOR_CLASS = 'rotator';
