import "./css/index.css";
import "./css/header.css";
import "./css/hero.css";
import "./css/about.css";
import "./css/advantages.css";
import "./css/prices.css";
import "./css/rules.css";
import "./css/contact.css";
import "./css/footer.css";

import { initParallax } from "./js/parallax.js";
import { initNavigation, initTabs, initForm } from "./js/navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTabs();
  initForm();

  initParallax();

  const video = document.querySelector(".hero__video");
  if (video) {
    video.playbackRate = 1.6;

    // Принудительный запуск видео на iOS
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Автозапуск заблокирован, пробуем при первом взаимодействии
        const enableVideo = () => {
          video.play().catch(() => {});
          document.removeEventListener("touchstart", enableVideo);
          document.removeEventListener("click", enableVideo);
        };
        document.addEventListener("touchstart", enableVideo, { passive: true });
        document.addEventListener("click", enableVideo, { once: true });
      });
    }
  }
});
