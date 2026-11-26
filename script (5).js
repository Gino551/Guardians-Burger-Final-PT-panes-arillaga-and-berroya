document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  const sections = document.querySelectorAll("section[id]");
  const revealTargets = document.querySelectorAll(
    ".food-card, .about-content p, .about-box, .contact-item"
  );
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.getAttribute("data-name");
      const itemPrice = button.getAttribute("data-price");
      alert(
        `You just bought ${itemName} for ${itemPrice}!\n\nThank you for ordering at Guardians Burger!`
      );
    });
  });
  
  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 160;
    let activeId = "home";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").slice(1);
      link.classList.toggle("active", targetId === activeId);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
  
  if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal-ready"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("reveal-visible"));
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
});