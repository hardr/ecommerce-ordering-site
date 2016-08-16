// jquery test
$(document).on('ready', function() {
  console.log('sanity check!');

  const ajaxGet = 'https://galvanize-eats-api.herokuapp.com/menu';
  const ajaxPost = 'https://galvanize-eats-api.herokuapp.com/orders';
  var $menu;
  var selectId = 1;

  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: ajaxGet
  }).done(function (results) {
    $menu = results.menu;
    $menu.forEach(function(each) {
      var type = '.' + each.type;
      var menuItem = $('<div class="item-select" id="' + each.id + '">' + each.name + '<span>&lt; / &gt;</span><span>$' + each.price + '</span></div>');
      if (each.type !== 'burger' && each.type !== 'pizza') {
        $('div.misc').append(menuItem);
        $('div.menu-items div.six').addClass('four').removeClass('six');
        $('.misc').show();
      } else {
        $('div' + type).append(menuItem);
      }
    });
    $('div.burger div.item-select:first-child').addClass('item-selected');
  }).fail(function(error) {
    console.log(error);
  });

  $('.menu-type').on('click', '.item-select', function() {
    selectId = parseInt($(this).attr('id'));
    $('.menu-type .item-selected').addClass('item-select').removeClass('item-selected');
    $('#' + selectId).addClass('item-selected').removeClass('item-select');
  });

  var subtotal = 0;
  var order = {};

  $('.menu-select').on('click', function(e) {
    e.preventDefault();
    $menu.forEach(function(each, index) {
      if (hasKeyValuePair(each)) {
        var qty = parseInt($('#quantity').val());
        var count = 0;
        while (count < qty) {
          $('.selection').append('<div class="on-order" id="' + $menu[index].id + '">' + $menu[index].name + '<span>$' + $menu[index].price + '</span></div>');
          subtotal += parseFloat($menu[index].price.toFixed(2));
          var taxes = (subtotal * 0.083).toFixed(2);
          var grandTotal = (subtotal + parseFloat(taxes)).toFixed(2);
          $('td.subtotal').text('$' + subtotal);
          $('td.tax').text('$' + taxes);
          $('td.grand').text('$' + grandTotal);
          order[qty + '_' + $menu[index].name] = $menu[index].price * 2;
          count++;
        }
      }
    });
  });

  function hasKeyValuePair(obj) {
    if (obj.id === selectId) {
      return true;
    }
  }

  $('.order-submit').on('click', function(e) {
    e.preventDefault();
    order.name = $('.name').val();
    order.number = $('.tele').val();
    order.address = $('.address').val();
    console.log(order);

    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: ajaxPost
    }).done(function (results) {
      var confirm = results[responseText];
      console.log(confirm);
      console.log('success');
    }).fail(function(error) {
      console.log(error);
      console.log('fail');
    });
  });
});

// es6 test
const PI = 3.14;

// mocha test
function sum(num1, num2) {
  return parseInt(num1) + parseInt(num2);
}
