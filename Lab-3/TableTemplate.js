var TableTemplate = function TableTemplate() { };

TableTemplate.fillIn = function fillIn(id, dict, columnName) {
    var table = document.getElementById(id),
        rows = table.rows, // Table-ийн Row-г Rows-д оноож байна
        headerRow = table.rows[0],  // Эхний Row-ийн элементийг толгой row болгож байна
        processor = new Cs142TemplateProcessor(headerRow.innerHTML),
        headerRowFilledIn = processor.fillIn(dict),tableFilledIn,
        columnElems = headerRow.getElementsByTagName('td'),i,columnNumber,row,cell,cellFilledIn;
    headerRow.innerHTML = headerRowFilledIn;

    if (columnName === undefined) {
        processor = new Cs142TemplateProcessor(table.innerHTML);
        tableFilledIn = processor.fillIn(dict);
        table.innerHTML = tableFilledIn;
    }
    
    for (i = 0; i < columnElems.length; i += 1) {
        if (columnName === columnElems[i].textContent) {
            columnNumber = i;
            break;
        }
    }
    
    if (columnNumber === undefined) {
        table.style.visibility = 'visible';
        return;
    }
    
    for (i = 1; i < rows.length; i += 1) {
        row = rows[i];
        cell = row.cells[columnNumber];
        processor = new Cs142TemplateProcessor(cell.textContent);
        cellFilledIn = processor.fillIn(dict);
        cell.textContent = cellFilledIn;
    }
    
    table.style.visibility = 'visible';
};
