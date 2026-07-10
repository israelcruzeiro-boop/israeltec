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

// Modal de prints dos sites (vitrine "Sites no ar")
(function () {
  var modal = document.getElementById("sitemodal");
  if (!modal) return;

  var img = modal.querySelector(".sitemodal__img");
  var title = modal.querySelector(".sitemodal__title");
  var visit = modal.querySelector(".sitemodal__visit");
  var lastFocus = null;

  function open(btn) {
    lastFocus = btn;
    img.src = btn.getAttribute("data-shot");
    img.alt = "Print do site " + btn.getAttribute("data-title");
    title.textContent = btn.getAttribute("data-title");
    visit.href = btn.getAttribute("data-url");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".sitemodal__close").focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".browser[data-shot]").forEach(function (btn) {
    btn.addEventListener("click", function () { open(btn); });
  });

  modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();

// Modal de plataformas: galeria, contexto funcional e link de demonstração.
(function () {
  var modal = document.getElementById("platformmodal");
  if (!modal) return;

  var catalog = {
    eleventech: {
      title: "ElevenTech",
      label: "PAINEL ADMIN + APP DE CAMPO",
      url: "https://eleventech.vercel.app/lpvendas",
      description: "Plataforma de gestão para operações rurais e barracões, com um painel administrativo para acompanhar a operação e um aplicativo de campo para registrar coletas.",
      highlights: [
        "Dashboard administrativo com volume, receita, perda, fluxo de cargas e alertas financeiros.",
        "Central de operações com filtros e etapas de trânsito, beneficiamento, pagamento e finalização.",
        "Aplicativo de campo para registrar coletas, consultar produtores e acompanhar o status das cargas.",
        "Permissões separadas por perfil para proteger ações de administração, beneficiamento e estoque."
      ],
      images: [
        { src: "assets/img/plataformas/eleventech-01.jpg", alt: "Landing page da ElevenTech para gestão do agronegócio", caption: "Landing page" },
        { src: "assets/img/plataformas/eleventech-admin-dashboard.jpg", alt: "Painel administrativo de relatórios da ElevenTech", caption: "Dashboard administrativo" },
        { src: "assets/img/plataformas/eleventech-admin-operacao.jpg", alt: "Central de operações da ElevenTech", caption: "Central de operações" },
        { src: "assets/img/plataformas/eleventech-user-coleta.jpg", alt: "Aplicativo de campo da ElevenTech para registrar coletas", caption: "Aplicativo de coleta" }
      ]
    },
    entstore: {
      title: "ENTStore",
      label: "TREINAMENTO, AUDITORIA E CONTEÚDO",
      url: "https://storepagebr.vercel.app/lpage",
      description: "Portal corporativo multiempresa que reúne capacitação, comunicação e auditoria em uma experiência personalizada para cada organização.",
      highlights: [
        "Painel administrativo com indicadores, usuários, repositórios, cursos, checklists e pesquisas.",
        "Identidade visual configurável por empresa, com temas, cores e prévia da experiência do usuário.",
        "Aplicativo mobile para acessar treinamentos, biblioteca, hubs e conteúdos corporativos.",
        "Checklists de auditoria com perguntas, evidências, observações e planos de ação."
      ],
      images: [
        { src: "assets/img/plataformas/entstore-00-landing-hero.png", alt: "Hero da landing page StorePage", caption: "Landing page", fit: "cover" },
        { src: "assets/img/plataformas/entstore-01-admin-dashboard.png", alt: "Painel administrativo do ENTStore", caption: "Dashboard administrativo", fit: "cover" },
        { src: "assets/img/plataformas/entstore-02-identidade-visual.png", alt: "Configuração de identidade visual do ENTStore", caption: "Identidade visual", fit: "cover" },
        { src: "assets/img/plataformas/entstore-03-login-mobile.png", alt: "Login mobile do ENTStore", caption: "Login mobile", fit: "contain" },
        { src: "assets/img/plataformas/entstore-04-home-mobile.png", alt: "Tela inicial mobile do ENTStore", caption: "Início do usuário", fit: "contain" },
        { src: "assets/img/plataformas/entstore-05-curso-mobile.png", alt: "Experiência de curso mobile do ENTStore", caption: "Cursos", fit: "contain" },
        { src: "assets/img/plataformas/entstore-06-checklists-mobile.png", alt: "Checklists e auditorias mobile do ENTStore", caption: "Checklists", fit: "contain" },
        { src: "assets/img/plataformas/entstore-07-vistoria-mobile.png", alt: "Vistoria por checklist no ENTStore", caption: "Vistoria", fit: "contain" }
      ]
    },
    pageflow: {
      title: "Page Flow",
      label: "PERFIL DIGITAL, NFC E CONVERSÃO",
      url: "https://pageflowbr.vercel.app/",
      description: "SaaS de perfis digitais para transformar contatos em conexões de alto valor, unindo cartão NFC, links inteligentes, conteúdo e métricas em uma experiência premium.",
      highlights: [
        "Cartão digital com QR Code e NFC para compartilhar o perfil em segundos.",
        "Hub personalizável com links, WhatsApp, redes sociais, catálogo, portfólio e vídeos.",
        "Formulário de contato e avaliações para transformar visitas em oportunidades.",
        "Telemetria de cliques e visualizações para acompanhar a performance do perfil."
      ],
      images: [
        { src: "assets/img/plataformas/pageflow-00-landing-hero.jpg", alt: "Hero da landing page Page Flow", caption: "Landing page" },
        { src: "assets/img/plataformas/pageflow-01-landing.jpg", alt: "Demonstração de perfis digitais do Page Flow", caption: "Perfis ao vivo" },
        { src: "assets/img/plataformas/pageflow-03-profile.jpg", alt: "Perfil digital com portfólio e contato no Page Flow", caption: "Perfil digital" },
        { src: "assets/img/plataformas/pageflow-03-recursos.jpg", alt: "Recursos SaaS premium do Page Flow", caption: "Recursos premium" }
      ]
    }
  };

  var title = modal.querySelector("#platformmodal-title");
  var label = modal.querySelector(".platformmodal__label");
  var description = modal.querySelector(".platformmodal__description");
  var highlights = modal.querySelector(".platformmodal__highlights");
  var mainImage = modal.querySelector(".platformmodal__main-image");
  var thumbs = modal.querySelector(".platformmodal__thumbs");
  var visit = modal.querySelector(".platformmodal__visit");
  var lastFocus = null;

  function setSlide(platform, index) {
    var image = platform.images[index];
    mainImage.src = image.src;
    mainImage.alt = image.alt;
    mainImage.style.objectFit = image.fit || "cover";
    thumbs.querySelectorAll(".platformmodal__thumb").forEach(function (thumb, thumbIndex) {
      thumb.classList.toggle("is-active", thumbIndex === index);
      thumb.setAttribute("aria-pressed", String(thumbIndex === index));
    });
  }

  function open(key, trigger) {
    var platform = catalog[key];
    if (!platform) return;

    lastFocus = trigger;
    title.textContent = platform.title;
    label.textContent = platform.label;
    description.textContent = platform.description;
    visit.href = platform.url;
    highlights.innerHTML = "";
    thumbs.innerHTML = "";

    platform.highlights.forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      highlights.appendChild(li);
    });

    platform.images.forEach(function (image, index) {
      var thumb = document.createElement("button");
      var thumbImage = document.createElement("img");
      thumb.type = "button";
      thumb.className = "platformmodal__thumb";
      thumb.setAttribute("aria-label", "Ver tela: " + image.caption);
      thumbImage.src = image.src;
      thumbImage.alt = "";
      thumb.appendChild(thumbImage);
      thumb.addEventListener("click", function () { setSlide(platform, index); });
      thumbs.appendChild(thumb);
    });

    setSlide(platform, 0);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".platformmodal__close").focus();
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll("[data-platform]").forEach(function (trigger) {
    trigger.addEventListener("click", function () { open(trigger.getAttribute("data-platform"), trigger); });
  });

  modal.querySelectorAll("[data-platform-modal-close]").forEach(function (element) {
    element.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) close();
  });
})();
