document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlides = [
        {
            text: "Working with this architecture firm was a smooth and inspiring experience. Their attention to detail and understanding of space truly brought our vision to life.",
            name: "Charlotte Green",
            role: "Interior Stylist",
            image: "/image/cust/cust-1.jpg" 
        },
        {
            text: "The team demonstrated exceptional creativity and professionalism. From concept to completion, everything was handled with care and expertise.",
            name: "James Walker",
            role: "Property Developer",
            image: "/image/cust/cust-2.jpg"
        },
        {
            text: "Absolutely impressed with the service and design quality. They managed to transform an old space into something modern and functional. Highly recommended!",
            name: "Emily Davies",
            role: "Real Estate Consultant",
            image: "/image/cust/cust-3.jpg"
        }
    ];

    const slides = document.querySelectorAll('.testimonial-slider .slide');
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialName = document.getElementById('testimonial-name');
    const testimonialRole = document.getElementById('testimonial-role');
    const testimonialContent = document.querySelector('.testimonial-content');
    const quoteIcon = document.querySelector('.quote-icon');

    // If this page doesn't include the testimonial markup, bail out silently
    if (!testimonialContent || !testimonialText || !testimonialName || !testimonialRole || !quoteIcon || !slides || slides.length === 0) {
        return;
    }
    function updateTestimonial(index) {
        if (index < 0 || index >= testimonialSlides.length) return;
        
        const data = testimonialSlides[index];

        testimonialContent.classList.add('fade-out');
        quoteIcon.classList.add('fade-out');

        setTimeout(() => {
            testimonialText.textContent = data.text;
            testimonialName.textContent = data.name;
            testimonialRole.textContent = data.role;
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');

            testimonialContent.classList.remove('fade-out');
            testimonialContent.classList.add('fade-in');
            quoteIcon.classList.remove('fade-out');
            quoteIcon.classList.add('fade-in');
            
            setTimeout(() => {
                testimonialContent.classList.remove('fade-in');
                quoteIcon.classList.remove('fade-in');
            }, 500);
            
        }, 500);
    }

    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updateTestimonial(index);
        });
    });

    updateTestimonial(0);

    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialSlides.length;
        updateTestimonial(currentIndex);
    }, 7000);
});