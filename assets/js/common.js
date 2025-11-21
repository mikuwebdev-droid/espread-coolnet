var homeUrl = (function() {
  var path = document.scripts[document.scripts.length - 1].src;
  var parts = path.split('/');
  return parts.slice(0, parts.length - 3).join('/') + '/';
})();

var replaceTexts = [
  { from: '{{HOME}}', to: homeUrl },
  { from: '{{THIS_URL}}', to: window.location.href },
];
var __DIR__ = (function() {
  var scripts = document.getElementsByTagName('script');
  var thisScript = scripts[scripts.length-1];
  var src = thisScript.src;
  return src.split('/').slice(0, -1).join('/') + '/';
})();

// 共通部分の読み込み
fetch(homeUrl + "/inc/header.inc")
  .then((response) => response.text())
  .then((data) => document.getElementById("header").outerHTML = data.replace(/{{HOME}}/g, homeUrl));

fetch(homeUrl + "/inc/footer.inc")
  .then((response) => response.text())
  .then((data) => document.getElementById("footer").outerHTML = data.replace(/{{HOME}}/g, homeUrl));

// ハンバーガーメニュー
(function ($) {
  $(function () {
    $(".nav__toggle").on("click", function () {
      $("body").toggleClass("open");
    });
  });
})(jQuery);

// スクロール
$('a[href^="#"]').click(function () {
  var speed = 400;
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? "html" : href);
  var position = target.offset().top;
  $("body,html").animate({ scrollTop: position }, speed, "swing");
  return false;
});

// グローバルナビメニューのリンクをクリックしたらページを閉じる
$(function () {
  $(".gloval__nav .header__item > a").on("click", function () {
    $(this).parent().toggleClass("-open");
  });
});

if ($(".js-scrollable").length) {
  new ScrollHint(".js-scrollable", {
    suggestiveShadow: true, //スクロール可能な要素右端に影を付ける
    i18n: {
      scrollable: "横スクロール可能です", //表示するテキスト
    },
  });
}
