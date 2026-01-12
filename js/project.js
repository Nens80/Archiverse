const projects = {
  1: {
    img: "/image/project/project-1.jpg",
    title: "Urban Loft Design",
    desc: "A stylish modern loft made for practical living and bold personalities.",
    ticMark1: "Innovative Interior Layouts",
    ticMark2: "Urban-Style Aesthetic",
    ticMark3: "Functional Modern Living",
  },
  2: {
    img: "/image/project/project-2.jpg",
    title: "Grand Skyline Tower",
    desc: "With a rich legacy in architecture and interior design, we specialize in creating elegant, functional, and innovative spaces. Our mission is to transform your vision into lasting architectural landmarks.",
    ticMark1: "High-Rise Structural Excellence",
    ticMark2: "Energy Efficient Systems",
    ticMark3: "Premium Construction Standards",
  },
  3: {
    img: "/image/project/project-3.jpg",
    title: "Coastal Villa Retreat",
    desc: "We bring decades of experience in designing modern architecture and interiors that inspire. From concept to completion, we deliver innovative, functional, and timeless spaces tailored to your needs.",
    ticMark1: "Nature-Inspired Interiors",
    ticMark2: "Open Air & Ocean Views",
    ticMark3: "Luxury Comfort Finishes",
  },
  4: {
    img: "/image/project/project-4.jpg",
    title: "Contemporary Art Gallery",
    desc: "With a legacy of innovation and quality, we specialize in architectural and interior design solutions that blend aesthetics with functionality. Our team delivers tailored environments that elevate how people live and work.",
    ticMark1: "Minimalist Design Approach",
    ticMark2: "Enhanced Art Display Lighting",
    ticMark3: "Open Curated Layout",
  }
};

const buttons = document.querySelectorAll(".project-btn");
const img = document.getElementById("projectImg");
const title = document.getElementById("projectTitle");
const desc = document.getElementById("projectDesc");
const t1 = document.getElementById("ticMark1");
const t2 = document.getElementById("ticMark2");
const t3 = document.getElementById("ticMark3");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const id = btn.getAttribute("data-id");
    const project = projects[id];

    img.src = project.img;
    title.textContent = project.title;
    desc.textContent = project.desc;

    t1.innerHTML = `<i class="fa fa-check m-1" style="color: #FDC830;"></i>${project.ticMark1}`;
    t2.innerHTML = `<i class="fa fa-check m-1" style="color: #FDC830;"></i>${project.ticMark2}`;
    t3.innerHTML = `<i class="fa fa-check m-1" style="color: #FDC830;"></i>${project.ticMark3}`;
  });
});
