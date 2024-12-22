document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  // Language toggle functionality
  const langToggle = document.getElementById("langToggle");
  let currentLang = "en";

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Track PDF downloads
  document
    .querySelector('a[href$=".pdf"]')
    .addEventListener("click", function () {
      gtag("event", "download", {
        event_category: "Prospectus",
        event_label: "Prospectus Download",
      });
    });

  // Track contact information views
  document
    .querySelector("#contact")
    .addEventListener("visibility", function () {
      gtag("event", "view_contact", {
        event_category: "Contact",
        event_label: "Contact Information View",
      });
    });

  // Track menu section views
  document.querySelector("#menu").addEventListener("visibility", function () {
    gtag("event", "view_menu", {
      event_category: "Menu",
      event_label: "Menu Section View",
    });
  });
  // Track phone and email clicks
  document.querySelectorAll(".contact-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const type = link.href.startsWith("tel:") ? "phone" : "email";
      gtag("event", `${type}_click`, {
        event_category: "Contact",
        event_label: link.href.replace("tel:", "").replace("mailto:", ""),
      });
    });
  });
  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Guidelines tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  document.querySelectorAll("section > *:not(.hero *)").forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
  // Function to translate content
  function translateContent(lang) {
    document.querySelectorAll("[data-en]").forEach((element) => {
      if (lang === "hi") {
        element.textContent = element.getAttribute("data-hi");
        langToggle.textContent = "English";
      } else {
        element.textContent = element.getAttribute("data-en");
        langToggle.textContent = "हिंदी";
      }
    });
  }

  // Language toggle click handler
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "hi" : "en";
    translateContent(currentLang);
  });
});
