"use strict";

$(function () {
  // 默认显示的option标签
  $(".current-type").click(function () {
    $(".types-options").css("display", "block");

    // 点击默认显示的option标签，就显示模拟的options
    $(".types-options li").each(function () {
      $(this).click(function () {
        // 取模拟的select的li的rel的值赋值给option标签的value
        $(".types-select").val($(this).attr("rel"));
        // 隐藏模拟的select
        $(".types-options").css("display", "none");
        // 把从option标签的html值赋值给默认显示的option
        $(".current-type").html($(this).html());
      });
    });
  });

  // 默认显示的option标签
  $(".current-degree").click(function () {
    $(".degree-options").css("display", "block");

    // 点击默认显示的option标签，就显示模拟的options
    $(".degree-options li").each(function () {
      $(this).click(function () {
        // 取模拟的select的li的rel的值赋值给option标签的value
        $(".degree-select").val($(this).attr("rel"));
        // 隐藏模拟的select
        $(".degree-options").css("display", "none");
        // 把从option标签的html值赋值给默认显示的option
        $(".current-degree").html($(this).html());
      });
    });
  });
});