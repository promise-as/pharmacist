"use strict";

$(function () {
  // 重置select
  // currentOption: 当前选项, showOptions: 模拟的options
  // originalSelect: 原本的select
  function optimizeSelect(currentOption, showOptions, originalSelect) {
    // 默认显示的option标签
    currentOption.click(function () {
      showOptions.css("display", "block");

      // 点击默认显示的option标签，就显示模拟的options
      showOptions.children("li").each(function () {
        $(this).click(function () {
          // 取模拟的select的li的rel的值赋值给option标签的value
          originalSelect.val($(this).attr("rel"));
          // 隐藏模拟的select
          showOptions.css("display", "none");
          // 把从option标签的html值赋值给默认显示的option
          currentOption.html($(this).html());
        });
      });
    });
  }
  // 类别
  optimizeSelect($(".current-type"), $(".types-options"), $(".types-select"));
  // 学历
  optimizeSelect($(".current-degree"), $(".degree-options"), $(".degree-select"));

  // 设置全局变量
  var num = 1; // 点击的次数
  var deg = 180; //旋转度数
  $(".refresh").click(function (event) {
    event.preventDefault();
    $(this).css("transform", "rotate(" + num * deg + "deg)");
    num++;
    $('.refresh').attr("disabled", "disabled");
    // 3秒之后图片验证码请求成功
    setTimeout(function () {
      console.log('3秒之后图片验证码请求成功');
      $('.refresh').removeAttr("disabled");
    }, 3000);
  });

  // 验证码60s倒计时
  $(".get-msg-auth").click(function () {
    LockButton('.get-msg-auth', 10);
  });

  // 按钮倒计时方法 remainTime: 剩余时间
  var LockButton = function LockButton(btnObjId, remainTime) {
    //1.获取当前系统时间
    //2.获取 remainTime 后的系统时间
    //3.用cookie保存到期时间
    //4.每次加载后获取cookie中保存的时间
    //5.用到期时间减去当前时间获取倒计时
    var countdownTime = $.cookie("countdownTime"); // 存cookie
    if (countdownTime === null || countdownTime === undefined || countdownTime === 'undefined' || countdownTime === 'null') {
      var now = new Date().getTime(); //当前时间戳
      var endTime = remainTime * 1000 + now; //结束时间戳
      $.cookie("countdownTime", endTime); //将结束时间保存到cookie
    }
    $(btnObjId).attr('disabled', 'disabled').val('(' + remainTime + ')秒后重新获取');
    var timer = setInterval(function () {
      remainTime--;
      $(btnObjId).val('(' + remainTime + ')秒后重新获取');
      if (remainTime <= 0) {
        //倒计时结束清除cookie值
        $.cookie("countdownTime", null);
        $(btnObjId).removeAttr('disabled').val('获取验证码');
        clearInterval(timer);
      }
    }, 1000);
  };

  //读取cookie
  if ($.cookie("countdownTime") !== undefined && !isNaN($.cookie("countdownTime"))) {
    //读取到了cookie值
    var countdownTime = $.cookie("countdownTime");
    var now = new Date().getTime(); //当前时间戳
    var remainTime = parseInt((countdownTime - now) / 1000); // 取整
    if (remainTime <= 0) {
      $.cookie("countdownTime", null);
    } else {
      LockButton('.get-msg-auth', remainTime); // remainTime: 剩余时间
    }
  }
});