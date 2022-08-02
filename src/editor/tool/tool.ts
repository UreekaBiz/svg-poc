import { Toolbar } from '../../toolbar/Toolbar';
import { createButton } from '../../ui/button';
import { BUTTON_STYLE } from '../../constant';
import { ShapeType } from '../shape/type';
import { SVGEditor } from '../SVGEditor';
import { SelectionTool } from './selection/SelectionTool';
import { ELLIPSE_BUTTON_ID, ELLIPSE_LABEL, LINE_BUTTON_ID, LINE_LABEL, MOUSE, MOUSE_BUTTON_ID, MOUSE_CURSOR_CLASS, RECTANGLE_LABEL, RECTANGLE_BUTTON_ID, SHAPE_CURSOR } from './constant';
import { ToolDefinition } from './type';
import { CreateShapeTool } from './CreateShapeTool';

// ********************************************************************************
export const SelectionToolDefinition: ToolDefinition = {
  id: MOUSE_BUTTON_ID,

  button: createButton(MOUSE_BUTTON_ID, MOUSE, BUTTON_STYLE),

  cursor: MOUSE_CURSOR_CLASS,
  createTool: (svgEditor: SVGEditor, toolbar: Toolbar) => new SelectionTool(svgEditor, toolbar),
};

// -- Shapes ----------------------------------------------------------------------
export const EllipseToolDefinition: ToolDefinition = {
  id: ELLIPSE_BUTTON_ID,

  button: createButton(ELLIPSE_BUTTON_ID, ELLIPSE_LABEL, BUTTON_STYLE),

  cursor: SHAPE_CURSOR,
  createTool: (svgEditor: SVGEditor, toolbar: Toolbar) => new CreateShapeTool(svgEditor, toolbar, ShapeType.Ellipse),
};

// ................................................................................
export const LineToolDefinition: ToolDefinition = {
  id: LINE_BUTTON_ID,

  button: createButton(LINE_BUTTON_ID, LINE_LABEL, BUTTON_STYLE),

  cursor: SHAPE_CURSOR,
  createTool: (svgEditor: SVGEditor, toolbar: Toolbar) => new CreateShapeTool(svgEditor, toolbar, ShapeType.Line),
};

// ................................................................................
export const RectangleToolDefinition: ToolDefinition = {
  id: RECTANGLE_BUTTON_ID,

  button: createButton(RECTANGLE_BUTTON_ID, RECTANGLE_LABEL, BUTTON_STYLE),

  cursor: SHAPE_CURSOR,
  createTool: (svgEditor: SVGEditor, toolbar: Toolbar) => new CreateShapeTool(svgEditor, toolbar, ShapeType.Rectangle),
};
