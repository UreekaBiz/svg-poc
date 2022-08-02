import { computePointDelta, computeTranslatedPoint, Point } from '../../math';
import { Toolbar } from '../../../toolbar/Toolbar';
import { MOUSEMOVE } from '../../constant';
import { ContentEntry } from '../../type';
import { getMousePosition } from '../../util';
import { SVGEditor } from '../../SVGEditor';
import { Subtool } from '../type';
import { AbstractTool } from '../AbstractTool';

// a subtool (delegate) of SelectionTool. This tool is 1-shot. Once the mouse is
// released (mouse-up) then the parent tool will #destroy it.
// ********************************************************************************
export class DragTool extends AbstractTool implements Subtool {
  private readonly startingPoint: Point;
  private readonly shapeCenter: Point;

  // == Life-cycle ================================================================
  /**
   * A mouse down occurred in the {@link SelectionTool} on a Shape (or Shapes) and
   * the remainder of the gesture has been delegated to this class.
   *
   * @param startingPoint the initial point at which the mouse click occurred
   * @param contentEntry the {@link ContentEntry} which is to be dragged
   * @see #destroy()
   */
  public constructor(svgEditor: SVGEditor, toolbar: Toolbar, startingPoint: Point, private contentEntry: ContentEntry) {
    super(svgEditor, toolbar);

    this.eventListenerEntries = [
      svgEditor.addEventListener(MOUSEMOVE, event => this.mouseMove(event as MouseEvent)),
    ];

    this.startingPoint = startingPoint;
    this.shapeCenter = { ...contentEntry.shape.center }/*clone for sanity*/;
  }

  // ..............................................................................
  // theoretically this is called on mouseup. Since it's possible that the parent
  // SelectionTool removes this class' mouseup listener before it's called, this
  // was moved to #destroy() to ensure that it's guaranteed to be called
  public destroy() {
    // NOTE: This is defined here to explicitly indicate that
    //       there is no need to define a mouseup handler

    // let the class parent do its cleanup
    super.destroy();
  }

  // == Listeners =================================================================
  private mouseMove(event: MouseEvent) {
    const mousePosition = getMousePosition(event, this.svgEditor);
    if(!mousePosition) return;

    this.svgEditor.moveContent(this.contentEntry, computeTranslatedPoint(computePointDelta(this.startingPoint, mousePosition), this.shapeCenter));
    this.svgEditor.renderContent(this.contentEntry, true, true);
  }
}