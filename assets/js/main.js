// Carrossel simples das telas dos projetos (troca automática + navegação por pontos)
document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
  var imgs = Array.prototype.slice.call(carousel.querySelectorAll("img"));
  if (imgs.length < 2) return;

  // Preserve a single deterministic initial slide for each project carousel.
  imgs.forEach(function (img, i) { img.classList.toggle("is-active", i === 0); });

  var frame = carousel.closest(".project__frame");
  var dotsWrap = frame ? frame.querySelector(".project__dots") : null;
  var current = 0;
  var timer = null;
  var dots = [];

  function show(index) {
    imgs[current].classList.remove("is-active");
    if (dots[current]) dots[current].classList.remove("is-active");
    current = (index + imgs.length) % imgs.length;
    imgs[current].classList.add("is-active");
    if (dots[current]) dots[current].classList.add("is-active");
  }

  function start() {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    timer = setInterval(function () { show(current + 1); }, 3800);
  }

  function restart() {
    if (timer) clearInterval(timer);
    start();
  }

  if (dotsWrap) {
    imgs.forEach(function (img, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Ver tela " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () {
        show(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  start();
});
