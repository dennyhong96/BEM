import "core-js";
import "regenerator-runtime";

const $ = (qs) => document.querySelector(qs);
const $a = (qs) => document.querySelectorAll(qs);
const gen = (type) => document.createElement(type);

const container = $(".container");
const cookieBtn = $(".cookies__btn");
const cookieBanner = $(".cookies");

const backtopButton = $(".back-to-top");
const headerButton = $(".header__btn");

const featuresSection = $(".features");
const homesSection = $(".homes");

const modal = $(".modal");
const overlay = $(".overlay");
const modalCloseBtn = $(".modal__close-btn");
const modalActions = $(".modal__actions");

const contactBtns = $a(".home__btn");

window.addEventListener("load", init);

let modalMsgEl;

function init() {
  cookieBtn.addEventListener("click", handleCloseCookies);
  backtopButton.addEventListener("click", handleScrollToTop);
  headerButton.addEventListener("click", handleViewProperties);
  modalCloseBtn.addEventListener("click", toggleModal);
  modalActions.addEventListener("click", function (evt) {
    const btn = evt.target.closest(".btn");
    if (!btn) return;
    toggleModal();
  });

  contactBtns.forEach((btn) => {
    btn.addEventListener("click", handleContactRealtor);
  });

  toggleBackToTopBtn();
  showCookiesAlert();
}

function handleCloseCookies() {
  hide(cookieBanner, 0.5);
}

function handleScrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

function handleViewProperties() {
  const { top } = homesSection.getBoundingClientRect();
  window.scrollTo({ top: top - 50, behavior: "smooth" });
}

function toggleBackToTopBtn() {
  const backTopBtnObserver = new IntersectionObserver(
    function ([features]) {
      if (features?.isIntersecting) {
        return show(backtopButton);
      }
      if (!features?.isIntersecting && features.boundingClientRect.top > 0) {
        return hide(backtopButton, 0.5);
      }
    },
    {
      root: null,
      threshold: [0.75],
    }
  );
  backTopBtnObserver.observe(featuresSection);
}

function showCookiesAlert() {
  setTimeout(() => {
    show(cookieBanner);
  }, 1500);
}

function toggleModal() {
  modal.classList.toggle("modal--show");
  overlay.classList.toggle("overlay--show");
  container.classList.toggle("stop-scrolling");
}

function handleContactRealtor(evt) {
  // Handles user not clicked on contact button
  const home = evt.target.closest(".home");
  if (!home) return;

  // Clear exsiting modal inner message
  if (modalMsgEl) modalMsgEl.remove();

  // Generate new modal inner message
  const propertyName = home.querySelector(".home__name").textContent;
  const countryName = home.querySelector(".home__location > p").textContent;
  modalMsgEl = gen("p");
  modalMsgEl.textContent = `Are you sure you want to contact the realtor for ${propertyName} located in ${countryName}?`;
  modalMsgEl.classList.add("modal__message");

  // Render modal
  modalCloseBtn.insertAdjacentElement("afterend", modalMsgEl);
  toggleModal();
}

function hide(el, duration = 0) {
  el.style.opacity = "0";
  setTimeout(() => {
    el.style.visibility = "hidden";
  }, duration * 1000);
}

function show(el) {
  el.style.visibility = "visible";
  el.style.opacity = "100";
}
