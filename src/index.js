import workers from './workers.json';
import { fillTable, sortTable } from './table';

const table = document.querySelector('.table');

fillTable(workers, table);
table.addEventListener('click', sortTable.bind(workers));
