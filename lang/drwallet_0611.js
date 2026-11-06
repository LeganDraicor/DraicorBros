/* DRWALLET v1 (Legan 06/11): billetera redisenada con el estilo del juego.
   Saldos con icono y brillo (USDT, DTC y Gemas compradas/ganadas), escalera de minimos de retiro y botones tipo tarjeta. Solo ASCII. */
(function () {
    if (window.__drWallet) return; window.__drWallet = 1;
    var L = function () { return document.documentElement.getAttribute('data-lang') || 'en'; };
    var T = {
        en: ['Your Gems', 'Bought', 'Earned', 'Withdrawal minimums', 'next'],
        es: ['Tus Gemas', 'Compradas', 'Ganadas', 'Mínimos de retiro', 'siguiente'],
        pt: ['Suas Gemas', 'Compradas', 'Ganhas', 'Mínimos de saque', 'próximo'],
        fr: ['Tes Gemmes', 'Achetées', 'Gagnées', 'Minimums de retrait', 'suivant'],
        de: ['Deine Edelsteine', 'Gekauft', 'Verdient', 'Auszahlungsminimum', 'nächstes'],
        it: ['Le tue Gemme', 'Comprate', 'Guadagnate', 'Minimi di prelievo', 'prossimo'],
        ru: ['Твои самоцветы', 'Куплено', 'Заработано', 'Минимум вывода', 'далее'],
        hi: ['आपके जेम्स', 'खरीदे', 'कमाए', 'निकासी न्यूनतम', 'अगला'],
        id: ['Permata kamu', 'Dibeli', 'Didapat', 'Minimum penarikan', 'berikutnya'],
        vi: ['Đá quý của bạn', 'Đã mua', 'Đã kiếm', 'Mức rút tối thiểu', 'tiếp theo'],
        fil: ['Mga Gems mo', 'Binili', 'Kinita', 'Minimum na withdraw', 'susunod'],
        zh: ['你的宝石', '购买', '赚取', '提现最低额', '下一个'],
        tr: ['Mücevherlerin', 'Satın alınan', 'Kazanılan', 'Çekim alt limitleri', 'sonraki'],
        ar: ['جواهرك', 'مشتراة', 'مكتسبة', 'الحد الأدنى للسحب', 'التالي']
    };
    function t(i) { return (T[L()] || T.en)[i]; }
    function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; }
    var BI = {
        'show-deposit-btn': '<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',
        'show-withdraw-btn': '<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>',
        'show-swap-btn': '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
        'show-history-btn': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        'show-redeem-btn': '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12M12 9c-2-4-6-4-6-1.5S10 9 12 9c2 0 6 1 6-1.5S14 5 12 9"/>'
    };
    function ico(k) { var sp = document.createElement('span'); sp.className = 'dr-ico drw-i'; sp.innerHTML = (window.DR_ICO && window.DR_ICO[k]) || ''; return sp; }
    function css() {
        if (document.getElementById('drw-css')) return;
        var s = document.createElement('style'); s.id = 'drw-css';
        s.textContent =
            '#wallet-modal .modal-content{background:radial-gradient(120% 80% at 0% 0%,rgba(255,210,77,.10),transparent 55%),radial-gradient(120% 80% at 100% 0%,rgba(0,229,255,.08),transparent 55%),#10131d;border:1px solid #2a3150;box-shadow:0 0 0 1px rgba(255,210,77,.12),0 24px 60px rgba(0,0,0,.65)}' +
            '#wallet-modal .modal-header h2{display:flex;align-items:center;gap:12px;color:#ffd24d;text-shadow:0 2px 0 #000,0 0 14px rgba(255,210,77,.45)}' +
            '#wallet-modal .modal-header h2 .drw-h{display:inline-flex;width:30px;height:30px;color:#ffd24d}#wallet-modal .modal-header h2 .drw-h svg{width:30px;height:30px}' +
            '#wallet-main-view .wallet-balances{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))!important;gap:12px}' +
            '#wallet-main-view .balance-display{position:relative;overflow:hidden;border-radius:14px;padding:16px 16px 16px 66px!important;min-height:92px;background:linear-gradient(135deg,#171c2c,#10131d);border:1px solid #2a3150}' +
            '#wallet-main-view .balance-display::after{content:"";position:absolute;inset:auto -30% -60% auto;width:70%;height:120%;background:radial-gradient(circle,var(--drw-c,#00e676) 0,transparent 65%);opacity:.12;pointer-events:none}' +
            '#wallet-main-view .balance-display .drw-i{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:38px;height:38px;filter:drop-shadow(0 0 8px var(--drw-c,#00e676))}#wallet-main-view .balance-display .drw-i svg{width:38px;height:38px}' +
            '#wallet-main-view .balance-display p{margin:0 0 4px!important;font-size:12px!important;color:#8a93b5!important;text-transform:uppercase;letter-spacing:.06em}' +
            '#wallet-main-view .balance-display>span:not(.drw-i){font-size:clamp(20px,3vw,28px)!important;font-weight:800;color:var(--drw-c,#00e676)!important;text-shadow:0 0 14px color-mix(in srgb,var(--drw-c,#00e676) 45%,transparent)}' +
            '#wallet-main-view .balance-display{--drw-c:#2ee6a6;border-color:rgba(46,230,166,.35)}#wallet-main-view .balance-display.bal-dtc{--drw-c:#ffd24d;border-color:rgba(255,210,77,.35)}#wallet-main-view .balance-display.drw-gems{--drw-c:#38d6ff;border-color:rgba(56,214,255,.35)}' +
            '#wallet-main-view .drw-sub{display:block;margin-top:4px;font-size:12px;color:#b8c0dc}#wallet-main-view .drw-sub b{color:#38d6ff}' +
            '#wallet-status-box{display:none!important}' +
            '.drw-steps{margin:14px 0 4px;padding:14px 16px;border-radius:14px;background:#0d1019;border:1px solid #2a3150}.drw-steps h4{margin:0 0 10px;font-size:12px;color:#8a93b5;text-transform:uppercase;letter-spacing:.06em}' +
            '.drw-row{display:flex;align-items:center;gap:6px}.drw-st{flex:1;text-align:center;padding:8px 4px;border-radius:10px;background:#141826;border:1px solid #2a3150;color:#6b77a8;font-weight:800;font-size:13px;position:relative}' +
            '.drw-st.done{color:#2ee6a6;border-color:rgba(46,230,166,.35)}.drw-st.now{color:#0b0d14;background:linear-gradient(90deg,#2ee6a6,#38d6ff);border-color:transparent;box-shadow:0 0 16px rgba(46,230,166,.5)}' +
            '.drw-st.now small{position:absolute;left:50%;top:-9px;transform:translateX(-50%);padding:0 6px;border-radius:999px;background:#ffd24d;color:#0b0d14;font-size:9px;text-transform:uppercase}.drw-ar{color:#2a3150;font-weight:900}' +
            '#wallet-main-view .wallet-buttons{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(130px,1fr))!important;gap:10px;margin-top:14px}' +
            '#wallet-main-view .wallet-btn{display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:92px!important;border-radius:14px!important;font-weight:800!important;transition:transform .12s,box-shadow .15s}' +
            '#wallet-main-view .wallet-btn:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(0,0,0,.45)}#wallet-main-view .wallet-btn .drw-b svg{width:26px;height:26px}#wallet-main-view .wallet-btn .drw-b{display:inline-flex}' +
            '#wallet-main-view .wallet-btn-wide{grid-column:auto!important}' +
            '#wallet-main-view #show-history-btn,#wallet-main-view #show-redeem-btn{background:#141826!important;border:1px solid #2a3150!important;color:#f4f6ff!important}#wallet-main-view #show-redeem-btn .drw-b{color:#ff3df2}#wallet-main-view #show-history-btn .drw-b{color:#38d6ff}' +
            '#wallet-modal .wallet-view h3{font-family:"Press Start 2P",monospace;font-size:14px;color:#ffd24d;letter-spacing:.02em}' +
            '#wallet-modal .dr-input{background:#0d1019!important;border:1px solid #2a3150!important;border-radius:12px!important;color:#f4f6ff!important}#wallet-modal .dr-input:focus{border-color:#ffd24d!important;box-shadow:0 0 0 3px rgba(255,210,77,.18)!important;outline:0}' +
            '@media (max-width:560px){#wallet-main-view .wallet-buttons{grid-template-columns:repeat(2,1fr)!important}#wallet-main-view .wallet-btn-wide{grid-column:1/-1!important;min-height:64px!important;flex-direction:row}}';
        (document.head || document.documentElement).appendChild(s);
    }
    var hudAt = 0;
    function fmt(n, d) { return (Number(n) || 0).toLocaleString('en-US', { maximumFractionDigits: d == null ? 0 : d }); }
    function decorate() {
        var m = document.getElementById('wallet-main-view'); if (!m) return;
        var h2 = document.querySelector('#wallet-modal .modal-header h2');
        if (h2 && !h2.querySelector('.drw-h')) { var hi = document.createElement('span'); hi.className = 'drw-h'; hi.innerHTML = svg('<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11"/><circle cx="16" cy="13.5" r="1.3"/>'); h2.insertBefore(hi, h2.firstChild); }
        var bals = m.querySelector('.wallet-balances');
        Array.prototype.forEach.call(m.querySelectorAll('.balance-display'), function (b) {
            if (b.querySelector('.drw-i')) return;
            b.insertBefore(ico(b.classList.contains('bal-dtc') ? 'coin' : b.classList.contains('drw-gems') ? 'gem' : 'usdt'), b.firstChild);
        });
        if (bals && !bals.querySelector('.drw-gems')) {
            var g = document.createElement('div'); g.className = 'balance-display drw-gems';
            g.appendChild(ico('gem')); var p = document.createElement('p'); p.textContent = t(0); g.appendChild(p);
            var v = document.createElement('span'); v.id = 'drw-gems-val'; v.textContent = '-'; g.appendChild(v);
            var sub = document.createElement('small'); sub.className = 'drw-sub'; sub.id = 'drw-gems-sub'; g.appendChild(sub);
            bals.appendChild(g);
        }
        Array.prototype.forEach.call(m.querySelectorAll('.wallet-btn'), function (b) {
            if (b.querySelector('.drw-b') || !BI[b.id]) return;
            var i = document.createElement('span'); i.className = 'drw-b'; i.innerHTML = svg(BI[b.id]); b.insertBefore(i, b.firstChild);
        });
        steps();
        if (Date.now() - hudAt > 15000 && window.DraicorAuth && window.DraicorAuth.isLoggedIn && window.DraicorAuth.isLoggedIn()) {
            hudAt = Date.now();
            window.DraicorAuth.call('getHud').then(function (h) {
                var v2 = document.getElementById('drw-gems-val'), s2 = document.getElementById('drw-gems-sub');
                if (v2) v2.textContent = fmt(h.gems, 3);
                if (s2) { s2.textContent = ''; var a = document.createElement('b'); a.textContent = fmt(h.gemsBought, 3); s2.appendChild(document.createTextNode(t(1) + ' ')); s2.appendChild(a); s2.appendChild(document.createTextNode(' · ' + t(2) + ' ' + fmt(h.gemsGame, 3))); }
            }, function () {});
        }
    }
    function steps() {
        var box = document.getElementById('wallet-status-box'), m = document.getElementById('wallet-main-view'); if (!box || !m) return;
        var cur = box.querySelector('.dr-usdt'), now = cur ? parseFloat(cur.textContent) : NaN;
        var tb = box.children[1] ? box.children[1].querySelector('span') || box.children[1] : null;
        var tiers = ((tb ? tb.textContent : '').match(/\d+(\.\d+)?/g) || []).map(Number).filter(function (x, i, a) { return a.indexOf(x) === i; });
        if (tiers.length < 2) return;
        var key = now + '|' + tiers.join(',') + '|' + L();
        var st = m.querySelector('.drw-steps'); if (st && st.getAttribute('data-k') === key) return;
        if (!st) { st = document.createElement('div'); st.className = 'drw-steps'; box.parentNode.insertBefore(st, box.nextSibling); }
        st.setAttribute('data-k', key); st.textContent = '';
        var h = document.createElement('h4'); h.textContent = t(3); st.appendChild(h);
        var row = document.createElement('div'); row.className = 'drw-row';
        tiers.forEach(function (x, i) {
            if (i) { var ar = document.createElement('span'); ar.className = 'drw-ar'; ar.textContent = '›'; row.appendChild(ar); }
            var c = document.createElement('div'); c.className = 'drw-st' + (x < now ? ' done' : x === now ? ' now' : '');
            c.textContent = x.toFixed(2);
            if (x === now) { var sm = document.createElement('small'); sm.textContent = t(4); c.appendChild(sm); }
            row.appendChild(c);
        });
        st.appendChild(row);
    }
    css();
    function boot() {
        var w = document.getElementById('wallet-modal'); if (!w) return;
        decorate();
        if (!w.__drw) { w.__drw = 1; new MutationObserver(function () { decorate(); }).observe(w, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] }); }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    setTimeout(boot, 1500); setTimeout(boot, 4000);
})();
