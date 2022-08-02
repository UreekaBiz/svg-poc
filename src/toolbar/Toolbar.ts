import { SIDEBAR_CONTAINER, SIDEBAR_CONTAINER_STYLE } from '../constant';
import { DEFAULT_SHAPE_STYLE } from '../editor/shape/constant';
import { EllipseToolDefinition, LineToolDefinition, RectangleToolDefinition, SelectionToolDefinition } from '../editor/tool/tool';
import { Application } from '../Application';
import { createToolbarItemDefinition } from './ui';

// ********************************************************************************
export class Toolbar {
  private readonly toolDefinitions = [ SelectionToolDefinition, RectangleToolDefinition, EllipseToolDefinition, LineToolDefinition ];

  // .. Style .....................................................................
  // the represented style
  private style = { ...DEFAULT_SHAPE_STYLE }/*clone for sanity*/;

  // == Construction ==============================================================
  public constructor(application: Application, parentElement: HTMLElement) {
    const sideBarContainer = document.createElement('div');
          sideBarContainer.classList.add(SIDEBAR_CONTAINER);
          sideBarContainer.setAttribute('id', SIDEBAR_CONTAINER);
          sideBarContainer.setAttribute('style', SIDEBAR_CONTAINER_STYLE);

      this.toolDefinitions.forEach(toolDefinition => {
        toolDefinition.button.addEventListener('click', () => application.svgEditor.setActiveTool(toolDefinition));
        sideBarContainer.appendChild(toolDefinition.button);
      });

      const toolbarItemDefinition = createToolbarItemDefinition();
      sideBarContainer.appendChild(toolbarItemDefinition.visualElement);
      toolbarItemDefinition.toolbarItems.forEach(toolbarItem => {
        toolbarItem.eventType && toolbarItem.visualElement.addEventListener(toolbarItem.eventType, (event) => toolbarItem.action(event, application));
      });

    parentElement.appendChild(sideBarContainer);
  }

  // == Style =====================================================================
  // FIXME: rethink this since callers just directly modify the returned style!
  public getStyle() { return this.style; }
}