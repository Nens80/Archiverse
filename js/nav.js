// Hamburger toggle
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('active');
}

// Dropdown toggle
document.querySelectorAll(".dropbtn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const dropdown = btn.nextElementSibling;
    dropdown.classList.toggle("show");
  });
});

// Close dropdown when clicking outside
window.addEventListener("click", e => {
  if (!e.target.matches(".dropbtn, .dropbtn *")) {
    document.querySelectorAll(".dropdown-content.show").forEach(menu => {
      menu.classList.remove("show");
    });
  }
});
// Navbar hide/show on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // User scrolled down → hide navbar
    navbar.classList.add('hidden');
  } else {
    // User scrolled up → show navbar
    navbar.classList.remove('hidden');
  }

  // Add a light blur background when scrolled down
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScrollTop = currentScroll;
});
