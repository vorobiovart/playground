import _ from 'lodash';

export default (function() {
  const sayHi = () => {
    console.log('Hiiiiiii!111');
    console.log(_.isArray([]));
  }

  sayHi();
})();
