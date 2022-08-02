import { Toolbar } from '../../toolbar/Toolbar';
import { EventListenerEntry } from '../type';
import { SVGEditor } from '../SVGEditor';
import { Tool } from './type';

// convenience abstract class that provides the 'event listener' behavior common
// to (most) Tools
// ********************************************************************************
export abstract class AbstractTool implements Tool {
  protected eventListenerEntries: EventListenerEntry[] = [/*none by default*/];

  // == Life-cycle ================================================================
  /**
   * @param svgEditor the {@link SVGEditor} to which the mouse listeners are attached
   * @param toolbar the {@link Toolbar} associated with the editor
   * @see #destroy()
   */
  public constructor(protected svgEditor: SVGEditor, protected toolbar: Toolbar) { /*add listeners in subclass */ }

  /**
   * Removes any mouse listeners from the {@link SVGEditor} that were added on construction
   */
  public destroy() {
    this.eventListenerEntries.forEach(entry => this.svgEditor.removeEventListener(entry));
    this.eventListenerEntries = []/*clear for sanity*/;
  }
}