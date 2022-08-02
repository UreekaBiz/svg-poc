import { Application } from './Application';

// ********************************************************************************
export const initApp = () => {
  const root = document.getElementById('root');
  if(!root) throw new Error('Root element not found');

  new Application(root);
};
initApp();