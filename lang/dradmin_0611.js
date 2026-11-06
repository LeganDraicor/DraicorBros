/* DRADMIN v1 (Legan 06/11): menu lateral del panel admin, con grupos e iconos, que se oculta/expande como el de Draicor Bros.
   No cambia la logica del admin: solo reordena y viste los mismos botones .nav-btn (switchView sigue funcionando igual). Solo ASCII. */
(function () {
    if (window.__drAdmNav) return; window.__drAdmNav = 1;
    var nav = document.getElementById('adm-nav'), app = document.getElementById('app-layout');
    if (!nav || !app) return;
    var SVG = function (d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; };
    var IC = {
        'view-dashboard': '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
        'view-stats': '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
        'view-approvals': '<path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="2"/>',
        'view-search': '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M17 11l2 2 3-3"/>',
        'view-treasury': '<path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 21h18"/>',
        'view-gifts': '<rect x="3" y="8" width="18" height="13" rx="1.5"/><path d="M12 8v13M3 12h18"/><path d="M12 8c-2-4-6-4-6-1.5S9 8 12 8c3 0 6-.5 6-1.5S14 4 12 8z"/>',
        'view-coupons': '<path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 0 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><path d="M14 5v14" stroke-dasharray="2 2"/>',
        'view-refch': '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M2 20c0-3 3-5 6-5s6 2 6 5"/><path d="M14.5 15.5c3 0 7 1 7 4.5"/>',
        'view-drums': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7M12 14v7M3 12h7M14 12h7"/>',
        'view-season': '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
        'view-royale': '<path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6M16 16l4 4M19 21l2-2"/>',
        'view-kart': '<path d="M5 16h14l-2-6H8z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M10 10l1-4h3"/>',
        'view-ads': '<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',
        'view-advertisers': '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
        'view-config': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
        'view-security': '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
        'view-shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
        'view-backup': '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>'
    };
    var GROUPS = [
        ['Principal', ['view-dashboard', 'view-stats', 'view-approvals']],
        ['Jugadores y dinero', ['view-search', 'view-treasury', 'view-gifts', 'view-coupons', 'view-refch']],
        ['Juegos', ['view-drums', 'view-season', 'view-royale', 'view-kart']],
        ['Publicidad', ['view-ads', 'view-advertisers']],
        ['Sistema', ['view-config', 'view-security', 'view-shield', 'view-backup']]
    ];
    var btns = {};
    Array.prototype.forEach.call(nav.querySelectorAll('.nav-btn'), function (b) { btns[b.dataset.target] = b; });

    var css = document.createElement('style');
    css.textContent =
        ':root{--sbw:250px}html.sb-mini{--sbw:76px}' +
        '#adm-nav.sb{position:fixed;left:0;top:0;bottom:0;z-index:60;width:var(--sbw);display:flex;flex-direction:column;flex-wrap:nowrap;gap:0;padding:0;overflow:hidden;' +
        'background:linear-gradient(180deg,#10131f 0%,#0b0d16 100%);border-right:1px solid var(--dr-line);border-bottom:0;transition:width .22s ease,transform .22s ease;box-shadow:4px 0 24px rgba(0,0,0,.35)}' +
        '#adm-nav.sb .sb-brand{display:flex;align-items:center;gap:10px;min-height:64px;padding:0 18px;border-bottom:1px solid var(--dr-line);flex:0 0 auto}' +
        '#adm-nav.sb .sb-logo{flex:0 0 38px;width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:400 13px var(--dr-pixel);color:var(--dr-ink);background:linear-gradient(135deg,var(--dr-gold2),var(--dr-gold));box-shadow:0 0 18px rgba(248,184,0,.35)}' +
        '#adm-nav.sb .sb-title{font:400 12px/1.5 var(--dr-pixel);color:var(--dr-gold);white-space:nowrap}#adm-nav.sb .sb-title small{display:block;font:600 11px var(--dr-font);color:var(--dr-tx3);letter-spacing:.08em}' +
        '#adm-nav.sb .sb-scroll{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;padding:10px 12px 14px;scrollbar-width:thin;scrollbar-color:var(--dr-line) transparent}' +
        '#adm-nav.sb .sb-scroll::-webkit-scrollbar{width:6px}#adm-nav.sb .sb-scroll::-webkit-scrollbar-thumb{background:var(--dr-line);border-radius:6px}' +
        '#adm-nav.sb .sb-group{margin:14px 8px 6px;font:700 10.5px var(--dr-font);letter-spacing:.12em;text-transform:uppercase;color:var(--dr-tx3);white-space:nowrap}' +
        '#adm-nav.sb .sb-group:first-child{margin-top:4px}' +
        '#adm-nav.sb .nav-btn{position:relative;display:flex;align-items:center;justify-content:flex-start;gap:12px;width:100%;min-height:42px;margin:2px 0;padding:0 12px;border:0;border-radius:10px;background:transparent;color:var(--dr-tx2);font:600 14px var(--dr-font);text-align:left;white-space:nowrap;cursor:pointer;transition:background .15s,color .15s}' +
        '#adm-nav.sb .nav-btn svg{flex:0 0 20px;width:20px;height:20px}' +
        '#adm-nav.sb .nav-btn:hover{background:var(--dr-s3);color:var(--dr-tx)}' +
        '#adm-nav.sb .nav-btn.is-active{background:linear-gradient(90deg,rgba(248,184,0,.18),rgba(248,184,0,.04));color:var(--dr-gold2)}' +
        '#adm-nav.sb .nav-btn.is-active::before{content:"";position:absolute;left:-12px;top:8px;bottom:8px;width:4px;border-radius:0 4px 4px 0;background:var(--dr-gold);box-shadow:0 0 10px var(--dr-gold)}' +
        '#adm-nav.sb .nav-btn:focus-visible{outline:2px solid var(--dr-cyan);outline-offset:1px}' +
        '#adm-nav.sb .sb-lbl{overflow:hidden;text-overflow:ellipsis}' +
        '#adm-nav.sb .sb-foot{flex:0 0 auto;padding:10px 12px;border-top:1px solid var(--dr-line)}' +
        '#adm-nav.sb .sb-toggle{display:flex;align-items:center;gap:12px;width:100%;min-height:42px;padding:0 12px;border:1px solid var(--dr-line);border-radius:10px;background:var(--dr-s1);color:var(--dr-tx2);font:600 13px var(--dr-font);cursor:pointer;white-space:nowrap}' +
        '#adm-nav.sb .sb-toggle:hover{color:var(--dr-tx);border-color:var(--dr-line2)}#adm-nav.sb .sb-toggle svg{flex:0 0 20px;width:20px;height:20px;transition:transform .22s}' +
        'html.sb-mini #adm-nav.sb .sb-toggle svg{transform:rotate(180deg)}' +
        'html.sb-mini #adm-nav.sb .sb-lbl,html.sb-mini #adm-nav.sb .sb-title{display:none}' +
        'html.sb-mini #adm-nav.sb .sb-group{height:1px;margin:10px 6px;padding:0;font-size:0;background:var(--dr-line)}' +
        'html.sb-mini #adm-nav.sb .nav-btn,html.sb-mini #adm-nav.sb .sb-toggle{justify-content:center;padding:0}' +
        'html.sb-mini #adm-nav.sb .sb-brand{justify-content:center;padding:0}' +
        '#app-layout.sb-on{padding-left:var(--sbw);transition:padding-left .22s ease}' +
        '#app-layout.sb-on .dr-topbar{position:sticky;top:0;z-index:40;backdrop-filter:blur(8px);background:rgba(13,15,23,.86)}' +
        '#app-layout.sb-on .dr-topbar .dr-logo{display:none}' +
        '.sb-burger{display:none;align-items:center;justify-content:center;width:44px;height:44px;border-radius:10px;border:1px solid var(--dr-line2);background:transparent;color:var(--dr-tx);cursor:pointer}.sb-burger svg{width:22px;height:22px}' +
        '.sb-cur{font:400 11px var(--dr-pixel);color:var(--dr-gold);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
        '.sb-back{position:fixed;inset:0;z-index:55;background:rgba(3,4,8,.6);opacity:0;pointer-events:none;transition:opacity .2s}' +
        '@media (max-width:899px){' +
        '  :root,html.sb-mini{--sbw:270px}' +
        '  #adm-nav.sb{transform:translateX(-105%)}html.sb-open #adm-nav.sb{transform:none}' +
        '  html.sb-open .sb-back{opacity:1;pointer-events:auto}' +
        '  #app-layout.sb-on{padding-left:0}#app-layout.sb-on .dr-topbar .dr-logo{display:none}' +
        '  .sb-burger{display:inline-flex}' +
        '  html.sb-mini #adm-nav.sb .sb-lbl,html.sb-mini #adm-nav.sb .sb-title{display:block}' +
        '  html.sb-mini #adm-nav.sb .sb-group{height:auto;margin:14px 8px 6px;font-size:10.5px;background:none}' +
        '  html.sb-mini #adm-nav.sb .nav-btn{justify-content:flex-start;padding:0 12px}html.sb-mini #adm-nav.sb .sb-brand{justify-content:flex-start;padding:0 18px}' +
        '  #adm-nav.sb .sb-foot{display:none}' +
        '}';
    document.head.appendChild(css);

    /* armar el menu */
    nav.classList.add('sb');
    var brand = document.createElement('div'); brand.className = 'sb-brand';
    brand.innerHTML = '<span class="sb-logo">DB</span><span class="sb-title">DRAICOR<small>PANEL ADMIN</small></span>';
    var scroll = document.createElement('div'); scroll.className = 'sb-scroll';
    var used = {};
    GROUPS.forEach(function (g) {
        var h = document.createElement('div'); h.className = 'sb-group'; h.textContent = g[0]; scroll.appendChild(h);
        g[1].forEach(function (id) { if (btns[id]) { scroll.appendChild(btns[id]); used[id] = 1; } });
    });
    Object.keys(btns).forEach(function (id) { if (!used[id]) scroll.appendChild(btns[id]); }); /* secciones nuevas que no esten en la lista */
    Object.keys(btns).forEach(function (id) {
        var b = btns[id], txt = b.textContent.trim();
        b.title = txt; b.innerHTML = SVG(IC[id] || '<circle cx="12" cy="12" r="8"/>') + '<span class="sb-lbl"></span>';
        b.querySelector('.sb-lbl').textContent = txt;
    });
    var foot = document.createElement('div'); foot.className = 'sb-foot';
    var tg = document.createElement('button'); tg.type = 'button'; tg.className = 'sb-toggle';
    tg.innerHTML = SVG('<path d="M15 18l-6-6 6-6"/>') + '<span class="sb-lbl">Ocultar menu</span>';
    foot.appendChild(tg);
    nav.innerHTML = ''; nav.appendChild(brand); nav.appendChild(scroll); nav.appendChild(foot);
    app.classList.add('sb-on');

    var back = document.createElement('div'); back.className = 'sb-back'; document.body.appendChild(back);
    var top = app.querySelector('.dr-topbar');
    var bur = document.createElement('button'); bur.type = 'button'; bur.className = 'sb-burger'; bur.setAttribute('aria-label', 'Abrir menu');
    bur.innerHTML = SVG('<path d="M4 6h16M4 12h16M4 18h16"/>');
    var cur = document.createElement('span'); cur.className = 'sb-cur';
    if (top) { top.insertBefore(cur, top.firstChild); top.insertBefore(bur, top.firstChild); }

    var root = document.documentElement;
    function setMini(on) {
        root.classList.toggle('sb-mini', on);
        tg.title = on ? 'Mostrar menu' : 'Ocultar menu';
        tg.querySelector('.sb-lbl').textContent = on ? 'Mostrar menu' : 'Ocultar menu';
        try { localStorage.setItem('adm_nav_mini', on ? '1' : '0'); } catch (e) {}
    }
    var mini = false; try { mini = localStorage.getItem('adm_nav_mini') === '1'; } catch (e) {}
    setMini(mini);
    tg.addEventListener('click', function () { setMini(!root.classList.contains('sb-mini')); });
    bur.addEventListener('click', function () { root.classList.add('sb-open'); });
    back.addEventListener('click', function () { root.classList.remove('sb-open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') root.classList.remove('sb-open'); });
    nav.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.nav-btn')) root.classList.remove('sb-open'); });

    /* nombre de la seccion actual en la barra de arriba */
    function syncCur() { var a = nav.querySelector('.nav-btn.is-active'); cur.textContent = a ? a.title.toUpperCase() : ''; if (a && a.scrollIntoView && scroll.scrollHeight > scroll.clientHeight) { var r = a.getBoundingClientRect(), s = scroll.getBoundingClientRect(); if (r.top < s.top || r.bottom > s.bottom) a.scrollIntoView({ block: 'nearest' }); } }
    try { new MutationObserver(syncCur).observe(scroll, { attributes: true, subtree: true, attributeFilter: ['class'] }); } catch (e) {}
    syncCur();

    /* el admin usa la altura de la barra para el margen al saltar a una seccion; con el menu lateral eso ya no aplica en escritorio */
    try {
        var od = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
        Object.defineProperty(nav, 'offsetHeight', { configurable: true, get: function () { return window.innerWidth >= 900 ? (top ? top.offsetHeight : 0) : (top ? top.offsetHeight : 0); } });
    } catch (e) {}
})();
