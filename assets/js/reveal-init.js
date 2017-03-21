Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  // Optional libraries used to extend on reveal.js
  dependencies: [
    { src: '../assets/lib/js/classList.js', condition: function() { return !document.body.classList; } },
    { src: '../assets/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: '../assets/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: '../assets/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    { src: '../assets/plugin/notes/notes.js' }
  ]
});
