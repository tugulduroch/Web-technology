'use strict';

var DatePicker = function DatePicker(id, callback) {
    this.id = id;
    this.callback = callback;
};

/**
    сарын нэр болон индексийг буцааж байна
 */
DatePicker.prototype.monthName = function monthName(monthIndex) {
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthIndex];
};

/**
    Хүснэгтийг хэвлэж байна.
 */
DatePicker.prototype.renderTable = function renderTable(monthName, year) {
    document.getElementById(this.id).innerHTML = ['<table>','<thead>','<tr>',
    '<th class="month-back">&lt;</th>',
    '<th colspan="5">', monthName.slice(0, 3), ' ', year, '</th>',
        '<th class="month-forward">&gt;</th>','</tr>','<tr>',
        '<th>Su</th>','<th>Mo</th>', '<th>Tu</th>','<th>We</th>','<th>Th</th>','<th>Fr</th>','<th>Sa</th>',
        '</tr>','</thead>',  '<tbody>','</tbody>','</table>'].join('');
};


/**
    Datepicker утгын оноож Render хийж байна
 */
DatePicker.prototype.render = function render(date) {
    var month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear(),
        monthIndex = date.getMonth(),
        that = this,
        tempDate = new Date(year, monthIndex, day),
        tempDay = tempDate.getDate(),
        calendarBody,
        daysHtml = '',
        i,
        selectables,
        selectableHandler;

    this.callback(this.id, { month: month, day: day, year: year });

    this.renderTable(this.monthName(monthIndex), year);

    // Сар солих 
    document.querySelector('#' + this.id + ' .month-back')
        .addEventListener('click', function () {
            that.render(new Date(year, monthIndex - 1));
        });
    document.querySelector('#' + this.id + ' .month-forward')
        .addEventListener('click', function () {
            that.render(new Date(year, monthIndex + 1));
        });

    // Сарын эхинй өдөрийг гаргах
    tempDate.setDate(1);
    if (tempDate.getDay() !== 0) {
        tempDate.setDate(1 - tempDate.getDay());
    }

    calendarBody = document.querySelector('#' + this.id + ' tbody');
    while (tempDate.getMonth() % 12 !== (monthIndex + 1) % 12) {
        daysHtml += '<tr>';
        for (i = 0; i < 7; i += 1) {
            tempDay = tempDate.getDate();
            if (tempDate.getMonth() % 12 !== monthIndex % 12) {
                daysHtml += '<td class="dimmed">' + tempDay + '</td>';
            } else if (tempDay === day) {
                daysHtml += '<td class="active">' + tempDay + '</td>';
            } else {
                daysHtml += '<td class="selectable-day">' + tempDay + '</td>';
            }
            tempDate.setDate(tempDay + 1);
        }
        daysHtml += '</tr>';
    }
    calendarBody.innerHTML = daysHtml;

    selectables = document.querySelectorAll('#' + this.id + ' .selectable-day');
    selectableHandler = function selectableHandler(event) {
        that.render(new Date(
            year,
            monthIndex,
            event.target.textContent 
        ));
    };
    for (i = 0; i < selectables.length; i += 1) {
        selectables[i].addEventListener('click', selectableHandler);
    }
};
