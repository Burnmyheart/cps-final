import "../../node_modules/focus-visible/dist/focus-visible";
import "../components/main/main.scss";
import "../components/brands/brands.scss";
import "../components/sliderService/serviseSlider.scss"
import "../components/price/price.scss"
import "../styles/main.scss";


document.addEventListener("DOMContentLoaded", () => {
  try {

    const brandsSlider = new Swiper(".brands__slider", {
      slidesPerView: "auto",
      spaceBetween: 16,
      slidesOffsetBefore: 16,
      slidesOffsetAfter: 16,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
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



    document.querySelectorAll(".brands-section, .services-section").forEach(section => {
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

