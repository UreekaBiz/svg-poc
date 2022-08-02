// ********************************************************************************
export const createButton = (id: string, innerText: string, style: string): HTMLButtonElement => {
  const button = document.createElement('button');
        button.setAttribute('id', id);
        button.setAttribute('style', style);
        button.innerText = innerText;

  return button;
}