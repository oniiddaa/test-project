/* script.js */

document.addEventListener("DOMContentLoaded", () => {
  const modelsGrid = document.querySelector(".models-grid");
  const cards = Array.from(document.querySelectorAll(".model-card"));

  /* ===========================
     1. Build Filter + Search UI
     =========================== */
  // Collect unique categories from the badges
  const categories = ["All", ...new Set(
    cards.map((card) => card.querySelector(".badge")?.textContent.trim()).filter(Boolean)
  )];

  // Create a controls container and insert it before the grid
  const controls = document.createElement("div");
  controls.className = "model-controls";

  // Filter buttons
  const filterWrap = document.createElement("div");
  filterWrap.className = "filter-buttons";
  categories.forEach((category, index) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (index === 0 ? " active" : "");
    btn.textContent = category;
    btn.dataset.filter = category;
    filterWrap.appendChild(btn);
  });

  // Search input
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "model-search";
  searchInput.placeholder = "Search models...";
  searchInput.setAttribute("aria-label", "Search motorcycle models");

  controls.appendChild(filterWrap);
  controls.appendChild(searchInput);
  modelsGrid.parentNode.insertBefore(controls, modelsGrid);

  /* ===========================
     2. Filtering Logic
     =========================== */
  let activeFilter = "All";
  let searchTerm = "";

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const category = card.querySelector(".badge")?.textContent.trim() || "";
      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const description = card.querySelector("p")?.textContent.toLowerCase() || "";

      const matchesFilter = activeFilter === "All" || category === activeFilter;
      const matchesSearch =
        title.includes(searchTerm) || description.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    toggleEmptyState(visibleCount === 0);
  }

  // Filter button clicks
  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filterWrap.querySelectorAll(".filter-btn").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    applyFilters();
  });

  // Search input
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    applyFilters();
  });

  /* ===========================
     3. Empty State Message
     =========================== */
  const emptyState = document.createElement("p");
  emptyState.className = "empty-state";
  emptyState.textContent = "No models match your search.";
  emptyState.style.display = "none";
  modelsGrid.parentNode.insertBefore(emptyState, modelsGrid.nextSibling);

  function toggleEmptyState(show) {
    emptyState.style.display = show ? "block" : "none";
  }

  /* ===========================
     4. Scroll Reveal Animation
     =========================== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => {
    card.classList.add("reveal");
    observer.observe(card);
  });
});