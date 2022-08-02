import { Point } from './math';
import { SVGEditor } from './SVGEditor';

// ********************************************************************************
// == Type ========================================================================
export const isTouchEvent = (event: Event): event is TouchEvent => 'touches' in event;
export const isMouseEvent = (event: Event): event is MouseEvent => 'clientX' in event && 'clientY' in event;
export const isInputEvent = (event: Event): event is InputEvent => 'target' in event || 'data' in event;
export const isInputTarget = (target: EventTarget): target is HTMLInputElement => 'value' in target;

// FIXME: do this better!!!
export const isSVGGraphicsElement = (target: EventTarget | Element): target is SVGGraphicsElement =>
  ((target as HTMLElement).tagName === 'g') ||
  ((target as HTMLElement).tagName === 'ellipse') ||
  ((target as HTMLElement).tagName === 'line') ||
  ((target as HTMLElement).tagName === 'rect') ||
  ((target as SVGGraphicsElement).getAttribute('d') !== undefined);

// == Position ====================================================================
export const getMousePosition = (event: Event, svgEditor: SVGEditor): Point | undefined => {
  if(!isMouseEvent(event) && !isMouseEvent(event)) return;

  const CTM = svgEditor.getScreenCTM();
  if(!CTM) return;

  if(isTouchEvent(event)) {
    const touch = event.touches[0];
    return {
      x: (touch.clientX - CTM.e) / CTM.a,
      y: (touch.clientY - CTM.f) / CTM.d
    }
  } /* else -- a mouse event by contract */

  return {
    x: (event.clientX - CTM.e) / CTM.a,
    y: (event.clientY - CTM.f) / CTM.d
  }
};

// ================================================================================
export const getSVGAttrNumber = (element: HTMLElement, name: string) => {
  const stringValue = element.getAttribute(name);
  if(!stringValue) return null/*none*/;
  return parseInt(stringValue);
};
