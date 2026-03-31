import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initParallax() {
  gsap.to(".hero__content", {
    y: 100,
    opacity: 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".hero__video-wrapper", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  // Global Coals 3D Parallax
  const coals = gsap.utils.toArray(".g-coal");
  coals.forEach((coal, i) => {
    const isLarge =
      coal.classList.contains("gc-3") ||
      coal.classList.contains("gc-6") ||
      coal.classList.contains("gc-8");
    const speed = isLarge ? 3.5 : 0.5 + (i % 3) * 0.8; // Огромный разброс скоростей для 100% гарантии разности в любом браузере
    const rot = (i % 2 === 0 ? 1 : -1) * (180 + i * 45);
    const xMovement = i % 2 === 0 ? 150 : -150;

    const yTravel = 800 * speed;

    gsap.to(coal, {
      y: -yTravel,
      x: xMovement,
      rotation: rot,
      ease: "none",
      scrollTrigger: {
        trigger: coal,
        start: "top bottom",
        end: () => `+=${window.innerHeight + yTravel}`, // Продлеваем анимацию на расстояние, равное высоте экрана + дистанции полета, чтобы угли не замирали посреди экрана
        scrub: 0.5,
      },
    });
  });

  gsap.from(".about__text", {
    x: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".about__image", {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".about",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  const cards = gsap.utils.toArray(".advantage-card");
  cards.forEach((card, i) => {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  gsap.from(".prices__tabs", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".prices",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".prices__content", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".prices",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  // Rules section animation
  const rulesCards = gsap.utils.toArray(".rules__card");
  rulesCards.forEach((card, i) => {
    gsap.from(card, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  gsap.from(".contact__info", {
    x: -40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".contact__form", {
    x: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  const sectionLabels = gsap.utils.toArray(".section-label");
  sectionLabels.forEach((label) => {
    gsap.from(label, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: label,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  const sectionTitles = gsap.utils.toArray(".section-title");
  sectionTitles.forEach((title) => {
    gsap.from(title, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}
