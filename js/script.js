/* Ace of Space shared progressive enhancements. */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = header?.querySelector(".site-nav");
  if (!header || !nav) return;

  document.body.classList.add("has-responsive-nav");
  nav.id ||= "primary-navigation";

  // Add the menu control at runtime so the original desktop markup stays intact.
  const menuButton = document.createElement("button");
  menuButton.className = "nav-toggle";
  menuButton.type = "button";
  menuButton.setAttribute("aria-controls", nav.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.innerHTML = '<span></span><span></span><span></span>';
  nav.parentNode.insertBefore(menuButton, nav);

  const isMobileNav = () => window.matchMedia("(max-width: 1050px)").matches;
  const closeMenu = ({ returnFocus = false } = {}) => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    nav.classList.remove("is-open");
    header.classList.remove("menu-is-open");
    document.body.classList.remove("nav-scroll-locked");
    nav.querySelectorAll(".submenu-toggle[aria-expanded='true']").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.closest(".nav-item")?.classList.remove("submenu-is-open");
    });
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
    nav.classList.toggle("is-open", opening);
    header.classList.toggle("menu-is-open", opening);
    document.body.classList.toggle("nav-scroll-locked", opening && isMobileNav());
    if (opening) {
      const firstLink = nav.querySelector(".nav-link, .submenu-toggle");
      window.setTimeout(() => firstLink?.focus({ preventScroll: true }), 80);
    }
  });

  // Give every nested menu an explicit, touch-friendly disclosure control.
  nav.querySelectorAll(".nav-item").forEach((item, index) => {
    const submenu = item.querySelector(":scope > .nav-submenu");
    const trigger = item.querySelector(":scope > .nav-link");
    if (!submenu || !trigger) return;

    const submenuId = `nav-submenu-${index + 1}`;
    submenu.id ||= submenuId;
    const disclosure = document.createElement("button");
    disclosure.className = "submenu-toggle";
    disclosure.type = "button";
    disclosure.setAttribute("aria-label", `Toggle ${trigger.textContent.trim()} submenu`);
    disclosure.setAttribute("aria-controls", submenu.id);
    disclosure.setAttribute("aria-expanded", "false");
    disclosure.innerHTML = '<span aria-hidden="true"></span>';
    trigger.insertAdjacentElement("afterend", disclosure);

    disclosure.addEventListener("click", () => {
      const expanded = disclosure.getAttribute("aria-expanded") !== "true";
      disclosure.setAttribute("aria-expanded", String(expanded));
      item.classList.toggle("submenu-is-open", expanded);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (isMobileNav()) {
          disclosure.click();
          submenu.querySelector("a")?.focus();
        } else {
          submenu.querySelector("a")?.focus();
        }
      }
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        disclosure.setAttribute("aria-expanded", "false");
        item.classList.remove("submenu-is-open");
        trigger.focus();
      }
    });
  });

  // Close after navigation, or when the user taps outside the header.
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("pointerdown", (event) => {
    if (isMobileNav() && header.classList.contains("menu-is-open") && !header.contains(event.target)) {
      closeMenu();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("menu-is-open")) closeMenu({ returnFocus: true });
    if (event.key === "Tab" && header.classList.contains("menu-is-open")) {
      const focusable = [...nav.querySelectorAll("a[href], button:not([disabled])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 1051px)");
  desktopQuery.addEventListener?.("change", (event) => { if (event.matches) closeMenu(); });

  // Motion is progressive enhancement: the page remains fully visible if
  // GSAP is unavailable, and reduced-motion preferences bypass animation.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    const { gsap } = window;
    gsap.registerPlugin(window.ScrollTrigger);

    const hero = document.querySelector(".hero, .about-hero, .construction-hero, .contact-hero, .testimonials-hero, .category-hero, .project-hero");
    if (hero) {
      const heroCopy = hero.querySelector(":scope > .hero-copy, :scope > .about-hero-content, :scope > .construction-hero-content, :scope > .contact-hero-content, :scope > .testimonials-hero-content, :scope .category-hero-content, :scope .project-hero-content");
      const heroImage = hero.querySelector(".home-hero-image, .about-hero-image, .construction-hero-image, .contact-hero-image, .testimonials-hero-image, .category-hero-media, .project-hero-image");
      if (heroCopy) gsap.from(heroCopy.children, { y: 24, autoAlpha: 0, duration: 0.85, stagger: 0.11, ease: "power2.out", delay: 0.12 });
      if (heroImage) gsap.from(heroImage, { clipPath: "inset(0 0 100% 0)", duration: 1.15, ease: "power3.inOut", delay: 0.2 });
    }

    gsap.utils.toArray("main .section").forEach((section) => {
      if (section === hero) return;
      const targets = section.querySelectorAll(":scope > .section-eyebrow, :scope > .section-title, :scope > .section-description, :scope > .section-intro, :scope > .card-grid, :scope > .services-directory-grid, :scope > .projects-grid, :scope > .category-services-grid, :scope > .about-approach-grid, :scope > .about-values-grid, :scope > .construction-approach-grid, :scope > .contact-enquiry-grid, :scope > .testimonial-pending, :scope > .home-feature-image");
      if (!targets.length) return;
      gsap.from(targets, {
        y: 22,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 84%", once: true }
      });
    });

    gsap.utils.toArray(".service-card-image img, .project-card-image img, .category-service-image img").forEach((image) => {
      image.addEventListener("mouseenter", () => gsap.to(image, { scale: 1.045, duration: 0.55, ease: "power2.out" }));
      image.addEventListener("mouseleave", () => gsap.to(image, { scale: 1, duration: 0.55, ease: "power2.out" }));
    });
  }
});
