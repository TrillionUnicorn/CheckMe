import "clsx";
/* empty css               */
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<div class="app svelte-12qhfyh"><header><nav class="navbar svelte-12qhfyh"><div class="nav-brand svelte-12qhfyh"><a href="/" class="brand-link svelte-12qhfyh"><span class="brand-icon svelte-12qhfyh">🔍</span> <span class="brand-text">CheckMe</span></a></div> <div class="nav-links svelte-12qhfyh"><a href="/" class="nav-link svelte-12qhfyh">Dashboard</a> <a href="/verify" class="nav-link svelte-12qhfyh">Verify</a> <a href="/reports" class="nav-link svelte-12qhfyh">Reports</a> <a href="/api" class="nav-link svelte-12qhfyh">API</a></div></nav></header> <main class="main-content svelte-12qhfyh">`);
  children?.($$renderer);
  $$renderer.push(`<!----></main> <footer class="footer svelte-12qhfyh"><div class="footer-content svelte-12qhfyh"><p>© 2024 CheckMe - Open Source Verification Platform</p> <div class="footer-links svelte-12qhfyh"><a href="/about" class="svelte-12qhfyh">About</a> <a href="/privacy" class="svelte-12qhfyh">Privacy</a> <a href="/terms" class="svelte-12qhfyh">Terms</a> <a href="https://github.com/TrillionUnicorn/CheckMe" target="_blank" class="svelte-12qhfyh">GitHub</a></div></div></footer></div>`);
}
export {
  _layout as default
};
