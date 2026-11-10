(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const S = window.SITE, P = window.PROJECTS, fine = matchMedia("(hover:hover)").matches;
const img = (a, alt = "", cls = "") => `<img ${cls ? `class="${cls}"` : ""} src="assets/${a[0]}" onerror="this.onerror=null;this.src='${a[1]}'" alt="${alt}" loading="lazy">`;
const isHome = !!$(".hero");

// shared chrome
document.body.insertAdjacentHTML("afterbegin", `<div class="prog"></div><div class="curtain"></div>
<header class="nav"><div class="wrap"><a class="logo" href="index.html">${S.name.split(" ")[0]}<span>.</span></a>
<nav><a href="index.html#about">About</a><a href="index.html#work">Work</a><a href="${S.resume}" target="_blank" rel="noopener">Resume</a><a href="#contact">Contact</a></nav></div></header>`);
document.body.insertAdjacentHTML("beforeend", `<footer id="contact"><div class="wrap"><p class="eyebrow">Get in touch</p><h2>Let's build<br>something <em>useful.</em></h2>
<div class="links">${S.email ? `<a class="btn mag" href="mailto:${S.email}">Email</a>` : ""}<a class="btn mag" href="${S.github}" target="_blank" rel="noopener">GitHub</a><a class="btn mag" href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a class="btn mag" href="${S.resume}" target="_blank" rel="noopener">Download resume</a></div>
<div class="fine"><span>© ${new Date().getFullYear()} ${S.name}</span><span>Python · Flask · MySQL · Arduino · Raspberry Pi · FastAPI · C++</span></div></div></footer>`);

// page transition
const cur = $(".curtain");
function reveal() {
  cur.style.transition = "none"; cur.className = "curtain cover"; cur.offsetWidth; cur.style.transition = "";
  requestAnimationFrame(() => { cur.className = "curtain leave"; document.body.classList.add("go"); });
}
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]");
  if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey) return;
  const u = new URL(a.href, location.href);
  if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
  e.preventDefault();
  cur.style.transition = "none"; cur.className = "curtain"; cur.offsetWidth; cur.style.transition = "";
  cur.classList.add("cover");
  setTimeout(() => location.href = a.href, 600);
});
addEventListener("pageshow", e => { if (e.persisted) reveal(); });

// loader (first visit per session, home only)
function start() { document.body.classList.add("go"); }
const L = $(".loader");
if (L && !sessionStorage.seen) {
  const num = $(".big", L), bar = $(".bar i", L), t0 = performance.now(), D = 1900;
  (function f(t) {
    const p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 3);
    num.textContent = String(Math.round(e * 100)).padStart(2, "0"); bar.style.width = e * 100 + "%";
    if (p < 1) requestAnimationFrame(f);
    else { sessionStorage.seen = 1; setTimeout(() => { L.classList.add("done"); setTimeout(() => { L.remove(); start(); }, 500); }, 250); }
  })(t0);
} else { if (L) L.remove(); reveal(); }

// word-split headings
$$("[data-split]").forEach(el => {
  let i = 0;
  const walk = n => [...n.childNodes].forEach(c => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(w => { if (!w.trim()) return f.append(" "); const s = document.createElement("span"); s.className = "w"; s.innerHTML = `<span style="transition-delay:${.08 * i++ + .2}s">${w}</span>`; f.append(s); });
      c.replaceWith(f);
    } else walk(c);
  });
  walk(el);
});

// scroll: progress, nav state, reveal
const prog = $(".prog"), nav = $(".nav");
addEventListener("scroll", () => {
  prog.style.width = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100 + "%";
  nav.classList.toggle("sc", scrollY > 20);
}, { passive: true });
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .12 });
const observe = () => $$(".rv:not(.in)").forEach(el => io.observe(el));

// cursor, magnetic, tilt
if (fine) {
  const c = document.createElement("div"); c.className = "cur"; document.body.append(c);
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  (function l() { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(l); })();
  document.addEventListener("mouseover", e => c.classList.toggle("big", !!e.target.closest("a,.row,figure,.btn")));
  document.addEventListener("mousemove", e => $$(".mag").forEach(m => {
    const r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    m.style.transform = Math.hypot(dx, dy) < 90 ? `translate(${dx * .25}px,${dy * .35}px)` : "";
  }));
  const pt = $(".portrait");
  if (pt) addEventListener("mousemove", e => pt.style.transform = `perspective(800px) rotateY(${(e.clientX / innerWidth - .5) * 8}deg) rotateX(${(.5 - e.clientY / innerHeight) * 6}deg)`);
}

