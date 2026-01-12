// counter.js — requires jQuery loaded BEFORE this script
$(function() {
  var started = false;

  function startCountersIfVisible() {
    // select only elements that actually have data-count
    $('[data-count]').each(function() {
      var $this = $(this);

      // If this counter already finished, skip
      if ($this.data('count-started')) return;

      var rectTop = $this.offset().top;
      var viewportBottom = $(window).scrollTop() + $(window).height();

      // start when the element is visible in viewport (you can adjust threshold)
      if (viewportBottom > rectTop + ($this.outerHeight() / 2)) {
        $this.data('count-started', true); 

        var countTo = Number($this.attr('data-count')) || 0;
        var startVal = Number($this.text()) || 0;

        $({ countNum: startVal }).animate(
          { countNum: countTo },
          {
            duration: 4000,
            easing: 'swing',
            step: function(now) {
              $this.text(Math.floor(now));
            },
            complete: function() {
              $this.text(countTo);
            }
          }
        );
      }
    });
  }

  // run on load and on scroll
  $(window).on('scroll resize', startCountersIfVisible);
  startCountersIfVisible(); 
});