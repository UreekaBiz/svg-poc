import rough from 'roughjs';
import { RoughGenerator } from 'roughjs/bin/generator';
import { RoughSVG } from 'roughjs/bin/svg';

import { Application } from '../Application';
import { DRAWING_LAYER, SELECTION_LAYER, SVG_CANVAS, SVG_CANVAS_HEIGHT, SVG_CANVAS_WIDTH, SVG_CONTAINER_STYLE, SVGNS, ROUGHJS_SEED } from './constant';
import { Point, Dimension } from './math';
import { ShapeSelection, ShapeSelectionElement } from './selection';
import { Shape, ShapeElement } from './shape/shape';
import { ShapeFactory } from './shape/ShapeFactory';
import { parseShapeId, parseShapeResizerId, parseShapeRotatorId, ShapeIdentifier } from './shape/type';
import { MOUSE_CURSOR_CLASS } from './tool/constant';
import { SelectionToolDefinition } from './tool/tool';
import { Tool, ToolDefinition } from './tool/type';
import { ContentEntry, EventListenerEntry } from './type';

// ********************************************************************************
type ContentVisual = Readonly<{
  shape: ShapeElement;
  selection: ShapeSelectionElement;
}>;

// ********************************************************************************
export class SVGEditor {
  // .. Content ...................................................................
  // CHECK: move to single map?

  // map of ContentEntry ID to Content Entry (parallels #contentVisualMap)
  private readonly contentEntryMap = new Map<string/*id*/, ContentEntry>();

  // map from ContentEntry ID to ContentVisual (parallels #contentEntryMap)
  private readonly contentVisualMap = new Map<string/*id*/, ContentVisual>();

  // .. Selection .................................................................
  private selectedContent: ContentEntry[] = []/*none selected by default*/;

  // .. Tool ......................................................................
  // the currently active Tool and associated ToolDefinition
  // NOTE: these always match!
  private activeTool: Tool | undefined/*FIXME: remove!*/;
  private activeToolDefinition: ToolDefinition | undefined/*FIXME: remove!*/;

  // .. UI / SVG ..................................................................
  private readonly svgCanvas: SVGSVGElement;
  private readonly drawingLayer: SVGGElement;
  private readonly selectionLayer: SVGGElement;

  public readonly roughSvg: RoughSVG;
  public readonly roughGenerator: RoughGenerator;

  // .. Cursor ....................................................................
  private cursorClass: string/*TODO: tighten up!*/ = MOUSE_CURSOR_CLASS/*pointer by default*/;

  // == Construction ==============================================================
  public constructor(private application: Application, parentElement: HTMLElement) {
    // .. UI ......................................................................
    const svgCanvas = document.createElementNS(SVGNS, 'svg');
          svgCanvas.classList.add(SVG_CANVAS);
          svgCanvas.setAttribute('id', SVG_CANVAS);
          svgCanvas.setAttribute('width', '100%')/*take full container width*/;
          svgCanvas.setAttribute('height', '100%')/*take full container height*/;
          svgCanvas.setAttribute('viewBox', `0 0 ${SVG_CANVAS_WIDTH} ${SVG_CANVAS_HEIGHT}`)/*same origin as viewPort*/;
          svgCanvas.setAttribute('preserveAspectRatio', 'xMinYMin slice')/*put viewBox origin at same origin as viewPort origin, 0,0, slice if needed*/;
          svgCanvas.setAttribute('style', SVG_CONTAINER_STYLE);
      this.svgCanvas = svgCanvas;
      // NOTE: a non-zero seed must be set otherwise random results are generated
      //       regardless if a RoughGenerator is used or not
      this.roughSvg = rough.svg(this.svgCanvas, { options: { seed: ROUGHJS_SEED }});
      this.roughGenerator = this.roughSvg.generator;

      const drawingG = document.createElementNS(SVGNS, 'g');
            drawingG.classList.add(DRAWING_LAYER);
            drawingG.setAttribute('id', DRAWING_LAYER);
      svgCanvas.append(drawingG);
      this.drawingLayer = drawingG;

      const selectionG = document.createElementNS(SVGNS, 'g');
            selectionG.classList.add(SELECTION_LAYER);
            selectionG.setAttribute('id', SELECTION_LAYER);
      svgCanvas.append(selectionG);
      this.selectionLayer = selectionG;

    parentElement.appendChild(svgCanvas);

    // ............................................................................
    this.setDefaultTool();
  }

