$(function () {
  const $groups = $(".voice-wrap__group");
  if (!$groups.length) return;

  if (typeof $.fn.slick !== "function") {
    console.error("slick が読み込まれてないよ（slick.min.js を確認）");
    return;
  }

  $groups.each(function () {
    const $group = $(this);
    const $slider = $group.find(".voice-wrap__group__body__list");
    const $ui = $group.find(".stories-ui");

    if (!$slider.length) return;
    if ($slider.hasClass("slick-initialized")) return;

    // init時にカウントセット
    $slider.on("init", function (event, slick) {
      $ui.find(".current").text(slick.currentSlide + 1);
      $ui.find(".total").text(slick.slideCount);
    });

    $slider.slick({
      infinite: true,
      arrows: false,
      dots: false,
      speed: 800,
      swipeToSlide: true,
      touchThreshold: 12,
      lazyLoad: "progressive",

      // ===== PC（今の見せ方：センター寄せ＋可変幅） =====
      slidesToShow: 1,
      variableWidth: true,
      centerMode: true,

      // ===== SPは3個表示 =====
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: false,
            centerMode: false,
            swipeToSlide: true
          }
        }
      ],
    });

    // current更新
    $slider.on("beforeChange", function (event, slick, current, next) {
      $ui.find(".current").text(next + 1);
    });

    // 外部UIで操作
    $ui.find(".slick-next").off("click").on("click", function () {
      $slider.slick("slickNext");
    });
    $ui.find(".slick-prev").off("click").on("click", function () {
      $slider.slick("slickPrev");
    });
  });
});
s