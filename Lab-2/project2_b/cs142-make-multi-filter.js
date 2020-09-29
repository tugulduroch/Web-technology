'use strict';

/**
 * cs142MakeMultiFilter - Create a multi filter function that filters
 * an array and keeps track of the filtered array internally.
 * @param  {array} originalArray - The array to be filtered.
 * @return {function}            - The filter function.
 */
function cs142MakeMultiFilter(originalArray) {
    var currentArray = originalArray.slice();   // currentArray is a copy of
                                                // originalArray.

    /**
     * arrayFilterer - Deletes elements from originalArray according
     * to a filter criteria, and calls back a function upon finishing.
     * @param  {function} filterCriteria - The filter criteria which
     * takes elements from the array, and returns false if they should
     * be deleted from the array, true otherwise.
     * @param  {function} callback  - The function to be called back.
     * @return {function}           - Return itself, to allow cascading.
     */
    var arrayFilterer = function (filterCriteria, callback) {
        // Calling arrayFilterer() returns the currentArray
        if (typeof filterCriteria !== 'function') {
            return currentArray;
        }

        for (var i = 0; i < currentArray.length; i++) {
            // Delete array element if it doesn't pass the filter criteria
            if (!filterCriteria(currentArray[i])) {
                currentArray.splice(i, 1);
                i--;
            }
        }

        if (typeof callback === 'function') {
            // Set callback's this to originalArray, and pass currentArray
            // as a parameter
            callback.apply(originalArray, [currentArray]);
        }

        return arrayFilterer;
    };

    return arrayFilterer;
}
