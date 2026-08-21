/* =========================================================
   Portfolio Projects
   Add a new project by copying one object inside the array.
   ========================================================= */

const projects = [
  {
    title: "Natural Products",
    image: "images/natural-products.png",
    alt: "Natural Products project preview",
    tags: ["HTML", "CSS"],
    description:
      "One of my first front-end projects, focused on building a clean website.",
    status: "Completed",
    statusClass: "completed",
    statusIcon: "fa-solid fa-circle-check",
    source: "SEF Training Project",
    live: "https://doaahusin.github.io/Natural-Products/",
    github: "https://github.com/doaahusin/Natural-Products",
  },
  {
    title: "GameVerse",
    image: "images/gameverse.png",
    alt: "GameVerse project preview",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "My latest project featuring an interactive gaming interface.",
    status: "Featured Project",
    statusClass: "featured",
    statusIcon: "fa-solid fa-star",
    source: "SEF Training Project",
    live: "https://doaahusin.github.io/GameVerse/",
    github: "https://github.com/doaahusin/GameVerse",
  },
  {
    title: "Coffee Shop",
    image: "images/coffee.png",
    alt: "Coffee Shop project preview",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A responsive coffee shop website that is currently being improved with new features.",
    status: "In Progress",
    statusClass: "in-progress",
    statusIcon: "fa-solid fa-code",
    source: "ITI Training Task",
    live: "https://doaahusin.github.io/Coffee-Shop/",
    github: "https://github.com/doaahusin/Coffee-Shop",
  },

  {
    title: "TechNova",
    image: "images/tech-nova.png",
    alt: "TechNova project preview",
    tags: ["HTML", "CSS"],
    description:
      "A modern software solutions website designed to showcase digital services.",
    status: "Completed",
    statusClass: "completed",
    statusIcon: "fa-solid fa-circle-check",
    source: "SEF Training Project",
    live: "https://doaahusin.github.io/SEF-TechNove/",
    github: "https://github.com/doaahusin/SEF-TechNove",
  },
  {
    title: "Crumb",
    image: "images/crumb.png",
    alt: "Crumb project preview",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A modern and responsive bakery and coffee shop website featuring an elegant UI.",
    status: "completed",
    statusClass: "completed",
    statusIcon: "fa-solid fa-circle-check",
    source: "SEF Training Project",
    live: "https://github.com/doaahusin/Crumb",
    github: "https://byte-kp10vmv15-1230-ee9c.vercel.app/",
  },
  {
    title: "DoIt-ToDoList",
    image: "images/doit-todolist.png",
    alt: "DoIt-ToDoList project preview",
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A simple and efficient to-do list application built with modern web technologies.",
    status: "Completed",
    statusClass: "completed",
    statusIcon: "fa-solid fa-circle-check",
    source: "ITI Training Task",
    live: "https://doaahusin.github.io/DoIt-ToDoList/",
    github: "https://github.com/doaahusin/DoIt-ToDoList",
  },
  {
    title: "ByteHub",
    image: "images/bytehub.png",
    alt: "ByteHub project preview",
    tags: ["React", "CSS", "JavaScript"],
    description:
      "A tech news platform built integrated with a News API to dynamically fetch the latest technology articles.",
    status: "In Progress",
    statusClass: "in-progress",
    statusIcon: "fa-solid fa-code",
    source: "ITI Training Task",
    live: "https://doaahusin.github.io/ByteHub/",
    github: "https://byte-kp10vmv15-1230-ee9c.vercel.app/",
  },
];

const projectsTrack = document.getElementById("projectsTrack");
const projectsDots = document.getElementById("projectsDots");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

let currentProject = 0;

function getVisibleProjects() {
  if (window.innerWidth <= 576) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

function renderProjects() {
  projectsTrack.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <img src="${project.image}" alt="${project.alt}" loading="lazy">

          <div class="project-content">
            <div class="project-tags">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <span class="project-source">${project.source}</span>

            <div class="project-status ${project.statusClass}">
              <i class="${project.statusIcon}"></i>
              ${project.status}
            </div>
            

            <div class="project-buttons">
              <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="live-btn">
                <i class="fa-solid fa-globe"></i>
                Live Demo
              </a>

              <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="github-btn">
                <i class="fa-brands fa-github"></i>
                GitHub
              </a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  renderDots();
  updateSlider();
}

function getMaxIndex() {
  return Math.max(0, projects.length - getVisibleProjects());
}

function updateSlider() {
  const visible = getVisibleProjects();
  const maxIndex = getMaxIndex();

  currentProject = Math.min(currentProject, maxIndex);

  const firstCard = projectsTrack.querySelector(".project-card");

  if (firstCard) {
    const gap = parseFloat(getComputedStyle(projectsTrack).gap) || 0;
    const moveDistance = firstCard.getBoundingClientRect().width + gap;
    projectsTrack.style.transform = `translateX(-${currentProject * moveDistance}px)`;
  }

  prevButton.disabled = currentProject === 0;
  nextButton.disabled = currentProject >= maxIndex;

  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentProject);
  });
}

function renderDots() {
  const pages = Math.max(1, getMaxIndex() + 1);

  projectsDots.innerHTML = Array.from(
    { length: pages },
    (_, index) =>
      `<button class="slider-dot ${index === currentProject ? "active" : ""}"
        type="button"
        aria-label="Go to project ${index + 1}"
        data-index="${index}"></button>`,
  ).join("");

  document.querySelectorAll(".slider-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      currentProject = Number(dot.dataset.index);
      updateSlider();
    });
  });
}

prevButton.addEventListener("click", () => {
  if (currentProject > 0) {
    currentProject--;
    updateSlider();
  }
});

nextButton.addEventListener("click", () => {
  if (currentProject < getMaxIndex()) {
    currentProject++;
    updateSlider();
  }
});

window.addEventListener("resize", () => {
  const oldMax = getMaxIndex();
  currentProject = Math.min(currentProject, oldMax);
  renderDots();
  updateSlider();
});

/* Touch swipe for mobile */
let touchStartX = 0;
let touchEndX = 0;

projectsTrack.parentElement.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
  },
  { passive: true },
);

projectsTrack.parentElement.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 50) return;

    if (distance < 0 && currentProject < getMaxIndex()) {
      currentProject++;
    } else if (distance > 0 && currentProject > 0) {
      currentProject--;
    }

    updateSlider();
  },
  { passive: true },
);

/* =========================================================
   Mobile Navigation
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.innerHTML = navLinks.classList.contains("open")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* Initial render */
renderProjects();
