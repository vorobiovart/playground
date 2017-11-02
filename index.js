import _ from 'lodash';
import algorithms from './src/algorithms';

const playground = (function() {
  const sayHi = () => {
    console.log('Hiiiiiii!111');
    console.log(_.isArray([]));
  }

  sayHi();

  // find pairs algo test
  const array = [1, 2, 3, 4, 5, 6, -9, 10];
  algorithms.extendArrayWithFindPairsAlg();
  const pairs = array.findPairs(6);
  console.log(pairs);

  // test debounce
  const a = 'test';
  const testDebounce = algorithms.debounce(function(mes) {
      console.log(mes);
  }, 500, a);
  document.querySelector('#button').onclick = testDebounce;

  // async map test
  var job1 = function(cb) {
    setTimeout(function() { cb('first'); }, 900);
  };

  var job2 = function(cb) {
    setTimeout(function() { cb('second'); }, 100);
  };

  var job3 = function(cb) {
    setTimeout(function() { cb('third'); }, 300);
  };

  var jobs = [job1, job2, job3];
  var callback = function(results) { console.log(results); };

  algorithms.asyncMap(jobs, callback);
})();

export default playground;
