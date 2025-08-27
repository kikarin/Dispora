// Polyfill untuk process agar kompatibel dengan browser
if (typeof process === 'undefined') {
  window.process = {
    env: {},
    cwd: function() { return '/'; },
    nextTick: function(fn) { setTimeout(fn, 0); }
  };
}

export default defineNuxtPlugin((nuxtApp) => {
  // Tidak perlu melakukan apa-apa di sini, polyfill sudah diterapkan
});
