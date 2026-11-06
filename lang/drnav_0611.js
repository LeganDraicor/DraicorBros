/* DRNAV v1 (Legan 06/11): menu lateral con iconos que se oculta a la izquierda dejando solo los iconos,
   y barras de desplazamiento con el estilo del juego en todo el sitio. Solo ASCII. */
(function () {
    if (window.__drNav) return; window.__drNav = 1;
    var KEY = 'dr_nav_mini';
    function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
    var I = {
        user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
        planet: '<circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-20 12 12)"/>',
        trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M8 21h8M9 17h6"/>',
        shop: '<path d="M4 9h16l-1 11H5z"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/>',
        bag: '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5h6v2M4 12h16"/>',
        shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
        anvil: '<path d="M3 8h13a4 4 0 0 1-4 4H9l-1 4h8v3H6v-3l1-4H5a2 2 0 0 1-2-2z"/><path d="M19 4l-2 3M21 8h-3"/>',
        chest: '<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 13h18M5 9a7 5 0 0 1 14 0"/><rect x="10.5" y="11.5" width="3" height="4" rx="1"/>',
        ad: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15l2.5-6 2.5 6M7.8 13h3.4M15 9v6h1.5a3 3 0 0 0 0-6z"/>',
        target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
        ticket: '<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z" transform="translate(0 2)"/><path d="M14 6v12" stroke-dasharray="2 2"/>',
        wheel: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/><circle cx="12" cy="12" r="2"/>',
        cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M3 4h2l2.5 11h11L21 8H6"/>',
        users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2.5.5 4 2.5 4 5.5"/>',
        gift: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12M12 9c-2-4-6-4-6-1.5S10 9 12 9c2 0 6 1 6-1.5S14 5 12 9"/>',
        wallet: '<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/><circle cx="16" cy="13.5" r="1.3"/>',
        down: '<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',
        up: '<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>',
        swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
        book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h4z"/>',
        check: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 12l3 3 5-6"/>',
        phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 15v3M10 16.5l2 1.5 2-1.5"/>',
        idcard: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2.2"/><path d="M5.5 16c.6-1.6 2-2.4 3.5-2.4s2.9.8 3.5 2.4M15 10h3M15 13h3"/>',
        gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
        exit: '<path d="M10 4H5v16h5"/><path d="M14 8l4 4-4 4M18 12H9"/>',
        dot: '<circle cx="12" cy="12" r="3"/>'
    };
    var MAP = {
        't:profile': 'user', 't:welcome': 'planet', 't:ranking': 'trophy', 't:store': 'shop', 't:inventory': 'bag', 't:equipment': 'shield', 't:forge': 'anvil',
        'i:faucet-btn': 'chest', 'i:ptc-btn': 'ad', 'i:tasks-btn': 'target', 'i:season-btn': 'ticket', 'i:offers-btn': 'wheel', 'i:ecommerce-btn': 'cart', 'i:referral-btn': 'users',
        'w:show-redeem-btn': 'gift', 't:wallet': 'wallet', 'w:show-deposit-btn': 'down', 'w:show-withdraw-btn': 'up', 'w:show-swap-btn': 'swap', 'w:show-history-btn': 'clock',
        'i:forum-btn': 'chat', 'i:tutorial-btn': 'book', 't:payments': 'check', 'i:install-app-btn': 'phone', 'i:profile-btn': 'idcard', 'i:settings-btn': 'gear', 'i:logout-btn': 'exit'
    };
    function keyOf(b) {
        if (b.getAttribute('data-target')) return 't:' + b.getAttribute('data-target');
        if (b.getAttribute('data-wallet-view')) return 'w:' + b.getAttribute('data-wallet-view');
        if (b.id) return 'i:' + b.id;
        return '';
    }
    function css() {
        if (document.getElementById('drnav-css')) return;
        var s = document.createElement('style'); s.id = 'drnav-css';
        s.textContent =
            /* barras de desplazamiento del juego */
            'html{scrollbar-color:#ffd24d #0b0d14;scrollbar-width:thin}' +
            '::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-track{background:#0b0d14;border-left:1px solid #1d2238}' +
            '::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#ffd24d,#ff9f1c 55%,#c77dff);border-radius:10px;border:2px solid #0b0d14;box-shadow:inset 0 0 4px rgba(0,0,0,.4)}' +
            '::-webkit-scrollbar-thumb:hover{background:linear-gradient(180deg,#ffe680,#ffb84d 55%,#d99bff)}::-webkit-scrollbar-corner{background:#0b0d14}' +
            '.dr-sidenav{scrollbar-width:thin;scrollbar-color:#2a3150 transparent}.dr-sidenav::-webkit-scrollbar{width:6px}.dr-sidenav::-webkit-scrollbar-track{background:transparent;border:0}.dr-sidenav::-webkit-scrollbar-thumb{background:#2a3150;border:0}.dr-sidenav:hover::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#ffd24d,#c77dff)}' +
            /* iconos */
            '.dr-nav__ico{flex:0 0 22px;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;color:#6b77a8;transition:color .15s,filter .15s}.dr-nav__ico svg{width:20px;height:20px}' +
            '.dr-nav__item:hover .dr-nav__ico{color:#38d6ff}.dr-nav__item.is-active .dr-nav__ico,.dr-nav__item[aria-current=page] .dr-nav__ico{color:#ffd24d;filter:drop-shadow(0 0 6px rgba(255,210,77,.6))}' +
            '.dr-nav__item.m-danger .dr-nav__ico{color:#ff5a6e}.dr-nav__item.has-ico>.dr-nav__dot{display:none}.dr-nav__tx{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
            /* boton para plegar */
            '.drnav-tog{display:none}' +
            '@media (min-width:821px){' +
            '.drnav-tog{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:36px;margin:0 0 10px;border-radius:8px;border:1px solid #2a3150;background:#141826;color:#b8c0dc;font:600 12px Inter,Arial,sans-serif;cursor:pointer}' +
            '.drnav-tog:hover{border-color:#ffd24d;color:#ffd24d}.drnav-tog svg{width:18px;height:18px;transition:transform .2s}' +
            '.dr-sidenav{transition:width .2s ease,min-width .2s ease,flex-basis .2s ease}' +
            'html.dr-nav-mini .dr-sidenav{width:72px!important;min-width:72px!important;flex-basis:72px!important;padding-left:10px!important;padding-right:10px!important;overflow-x:hidden}' +
            'html.dr-nav-mini .dr-sidenav .dr-nav__title,html.dr-nav-mini .dr-sidenav .dr-nav__tx,html.dr-nav-mini .dr-sidenav .dr-badge,html.dr-nav-mini .drnav-tog span{display:none!important}' +
            'html.dr-nav-mini .dr-sidenav .dr-nav__item{justify-content:center;padding:0!important;gap:0}' +
            'html.dr-nav-mini .dr-sidenav .dr-nav__item>*:not(.dr-nav__ico){display:none!important}' +
            'html.dr-nav-mini .dr-sidenav .dr-nav__ico{flex-basis:auto}html.dr-nav-mini .dr-sidenav .dr-nav__ico svg{width:22px;height:22px}' +
            'html.dr-nav-mini .drnav-tog svg{transform:rotate(180deg)}' +
            'html.dr-nav-mini .dr-sidenav>div+div{border-top:1px solid #1d2238;padding-top:8px;margin-top:8px}' +
            '}';
        (document.head || document.documentElement).appendChild(s);
    }
    function wrapText(b) {
        if (b.querySelector('.dr-nav__tx')) return;
        Array.prototype.slice.call(b.childNodes).forEach(function (n) {
            if (n.nodeType === 3 && n.textContent.trim()) { var sp = document.createElement('span'); sp.className = 'dr-nav__tx'; b.replaceChild(sp, n); sp.appendChild(n); }
        });
    }
    function decorate(nav) {
        Array.prototype.forEach.call(nav.querySelectorAll('.dr-nav__item'), function (b) {
            if (!b.classList.contains('has-ico')) {
                var k = MAP[keyOf(b)] || 'dot', ic = document.createElement('span');
                ic.className = 'dr-nav__ico'; ic.innerHTML = svg(I[k] || I.dot);
                b.insertBefore(ic, b.firstChild); b.classList.add('has-ico');
            }
            wrapText(b);
            var tx = b.querySelector('.dr-nav__tx'); if (tx && b.title !== tx.textContent.trim()) b.title = tx.textContent.trim();
        });
        if (!nav.querySelector('.drnav-tog')) {
            var t = document.createElement('button'); t.type = 'button'; t.className = 'drnav-tog';
            t.innerHTML = svg('<path d="M15 6l-6 6 6 6"/><path d="M20 6l-6 6 6 6" opacity=".45"/>') + '<span>' + tr('Hide menu') + '</span>';
            t.onclick = function () { setMini(!document.documentElement.classList.contains('dr-nav-mini')); };
            nav.insertBefore(t, nav.firstChild);
        }
        syncTog(nav);
    }
    function tr(s) { try { var X = window.DraicorI18n; return X && X.t ? X.t(s) : s; } catch (e) { return s; } }
    function syncTog(nav) {
        var t = nav.querySelector('.drnav-tog'); if (!t) return;
        var mini = document.documentElement.classList.contains('dr-nav-mini');
        var tt = tr(mini ? 'Show menu' : 'Hide menu'); if (t.title !== tt) { t.title = tt; t.setAttribute('aria-label', tt); } t.setAttribute('aria-expanded', mini ? 'false' : 'true');
        var sp = t.querySelector('span'), want = tr('Hide menu'); if (sp && sp.textContent !== want) sp.textContent = want;
    }
    function setMini(on) {
        document.documentElement.classList.toggle('dr-nav-mini', !!on);
        try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {}
        Array.prototype.forEach.call(document.querySelectorAll('.dr-sidenav'), syncTog);
        try { window.dispatchEvent(new Event('resize')); } catch (e) {}
    }
    try { if (localStorage.getItem(KEY) === '1') document.documentElement.classList.add('dr-nav-mini'); } catch (e) {}
    css();
    function boot() {
        var navs = document.querySelectorAll('.dr-sidenav');
        Array.prototype.forEach.call(navs, function (n) {
            decorate(n);
            if (!n.__drnav) { n.__drnav = 1; new MutationObserver(function () { decorate(n); }).observe(n, { childList: true, subtree: true }); }
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    setTimeout(boot, 1500);
})();
