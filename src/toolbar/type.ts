import { Application } from '../Application';

// ********************************************************************************
type ToolbarItem = {
  eventType: string | undefined;

  visualElement: HTMLElement;

  action: (event: any, application: Application) => void;
};

export type ToolbarItemDefinition = {
  visualElement: HTMLDivElement;
  toolbarItems: ToolbarItem[];
};