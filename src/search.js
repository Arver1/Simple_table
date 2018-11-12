import { fillTable } from './table';

export default function (data, searchField, e) {
  e.preventDefault();
  const value = searchField.value.toLowerCase().trim();
  if (!value) return;
  if (value === 'all') {
    fillTable(data, this);
  }
  const sorted = [...data].filter(it => {
    let i = 0;
    const keys = Object.keys(it);
    while (i < keys.length) {
      let temp = null;
      if (keys[i] === 'start_date') {
        temp = new Date(it[keys[i]]).format('yyyy/mm/dd');
        if (temp.indexOf(value) !== -1) return true;
      }
      temp =
        typeof it[keys[i]] === 'number'
          ? it[keys[i]] + ''
          : keys[i] === 'salary'
          ? '$' + it[keys[i]]
          : it[keys[i]].toLowerCase();
      if (temp.indexOf(value) !== -1) return true;
      i++;
    }
    return false;
  });
  fillTable(sorted, this);
};
