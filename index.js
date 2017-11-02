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
})();

export default playground;
