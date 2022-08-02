import { Toolbar } from '../../../toolbar/Toolbar';
import { MOUSEMOVE } from '../../constant';
import { computeAngleBetween, Point } from '../../math';
import { ContentEntry } from '../../type';
import { getMousePosition } from '../../util';
import { SVGEditor } from '../../SVGEditor';
import { MOUSE_CURSOR_CLASS, MOUSE_GRAB_CURSOR_CLASS } from '../constant';
import { Subtool } from '../type';
import { AbstractTool } from '../AbstractTool';

// a subtool (delegate) of SelectionTool. This tool is 1-shot. Once the mouse is
// released (mouse-up) then the parent tool will #destroy it.
// ********************************************************************************
export class RotateTool extends AbstractTool implements Subtool {
  private readonly startingPoint: Point;

  private readonly startingAngle: number;
  private readonly selectionCenter: Point;

  // == Life-cycle ================================================================
  /**
   * A mouse down occurred in the {@link SelectionTool} on a Shape (or Shapes) and
   * the remainder of the gesture has been delegated to this class.
   *
   * @param startingPoint the initial point at which the mouse click occurred
   * @param contentEntry the {@link ContentEntry} which is to be rotated
   * @see #destroy()
   */
  public constructor(svgEditor: SVGEditor, toolbar: Toolbar, startingPoint: Point, private contentEntry: ContentEntry) {
    super(svgEditor, toolbar);

    this.eventListenerEntries = [
      svgEditor.addEventListener(MOUSEMOVE, event => this.mouseMove(event as MouseEvent)),
    ];

    this.startingPoint = { ...startingPoint }/*clone for sanity*/;
    this.startingAngle = this.contentEntry.selection.angle;
    this.selectionCenter = { ...this.contentEntry.selection.center }/*clone for sanity*/;
    this.svgEditor.setCursor(MOUSE_GRAB_CURSOR_CLASS);
  }

  // ..............................................................................
  // theoretically this is called on mouseup. Since it's possible that the parent
  // SelectionTool removes this class' mouseup listener before it's called, this
  // was moved to #destroy() to ensure that it's guaranteed to be called
  public destroy() {
    this.svgEditor.setCursor(MOUSE_CURSOR_CLASS);

    // let the class parent do its cleanup
    super.destroy();
  }

  // == Listeners =================================================================
  private mouseMove(event: MouseEvent) {
    const mousePosition = getMousePosition(event, this.svgEditor);
    if(!mousePosition) return;

    const newAngle = computeAngleBetween(this.selectionCenter, this.startingPoint, mousePosition);
    this.svgEditor.rotateContent(this.contentEntry, this.startingAngle + newAngle);
    this.svgEditor.renderContent(this.contentEntry, true, true);
  }
}