import { LAYOUT, LAYOUT_STYLE } from './constant';
import { SVGEditor } from './editor/SVGEditor';
import { Toolbar } from './toolbar/Toolbar';

// ********************************************************************************
export class Application {
  public svgEditor: SVGEditor;
  public toolbar: Toolbar;

  // == Construction ==============================================================
  public constructor(root: HTMLElement) {
    const layoutContainer = document.createElement('div');
          layoutContainer.classList.add(LAYOUT);
          layoutContainer.setAttribute('id', LAYOUT);
          layoutContainer.setAttribute('style', LAYOUT_STYLE);

      // NOTE: this is error prone since Toolbar doesn't exist when SVGEditor is
      //       created (but the constructor could call application.toolbar).
      //       Standard chicken-and-egg problem always encountered with UIs. This
      //       is simply easier (though error prone).
      this.svgEditor = new SVGEditor(this, layoutContainer);
      this.toolbar = new Toolbar(this, layoutContainer);

    root.appendChild(layoutContainer);
  }
}