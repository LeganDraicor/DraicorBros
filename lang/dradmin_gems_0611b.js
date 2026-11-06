/* DRADMIN GEMAS v1 (Legan 06/11): el panel admin al dia con las Gemas.
   - Tesoreria: pestanas DTC / Gemas (totales, USDT que entro por Gemas, ultimos 30 dias, movimientos, dar o quitar Gemas).
   - Resumen: fila de Gemas.
   - Jugadores: Gemas compradas y de juego del jugador buscado + boton para darle o quitarle.
   Usa las funciones del admin expuestas en window.DRADM. Solo ASCII. */
(function () {
    if (window.__drAdmGems) return; window.__drAdmGems = 1;
    function ready(fn) { if (window.DRADM) fn(); else setTimeout(function () { ready(fn); }, 150); }
    ready(function () {
        var A = window.DRADM, fmtN = A.fmtN;
        function $(id) { return document.getElementById(id); }
        function mk(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
        function stat(label, id, cls, hint) {
            var d = mk('div', 'dr-stat dr-stat--sm'); d.appendChild(mk('span', 'dr-stat__label', label));
            var v = mk('span', 'dr-stat__value' + (cls ? ' ' + cls : ''), '...'); v.id = id; d.appendChild(v);
            var h = mk('span', 'dr-hint', hint || ''); h.id = id + '-h'; d.appendChild(h);
            return d;
        }
        function set(id, v) { var e = $(id); if (e) e.textContent = v; }
        function fmtDate(s) { try { var d = new Date(s); return d.toLocaleString('es-EC', { hour12: false, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); } catch (e) { return s; } }
        var TYPE = {
            'Gems Purchase': 'Compra con USDT', 'Credited Deposit': 'Deposito (en Gemas)', 'Admin Gems': 'Ajuste del admin', 'Gift Code': 'Codigo de regalo',
            'Bought with Gems': 'Compra en la tienda', 'Season Premium': 'Pase Premium', 'Season Skip': 'Saltar nivel del pase',
            'Roulette Spin': 'Ruleta', 'In-Game Roulette': 'Ruleta en el juego', 'Welcome Bonus': 'Bono de bienvenida', 'Bomb Chest': 'Cofre de bombas',
            'Referral Challenge': 'Reto de referidos', 'Royale Entry': 'Entrada a Royale', 'Kart Entry': 'Entrada a Kart', 'Royale Refund': 'Devolucion Royale', 'Kart Refund': 'Devolucion Kart'
        };
        var css = mk('style');
        css.textContent =
            '.gm-tabs{display:flex;gap:6px;padding:4px;border-radius:12px;background:var(--dr-s1);border:1px solid var(--dr-line);width:max-content;max-width:100%}' +
            '.gm-tabs button{min-height:40px;padding:0 18px;border:0;border-radius:9px;background:transparent;color:var(--dr-tx2);font:700 14px var(--dr-font);cursor:pointer}' +
            '.gm-tabs button.on{background:var(--dr-gold);color:var(--dr-ink)}.gm-tabs button.on.gm{background:linear-gradient(135deg,#7df9ff,#c77dff);color:#0b0d14}' +
            '.gm-hide{display:none!important}.gm-cyan{color:#7df9ff}.gm-purple{color:var(--dr-purple)}' +
            '.gm-banner{display:flex;align-items:center;gap:14px;padding:16px;border-radius:14px;background:linear-gradient(120deg,rgba(125,249,255,.12),rgba(199,125,255,.12));border:1px solid rgba(125,249,255,.3)}' +
            '.gm-banner b{font:400 13px var(--dr-pixel);color:#7df9ff}.gm-banner p{margin:4px 0 0;color:var(--dr-tx2);font-size:13px}' +
            '.gm-gem{flex:0 0 46px;width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;background:radial-gradient(circle at 30% 30%,#b9fbff,#5a4bff 70%);box-shadow:0 0 18px rgba(125,249,255,.35)}' +
            '.gm-list{display:grid;gap:6px}.gm-list div{display:flex;justify-content:space-between;gap:12px;padding:8px 10px;border-radius:8px;background:var(--dr-s1);font-size:13px}.gm-list span:last-child{font-variant-numeric:tabular-nums;white-space:nowrap}' +
            '.gm-chip{display:inline-flex;align-items:baseline;gap:6px}' +
            '.gm-plus{color:var(--dr-green)}.gm-minus{color:var(--dr-danger)}';
        document.head.appendChild(css);

        /* ================= TESORERIA ================= */
        var tv = $('view-treasury');
        if (tv) {
            var h1 = tv.querySelector('.dr-h1'); if (h1) h1.textContent = 'TESORERIA';
            var head = tv.querySelector('.adm-head');
            var dtcPart = []; Array.prototype.forEach.call(tv.children, function (ch) { if (ch !== head) dtcPart.push(ch); });
            var tabs = mk('div', 'gm-tabs'); var tD = mk('button', 'on', 'DTC'); var tG = mk('button', 'gm', '💎 Gemas'); tD.type = tG.type = 'button';
            tabs.appendChild(tD); tabs.appendChild(tG); head.parentNode.insertBefore(tabs, head.nextSibling);
            var gp = mk('div', 'dr-stack gm-hide'); gp.id = 'gm-panel'; tabs.parentNode.insertBefore(gp, tabs.nextSibling);
            var ban = mk('div', 'gm-banner'); ban.appendChild(mk('div', 'gm-gem', '💎'));
            var bt = mk('div'); bt.appendChild(mk('b', null, 'ECONOMIA EN GEMAS'));
            bt.appendChild(mk('p', null, 'Las Gemas se compran con USDT (1 USDT = 1,000 Gemas) o al depositar, y tambien se ganan jugando. No se retiran ni se cambian a DTC/USDT. Las compradas sirven para partidas online.'));
            ban.appendChild(bt); gp.appendChild(ban);
            var g1 = mk('div', 'adm-stats adm-stats--3');
            g1.appendChild(stat('Gemas en circulacion', 'gm-tot', 'gm-cyan', ''));
            g1.appendChild(stat('Gemas compradas (en cuentas)', 'gm-bought', 'green', ''));
            g1.appendChild(stat('Gemas de juego (en cuentas)', 'gm-game', 'gm-purple', ''));
            gp.appendChild(g1);
            var g2 = mk('div', 'adm-stats');
            g2.appendChild(stat('USDT cambiado a Gemas', 'gm-usdt', 'gold', ''));
            g2.appendChild(stat('Gemas por depositos', 'gm-dep', 'cyan', ''));
            g2.appendChild(stat('Gemas dadas por el admin', 'gm-adm', '', 'codigos aparte'));
            g2.appendChild(stat('Comision de partidas online', 'gm-onl', 'gold', ''));
            gp.appendChild(g2);
            var c30 = mk('section', 'dr-card dr-stack'); c30.appendChild(mk('h2', 'dr-h2', 'Ultimos 30 dias'));
            var g3 = mk('div', 'adm-stats adm-stats--3');
            g3.appendChild(stat('Compradas', 'gm-30b', 'green', ''));
            g3.appendChild(stat('Ganadas jugando', 'gm-30e', 'gm-purple', ''));
            g3.appendChild(stat('Gastadas', 'gm-30s', 'dr-danger', ''));
            c30.appendChild(g3); c30.appendChild(mk('h3', 'dr-h3', 'Por motivo (entra / sale)'));
            var bt30 = mk('div', 'gm-list'); bt30.id = 'gm-bytype'; c30.appendChild(bt30); gp.appendChild(c30);
            /* dar o quitar */
            var adj = mk('section', 'dr-card dr-stack'); adj.id = 'gm-adjust'; adj.appendChild(mk('h2', 'dr-h2', 'Dar o quitar Gemas a un jugador'));
            adj.appendChild(mk('p', 'dr-hint', 'Positivo da, negativo quita. Pide el codigo de tu autenticador y queda en la auditoria. "Compradas" sirven para partidas online; "de juego" son como las que se ganan jugando.'));
            var fg = mk('div', 'dr-grid adm-form-3');
            function field(lbl, inp) { var f = mk('div', 'dr-field'); var l = mk('label', 'dr-label', lbl); l.setAttribute('for', inp.id); f.appendChild(l); f.appendChild(inp); return f; }
            var iE = mk('input', 'dr-input'); iE.id = 'gm-email'; iE.type = 'email'; iE.placeholder = 'correo@del.jugador';
            var iG = mk('input', 'dr-input'); iG.id = 'gm-amount'; iG.type = 'number'; iG.placeholder = '500';
            var iK = mk('select', 'dr-input'); iK.id = 'gm-kind';
            [['bought', 'Gemas compradas (sirven online)'], ['game', 'Gemas de juego']].forEach(function (o) { var op = mk('option', null, o[1]); op.value = o[0]; iK.appendChild(op); });
            var iN = mk('input', 'dr-input'); iN.id = 'gm-note'; iN.maxLength = 120; iN.placeholder = 'Motivo (premio de sorteo, compensacion...)';
            fg.appendChild(field('Correo del jugador', iE)); fg.appendChild(field('Gemas (negativo quita)', iG)); fg.appendChild(field('Tipo', iK));
            adj.appendChild(fg); adj.appendChild(field('Nota', iN));
            var bA = mk('button', 'dr-btn', 'Aplicar'); bA.type = 'button'; adj.appendChild(bA); gp.appendChild(adj);
            /* movimientos */
            var mv = mk('section', 'dr-card adm-tcard'); mv.appendChild(mk('h2', 'dr-h2 adm-tcard__t', 'Movimientos de Gemas'));
            var wr = mk('div', 'dr-table-wrap adm-cards adm-scroll adm-scroll--lg'); var tb = mk('table', 'dr-table'); tb.style.minWidth = '640px';
            tb.innerHTML = '<thead><tr><th>Fecha</th><th>Jugador</th><th>Motivo</th><th>Gemas</th><th>Detalle</th></tr></thead>';
            var body = mk('tbody'); body.id = 'gm-mv'; tb.appendChild(body); wr.appendChild(tb); mv.appendChild(wr); gp.appendChild(mv);

            function showTab(g) {
                tD.classList.toggle('on', !g); tG.classList.toggle('on', g);
                dtcPart.forEach(function (x) { x.classList.toggle('gm-hide', g); });
                gp.classList.toggle('gm-hide', !g);
                if (g) loadGems();
            }
            tD.onclick = function () { showTab(false); }; tG.onclick = function () { showTab(true); };
            window.__gmShowTab = showTab;
            var rb = $('btn-refresh-treasury'); if (rb) rb.addEventListener('click', function () { if (!gp.classList.contains('gm-hide')) loadGems(); });

            bA.onclick = async function () {
                var email = iE.value.trim().toLowerCase(), n = Math.trunc(Number(iG.value)), kind = iK.value;
                if (!email || email.indexOf('@') < 1) return A.showToast('Escribe el correo del jugador', 'error');
                if (!Number.isFinite(n) || n === 0) return A.showToast('Escribe cuantas Gemas (negativo para quitar)', 'error');
                var kn = kind === 'game' ? ' Gemas de juego' : ' Gemas compradas';
                if (!await A.admConfirm((n > 0 ? 'DAR ' : 'QUITAR ') + fmtN(Math.abs(n)) + kn + (n > 0 ? ' a ' : ' de ') + email + '?')) return;
                var r = await A.apiCallTotp('adminGemsAdjust', { email: email, gems: n, kind: kind, note: iN.value.trim() }, 'dar o quitar Gemas');
                if (r) { A.showToast('Listo. Ahora tiene ' + fmtN(r.gems) + ' Gemas (' + fmtN(r.bought) + ' compradas, ' + fmtN(r.game) + ' de juego)'); iG.value = ''; iN.value = ''; loadGems(); }
            };
        }
        async function loadGems() {
            var d = await A.apiCall('adminGems', {});
            if (!d) return;
            var t = d.totals || {}, u = d.usdtIn || {};
            var tot = Number(t.gems) || 0, game = Number(t.game) || 0;
            set('gm-tot', fmtN(tot)); set('gm-tot-h', fmtN(t.holders) + ' jugadores con Gemas');
            set('gm-bought', fmtN(tot - game)); set('gm-bought-h', fmtN(t.buyersNow) + ' jugadores');
            set('gm-game', fmtN(game)); set('gm-game-h', 'ganadas jugando, ruletas, cofres...');
            set('gm-usdt', Number(u.swapAll || 0).toFixed(2) + ' USDT'); set('gm-usdt-h', Number(u.swap30 || 0).toFixed(2) + ' en 30 dias - ' + fmtN(u.gemsSwapAll) + ' Gemas');
            set('gm-dep', fmtN(u.gemsDepAll)); set('gm-dep-h', fmtN(u.gemsDep30) + ' en 30 dias (= ' + (Number(u.gemsDepAll || 0) / (d.gemsPerUsdt || 1000)).toFixed(2) + ' USDT)');
            set('gm-adm', fmtN(u.gemsAdminAll));
            var on = d.online || {}; set('gm-onl', fmtN(on.all) + ' Gemas'); set('gm-onl-h', fmtN(on.d30) + ' en 30 dias (= ' + (Number(on.all || 0) / (d.gemsPerUsdt || 1000)).toFixed(2) + ' USDT) - Royale ' + fmtN(on.royale) + ' / Kart ' + fmtN(on.kart));
            var k = (d.last30 && d.last30.kpi) || {};
            set('gm-30b', fmtN(k.bought)); set('gm-30b-h', fmtN(k.buyers) + ' compradores');
            set('gm-30e', fmtN(k.earned)); set('gm-30e-h', fmtN(k.players) + ' jugadores');
            set('gm-30s', fmtN(k.spent));
            var bt = $('gm-bytype'); if (bt) { bt.textContent = ''; var L = (d.last30 && d.last30.byType) || []; if (!L.length) bt.appendChild(mk('div', null, 'Sin movimientos en 30 dias'));
                L.forEach(function (x) { var r = mk('div'); r.appendChild(mk('span', null, (TYPE[x.type] || x.type) + ' (' + fmtN(x.count) + ')')); var v = mk('span'); var a = mk('span', 'gm-plus', '+' + fmtN(x.gemsIn)); var b = mk('span', 'gm-minus', '  -' + fmtN(x.gemsOut)); v.appendChild(a); v.appendChild(b); r.appendChild(v); bt.appendChild(r); }); }
            var body = $('gm-mv'); if (body) { body.textContent = ''; var M = d.movements || [];
                if (!M.length) { var tr0 = mk('tr'); var td0 = mk('td', null, 'Sin movimientos'); td0.colSpan = 5; tr0.appendChild(td0); body.appendChild(tr0); }
                M.forEach(function (m) {
                    var tr = mk('tr'), g = Number(m.montogemas) || 0;
                    [[fmtDate(m.fecha), 'adm-nowrap', 'Fecha'], [m.email, 'adm-break', 'Jugador'], [TYPE[m.tipo] || m.tipo, '', 'Motivo'], [(g > 0 ? '+' : '') + fmtN(g), (g >= 0 ? 'dr-green' : 'dr-danger') + ' dr-num', 'Gemas'], [m.detalles || '', 'adm-break', 'Detalle']]
                        .forEach(function (c) { var td = mk('td', c[1], c[0]); td.setAttribute('data-label', c[2]); tr.appendChild(td); });
                    body.appendChild(tr);
                }); }
            return d;
        }

        /* ================= RESUMEN ================= */
        var dv = $('view-dashboard');
        if (dv) {
            var row = mk('div', 'adm-stats'); row.id = 'gm-dash';
            row.appendChild(stat('💎 Gemas en circulacion', 'gmd-tot', 'gm-cyan', ''));
            row.appendChild(stat('Gemas compradas', 'gmd-b', 'green', ''));
            row.appendChild(stat('Gemas de juego', 'gmd-g', 'gm-purple', ''));
            row.appendChild(stat('USDT cambiado a Gemas', 'gmd-u', 'gold', ''));
            var firstStats = dv.querySelector('.adm-stats');
            if (firstStats) firstStats.parentNode.insertBefore(row, firstStats.nextSibling); else dv.appendChild(row);
            row.style.cursor = 'pointer'; row.title = 'Ver Gemas en Tesoreria';
            row.addEventListener('click', function () { A.switchView('view-treasury'); setTimeout(function () { window.__gmShowTab && window.__gmShowTab(true); }, 50); });
        }
        async function loadDash() {
            var d = await A.apiCall('adminGems', {}, true); if (!d) return;
            var t = d.totals || {}, u = d.usdtIn || {}, tot = Number(t.gems) || 0, game = Number(t.game) || 0;
            set('gmd-tot', fmtN(tot)); set('gmd-tot-h', fmtN(t.holders) + ' jugadores');
            set('gmd-b', fmtN(tot - game)); set('gmd-g', fmtN(game));
            set('gmd-u', Number(u.swapAll || 0).toFixed(2)); set('gmd-u-h', '+ ' + fmtN(u.gemsDepAll) + ' Gemas por depositos');
        }

        /* ================= JUGADORES ================= */
        document.addEventListener('dradm:player', function (ev) {
            var p = ev.detail || {}; var u = $('res-usdt'); if (!u) return;
            var chipRow = u.closest('.dr-row'); if (!chipRow) return;
            var gx = $('gm-res-chips'); if (!gx) { gx = mk('span', 'gm-chip'); gx.id = 'gm-res-chips'; chipRow.appendChild(gx); }
            gx.textContent = '';
            var g = Number(p.gemas || 0), gj = Math.min(g, Number(p.gemas_juego || 0));
            var c1 = mk('span', 'dr-chip'); c1.appendChild(mk('span', 'green', fmtN(g - gj))); c1.appendChild(mk('small', null, 'Gemas compradas'));
            var c2 = mk('span', 'dr-chip'); c2.appendChild(mk('span', 'gm-purple', fmtN(gj))); c2.appendChild(mk('small', null, 'Gemas de juego'));
            var b = mk('button', 'dr-btn dr-btn--ghost dr-btn--sm', '💎 Dar / quitar'); b.type = 'button';
            b.onclick = function () { A.switchView('view-treasury'); setTimeout(function () { window.__gmShowTab && window.__gmShowTab(true); var e = $('gm-email'); if (e) { e.value = p.email || ''; var a = $('gm-adjust'); a && a.scrollIntoView({ block: 'center' }); $('gm-amount').focus(); } }, 80); };
            gx.appendChild(c1); gx.appendChild(c2); gx.appendChild(b);
        });

        /* cargar cuando se abre cada vista */
        function watch(id, fn) { var v = $(id); if (!v) return; var was = v.classList.contains('hidden');
            try { new MutationObserver(function () { var h = v.classList.contains('hidden'); if (was && !h) fn(); was = h; }).observe(v, { attributes: true, attributeFilter: ['class'] }); } catch (e) {}
            if (!was) fn(); }
        watch('view-dashboard', loadDash);
        watch('view-treasury', function () { if (window.__gmShowTab && $('gm-panel') && !$('gm-panel').classList.contains('gm-hide')) loadGems(); });
    });
})();
