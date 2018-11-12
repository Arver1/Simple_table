import workers from './workers';
import { fillTable, sortTable } from './table';
import  tableSearch from './search';

const table = document.querySelector('.table');
const searchBtn = document.querySelector('.main-search__btn');
const searchField = document.querySelector('.main-search__field');

fillTable(workers, table);
table.addEventListener('click', sortTable.bind(workers));
searchBtn.addEventListener('click', tableSearch.bind(table, workers, searchField));
