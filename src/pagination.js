export let activePage = 0;

export function pagination(panelElement, total, pageMax){
  const amount = Math.ceil(total / pageMax);
  const temp = document.createDocumentFragment();
  for(let i = 0; i < amount; i++){
    const button = document.createElement('button');
    button.textContent = i;
    const name = i === activePage ? 'Pagination__item--active' : '';
    button.className = 'Pagination__item ' + name;
    temp.appendChild(button);
  }
  panelElement[0].after(temp);
  panelElement[0].disabled = activePage === 0;
  panelElement[1].disabled = activePage === pageMax;
}
