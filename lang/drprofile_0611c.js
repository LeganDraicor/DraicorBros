/* DRPROFILE v1 (Legan 05/11): perfil publico de cualquier jugador (auditoria abierta), podio del ranking semanal y ganadores de semanas pasadas.
   - DrProfile.open(username): ficha con foto, marco, titulo, nivel, estrellas, likes y estadisticas de 24 h / 7 dias / 30 dias.
     Nunca muestra saldos: solo lo GANADO, de donde vino, enemigos y jefes por juego y partidas online.
   - Ranking: podio con los 5 que cobran premio (fondo Nano Banana) + lista desde el 6 + semanas pasadas.
   - Chat y ranking: tocar la foto o el nombre abre el perfil; se ven las estrellas equipadas.
   Solo ASCII. Usa window.DrFaces y window.DraicorAuth del tema. */
(function () {
    if (window.DrProfile) return;
    var PODIUM_BG = 'https://cdn.jsdelivr.net/gh/LeganDraicor/DraicorBros@main/img/ui/bg_podium.jpg';
    var PRIZES = [1000000, 500000, 250000, 100000, 50000];
    /* centro (x %) y tope del pedestal (y %) en la imagen de fondo: 1, 2, 3, 4, 5 */
    var SPOTS = { 1: [50, 59.6, 15], 2: [31.8, 65, 12], 3: [68.1, 67, 12], 4: [13.1, 72.9, 10], 5: [86.9, 72.7, 10] };
    var GAME_NAMES = { nexus: 'Nexus', battle: 'Battle', vanguard: 'Vanguard' };
    var SOURCE_NAMES = {
        'Gameplay Reward': 'Playing', 'Roulette Spin': 'Energy Roulette', 'In-Game Roulette': 'Gem Roulette', 'Bomb Chest': 'Bomb chests',
        'Boss Bounty': 'Boss bounties', 'Boss Reward': 'Boss bounties', 'Ranking Prize': 'Weekly ranking', 'Season Pass': 'Season Pass',
        'Daily Login': 'Daily login', 'Welcome Bonus': 'Welcome bonus', 'Gift Code': 'Gift codes', 'Referral Challenge': 'Referral challenge',
        'Royale Prize': 'Royale', 'Kart Prize': 'Kart', 'Vanguard Royale Prize': 'Vanguard Royale', 'PTC': 'Ads (PTC)', 'PTC Reward': 'Ads (PTC)',
        'Mystery Chest': 'Mystery chest', 'Task Reward': 'Missions', 'Referral Bonus': 'Referrals', 'Referral Commission': 'Referrals'
    };
    function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
    function tr(s) { try { var I = window.DraicorI18n; return I && I.t ? I.t(s) : s; } catch (e) { return s; } }
    function num(v) { v = Number(v); return isFinite(v) ? v : 0; }
    function fmt(n, d) { return num(n).toLocaleString('en-US', { maximumFractionDigits: d == null ? 0 : d }); }
    function call(a, d) { return window.DraicorAuth.call(a, d || {}); }
    function logged() { try { return !!(window.DraicorAuth && window.DraicorAuth.isLoggedIn()); } catch (e) { return false; } }
    function av(name, face, px) { return window.DrFaces ? window.DrFaces.avatar(name, face || {}, px) : el('span'); }
    function starTag(n) { var s = el('span', 'drp-stars', '\u2b50 ' + fmt(n)); s.title = 'Stars equipped'; return s; }
    function css() {
        if (document.getElementById('drp-css')) return;
        var s = el('style'); s.id = 'drp-css';
        s.textContent =
            '.drp-stars{display:inline-flex;align-items:center;gap:2px;padding:0 7px;border-radius:999px;background:rgba(255,210,77,.14);border:1px solid rgba(255,210,77,.4);color:#ffd24d;font-size:11px;font-weight:800;white-space:nowrap}' +
            '.drp-click{cursor:pointer}.drp-click:hover b,.drp-click:hover .drp-nm{text-decoration:underline}' +
            /* podio */
            '.drp-pod{position:relative;width:100%;aspect-ratio:1376/768;border-radius:16px;overflow:hidden;border:1px solid #2a3150;background:#0b0d14 center/cover no-repeat;margin:0 0 14px;box-shadow:0 10px 30px rgba(0,0,0,.5)}' +
            '.drp-pod__t{position:absolute;left:0;right:0;top:3%;text-align:center;font:400 clamp(10px,2.2vw,18px) "Press Start 2P",monospace;color:#ffd24d;text-shadow:0 2px 0 #000,0 0 12px rgba(255,210,77,.6)}' +
            '.drp-spot{position:absolute;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:.4vw;cursor:pointer;text-align:center}' +
            '.drp-spot .drf-av{box-shadow:0 0 18px rgba(0,0,0,.7)}.drp-spot.r1 .drf-av{box-shadow:0 0 0 3px #ffd24d,0 0 32px rgba(255,210,77,.9)}' +
            '.drp-crown{font-size:clamp(14px,3vw,34px);line-height:1;filter:drop-shadow(0 2px 2px #000);animation:drpBob 1.6s ease-in-out infinite}@keyframes drpBob{50%{transform:translateY(-4px)}}' +
            '.drp-tag{position:absolute;transform:translate(-50%,0);display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px 8px;border-radius:10px;background:rgba(7,8,13,.82);border:1px solid rgba(255,255,255,.18);max-width:18%;pointer-events:none}' +
            '.drp-tag b{font-size:clamp(9px,1.5vw,15px);color:#fff;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
            '.drp-tag i{font-style:normal;font-size:clamp(8px,1.25vw,13px);font-weight:800;color:#ffd24d;white-space:nowrap}.drp-tag small{font-size:clamp(7px,1.05vw,11px);color:#b8c0dc;white-space:nowrap}' +
            '.drp-tag.r1{border-color:#ffd24d;background:rgba(40,28,0,.88)}.drp-tag.r1 b{color:#ffe680}' +
            '.drp-pos{position:absolute;transform:translate(-50%,-50%);font:400 clamp(9px,1.8vw,16px) "Press Start 2P",monospace;color:#fff;text-shadow:0 2px 0 #000;pointer-events:none}' +
            /* semanas pasadas */
            '.drp-hist{margin-top:18px;display:flex;flex-direction:column;gap:8px}.drp-hist h3{margin:0 0 4px;font:400 13px "Press Start 2P",monospace;color:#ffd24d}' +
            '.drp-wk{border:1px solid #2a3150;border-radius:12px;background:#141826;overflow:hidden}.drp-wk summary{cursor:pointer;padding:10px 14px;font-weight:700;color:#f4f6ff;list-style:none;display:flex;justify-content:space-between;gap:10px}' +
            '.drp-wk summary::-webkit-details-marker{display:none}.drp-wk summary span{color:#8a93b5;font-weight:600;font-size:13px}' +
            '.drp-wk ol{margin:0;padding:0 14px 12px;list-style:none;display:flex;flex-direction:column;gap:6px}.drp-wk li{display:flex;align-items:center;gap:10px;cursor:pointer}.drp-wk li .p{width:26px;font-weight:800;color:#8a93b5}.drp-wk li .s{margin-left:auto;font-size:13px;color:#b8c0dc;text-align:right}' +
            /* ficha */
            '.drp-ov{position:fixed;inset:0;z-index:3000;background:rgba(5,6,10,.78);display:flex;align-items:center;justify-content:center;padding:12px}' +
            '.drp-box{width:min(620px,100%);max-height:calc(100vh - 24px);overflow-y:auto;background:#0d0f17;border:1px solid #2a3150;border-radius:18px;color:#f4f6ff;font-family:Inter,system-ui,Arial,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.7)}' +
            '.drp-hd{position:relative;display:flex;gap:16px;align-items:center;padding:20px;background:linear-gradient(135deg,rgba(255,210,77,.12),rgba(0,229,255,.08) 55%,rgba(255,61,242,.1)),#141826;border-bottom:1px solid #2a3150}' +
            '.drp-hd h2{margin:0;font-size:22px;overflow-wrap:anywhere}.drp-hd .sub{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px;font-size:13px;color:#b8c0dc}' +
            '.drp-ttl{color:#c77dff;font-weight:700}.drp-lv{padding:0 8px;border-radius:999px;background:#1b2033;border:1px solid #2a3150;font-weight:800}' +
            '.drp-x{position:absolute;top:10px;right:10px;width:40px;height:40px;border-radius:10px;border:1px solid #2a3150;background:#0d0f17;color:#fff;font-size:20px;cursor:pointer}' +
            '.drp-like{margin-top:10px;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 16px;border-radius:999px;border:1px solid #ff3df2;background:transparent;color:#fff;font-weight:800;cursor:pointer}' +
            '.drp-like.on{background:linear-gradient(90deg,#ff3df2,#ff5a8a);border-color:transparent}.drp-like:disabled{opacity:.6}' +
            '.drp-bd{padding:16px 18px 20px;display:flex;flex-direction:column;gap:16px}.drp-tabs{display:flex;gap:6px}.drp-tabs button{flex:1;min-height:40px;border-radius:999px;border:1px solid #2a3150;background:#141826;color:#b8c0dc;font-weight:700;cursor:pointer}.drp-tabs button.on{background:#ffd24d;color:#0b0d14;border-color:#ffd24d}' +
            '.drp-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px}.drp-k{padding:12px;border-radius:12px;background:#141826;border:1px solid #2a3150}.drp-k b{display:block;font-size:20px}.drp-k span{font-size:12px;color:#8a93b5}.drp-k small{display:block;font-size:11px;color:#b8c0dc;margin-top:2px}' +
            '.drp-k.g b{color:#38d6ff}.drp-k.d b{color:#ffd24d}.drp-k.u b{color:#00e676}' +
            '.drp-sec h3{margin:0 0 8px;font-size:15px;color:#ffd24d}.drp-tb{width:100%;border-collapse:collapse;font-size:14px}.drp-tb th,.drp-tb td{padding:7px 6px;border-bottom:1px solid #1d2238;text-align:right}.drp-tb th:first-child,.drp-tb td:first-child{text-align:left}.drp-tb th{color:#8a93b5;font-weight:600;font-size:12px}' +
            '.drp-note{font-size:12px;color:#8a93b5}.drp-frames{display:flex;flex-wrap:wrap;gap:10px}.drp-fr{display:flex;align-items:center;gap:8px;padding:6px 10px 6px 6px;border-radius:999px;background:#141826;border:1px solid #2a3150;font-size:12px}.drp-fr b{display:block;font-size:12px}.drp-fr span{color:#8a93b5}' +
            '.drp-load{padding:40px;text-align:center;color:#b8c0dc}';
        (document.head || document.documentElement).appendChild(s);
    }

    /* ---------------- ficha del jugador ---------------- */
    var cur = null;
    function close() { var o = document.getElementById('drp-ov'); if (o) o.remove(); cur = null; }
    function open(name) {
        if (!name) return;
        css();
        close();
        var ov = el('div', 'drp-ov'); ov.id = 'drp-ov'; ov.setAttribute('translate', 'no');
        var box = el('div', 'drp-box'); box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Player profile');
        box.appendChild(el('div', 'drp-load', tr('Loading...')));
        ov.appendChild(box); document.body.appendChild(ov);
        ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
        document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
        cur = { name: name, range: '7d', box: box };
        if (!logged()) { box.textContent = ''; box.appendChild(el('div', 'drp-load', tr('Log in to see player profiles.'))); return; }
        load();
    }
    function load() {
        var c = cur; if (!c) return;
        call('getPublicProfile', { username: c.name, range: c.range }).then(function (d) { if (cur === c) render(d); }, function (e) {
            if (cur !== c) return; c.box.textContent = ''; var x = el('button', 'drp-x', '\u00d7'); x.onclick = close; c.box.appendChild(x); c.box.appendChild(el('div', 'drp-load', (e && e.message) || 'Error'));
        });
    }
    function kpi(box, cls, val, label, sub) { var k = el('div', 'drp-k ' + (cls || '')); k.appendChild(el('b', null, val)); k.appendChild(el('span', null, tr(label))); if (sub) k.appendChild(el('small', null, sub)); box.appendChild(k); }
    function render(d) {
        var c = cur, box = c.box; box.textContent = '';
        var hd = el('div', 'drp-hd');
        hd.appendChild(av(d.username, { p: d.photo, f: d.frame }, 96));
        var info = el('div'), h = el('h2', null, d.username); info.appendChild(h);
        var sub = el('div', 'sub');
        if (d.admin) sub.appendChild(el('span', 'drc-adm', 'ADMIN'));
        if (d.title) sub.appendChild(el('span', 'drp-ttl', d.title));
        sub.appendChild(el('span', 'drp-lv', tr('Level') + ' ' + d.level));
        sub.appendChild(starTag(d.stars));
        if (d.joinedAt) sub.appendChild(el('span', null, tr('Joined') + ' ' + new Date(d.joinedAt).toLocaleDateString()));
        info.appendChild(sub);
        var likes = num(d.period && d.period.likes);
        var lb = el('button', 'drp-like' + (d.liked ? ' on' : ''), '\u2764\ufe0f ' + fmt(likes));
        lb.type = 'button'; lb.title = d.me ? tr('Your likes') : tr('Give a like');
        if (d.me) lb.disabled = true;
        lb.onclick = function () {
            lb.disabled = true;
            call('likePlayer', { username: d.username, on: !d.liked }).then(function (r) { d.liked = r.liked; lb.classList.toggle('on', !!r.liked); lb.textContent = '\u2764\ufe0f ' + fmt(r.likes); lb.disabled = false; },
                function (e) { lb.disabled = false; alert((e && e.message) || 'Error'); });
        };
        info.appendChild(lb);
        hd.appendChild(info);
        var x = el('button', 'drp-x', '\u00d7'); x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.onclick = close; hd.appendChild(x);
        box.appendChild(hd);

        var bd = el('div', 'drp-bd');
        var tabs = el('div', 'drp-tabs');
        [['24h', 'Last 24 hours'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days']].forEach(function (t) {
            var b = el('button', t[0] === c.range ? 'on' : '', tr(t[1])); b.type = 'button';
            b.onclick = function () { if (c.range === t[0]) return; c.range = t[0]; bd.style.opacity = '.5'; load(); };
            tabs.appendChild(b);
        });
        bd.appendChild(tabs);

        var p = d.period || {}, earn = p.earn || [], g = 0, dt = 0, u = 0;
        earn.forEach(function (e) { g += num(e.gems); dt += num(e.dtc); u += num(e.usdt); });
        var k = el('div', 'drp-kpis');
        kpi(k, '', fmt(p.kills), 'Enemies defeated', tr('Total') + ': ' + fmt(d.totals && d.totals.enemies));
        kpi(k, '', fmt(p.bosses), 'Bosses defeated', tr('Total') + ': ' + fmt(d.totals && d.totals.bosses));
        kpi(k, 'g', fmt(g, 3), 'Gems earned');
        kpi(k, 'd', fmt(dt), 'DTC earned');
        kpi(k, 'u', fmt(u, 4), 'USDT won');
        bd.appendChild(k);

        var s1 = el('div', 'drp-sec'); s1.appendChild(el('h3', null, tr('By game')));
        var t1 = el('table', 'drp-tb'), th = el('tr');
        [tr('Game'), tr('Enemies'), tr('Gems'), tr('Bosses')].forEach(function (x) { th.appendChild(el('th', null, x)); }); t1.appendChild(th);
        var bg = p.byGame || {}, bb = p.bossByGame || {};
        ['nexus', 'battle', 'vanguard'].forEach(function (gk) {
            var r = el('tr'), v = bg[gk] || {};
            r.appendChild(el('td', null, GAME_NAMES[gk])); r.appendChild(el('td', null, fmt(v.kills))); r.appendChild(el('td', null, fmt(v.gems, 3))); r.appendChild(el('td', null, fmt(bb[gk] || bb[gk === 'vanguard' ? 'vg' : gk] || 0)));
            t1.appendChild(r);
        });
        /* Legan 06/11: lo anterior al conteo por juego se muestra en su propia fila para que el total cuadre */
        var sumK = 0; ['nexus', 'battle', 'vanguard'].forEach(function (gk) { sumK += num((bg[gk] || {}).kills); });
        var restK = num(p.kills) - sumK;
        if (restK > 0) { var rr = el('tr'); rr.style.color = '#8a93b5'; rr.appendChild(el('td', null, tr('Before the per-game count'))); rr.appendChild(el('td', null, fmt(restK))); rr.appendChild(el('td', null, '-')); rr.appendChild(el('td', null, '-')); t1.appendChild(rr); }
        s1.appendChild(t1); s1.appendChild(el('p', 'drp-note', tr('Enemies and Gems per game are counted from November 5, 2026.')));
        bd.appendChild(s1);

        var s2 = el('div', 'drp-sec'); s2.appendChild(el('h3', null, tr('Online matches')));
        var t2 = el('table', 'drp-tb'), th2 = el('tr');
        [tr('Game'), tr('Played'), tr('Won'), tr('Lost'), 'USDT'].forEach(function (x) { th2.appendChild(el('th', null, x)); }); t2.appendChild(th2);
        var on = p.online || {};
        [['royale', 'Draicor Royale'], ['vroyale', 'Vanguard Royale'], ['kart', 'Draicor Kart']].forEach(function (o) {
            var v = on[o[0]] || {}, r = el('tr');
            r.appendChild(el('td', null, o[1])); r.appendChild(el('td', null, fmt(v.played))); r.appendChild(el('td', null, fmt(v.won)));
            r.appendChild(el('td', null, fmt(Math.max(0, num(v.played) - num(v.won))))); r.appendChild(el('td', null, fmt(v.usdt, 4)));
            t2.appendChild(r);
        });
        s2.appendChild(t2); s2.appendChild(el('p', 'drp-note', tr('Online stats are counted from November 5, 2026.')));
        bd.appendChild(s2);

        var s3 = el('div', 'drp-sec'); s3.appendChild(el('h3', null, tr('Where the earnings come from')));
        if (!earn.length) s3.appendChild(el('p', 'drp-note', tr('Nothing earned in this period.')));
        else {
            var t3 = el('table', 'drp-tb'), th3 = el('tr');
            [tr('Source'), tr('Gems'), 'DTC', 'USDT'].forEach(function (x) { th3.appendChild(el('th', null, x)); }); t3.appendChild(th3);
            earn.forEach(function (e) { var r = el('tr'); r.appendChild(el('td', null, tr(SOURCE_NAMES[e.type] || e.type))); r.appendChild(el('td', null, num(e.gems) ? fmt(e.gems, 3) : '-')); r.appendChild(el('td', null, num(e.dtc) ? fmt(e.dtc) : '-')); r.appendChild(el('td', null, num(e.usdt) ? fmt(e.usdt, 4) : '-')); t3.appendChild(r); });
            s3.appendChild(t3);
        }
        s3.appendChild(el('p', 'drp-note', tr('Balances are private. Only what was earned in the period is shown, so everyone can audit the game.')));
        bd.appendChild(s3);

        var s4 = el('div', 'drp-sec'); s4.appendChild(el('h3', null, tr('Frames and titles won')));
        var fr = el('div', 'drp-frames');
        (d.frames || []).forEach(function (f) { var it = el('div', 'drp-fr'); it.appendChild(av(d.username, { p: d.photo, f: f.frame }, 34)); var tx = el('div'); tx.appendChild(el('b', null, f.title || f.name || '')); if (f.name && f.title) tx.appendChild(el('span', null, f.name)); it.appendChild(tx); fr.appendChild(it); });
        if (!(d.frames || []).length) fr.appendChild(el('p', 'drp-note', tr('No frames won yet.')));
        s4.appendChild(fr); bd.appendChild(s4);
        box.appendChild(bd);
        try { var I = window.DraicorI18n; if (I && I._run) I._run(box, {}); } catch (e) {}
    }

    /* ---------------- ranking: podio + estrellas + semanas pasadas ---------------- */
    function rankingRoot() { var tb = document.getElementById('ranking-tbody'); if (!tb) return null; var t = tb.closest('table'); return t ? (t.closest('.dr-table-wrap') || t) : null; }
    function enhanceRanking(list) {
        css();
        var tb = document.getElementById('ranking-tbody'), anchor = rankingRoot();
        if (!tb || !anchor || !Array.isArray(list)) return;
        var top = list.slice(0, 5);
        var pod = document.getElementById('drp-pod');
        if (!pod) { pod = el('div', 'drp-pod'); pod.id = 'drp-pod'; anchor.parentNode.insertBefore(pod, anchor); }
        pod.textContent = ''; pod.style.backgroundImage = 'url(' + PODIUM_BG + ')';
        pod.appendChild(el('div', 'drp-pod__t', tr('WEEKLY CHAMPIONS')));
        var w = pod.clientWidth || 600;
        top.forEach(function (p, i) {
            var r = i + 1, sp = SPOTS[r], px = Math.max(30, Math.round(w * sp[2] / 100));
            var spot = el('div', 'drp-spot r' + r); spot.style.left = sp[0] + '%'; spot.style.top = (sp[1] - 0.5) + '%';
            if (r === 1) spot.appendChild(el('div', 'drp-crown', '\ud83d\udc51'));
            spot.appendChild(av(p.username, { f: p.frame }, px));
            spot.setAttribute('data-u', p.username || ''); spot.title = p.username || '';
            spot.onclick = function () { open(p.username); };
            pod.appendChild(spot);
            var tag = el('div', 'drp-tag r' + r); tag.style.left = sp[0] + '%'; tag.style.top = (sp[1] + 4) + '%';
            tag.appendChild(el('b', null, p.username || ''));
            tag.appendChild(el('i', null, '+' + fmt(PRIZES[i]) + ' DTC'));
            tag.appendChild(el('small', null, fmt(p.score) + ' pts'));
            pod.appendChild(tag);
        });
        /* lista: del 6 hacia abajo */
        Array.prototype.forEach.call(tb.querySelectorAll('tr'), function (tr0, i) { tr0.style.display = i < 5 && list.length > 5 ? 'none' : ''; });
        if (window.DrFaces) window.DrFaces.get(list.map(function (p) { return p.username; })).then(function (faces) {
            Array.prototype.forEach.call(pod.querySelectorAll('.drp-spot'), function (s) { var n = s.getAttribute('data-u'), f = faces[n]; if (f) { var a = s.querySelector('.drf-av'); var nf = av(n, f, parseInt(a.style.width, 10)); s.replaceChild(nf, a); } });
            Array.prototype.forEach.call(tb.querySelectorAll('.rkx-u'), function (u) { var n = u.getAttribute('data-u'), f = faces[n]; if (f && f.s && !u.querySelector('.drp-stars')) { var sp2 = u.querySelector('span'); if (sp2) sp2.appendChild(starTag(f.s)); } });
        });
        Array.prototype.forEach.call(tb.querySelectorAll('.rkx-u'), function (u) { u.classList.add('drp-click'); u.onclick = function () { open(u.getAttribute('data-u')); }; });
        history(anchor);
    }
    function history(anchor) {
        var hb = document.getElementById('drp-hist');
        if (!hb) { hb = el('div', 'drp-hist'); hb.id = 'drp-hist'; anchor.parentNode.insertBefore(hb, anchor.nextSibling); }
        call('getWeeklyWinners').then(function (d) {
            hb.textContent = ''; hb.appendChild(el('h3', null, tr('PAST WEEKS')));
            var weeks = (d && d.weeks) || [];
            if (!weeks.length) { hb.appendChild(el('p', 'drp-note', tr('No past weeks yet.'))); return; }
            weeks.forEach(function (wk, wi) {
                var det = el('details', 'drp-wk'); if (wi === 0) det.open = true;
                var sm = el('summary'); sm.appendChild(el('b', null, (wk.top[0] ? '\ud83d\udc51 ' + wk.top[0].username : ''))); sm.appendChild(el('span', null, tr('Week') + ' ' + wk.week)); det.appendChild(sm);
                var ol = el('ol');
                wk.top.forEach(function (p) {
                    var li = el('li'); li.appendChild(el('span', 'p', '#' + p.rank)); li.appendChild(av(p.username, null, 30)); li.appendChild(el('b', null, p.username));
                    li.appendChild(el('span', 's', '+' + fmt(p.prize) + ' DTC \u00b7 ' + fmt(p.score) + ' pts'));
                    li.onclick = function () { open(p.username); };
                    ol.appendChild(li);
                });
                det.appendChild(ol); hb.appendChild(det);
            });
            if (window.DrFaces) {
                var names = []; weeks.forEach(function (wk) { wk.top.forEach(function (p) { if (names.indexOf(p.username) < 0) names.push(p.username); }); });
                window.DrFaces.get(names.slice(0, 60)).then(function (faces) {
                    Array.prototype.forEach.call(hb.querySelectorAll('li'), function (li) { var n = li.querySelector('b').textContent, f = faces[n], a = li.querySelector('.drf-av'); if (f && a) li.replaceChild(av(n, f, 30), a); });
                });
            }
            try { var I = window.DraicorI18n; if (I && I._run) I._run(hb, {}); } catch (e) {}
        }, function () {});
    }
    function hookRanking() {
        var tb = document.getElementById('ranking-tbody');
        if (!tb || tb.__drp) return;
        tb.__drp = true;
        var t = 0;
        function go() { clearTimeout(t); t = setTimeout(function () { call('getRanking').then(enhanceRanking).catch(function () {}); }, 150); }
        new MutationObserver(function () { if (tb.querySelector('.rkx-u') && !tb.querySelector('.rkx-u.drp-click')) go(); }).observe(tb, { childList: true });
        if (tb.querySelector('.rkx-u')) go();
    }

    /* ---------------- chat: tocar para abrir el perfil + estrellas ---------------- */
    function chatName(row) { var nm = row && row.querySelector('.nm'); return nm && nm.firstChild ? String(nm.firstChild.textContent || '').trim() : ''; }
    function decorateChat(list) {
        Array.prototype.forEach.call(list.querySelectorAll('.drc-m:not([data-drp])'), function (row) {
            row.setAttribute('data-drp', '1');
            var n = chatName(row), f = window.DrFaces && window.DrFaces.cache[n];
            var a = row.querySelector('.drf-av'); if (a) { a.classList.add('drp-click'); a.onclick = function () { open(n); }; }
            var nm = row.querySelector('.nm'); if (nm && nm.firstChild) { var sp = el('span', 'drp-click drp-nm', n); sp.style.color = '#f4f6ff'; sp.onclick = function () { open(n); }; nm.replaceChild(sp, nm.firstChild); if (f && f.s) nm.insertBefore(starTag(f.s), sp.nextSibling); }
        });
    }
    function hookChat() {
        var list = document.querySelector('.drc-list');
        if (!list || list.__drp) return;
        list.__drp = true; css();
        decorateChat(list);
        new MutationObserver(function () { decorateChat(list); }).observe(list, { childList: true });
    }

    window.DrProfile = { open: open, close: close, enhanceRanking: enhanceRanking };
    function boot() { hookRanking(); hookChat(); }
    boot();
    setInterval(boot, 1500);
})();
