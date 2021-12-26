function findAllCombinations(arrayOfValues, numberOfArrays, arrayOfCombinations) {
    var arrayOfResultCombinations = [];
    var arrayOfCombinations = arrayOfCombinations || arrayOfValues;
    var valuesLength = arrayOfValues.length;
    var combinationsLength = arrayOfCombinations.length;

    while (numberOfArrays > 1) {
        for (var i = 0; i < valuesLength; i++) {
            for (var j = 0; j < combinationsLength; j++) {
                arrayOfResultCombinations.push('' + arrayOfCombinations[j] + arrayOfValues[i]);
            }
        }

        return findAllCombinations(arrayOfValues, numberOfArrays-1, arrayOfResultCombinations);
    }

    return arrayOfCombinations;
}

function extendArrayWithFindPairsAlg() {
  Array.prototype.findPairs = function(number) {
    var array = this;
    var arrayLength = array.length;
    var valueIndexMap = {};
    var valueValueMap = {};
    var usedNumbers = {};
    var canContinue;
    var output = [];

    array.forEach(function(number, index) {
    	valueIndexMap[number] = index;
    	valueValueMap[number] = number;
    });

    for (var i = 0; i < arrayLength; i++) {
      	canContinue = true;
      	if ((valueIndexMap[number - array[i]] === i) || usedNumbers[array[i]] ||   usedNumbers[number - array[i]]) {
      		canContinue = false;
      	}

  	   if (canContinue && (valueValueMap[number - array[i]] === number - array[i])) {
  			output.push([array[i], number - array[i]]);
  			usedNumbers[array[i]] = true;
  			usedNumbers[number - array[i]] = true;
  		}
  	}

  	return output;
  };
}

function capitalUseCheck(string) {
    var correct = false;

    if ((string[0] === string[0].toUpperCase()) &&
        (string.substring(1, string.length) === string.substring(1, string.length).toLowerCase())){
        correct = true;
    }

    if (string === string.toUpperCase()) {
        correct = true;
    }

    if (string === string.toLowerCase()) {
        correct = true;
    }

    return correct;
}


function isUgly(number) {
    var numberOfPrimes = [];
    var uglyPrimes = [1,2,3,5];
    var ugly = true;

    for (var i = 1; i < number; i++) {
        if ((number%i === 0 && (i === 2 || i === 3 || i === 5)) || (number%i === 0 &&  !(i%2 === 0 || i%3 === 0 || i%5 === 0))) {
            numberOfPrimes.push(i);
        }
    }

    numberOfPrimes.forEach(function(n) {
        if (uglyPrimes.indexOf(n) === -1) {
            ugly = false;
        }
    });

    return ugly;
}

function wordPattern(pattern, string) {
    var patterArray = pattern.split('');
    var stringArray = string.split(' ');
    var patterLength = patterArray.length;
    var patternObj = {};
    var patternCorrect = true;

    if (patterArray.length !== stringArray.length) {
        return false;
    }

    for (var i = 0; i < patterLength; i++) {
        patternObj[patterArray[i]] = stringArray[i];
    }

    for (var j = 0; j < patterLength; j++) {
        if (patternObj[patterArray[j]] !== stringArray[j]) {
            patternCorrect = false;
        }
    }

    return patternCorrect;
}

 // IMPORTANT !!! -----------------------------------------------------------------------
// -------------------------->  flatten the array recursevly
// O(n)
function flatten(array) {
    var flattenArray = [];

    array.forEach(function(element) {
        if (Array.isArray(element)) {
            flattenArray = flattenArray.concat(flatten(element));
        } else {
            flattenArray.push(element);
        }
    });

    return flattenArray;
}

// -------------------------->  flatten the array not recursevly
// O(n)
function flattenWhile(array) {
    //not to mutate array
    var clone = array.slice(0);
    var flattenArray = [];

    while(clone.length) {
        var element = clone.shift();
        if (Array.isArray(element)) {
            clone = element.concat(clone);
        } else {
            flattenArray.push(element);
        }
    }

    return flattenArray;
}

// --------------------------> Searching for a Symmetric Node
// this one is O(log n)
function getChildren(node) {
    return Array.prototype.slice.call(node.childNodes);
}

