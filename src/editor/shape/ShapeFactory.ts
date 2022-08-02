import { Toolbar } from '../../toolbar/Toolbar';
import { Box } from '../math';
import { SVGEditor } from '../SVGEditor';
import { Ellipse, EllipseElement } from './ellipse';
import { Line, LineElement } from './line';
import { Rectangle, RectangleElement } from './rectangle';
import { Shape, ShapeElement } from './shape';
import { ShapeIdentifier, ShapeType } from './type';

// factory for creating concrete SVG shapes based on {@link ShapeType}
// ********************************************************************************
export class ShapeFactory {
  public static createModel(toolbar: Toolbar, id: ShapeIdentifier, shapeType: ShapeType, initialBox: Box): Shape {
    const shapeStyle = { ...toolbar.getStyle() }/*clone for sanity*/;
    switch(shapeType) {
      case ShapeType.Ellipse: return new Ellipse(id, shapeStyle, initialBox);
      case ShapeType.Line: return new Line(id, shapeStyle, initialBox);
      case ShapeType.Rectangle: return new Rectangle(id, shapeStyle, initialBox);
    }
  }

  // ==============================================================================
  public static createElement(svgEditor: SVGEditor, shapeType: ShapeType, id: ShapeIdentifier, shape: Shape): ShapeElement {
    switch(shapeType) {
      case ShapeType.Ellipse: return new EllipseElement(svgEditor, shape);
      case ShapeType.Line: return new LineElement(svgEditor, shape);
      case ShapeType.Rectangle: return new RectangleElement(svgEditor, shape);
    }
  }
}