// Marca en el índice el apartado visible. Si algo falla, la página queda
// igual de usable: los enlaces del índice son anclas normales.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('active'); });
      var current = byId[entry.target.id];
      if (current) current.classList.add('active');
    });
  }, { rootMargin: '0px 0px -75% 0px', threshold: 0 });

  document.querySelectorAll('article h2[id]').forEach(function (h) { observer.observe(h); });
})();
