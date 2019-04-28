$(function () {
  $(".nav .nav-item").each(function (index, ele) {
    // 导航容器的宽度
    $(ele).outerWidth($(ele).children(".item-title").outerWidth());
    // 导航内容的宽度
    $(ele).children(".item-content").outerWidth($(ele).outerWidth());
    // 导航切换
    $(ele).mouseover(function () {
      $(this).addClass("active").siblings().removeClass("active");
    });
    $(ele).mouseout(function () {
      $(this).removeClass("active").siblings().removeClass("active");
    });
  });

  $(".item-content .text").mouseover(function(){
    $(this).addClass("active").siblings().removeClass("active");
  });

  // 评论 top-item 的高度 paddingTop + paddingBottom = 46
  $(".top-item").outerHeight($(".top-item .text").outerHeight() + 46);

  // 最新资讯 msg-item 的高度
  var h_max = 0; // 定义一个默认变量，用于比较
  $(".msg-item").each(function (index, e) {
    //获取每个元素的高度
    var h = $(e).outerHeight(true);
    //比较获取的元素高度值和默认变量，如果比0大，则取获取的值，否则取0
    h_max = h > h_max ? h : h_max;
  });
  $('.msg-item').outerHeight(h_max); //给每一个元素设置相同的高度
});