$(function() {
  var b = 'document';
  console.log(b);
  //alert(b+'fff');
  console.log('cccc333');
  console.log(c);

  //跟随导航
  $('.navList li').each(function(index, el) {
    if (window.location.href.indexOf($(this).find('a').attr('href')) > -1) {
      $(this).addClass('selected').siblings().removeClass('selected');
    }
  });


  //已开户切换
  $('.J_accountTab li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.boxContainer').hide().eq($('.J_accountTab li').index(this)).show();
  });


});