function findTheWayUp(node, root) {
    var nodeIndexAmongSiblings;
    var wayUp = [];
    var currentNode = node;

    while(currentNode && currentNode.parentNode && currentNode !== root) {
        nodeIndexAmongSiblings = getChildren(currentNode.parentNode).indexOf(currentNode);
        wayUp.push(nodeIndexAmongSiblings);
        currentNode = currentNode.parentNode;
    }

    return wayUp;
}

function findTheNode(root, wayUp) {
    var wayUpClone = wayUp.slice(0);
    var node = root;

    while (wayUpClone.length) {
        node = getChildren(node)[wayUpClone.pop()];
    }

    return node;
}

function findSimilarNode(givenNode, rootWithNode, rootWithNodeToFind) {
    return findTheNode(rootWithNodeToFind, findTheWayUp(givenNode, rootWithNode));
}

findSimilarNode(
    document.getElementById('node1'),
    document.getElementById('root1'),
    document.getElementById('root2')
);

// --------------------------> write debounce
//super simple
function debounceSimple(callback, timeToWait) {
    var currentTimeoutRuning;

    return function() {
        clearTimeout(currentTimeoutRuning);
        currentTimeoutRuning = setTimeout(callback, timeToWait || 0);
    }
}

// support of context and arguments
function debounceArgs(callback, timeToWait) {
    var currentTimeoutRuning;
    var args = Array.prototype.slice.call(arguments, 2);

    return function() {
        var context = this;
        clearTimeout(currentTimeoutRuning);
        currentTimeoutRuning = setTimeout(() => callback.apply(context, args), timeToWait || 0);
    }
}

function debounce(callback, timeToWait) {
	var currentRunningTimeout;
	var args = Array.prototype.slice.call(arguments, 2);

	return function() {
		var context = this;
		clearInterval(currentRunningTimeout);
		currentRunningTimeout = setTimeout(function() {
			callback.apply(context, args);
		}, timeToWait || 0);
	}
}

// asyncMap

// Task description:
// Write an asyncMap function with two parameters — an array of asynchronous functions and a callback
// function. Each of the asynchronous functions takes a its own callback and invokes that callback when
// finished executing.
// The callback passed to asyncMap should be invoked on the results of the callbacks of the asynchronous
// functions. The order of the results should be the same as the order in which the asynchronous
// functions were invoked. Note, the order in which the asynchronous functions are passed to a
// syncMap determines the order of the results, not the order in which the asynchronous functions
// finish executing. After all the callbacks of the asynchronous functions have returned, asyncMap
// should invoke the callback on the collection of results.
function asyncMap(requests, callback) {
  let finished = requests.length;
  const results = [];

  requests.forEach((request, index) => {
    request((result) => {
      results[index] = result;
      if (--finished === 0) {
        callback(results);
      }
    });
  });
}

// --------------------------> write myBind
Function.prototype.myBind = Function.prototype.myBind || function(context) {
    var functionToInvoke = this;
    var args = Array.prototype.slice.call(arguments, 1);

    return function() {
        return functionToInvoke.apply(this, args);
    }

    // or arrow functions
    //return () => functionToInvoke.apply(this, args);
}


// EMITTER
var Emitter = function() {
    this.events = {};
};

var Subscription = function(event, callback, event_listeners, key) {
    this.event = event;
    this.callback = callback;
    this.event_listeners = event_listeners;
    this.key = key;
};

Subscription.prototype.release = function () {
    var ret = false;

    if (this.event_listeners[this.key]) {
        delete this.event_listeners[this.key];
        ret = true;
    }

    return ret;
};

Emitter.prototype.subscribe = function(event_name, callback) {
    if (!this.events.hasOwnProperty(event_name)) {
        this.events[event_name];
        this.events[event_name] = [];
    }

    var subscription = new Subscription(event_name, callback, this.events[event_name], this.events[event_name].length);
    this.events[event_name].push(subscription);
    return subscription;
};

Emitter.prototype.emit = function(event_name, param1, param2) {
    var subs = this.events[event_name];
    return subs.forEach(function(sub) {
        return sub.callback.call(sub, param1, param2);
    });
}

export default {
  asyncMap,
  extendArrayWithFindPairsAlg,
  debounce
}
