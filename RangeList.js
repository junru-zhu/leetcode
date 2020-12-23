class RangeList {
    constructor() {
    	this.ranges = [];
    }
    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
    */
    add(range) {
    	// init data
    	var newStart = range[0], newEnd = range[1];
    	var idx = 0, n = this.ranges.length;
    	var result = [];

    	// add all ranges starting before newRange
    	while (idx < n && newStart > this.ranges[idx][0]) {
    		result.push(this.ranges[idx++]);
    	}

    	// add newRange
    	var interval;
    	// if there is no overlap, just add the range
    	if (result.length == 0 || result[result.length - 1][1] < newStart) {
    		result.push(range);
    	}
    	// if there is an overlap, merge with the last range 
    	else {
    		var interval = result.pop();
    		interval[1] = Math.max(interval[1], newEnd);
    		result.push(interval);
    	}

    	// add next ranges, merge with newRange if needed
    	while (idx < n) {
    		interval = this.ranges[idx++];
    		var start = interval[0], end = interval[1];
    		// if there is no overlap, just add an range
    		if (result[result.length - 1][1] < start) {
    			result.push(interval);
    		}
    		// if there is an overlap, merge with the last range
    		else {
    			interval = result.pop();
    			interval[1] = Math.max(interval[1], end);
    			result.push(interval);
    		}
    	}

        this.ranges = result;
    }
    
    /**
	* Removes a range from the list
	* @param {Array<number>} range - Array of two integers that specify beginning and end of range.
	*/
    remove(range) {
    	var result = [];
    	var interval;
    	var start = range[0], end = range[1];
    	if (start == end) {
    		return;
    	}
    	for (interval of this.ranges) {
	    	// if there is no overlap, just add the range
	    	if (interval[1] <= start || interval[0] >= end) {
	    		result.push(interval);
	    	}
	    	// if there is overlap, remove the overlapped part
	    	else {
	    		// case 0: overlap all, do not add the range
	    		if (interval[0] >= start && interval[1] <= end) {

	    		}
	    		// case 1: overlap the front
	    		else if (start <= interval[0] && end < interval[1]) {
	    			interval[0] = end;
	    			if (interval[0] < interval[1]) {
	    				result.push(interval);
	    			}
	    		}
	    		// case 2: overlap the end
	    		else if (start > interval[0] && end >= interval[1]) {
	    			interval[1] = start;
	    			if (interval[0] < interval[1]) {
	    				result.push(interval);
	    			}
	    		}
	    		// case 3: overlap the middle
	    		else {
	    			var intervalStart = interval[0], intervalEnd = interval[1];
	    			var interval1 = [intervalStart, start], interval2 = [end, intervalEnd];
	    			if (interval1[0] < interval[1]) {
	    				result.push(interval1);
	    			}
	    			if (interval2[0] < interval2[1]) {
	    				result.push(interval2);
	    			}
	    		}
	    	}
    	}
    	this.ranges = result;
    }

    /**
	* Prints out the list of ranges in the range list
	*/
    print() {
    	var text = "";
    	var range;
        for (range of this.ranges) {
            text += "[" + range[0] + ", " + range[1] + ") ";
        }
        console.log(text);
    }
}

const r1 = new RangeList();
r1.add([1, 5]); 
r1.print();
r1.add([10, 20]); 
r1.print();
r1.add([20, 20]); 
r1.print();
r1.add([20, 21]); 
r1.print();
r1.add([2, 4]); 
r1.print();
r1.add([3, 8]); 
r1.print();
r1.remove([10, 10]); 
r1.print();
r1.remove([10, 11]); 
r1.print();
r1.remove([15, 17]); 
r1.print();
r1.remove([3, 19]); 
r1.print();
