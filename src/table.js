Date.prototype.format = function(format = 'yyyy-mm-dd') {
  const replaces = {
    yyyy: this.getFullYear(),
    mm: ('0' + (this.getMonth() + 1)).slice(-2),
    dd: ('0' + this.getDate()).slice(-2),
    hh: ('0' + this.getHours()).slice(-2),
    MM: ('0' + this.getMinutes()).slice(-2),
    ss: ('0' + this.getSeconds()).slice(-2),
  };
  let result = format;
  for (const replace in replaces) {
    result = result.replace(replace, replaces[replace]);
  }
  return result;
};

const direction = {
  name: true,
  position: true,
  office: true,
  age: true,
  start_date: true,
  salary: true,
};

export function fillTable(data, table) {
  if (!data || !table || !data.length) return;
  const length = table.rows[0].cells.length;
  const temp = document.createDocumentFragment();
  data.forEach(it => {
    const tr = document.createElement('tr');
    const keys = Object.keys(it).slice(0, length);
    keys.forEach(key => {
      const td = document.createElement('td');
      switch (key) {
        case 'start_date':
          td.textContent = new Date(it[key]).format('yyyy/mm/dd');
          break;
        case 'salary':
          td.textContent = '$' + it[key];
          break;
        default:
          td.textContent = it[key];
      }
      tr.appendChild(td);
    });
    temp.appendChild(tr);
  });
  table.removeChild(table.tBodies[0]);
  table.appendChild(document.createElement('tbody'));
  table.tBodies[0].appendChild(temp);
}
export function sortTable(e) {
  e.preventDefault();
  if (e.target.tagName !== 'TH') return;
  const field = e.target.textContent.toLowerCase().trim();
  const currentDirection = direction[field] ? 1 : -1;
  const compareF =
    field === 'start date'
      ? sortByDate
      : field === 'salary'
      ? sortBySalary
      : defaultSort;
  const sorted = [...this].sort(compareF(field, currentDirection));
  direction[field] = !direction[field];
  [...e.currentTarget.rows[0].cells].forEach(it => {
    it.classList.toggle('down', false);
  });
  if (direction[field]) e.target.classList.toggle('down');
  fillTable(sorted, e.currentTarget);
}

function sortByDate(field, currentDirection) {
  return function(a, b) {
    const first = +new Date(a[field]);
    const second = +new Date(b[field]);
    if (first === second) {
      return 0;
    }
    return first > second ? currentDirection : currentDirection * -1;
  };
}

function defaultSort(field, currentDirection) {
  return function(a, b) {
    if (a[field] === b[field]) {
      return 0;
    }
    return a[field] > b[field] ? currentDirection : currentDirection * -1;
  };
}

function sortBySalary(field, currentDirection) {
  return function(a, b) {
    const first = +a[field].replace('$', '');
    const second = +b[field].replace('$', '');
    if (first === second) {
      return 0;
    }
    return first > second ? currentDirection : currentDirection * -1;
  };
}
