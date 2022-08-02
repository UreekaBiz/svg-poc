import { Toolbar } from '../../toolbar/Toolbar';
import { SVGEditor } from '../SVGEditor';

// == Tool ========================================================================
// a tool responds to user gestures to affect the model which in turn updates the view.
// Some tools (e.g. CreateRectangleTool) are 1-shot. Read the corresponding class


// doc to know how to use a Tool.
export type Tool = {
  /** destroys the tool once it is no longer in use */
  destroy: () => void;
};
export type Subtool = Tool/*simply a marker interface for non-top-level Tools*/;

// --------------------------------------------------------------------------------
export type ToolDefinition = {
  id: string;

  button: HTMLButtonElement;

  cursor: string;
  // TODO: rethink if this should pass Application or separate parts as it does!
  createTool: (svgEditor: SVGEditor, toolbar: Toolbar) => Tool;
};
