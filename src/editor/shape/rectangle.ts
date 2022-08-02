import { Box } from '../math';
import { Shape, ShapeElement } from './shape';
import { styleToCSSString, styleToRoughJS, ShapeStyle } from './style';
import { ShapeIdentifier, ShapeType } from './type';

// ** Model ***********************************************************************
export class Rectangle extends Shape {
  // === Lifecycle ================================================================
  public constructor(id: ShapeIdentifier, style: ShapeStyle, initialBox: Box) {
    super(id,
          ShapeType.Rectangle/*by definition*/,
          style,
          initialBox);
  }
}

// ** View ************************************************************************
export class RectangleElement extends ShapeElement {
  protected createShape(shape: Shape): SVGGraphicsElement {
    const dimension = shape.dimension/*for convenience*/;
    const element = this.svgEditor.roughSvg.draw(this.svgEditor.roughGenerator.rectangle(-(dimension.width / 2), -(dimension.height / 2), dimension.width, dimension.height, styleToRoughJS(shape.style)));
          element.setAttribute('style', styleToCSSString(shape.style));
    return element;
  }
}
