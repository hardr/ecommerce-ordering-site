// jquery test
$(document).on('ready', function() {
  console.log('sanity check!');

  const ajaxGet = 'https://galvanize-eats-api.herokuapp.com/menu';
  const ajaxPost = 'https://galvanize-eats-api.herokuapp.com/orders';

  $.ajax({
      method: 'GET',
      dataType: 'json',
      url: ajaxGet
    }).done(function (results) {
      var sprite = results.sprites.front_default;
      var $img = $('<img src="' + sprite + '">');
      $('.well').prepend($img);
    });

});
// $('#target').val('op‌​tion:first');

// es6 test
const PI = 3.14;

// mocha test
function sum(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}
