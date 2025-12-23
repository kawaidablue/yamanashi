$(function () {
  const $slider = $(".voice-wrap__group__body__list"); // ← ul
  const $ui = $(".stories-ui");

  if (!$slider.length) return;
  if (typeof $.fn.slick !== "function") {
    console.error("slick が読み込まれてないよ（slick.min.js を確認）");
    return;
  }

  // すでに初期化済みなら二重起動を防ぐ
  if ($slider.hasClass("slick-initialized")) return;

  // init時にカウントセット
  $slider.on("init", function (event, slick) {
    $ui.find(".current").text(slick.currentSlide + 1);
    $ui.find(".total").text(slick.slideCount);
  });

  $slider.slick({
    infinite: true,       // ✅ 5の次に1が“横にいる感覚”はこれ
    slidesToShow: 1,
    variableWidth: true,  // ✅ Forbes寄せ：カード幅が自然
    centerMode: true,
    arrows: false,        // 外のUIを使う
    dots: false,
    speed: 900,       // 連打でも止まりにくい
  swipeToSlide: true,
    swipeToSlide: true,
    touchThreshold: 12,
    lazyLoad: "progressive",

    // ★スマホでも動かしたいなら、これを消す（後述）
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  });

  // current更新
  $slider.on("beforeChange", function (event, slick, current, next) {
    $ui.find(".current").text(next + 1);
  });

  // 外部UIで操作（.stories-ui内のボタンを使う）
  $ui.find(".slick-next").on("click", function () {
    $slider.slick("slickNext");
  });
  $ui.find(".slick-prev").on("click", function () {
    $slider.slick("slickPrev");
  });
});
