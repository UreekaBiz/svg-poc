import { computeBoxFromCenterDimension, Box } from '../math';
import { Shape, ShapeElement } from './shape';
import { styleToCSSString, styleToRoughJS, ShapeStyle } from './style';
import { ShapeIdentifier, ShapeType } from './type';

// ** Model ***********************************************************************
export class Line extends Shape {
  // === Lifecycle ================================================================
  public constructor(id: ShapeIdentifier, style: ShapeStyle, initialBox: Box) {
    super(id,
          ShapeType.Line/*by definition*/,
          style,
          initialBox);
  }
}

// ** View ************************************************************************
export class LineElement extends ShapeElement {
  protected createShape(shape: Shape): SVGGraphicsElement {
    const box = computeBoxFromCenterDimension({ x: 0, y: 0 }, shape.dimension);
    const element = this.svgEditor.roughSvg.draw(this.svgEditor.roughGenerator.line(box.x1, box.y1, box.x2, box.y2, styleToRoughJS(shape.style)));
          element.setAttribute('style', styleToCSSString(shape.style));
    return element;
  }
}
