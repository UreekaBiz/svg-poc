import { Toolbar } from '../../../toolbar/Toolbar';
import { MOUSEDOWN, MOUSEMOVE, MOUSEUP } from '../../constant';
import { getMousePosition, isSVGGraphicsElement } from '../../util';
import { SVGEditor } from '../../SVGEditor';
import { MOUSE_CURSOR_CLASS, MOUSE_MOVE_CURSOR_CLASS } from '../constant';
import { Subtool } from '../type';
import { AbstractTool } from '../AbstractTool';
import { DragTool } from './DragTool';
import { ResizeTool } from './ResizeTool';
import { RotateTool } from './RotateTool';

// this tool is multi-shot
// ********************************************************************************
export class SelectionTool extends AbstractTool {
  // if there is a subtool then the mouse button is currently down
  private subtool: Subtool | undefined/*no subtool active*/ = undefined/*none active by default*/;

  // == Life-cycle ================================================================
  /**
   * @see #destroy()
   */
  public constructor(svgEditor: SVGEditor, toolbar: Toolbar) {
    super(svgEditor, toolbar);

    this.eventListenerEntries = [
      svgEditor.addEventListener(MOUSEDOWN,  event => this.mouseDown(event as MouseEvent)),
      svgEditor.addEventListener(MOUSEMOVE,  event => this.mouseMove(event as MouseEvent)),
      svgEditor.addEventListener(MOUSEUP,    event => this.mouseUp(event as MouseEvent)),
    ];
  }

  public destroy() {
    super.destroy();

    if(this.subtool) {
      this.subtool.destroy()/*by contract*/;
      this.subtool = undefined/*reset for sanity*/;
    } /* else -- no subtool */
  }

  // == Listeners =================================================================
  // -- Start Subtool Lifecycle ---------------------------------------------------
  private mouseDown(event: MouseEvent) {
    if(!event.target || !isSVGGraphicsElement(event.target)) return;
    const clickedElement = event.target;

    // get the content associated with the SVG element (if there is one)
    const contentEntry = this.svgEditor.getContentEntry(clickedElement);
//console.log('SelectionTool', 'mouseDown', contentEntry, event.target);
    if(!contentEntry) {
      this.svgEditor.removeAllSelections();
      return;
    } /* else -- there is a shape */

    // select the shape
    this.svgEditor.setSelection([ contentEntry ]);

    // get the initial position (as all subtools require it)
    const mousePosition = getMousePosition(event, this.svgEditor);
    if(!mousePosition) return;

    // depending on what part of the shape that the mouse is over, set up the
    // appropriate sub-tool. If it was over a resizer then resize otherwise drag
    const resizer = this.svgEditor.getResizer(clickedElement, contentEntry),
          rotator = this.svgEditor.getRotator(clickedElement);
    if(resizer) this.subtool = new ResizeTool(this.svgEditor, this.toolbar, mousePosition, contentEntry, resizer);
    else if(rotator) this.subtool = new RotateTool(this.svgEditor, this.toolbar, mousePosition, contentEntry)
    else this.subtool = new DragTool(this.svgEditor, this.toolbar, mousePosition, contentEntry);
  }

  // ------------------------------------------------------------------------------
  private mouseMove(event: MouseEvent) {
    if(!event.target || !isSVGGraphicsElement(event.target) || !(event.target.parentElement)) return;
    const element = event.target;

    const contentEntry = this.svgEditor.getContentEntry(element);
//console.log('SelectionTool', 'mouseMove', contentEntry, event.target);

    // it's possible that the mouse up occurred outside of this tool's scope so
    // only continue the gesture if the mouse buttons are still down
    if(event.buttons === 0) {
      // there may still be a subtool so remove it
      this.removeSubtool();
    } /* else -- a button is still pressed */

    // set the cursor based on if the element is a Shape or not and if a sub-tool
    // is currently in use
    if(!this.subtool) this.svgEditor.setCursor(contentEntry ? MOUSE_MOVE_CURSOR_CLASS : MOUSE_CURSOR_CLASS);
  }

  // -- End Subtool Lifecycle -----------------------------------------------------
  private mouseUp(event: MouseEvent) {
// console.log('SelectionTool', 'mouseUp', this.subtool);
    // the gesture is finished. Destroy any subtool by contract
    this.removeSubtool();
  }

  // ..............................................................................
  private removeSubtool() {
    if(this.subtool) {
      this.subtool.destroy()/*by contract*/;
      this.subtool = undefined/*reset for sanity*/;
    } /* else -- no subtool */
  }
}
