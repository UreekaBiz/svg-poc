import { Options as RoughOptions } from 'roughjs/bin/core';

// ********************************************************************************
// --------------------------------------------------------------------------------
// NOTE: this corresponds with RoughJS Options (as that's what it gets translated to)
// REF: https://github.com/rough-stuff/rough/wiki#options
type FillStyle = 'hachure' | 'cross-hatch' | 'solid';
type StrokeStyle = 'solid' | 'dashed' | 'dotted';
export type ShapeStyle = {
  roughness: number;

  stroke: string; // color of the stroke
  strokeWidth: number;
  strokeStyle: StrokeStyle; // NOTE: *not* RoughJS but 'strokeLineDash' must be computed

  fill: string; // color of the fill
  fillStyle: FillStyle;

  opacity: number; // NOTE: *not* RoughJS (passed through as CSS)
};

export const computeDashedLineDashed = (strokeWidth: number) => [8, 8 + strokeWidth];
export const computeDottedLineDashed = (strokeWidth: number) => [1.5, 6 + strokeWidth];

// ................................................................................
// a limited set of CSS styles that are used (simply for visibility / convenience)
export type CSSStyle = {
  'visibility': string,
  'cursor'?: string,
  'opacity': string,

  'fill': string,
  'stroke': string,
  'stroke-width': string,
  'stroke-dasharray'?: string,
  'rx': string,
  'ry': string,
};
export type CircleStyle = Omit<CSSStyle, 'rx' | 'ry'>;

// --------------------------------------------------------------------------------
export const cssVisible = (visible: boolean) => visible ? 'visible' : 'hidden';

// --------------------------------------------------------------------------------
export const toCSSString = (style: ShapeStyle | CircleStyle, excludeStyles?: string[]) => {
  // TODO: refactor into reduce to get into one-liner
  let styleString = '';
  Object.entries(style).forEach(([key, value]) => {
    if(excludeStyles && excludeStyles.includes(key)) return/*skip style*/;
    styleString += `${key}: ${value}; `;
  });
  return styleString;
};

// == RoughJS =====================================================================
export const styleToRoughJS = (style: ShapeStyle): RoughOptions =>
  ({
    ...style,

    // disable multi-stroke for for non-solid strokes (T&E visual)
    disableMultiStroke: (style.strokeStyle !== 'solid'),

    // for non-solid strokes, increase the width a bit to make it visually
    // similar to solid strokes, because we're also disabling multiStroke
    // increase the stroke width for non-solid strokes (T&E visual)
    strokeWidth: (style.strokeStyle !== 'solid')
                    ? style.strokeWidth + 0.5
                    : style.strokeWidth,
    strokeLineDash: (style.strokeStyle === 'dashed')
                      ? computeDashedLineDashed(style.strokeWidth)
                      : (style.strokeStyle === 'dotted')
                          ? computeDottedLineDashed(style.strokeWidth)
                          : undefined/*solid*/,

    // T&E visual
    fillWeight: style.strokeWidth / 2,
    hachureGap: style.strokeWidth * 4,
  });

export const styleToCSSString = (style: ShapeStyle) =>
  `stroke-linecap: round;` +
  `stroke-linejoin: round;` +
  `opacity: ${style.opacity}`;
