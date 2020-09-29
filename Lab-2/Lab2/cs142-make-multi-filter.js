'use strict';

function cs142MakeMultiFilter(originalArray) {
    var currentArray = originalArray.slice(); 

    var arrayFilterer = function (filterCriteria, callback) {
        if (typeof filterCriteria !== 'function') {
            return currentArray;
        }

        for (var i = 0; i < currentArray.length; i++) {
            if (!filterCriteria(currentArray[i])) {
                currentArray.splice(i, 1);
                i--;
            }
        }

        if (typeof callback === 'function') {
            callback.apply(originalArray, [currentArray]);
        }

        return arrayFilterer;
    };

    return arrayFilterer;
}