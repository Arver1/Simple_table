import workers from './workers';
import { fillTable, sortTable } from './table';
import  tableSearch from './search';
import { pagination } from './pagination';
import './index.css';

const table = document.querySelector('.table');
const searchBtn = document.querySelector('.main-search__btn');
const searchField = document.querySelector('.main-search__field');
const paginationPanel = document.querySelector('.Pagination');
const paginationElements = paginationPanel.querySelectorAll('.Pagination__item');
const maxRecordOnPage = 3;

fillTable(workers, table);
pagination(paginationElements, workers.length, maxRecordOnPage);
table.addEventListener('click', sortTable.bind(workers));
searchBtn.addEventListener('click', tableSearch.bind(table, workers, searchField));
paginationPanel.addEventListener('click', ()=>{});

