import "../../node_modules/focus-visible/dist/focus-visible";
import "../components/main/main.scss";
import "../components/brands/brands.scss";
import "../components/sliderService/serviseSlider.scss";
import "../components/price/price.scss";
import "../styles/main.scss";
import "../components/burger/burgerMobile.scss";
import "../components/price/priceGrid.scss";
import "../components/information/information.scss";
import "../components/footer/footer.scss";
import "../components/call/call.scss";

document.addEventListener("DOMContentLoaded", () => {
  try {
    const brandsSlider = new Swiper(".brands__slider", {
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

    });


    const toggleBtn = document.querySelector(".toggle-text");
    const paragraph = document.querySelector(".content__paragraph--secondary");
    const label = toggleBtn.querySelector(".toggle-text__label");
    const arrowImg = toggleBtn.querySelector("img");

    if (!toggleBtn || !paragraph) return;

    toggleBtn.addEventListener("click", () => {
      const isExpanded = paragraph.classList.toggle("expanded");

      label.textContent = isExpanded ? "Скрыть" : "Читать далее";
      toggleBtn.setAttribute("aria-expanded", String(isExpanded));
      if (arrowImg) {
        arrowImg.style.transition = "transform 0.3s ease";
        arrowImg.style.transform = isExpanded ? "rotate(180deg)" : "rotate(0deg)";
      }
    });


    const servicesSlider = new Swiper(".services__slider", {
      slidesPerView: "auto",
      spaceBetween: 16,
      slidesOffsetBefore: 16,
      slidesOffsetAfter: 16,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    const burgerBtn = document.querySelector(".header__burger-button");
    const burgerMenu = document.querySelector(".burger__menu");
    const backButton = document.querySelector(".icon-button");
    const overlay = document.querySelector(".overlay");

    const openMenu = () => {
      burgerMenu.classList.add("active");
      overlay.classList.add("active");
    };

    const closeMenu = () => {
      burgerMenu.classList.remove("active");
      overlay.classList.remove("active");
    };

    burgerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (burgerMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (backButton) {
      backButton.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
      });
    }

    const callbackMenuCall = document.querySelector(".callback__menu--call");
    const callbackMenuChat = document.querySelector(".callback__menu--chat");
    const callbackOpenBtnsCall = document.querySelectorAll(
      ".open-modal-btn--call"
    );
    const callbackOpenBtnsChat = document.querySelectorAll(
      ".open-modal-btn--chat"
    );
    const callbackCloseBtns = document.querySelectorAll(
      ".callback__menu--close"
    );
    const callbackOverlay = document.querySelector(".callback-overlay");

    const openCallbackMenu = (menu) => {
      menu.classList.add("active");
      callbackOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeCallbackMenu = () => {
      callbackMenuCall.classList.remove("active");
      callbackMenuChat.classList.remove("active");
      callbackOverlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    callbackOpenBtnsCall.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openCallbackMenu(callbackMenuCall);
      });
    });

    callbackOpenBtnsChat.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openCallbackMenu(callbackMenuChat);
      });
    });

    callbackCloseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeCallbackMenu();
      });
    });

    // callbackOverlay.addEventListener("click", (e) => {
    //   if (e.target === callbackOverlay) {
    //     closeCallbackMenu();
    //   }
    // });

    document
      .querySelectorAll(".brands-section, .services-section")
      .forEach((section) => {
        const toggleButton = section.querySelector(".toggle-btn");
        const grid = section.querySelector(".brands-grid, .services-grid");

        if (toggleButton && grid) {
          toggleButton.addEventListener("click", () => {
            grid.classList.toggle("expanded");

            const buttonText = toggleButton.querySelector(".toggle-btn__text");
            const arrowImg = toggleButton.querySelector("img");

            if (buttonText) {
              buttonText.textContent = grid.classList.contains("expanded")
                ? "Скрыть"
                : "Показать все";
            }
            if (arrowImg) {
              arrowImg.style.transition = "transform 0.3s ease";
              arrowImg.style.transform = grid.classList.contains("expanded")
                ? "rotate(180deg)"
                : "rotate(0deg)";
            }
          });
        }
      });
  } catch (error) {
    console.error("Error initializing components:", error);
  }
});
