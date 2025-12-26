// =====================================
// 横ワイプ：別ページ遷移アニメ（覆う→次ページで抜ける）
// =====================================
(() => {
  const DURATION = 650;
  const KEY = "PAGE_WIPE_NEXT"; // 次ページでenter再生するためのフラグ

  function shouldSkip(a){
    const href = (a.getAttribute("href") || "").trim();
    if(!href) return true;
    if(href.startsWith("#")) return true;             // 同ページアンカー
    if(a.target === "_blank") return true;            // 新規タブ
    if(a.hasAttribute("download")) return true;       // DL
    if(a.dataset.noWipe === "true") return true;      // 手動で無効化
    if(/^mailto:|^tel:|^javascript:/i.test(href)) return true;

    // 外部リンクは除外（外部もやりたいならこのブロックを消す）
    try{
      const url = new URL(href, location.href);
      if(url.origin !== location.origin) return true;
    }catch{
      return true;
    }
    return false;
  }

  // 次ページで「抜ける」アニメを再生（ページロード時）
function playEnter(){
  const flag = sessionStorage.getItem(KEY);
  if(flag !== "1") return;

  sessionStorage.removeItem(KEY);

  const wipe = document.getElementById("pageWipe");
  if(!wipe) return;

  // カーテン抜け
  wipe.classList.add("is-enter");

  // ふわっ開始（少しだけ遅らせると気持ちいい）
  requestAnimationFrame(() => {
    document.documentElement.classList.add("is-entered");
  });

  // 後片付け
  setTimeout(() => {
    wipe.classList.remove("is-enter");
    document.documentElement.classList.remove("is-entering", "is-entered");
  }, DURATION + 700);
}


  // クリックで「覆う」→ 遷移
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if(!a) return;
    if(shouldSkip(a)) return;

    e.preventDefault();

    const wipe = document.getElementById("pageWipe");
    if(!wipe){
      location.href = a.href;
      return;
    }

    // 次ページでenter再生するフラグ
    sessionStorage.setItem(KEY, "1");

    // leave再生
    wipe.classList.add("is-leave");

    setTimeout(() => {
      location.href = a.href;
    }, DURATION);
  });

  // bfcache対策（戻る時に残るの防ぐ）＋ enter再生
  window.addEventListener("pageshow", () => {
    const wipe = document.getElementById("pageWipe");
    if(wipe) wipe.classList.remove("is-leave");
    playEnter();
  });

  // 通常ロードでもenter再生（初回ロードはフラグ無しなので何もしない）
  window.addEventListener("DOMContentLoaded", playEnter);
})();
playEnter();
