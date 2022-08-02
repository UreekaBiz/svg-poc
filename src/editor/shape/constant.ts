import { Point } from '../math';
import { ShapeStyle } from './style';

// ********************************************************************************
// .. Stroke Width ................................................................
export const thinStrokeWidth = 3;
export const boldStrokeWidth = 5;
export const extraBoldStrokeWidth = 10;

// .. Roughness ...................................................................
export const architectRoughness = 0;
export const artistRoughness = 1;
export const cartoonistRoughness = 2;

// .. Corner Radius ...............................................................
export const sharpCornerRadius: Point = { x: 0, y: 0 };
export const roundCornerRadius: Point = { x: 15, y: 15 };

// -- Shape -----------------------------------------------------------------------
export const SHAPE_G = 'shapeG';

// NOTE: this must match the default UI (Toolbar) state!
export const DEFAULT_SHAPE_STYLE: ShapeStyle = {
  roughness: artistRoughness,

  stroke: '#000000'/*black*/,
  strokeWidth: thinStrokeWidth,
  strokeStyle: 'solid',

  fill: '#000000'/*black*/,
  fillStyle: 'hachure',

  opacity: 0.5,
} as const;
