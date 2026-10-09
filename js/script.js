/* ========================================
   PSN Online Learning — JavaScript
   Pakistan Society of Nephrology
   Interactions: mobile menu, smooth scroll,
   course search/filter, scroll reveal, chips
   ======================================== */

(function () {
  "use strict";

  /* ---------- Course Data (Sample) ---------- */
  var courses = [
    {
      title: "Nephrology Fundamentals",
      category: "nephrology",
      categoryLabel: "Nephrology",
      description:
        "An introductory course covering the foundations of kidney medicine, including renal anatomy, physiology, and common kidney disorders. Build a strong base for understanding kidney health and disease.",
      image:
        "https://images.pexels.com/photos/4227090/pexels-photo-4227090.jpeg?auto=compress&cs=tinysrgb&w=800",
      duration: "Self-paced",
      lessons: "12 modules",
      featured: true,
      isSample: true,
    },
    {
      title: "Chronic Kidney Disease",
      category: "ckd",
      categoryLabel: "Chronic Kidney Disease",
      description:
        "Understand the causes, progression, prevention, and management of chronic kidney disease, with focus on early detection and treatment strategies.",
      image:
        "https://images.pexels.com/photos/9574505/pexels-photo-9574505.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "Self-paced",
      lessons: "10 modules",
      isSample: true,
    },
    {
      title: "Dialysis and Renal Replacement Therapy",
      category: "dialysis",
      categoryLabel: "Dialysis",
      description:
        "Explore the techniques and advancements in dialysis, including hemodialysis, peritoneal dialysis, and renal replacement therapy options.",
      image:
        "https://images.pexels.com/photos/10987574/pexels-photo-10987574.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "Self-paced",
      lessons: "8 modules",
      isSample: true,
    },
    {
      title: "Kidney Transplantation",
      category: "transplantation",
      categoryLabel: "Kidney Transplantation",
      description:
        "Comprehensive insights into kidney transplantation, covering evaluation, surgical procedures, post-transplant care, and immunosuppression.",
      image:
        "https://images.pexels.com/photos/24193884/pexels-photo-24193884.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "Self-paced",
      lessons: "15 modules",
      isSample: true,
    },
  ];

  /* ---------- DOM Ready ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    renderCourses();
    initCourseSearch();
    initSearchChips();
    initScrollReveal();
    initBackToTop();
  });

  /* ---------- Navbar Scroll Effect ---------- */
  function initNavbar() {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* ---------- Mobile Menu Toggle ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    var links = menu.querySelectorAll("a");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("click", function (e) {
      if (
        menu.classList.contains("open") &&
        !menu.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* ---------- Smooth Scroll ---------- */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = this.getAttribute("href");
        if (href === "#" || href === "") return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var offset = 70;
        var targetPosition =
          target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      });
    });
  }

  /* ---------- Active Navigation ---------- */
  function initActiveNav() {
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".nav-link");

    if (!sections.length || !navLinks.length) return;

    window.addEventListener("scroll", function () {
      var scrollPos = window.scrollY + 100;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute("id");

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.classList.remove("active");
            var href = link.getAttribute("href");
            if (href === "#" + id) {
              link.classList.add("active");
            }
          });
        }
      });
    });
  }

  /* ---------- Render Courses ---------- */
  function renderCourses(filterFn) {
    var grid = document.getElementById("coursesGrid");
    var noResults = document.getElementById("noResults");
    if (!grid) return;

    var filtered = filterFn ? courses.filter(filterFn) : courses;

    if (filtered.length === 0) {
      grid.innerHTML = "";
      if (noResults) noResults.hidden = false;
      return;
    }

    if (noResults) noResults.hidden = true;

    grid.innerHTML = filtered
      .map(function (course) {
        var cardClass = course.featured
          ? "course-card course-card--featured"
          : "course-card";

        return (
          '<article class="' + cardClass + ' reveal">' +
          '<div class="course-card-img">' +
          '<img src="' + course.image + '" alt="' + escapeHtml(course.title) + '" loading="lazy" />' +
          '<span class="course-card-tag">' + escapeHtml(course.categoryLabel) + "</span>" +
          "</div>" +
          '<div class="course-card-body">' +
          (course.isSample
            ? '<p class="course-card-sample">Sample Course — For Demonstration</p>'
            : "") +
          '<h3 class="course-card-title">' + escapeHtml(course.title) + "</h3>" +
          '<p class="course-card-desc">' + escapeHtml(course.description) + "</p>" +
          '<div class="course-card-meta">' +
          '<span class="course-card-meta-item"><i class="bi bi-clock"></i> ' + escapeHtml(course.duration) + "</span>" +
          '<span class="course-card-meta-item"><i class="bi bi-collection"></i> ' + escapeHtml(course.lessons) + "</span>" +
          "</div>" +
          '<a href="#courses" class="course-card-action">' +
          "View Course <i class=\"bi bi-arrow-right\"></i>" +
          "</a>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    var newCards = grid.querySelectorAll(".reveal");
    requestAnimationFrame(function () {
      newCards.forEach(function (card) {
        card.classList.add("revealed");
      });
    });
  }

  /* ---------- Course Search & Filter ---------- */
  function initCourseSearch() {
    var form = document.getElementById("searchForm");
    var input = document.getElementById("searchInput");
    var categorySelect = document.getElementById("searchCategory");
    if (!form || !input) return;

    function handleSearch(e) {
      if (e) e.preventDefault();

      var query = input.value.trim().toLowerCase();
      var category = categorySelect ? categorySelect.value : "";

      renderCourses(function (course) {
        var matchesQuery =
          query === "" ||
          course.title.toLowerCase().indexOf(query) !== -1 ||
          course.description.toLowerCase().indexOf(query) !== -1 ||
          course.categoryLabel.toLowerCase().indexOf(query) !== -1;

        var matchesCategory =
          category === "" || course.category === category;

        return matchesQuery && matchesCategory;
      });
    }

    form.addEventListener("submit", handleSearch);
    input.addEventListener("input", handleSearch);
    if (categorySelect) {
      categorySelect.addEventListener("change", handleSearch);
    }
  }

  /* ---------- Search Chips ---------- */
  function initSearchChips() {
    var chips = document.querySelectorAll(".discovery-chip");
    var input = document.getElementById("searchInput");
    if (!chips.length || !input) return;

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var term = this.getAttribute("data-search");
        if (term) {
          input.value = term;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.focus();
        }
      });
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Back to Top ---------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Utility ---------- */
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
