import { ShapeSelection } from './selection';
import { Shape } from './shape/shape';
import { ShapeIdentifier } from './shape/type';

// ********************************************************************************
// == Event =======================================================================
// convenient way to hold a reference to an EventListener so it can be easily removed
export type EventListenerEntry = {
  type: string;
  listener: EventListener;
};

// == Content =====================================================================
export type ContentEntry = {
  id: ShapeIdentifier;

  shape: Shape;
  selection: ShapeSelection;
};