// home: project list with floating preview
const list = $("#list");
if (list) {
  list.innerHTML = P.map((p, i) => `<a class="row rv" href="project.html?p=${p.slug}" data-i="${i}"><span class="n">0${i + 1}</span><div><h3>${p.title}</h3><span class="eyebrow">${p.tag} · ${p.year}</span></div><p>${p.short}</p><span class="ar">→</span>${img(p.cover, p.title, "th")}</a>`).join("");
  if (fine) {
    const pv = document.createElement("div"); pv.className = "pv"; document.body.append(pv);
    let px = 0, py = 0, tx = 0, ty = 0;
    list.addEventListener("mousemove", e => { tx = e.clientX + 30; ty = e.clientY - 120; });
    (function l() { px += (tx - px) * .15; py += (ty - py) * .15; pv.style.transform = `translate(${px}px,${py}px) scale(${pv.classList.contains("on") ? 1 : .7})`; requestAnimationFrame(l); })();
    $$(".row", list).forEach(r => {
      r.addEventListener("mouseenter", () => { pv.innerHTML = img(P[r.dataset.i].cover); pv.classList.add("on"); });
      r.addEventListener("mouseleave", () => pv.classList.remove("on"));
    });
  }
}

// project page
const main = $("#main");
if (main) {
  const i = P.findIndex(p => p.slug === new URLSearchParams(location.search).get("p"));
  if (i < 0) location.replace("index.html");
  const p = P[i], nx = P[(i + 1) % P.length];
  document.title = `${p.title} · ${S.name}`;
  const sec = ([h, c]) => `<div class="body rv"><h2>${h}</h2><div class="t">${c.map(x => Array.isArray(x) ? `<ul>${x.map(l => `<li>${l}</li>`).join("")}</ul>` : `<p>${x}</p>`).join("")}</div></div>`;
  const vid = v => v.yt ? `<div><iframe src="${v.yt}" title="${v.cap}" allowfullscreen loading="lazy"></iframe><p>${v.cap}</p></div>` : `<div><video controls preload="metadata"><source src="assets/${v.mp4[0]}"><source src="${v.mp4[1]}"></video><p>${v.cap}</p></div>`;
  main.innerHTML = `<div class="ph wrap"><p class="eyebrow"><b>${p.tag}</b> · ${p.year}</p><h1 data-split>${p.title}</h1><p class="sub fade">${p.sub}</p>
<dl class="meta fade">${p.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
${p.links.length ? `<div class="links fade" style="margin-bottom:40px">${p.links.map(([t, u]) => `<a class="btn dk mag" href="${u}" target="_blank" rel="noopener">${t} ↗</a>`).join("")}</div>` : ""}
<div class="hero-img rv">${img(p.cover, p.title)}</div></div>
<div class="wrap">${p.sections.map(sec).join("")}
${p.videos.length ? `<div class="body rv"><h2>Watch</h2><div class="vids">${p.videos.map(vid).join("")}</div></div>` : ""}
${p.gallery.length ? `<div class="body rv"><h2>Gallery</h2><div class="gal">${p.gallery.map((g, k) => `<figure data-k="${k}">${img(g, g[2])}<figcaption>${g[2]}</figcaption></figure>`).join("")}</div></div>` : ""}
<a class="next" href="project.html?p=${nx.slug}"><p class="eyebrow">Next project</p><h2>${nx.title} →</h2></a></div>
<div class="lb"><img alt=""><p></p></div>`;
  split_again();
  // lightbox
  const lb = $(".lb"), lbi = $("img", lb); let k = 0;
  const show = n => { k = (n + p.gallery.length) % p.gallery.length; const g = p.gallery[k]; lbi.onerror = () => { lbi.onerror = null; lbi.src = g[1]; }; lbi.src = "assets/" + g[0]; $("p", lb).textContent = g[2]; lb.classList.add("on"); };
  $$("figure", main).forEach(f => f.onclick = () => show(+f.dataset.k));
  lb.onclick = () => lb.classList.remove("on");
  addEventListener("keydown", e => { if (!lb.classList.contains("on")) return; if (e.key === "Escape") lb.classList.remove("on"); if (e.key === "ArrowRight") show(k + 1); if (e.key === "ArrowLeft") show(k - 1); });
}
function split_again() { /* project headings are built after the first split pass, so split them here */
  $$("[data-split]:not([data-done])").forEach(el => { el.dataset.done = 1; const t = el.textContent; el.innerHTML = t.split(" ").map((w, i) => `<span class="w"><span style="transition-delay:${.08 * i + .2}s">${w}</span></span>`).join(" "); });
}
observe();
})();
