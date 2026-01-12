(function () {
  const sampleReviews = [
    { name: 'Charlotte Green', role: 'Interior Stylist', avatar: '/image/cust/cust-1.jpg', text: 'Working with this architecture firm was a smooth and inspiring experience. Their attention to detail truly brought our vision to life.' },
    { name: 'James Walker', role: 'Homeowner', avatar: '/image/cust/cust-2.jpg', text: 'Professional team, great communication and on-time delivery. We love our new home.' },
    { name: 'Emily Davies', role: 'Designer', avatar: '/image/cust/cust-3.jpg', text: 'Creative and practical ideas — transformed our space with smart use of natural light.' },
    { name: 'Liam Smith', role: 'Developer', avatar: '/image/cust/cust-4.jpg', text: 'Their project management and attention to budget made the process seamless.' },
    { name: 'Olivia Brown', role: 'Client', avatar: '/image/cust/cust-5.jpg', text: 'Exceptional detail and material knowledge. Highly recommended.' },
    { name: 'Noah Wilson', role: 'Entrepreneur', avatar: '/image/cust/cust-6.jpg', text: 'They created a space that reflects our brand perfectly.' }
  ];

  let page = 0;
  const pageSize = 4; 
  let loading = false;
  let autoScroll = true;
  const speedPxPerSecond = 60;
  let lastFrameTime = null;

  let container = null;
  let sentinel = null;
  let cardObserver = null;
  let sentinelObserver = null;

  function createReviewCard(review, idx) {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Review by ${review.name}`);

    const heading = document.createElement('div');
    heading.className = 'review-heading';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'review-avatar';
    const img = document.createElement('img');
    img.src = review.avatar;
    img.alt = review.name + ' avatar';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    avatarWrap.appendChild(img);

    const meta = document.createElement('div');
    meta.className = 'review-meta';
    const h4 = document.createElement('h4');
    h4.textContent = review.name;
    const span = document.createElement('span');
    span.textContent = review.role;
    meta.appendChild(h4);
    meta.appendChild(span);

    heading.appendChild(avatarWrap);
    heading.appendChild(meta);

    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = review.text;

    card.appendChild(heading);
    card.appendChild(text);

    if (cardObserver) cardObserver.observe(card);

    return card;
  }

  function appendReviews(reviews) {
    const fragment = document.createDocumentFragment();
    reviews.forEach((r, i) => {
      const card = createReviewCard(r, i);
      fragment.appendChild(card);
    });
    if (sentinel && container.contains(sentinel)) {
      container.insertBefore(fragment, sentinel);
    } else {
      container.appendChild(fragment);
    }
    updateOpacities();
  }

  function loadMoreReviews() {
    if (loading) return;
    loading = true;

    const loader = document.createElement('div');
    loader.className = 'review-card loading';
    loader.textContent = 'Loading...';
    container.appendChild(loader);

    setTimeout(() => {
      loader.classList.add('removing');
      setTimeout(() => loader.remove(), 240);

      const toAppend = [];
      for (let i = 0; i < pageSize; i++) {
        const base = sampleReviews[(page * pageSize + i) % sampleReviews.length];
        const clone = Object.assign({}, base);
        clone.text = clone.text + (i % 2 === 0 ? ' ⭐' : '');
        toAppend.push(clone);
      }

      appendReviews(toAppend);
      page += 1;
      loading = false;
    }, 700);
  }

  function updateOpacities() {
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll('.review-card');
    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      // compute how much of the card is actually visible inside the container
      const visibleLeft = Math.max(cardRect.left, containerRect.left);
      const visibleRight = Math.min(cardRect.right, containerRect.right);
      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      const visibleRatio = Math.max(0, Math.min(1, visibleWidth / cardRect.width));

      // use visible ratio for opacity (apply gentle easing)
      const opacity = Math.pow(visibleRatio, 0.95);
      card.style.opacity = opacity.toString();

      // transform: slightly lift + scale when more visible
      const translateY = Math.max(0, (1 - opacity) * 12); // px
      const scale = 0.98 + (opacity * 0.02);
      card.style.transform = `translateY(${translateY}px) scale(${scale})`;

      if (opacity > 0.12) card.classList.add('in-view'); else card.classList.remove('in-view');
    });
  }
  
  // Attach pause/resume handlers to make auto-scroll interactive
  function attachInteractionHandlers() {
    if (!container) return;
    // pause/resume helpers with a small debounce on resume to avoid immediate re-pause
    const pause = () => { autoScroll = false; };
    const resume = () => { setTimeout(() => { autoScroll = true; lastFrameTime = null; }, 50); };

    // mouse/hover interactions
    container.addEventListener('mouseenter', pause, { passive: true });
    container.addEventListener('mouseleave', resume, { passive: true });

    // pointer/touch/mouse down -> pause
    container.addEventListener('pointerdown', pause, { passive: true });
    container.addEventListener('mousedown', pause, { passive: true });
    container.addEventListener('touchstart', pause, { passive: true });

    // resume on various end/cleanup events (use capture where helpful)
    document.addEventListener('pointerup', resume, { passive: true });
    document.addEventListener('mouseup', resume, { passive: true });
    document.addEventListener('touchend', resume, { passive: true });
    // click in capture phase to catch cases where targets stop propagation
    document.addEventListener('click', resume, { passive: true, capture: true });
    document.addEventListener('focusin', resume, { passive: true });
    document.addEventListener('pointercancel', resume, { passive: true });
    // resume when page becomes visible again
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') resume(); }, { passive: true });
  }
  function autoScrollStep(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const dt = Math.min(100, timestamp - lastFrameTime); 
    lastFrameTime = timestamp;

    if (autoScroll && container) {
      const delta = (speedPxPerSecond * dt) / 1000; 
      container.scrollLeft += delta;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10 && !loading) {
        loadMoreReviews();
      }
      updateOpacities();
    }

    requestAnimationFrame(autoScrollStep);
  }

  function init() {
    container = document.getElementById('reviews-container');
    sentinel = document.getElementById('reviews-sentinel');
    if (!container) return;

    // no card IntersectionObserver: updateOpacities drives per-card transforms/opacities
    sentinelObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMoreReviews();
    }, { root: container, rootMargin: '0px 300px 0px 0px', threshold: 0.1 });


    if (sentinel) sentinelObserver.observe(sentinel);

    attachInteractionHandlers();

    loadMoreReviews();

    lastFrameTime = null;
    requestAnimationFrame(autoScrollStep);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