  // == Cursor ====================================================================
  public setCursor(cursorClass: string) {
    if(this.cursorClass === cursorClass) return/*cursor class already set*/;
    this.cursorClass = cursorClass;

    this.svgCanvas.removeAttribute('class')/*remove any other classes*/;
    this.svgCanvas.classList.add(cursorClass);
  }

  // == Content ===================================================================
  // -- Get -----------------------------------------------------------------------
  public getContentEntryById(id?: string): ContentEntry | undefined/*unknown id or doesn't represent ContentEntry*/ {
    if(!id) return undefined/*if nothing specified then no content (for convenience)*/;
    return this.contentEntryMap.get(id);
  }

  // ..............................................................................
  // get the content associated with the HTML element (if there is one)
  public getContentEntry(element: Element) {
    const shapeId = parseShapeId(element.id);
//console.log(shapeId, element.id);
    return this.getContentEntryById(shapeId);
  }

  // get the resizer associated with the SVG element (if there is one)
  public getResizer(element: Element, contentEntry: ContentEntry) {
    const value = parseShapeResizerId(element.id);
    if(!value) return undefined/*no shape (or resizer)*/;
//console.log(shapeId, element.id);
    return contentEntry.selection.resizers[value.location];
  }

  // get the rotator associated with the SVG element (if there is one)
  public getRotator(element: Element) {
    const shapeId = parseShapeRotatorId(element.id);
    if(!shapeId) return undefined/*no shape (or rotator)*/;
//console.log(shapeId, element.id);
    return shapeId;
  }

  // -- Add -----------------------------------------------------------------------
  public addContentEntry(shapeId: ShapeIdentifier, shape: Shape): ContentEntry {
    // create model and add to map by contract (before the view just in case the view
    // would ever try to do a lookup)
    const contentEntry: ContentEntry = {
      id: shapeId,

      shape,
      selection: new ShapeSelection(shape.center, shape.dimension, 0/*initially no rotation*/),
    };
    this.contentEntryMap.set(shapeId, contentEntry);

    // create view and add to map by contract
    const shapeElement = ShapeFactory.createElement(this, shape.type, shapeId, contentEntry.shape);
    this.drawingLayer.appendChild(shapeElement.element);

    const selectionVisual = new ShapeSelectionElement(this, shapeId, contentEntry.selection);
    this.selectionLayer.appendChild(selectionVisual.selectionG);

    const contentVisual: ContentVisual = {
      shape: shapeElement,
      selection: selectionVisual,
    };
    this.contentVisualMap.set(shapeId, contentVisual);

    return contentEntry;
  }

  // -- Move / Resize / Rotate ----------------------------------------------------
  // updates model

  public moveContent(contentEntry: ContentEntry, centerPosition: Point) {
    contentEntry.shape.move(centerPosition);
    contentEntry.selection.move(centerPosition);
  }

  public resizeContent(contentEntry: ContentEntry, center: Point, dimension: Dimension) {
    contentEntry.shape.resize(center, dimension);
    contentEntry.selection.resize(center, dimension);
  }

  public rotateContent(contentEntry: ContentEntry, angle: number) {
    // NOTE: the shape and selection are always kept in sync
    contentEntry.shape.rotate(angle);
    contentEntry.selection.rotate(angle);
  }

