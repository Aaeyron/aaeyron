/**
 * Inline script that runs before first paint:
 * 1. sets data-theme (no light/dark flash)
 * 2. adds .reveal-ready (lets [data-reveal] content start hidden for scroll
 *    reveal) — only when motion is allowed. Without JS it never runs, so
 *    content stays visible; CSS also has a 2.5s safety net.
 */
export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)d.classList.add('reveal-ready')}catch(e){}})()`;