  // -- Render --------------------------------------------------------------------
  // updates view
  public renderContent(contentEntry: ContentEntry, shouldRenderShape: boolean, shouldRenderSelection: boolean) {
    const visual = this.contentVisualMap.get(contentEntry.id);
    if(!visual) { console.error(`Not visual for content '${contentEntry.id}'`); return/*nothing to render!*/; }

    if(shouldRenderShape) {
      const shape = contentEntry.shape/*for convenience*/,
            shapeElement = visual.shape/*for convenience*/;

      // RoughJS (possibly) creates a new shape for each resize so the old element
      // must be removed and replaced with the new one
      this.drawingLayer.removeChild(shapeElement.element);
        shapeElement.update(shape);
      this.drawingLayer.appendChild(shapeElement.element);
    } /* else -- don't render shape */

    if(shouldRenderSelection) {
      const selection = contentEntry.selection/*for convenience*/,
            selectionVisual = visual.selection/*for convenience*/;

      selectionVisual.update(selection);
    } /* else -- don't render selection */
  }

  // == Selection =================================================================
  // -- Update --------------------------------------------------------------------
  // NOTE: this is a PoC. The goal is to not expose the selection but to allow
  //       operations to be performed on it. This is specific to style (though in
  //       theory, anything in the ContentEntry could be updated by the updater)
  //       so that this knows that if anything was updated then it should rerender
  //       the shape so that the styles are reflected in the visuals
  public updateSelectedContentStyle(updater: (contentEntry: ContentEntry) => boolean | void/*default true*/) {
    this.selectedContent.forEach(content => {
      const updated = updater(content);
      if(updated !== false) this.renderContent(content, true/*update style by definition*/, false);
    });
  }

  // -- Set / Clear ---------------------------------------------------------------
  // clears the current selection and sets it to the specified selection. The default
  // tool is automatically set to the SelectionTool.
  public setSelection(selectedContent: ContentEntry[]) {
    this.removeAllSelections();

    this.selectedContent.push(...selectedContent);
    selectedContent.forEach(contentEntry => {
      contentEntry.selection.setVisible(true/*visible*/);
      this.renderContent(contentEntry, false, true);
    });

    // force the active Tool to be the SelectionTool by contract
    this.setActiveTool(SelectionToolDefinition);
  }

  public removeAllSelections() {
    // make only those elements that were previously selected, no longer selected
    // NOTE: this is a performance optimization (i.e. iterating over *all* elements
    //       is expensive)
    this.selectedContent.forEach(contentEntry => {
      contentEntry.selection.setVisible(false/*hide*/);
      this.renderContent(contentEntry, false, true);
    });

    this.selectedContent = []/*clear*/;
  }

  // == Tool ======================================================================
  public setDefaultTool() { this.setActiveTool(SelectionToolDefinition); }

  // ------------------------------------------------------------------------------
  public setActiveTool(toolDefinition: ToolDefinition) {
    // if the specified ToolDefinition matches the active one then there's nothing to do
    // NOTE: this ensures that selections don't swap out the selection tool (which
    //       must already be active by definition), etc.
    if(this.activeToolDefinition === toolDefinition) return/*nothing to do*/;
    this.activeToolDefinition = toolDefinition/*maintain state*/;

    // if there's already an active Tool then destroy it by contract
    if(this.activeTool) this.activeTool.destroy();

    this.setCursor(toolDefinition.cursor);
    // TODO: this is the only place where Toolbar is used in this class. Rethink if
    //       this is right!
    this.activeTool = toolDefinition.createTool(this, this.application.toolbar);
  };

  // == Event Listeners ===========================================================
  public addEventListener(type: string, listener: EventListener): EventListenerEntry {
    this.svgCanvas.addEventListener(type, listener);
    return { type, listener }/*for convenience*/;
  }
  public removeEventListener({ type, listener }: EventListenerEntry) {
//console.log('removing event listener', type, listener, new Error());
    this.svgCanvas.removeEventListener(type, listener);
  }

  // == DOM =======================================================================
  // CHECK: where to best locate these?
  public createSVGTransform() { return this.svgCanvas.createSVGTransform(); }
  public getScreenCTM() { return this.svgCanvas.getScreenCTM(); }
};
