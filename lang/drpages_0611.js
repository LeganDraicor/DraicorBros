/* DRPAGES v1 (Legan 06/11): redisenio de Anuncios (PTC), Cofre misterioso y Misiones + animacion nueva del cofre.
   Solo CSS y adornos; la logica de cada pagina no cambia. Solo ASCII. */
(function () {
    if (window.__drPages) return; window.__drPages = 1;
    var root = document.querySelector('.ptc-root, .fc-root, .tk-root');
    var path = location.pathname;
    if (!/\/p\/(pay-to-click|faucet|tasks)\.html/.test(path)) return;
    function coin() { return (window.DR_ICO && window.DR_ICO.coin) || ''; }
    var C =
        /* comun */
        '.ptc-root,.fc-root,.tk-root{background:radial-gradient(900px 420px at 15% -5%,rgba(255,210,77,.08),transparent 60%),radial-gradient(900px 420px at 85% 0%,rgba(0,229,255,.07),transparent 60%)}' +
        '.ptc-root .dr-h1,.fc-root .dr-h1,.tk-root .dr-h1{position:relative;display:inline-block;color:#ffd24d!important;text-shadow:0 3px 0 #000,0 0 18px rgba(255,210,77,.45);padding-bottom:10px}' +
        '.ptc-root .dr-h1::after,.fc-root .dr-h1::after,.tk-root .dr-h1::after{content:"";position:absolute;left:0;bottom:0;width:100%;height:4px;border-radius:4px;background:linear-gradient(90deg,#ffd24d,#ff3df2 50%,#00e5ff);box-shadow:0 0 12px rgba(255,61,242,.5)}' +
        '.drp2-coin{display:inline-flex;width:18px;height:18px;vertical-align:-3px;margin-right:6px}.drp2-coin svg{width:18px;height:18px}' +
        '@keyframes drp2Shine{0%{transform:translateX(-120%) skewX(-20deg)}60%,100%{transform:translateX(320%) skewX(-20deg)}}' +
        '.drp2-btn{position:relative;overflow:hidden;background:linear-gradient(180deg,#ffe066,#f8b800 55%,#e09a00)!important;color:#1a1200!important;border:0!important;box-shadow:0 4px 0 #a86f00,0 8px 18px rgba(248,184,0,.25)!important;font-weight:800!important;letter-spacing:.02em;transition:transform .1s,box-shadow .1s}' +
        '.drp2-btn:not(:disabled):hover{transform:translateY(-1px);box-shadow:0 5px 0 #a86f00,0 10px 24px rgba(248,184,0,.38)!important}.drp2-btn:not(:disabled):active{transform:translateY(3px);box-shadow:0 1px 0 #a86f00!important}' +
        '.drp2-btn::after{content:"";position:absolute;top:0;left:0;width:35%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);animation:drp2Shine 3.2s ease-in-out infinite;pointer-events:none}' +
        '.drp2-btn:disabled{filter:grayscale(.85) brightness(.7);box-shadow:none!important}.drp2-btn:disabled::after{display:none}' +
        /* tarjetas */
        '.ptc-root .ptc-ad,.tk-root .mission-card{position:relative;overflow:hidden;background:linear-gradient(160deg,#1a2033 0%,#121625 55%,#0f121c 100%)!important;border:1px solid #2a3150!important;border-radius:16px!important;transition:transform .15s,border-color .15s,box-shadow .15s}' +
        '.ptc-root .ptc-ad:hover,.tk-root .mission-card:hover{transform:translateY(-3px);border-color:rgba(255,210,77,.55)!important;box-shadow:0 12px 28px rgba(0,0,0,.45),0 0 0 1px rgba(255,210,77,.15)}' +
        '.ptc-root .ptc-ad::before,.tk-root .mission-card::before{content:"";position:absolute;left:0;top:0;right:0;height:3px;background:linear-gradient(90deg,var(--drp2-a,#00e5ff),transparent)}' +
        '.ptc-root .reward-tag,.tk-root .reward-badge{display:inline-flex;align-items:center;padding:4px 10px 4px 6px;border-radius:999px;background:rgba(255,210,77,.12);border:1px solid rgba(255,210,77,.4);color:#ffd24d!important;font-weight:800;text-shadow:0 0 10px rgba(255,210,77,.4)}' +
        '.ptc-root .card-title,.tk-root .mission-title{color:#f4f6ff}' +
        /* PTC */
        '.ptc-root .ptc-sec,.tk-root .tk-sec{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:linear-gradient(90deg,rgba(0,229,255,.12),transparent);border-left:3px solid #00e5ff}' +
        '.ptc-root .ptc-ad .dr-badge--cyan{background:rgba(0,229,255,.12)!important;border:1px solid rgba(0,229,255,.35)!important}' +
        '.ptc-root .ptc-ad .watch-btn .drp2-play{display:inline-flex;width:16px;height:16px;margin-right:6px;vertical-align:-2px}' +
        '.ptc-root .ptc-ad.drp2-seen{opacity:.55}.ptc-root .ptc-ad.drp2-seen::after{content:"\\2713";position:absolute;right:12px;bottom:58px;font-size:42px;color:#2ee6a6;text-shadow:0 0 14px rgba(46,230,166,.6)}' +
        /* Misiones */
        '.tk-root .tk-icon{display:inline-flex;align-items:center;justify-content:center;width:52px!important;height:52px!important;border-radius:14px!important;font-size:28px!important;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.18),rgba(255,255,255,.03))!important;border:1px solid #2a3150;box-shadow:inset 0 0 12px rgba(0,0,0,.4),0 0 18px rgba(0,229,255,.12)}' +
        '.tk-root .tk-sec--green{border-left-color:#2ee6a6;background:linear-gradient(90deg,rgba(46,230,166,.13),transparent)}.tk-root .tk-sec--red{border-left-color:#ff5a6e;background:linear-gradient(90deg,rgba(255,90,110,.13),transparent)}.tk-root .tk-sec--purple{border-left-color:#c77dff;background:linear-gradient(90deg,rgba(199,125,255,.13),transparent)}' +
        '.tk-root .tk-sec::before,.ptc-root .ptc-sec::before{display:none!important}' +
        '.tk-root .tk-state{font-weight:700}.tk-root .mission-card.drp2-big{--drp2-a:#ffd24d;border-color:rgba(255,210,77,.45)!important;box-shadow:0 0 0 1px rgba(255,210,77,.12),0 0 26px rgba(255,210,77,.12)}' +
        '.tk-root .mission-card.drp2-big .reward-badge{font-size:18px;background:linear-gradient(90deg,rgba(255,210,77,.25),rgba(255,61,242,.18))}' +
        /* Cofre */
        '@keyframes drp2Spin{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes drp2Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes drp2Pulse{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(1)}50%{opacity:.9;transform:translate(-50%,-50%) scale(1.08)}}' +
        '.fc-root .fc-card{position:relative;overflow:hidden;background:radial-gradient(420px 260px at 50% 32%,rgba(255,210,77,.16),transparent 70%),linear-gradient(180deg,#151a2a,#0e111b)!important;border:1px solid #2a3150!important;border-radius:20px!important;box-shadow:0 20px 50px rgba(0,0,0,.5)}' +
        '.fc-root .fc-art{position:relative;min-height:230px;align-items:center}' +
        '.fc-root .drp2-rays{position:absolute;left:50%;top:50%;width:420px;height:420px;transform:translate(-50%,-50%);border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,210,77,.22) 0deg 9deg,transparent 9deg 24deg);-webkit-mask:radial-gradient(circle,#000 18%,transparent 66%);mask:radial-gradient(circle,#000 18%,transparent 66%);animation:drp2Spin 16s linear infinite;pointer-events:none}' +
        '.fc-root .drp2-halo{position:absolute;left:50%;top:50%;width:230px;height:230px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,210,77,.45),rgba(255,61,242,.12) 45%,transparent 70%);animation:drp2Pulse 2.4s ease-in-out infinite;pointer-events:none}' +
        '.fc-root .chest-icon{position:relative;z-index:1;animation:drp2Bob 2.6s ease-in-out infinite}.fc-root .chest-icon.is-locked{animation:none}.fc-root .fc-art.drp2-locked .drp2-rays,.fc-root .fc-art.drp2-locked .drp2-halo{display:none}' +
        '.fc-root .fc-svg{width:230px!important}' +
        '.fc-root .chest-reward{display:inline-flex!important;align-items:center;justify-content:center;gap:4px;background:linear-gradient(90deg,rgba(255,210,77,.16),rgba(255,61,242,.10))!important;border:1px solid rgba(255,210,77,.45)!important;border-radius:999px!important;padding:10px 20px!important;text-shadow:0 0 12px rgba(255,210,77,.45)}' +
        '.fc-root .fc-open{min-height:68px;font-size:22px!important}' +
        '.fc-root .dr-bar{height:12px!important;border-radius:999px!important;background:#0b0d14!important;border:1px solid #2a3150;overflow:hidden}.fc-root .dr-bar>.progress-bar{background:linear-gradient(90deg,#2ee6a6,#00e5ff,#c77dff)!important;box-shadow:0 0 12px rgba(0,229,255,.5)}' +
        '.fc-root .drp2-spark{position:absolute;width:6px;height:6px;background:#ffe680;box-shadow:0 0 8px #ffd24d;pointer-events:none;animation:drp2Up 2.4s linear infinite}@keyframes drp2Up{0%{transform:translateY(40px) scale(.6);opacity:0}20%{opacity:1}100%{transform:translateY(-140px) scale(1);opacity:0}}';
    var st = document.createElement('style'); st.id = 'drp2-css'; st.textContent = C; (document.head || document.documentElement).appendChild(st);

    function addCoin(el) { if (!el || el.querySelector('.drp2-coin') || !coin()) return; var s = document.createElement('span'); s.className = 'drp2-coin'; s.innerHTML = coin(); el.insertBefore(s, el.firstChild); }
    function decorate() {
        Array.prototype.forEach.call(document.querySelectorAll('.ptc-root .watch-btn, .tk-root .mission-btn, .fc-root .fc-open'), function (b) { b.classList.add('drp2-btn'); });
        Array.prototype.forEach.call(document.querySelectorAll('.ptc-root .reward-tag, .tk-root .reward-badge'), addCoin);
        Array.prototype.forEach.call(document.querySelectorAll('.ptc-root .ptc-ad'), function (c) { var b = c.querySelector('.watch-btn'); c.classList.toggle('drp2-seen', !!(b && b.disabled)); });
        Array.prototype.forEach.call(document.querySelectorAll('.tk-root .mission-card'), function (c) {
            var r = c.querySelector('.reward-badge'), n = r ? Number(String(r.textContent).replace(/[^0-9]/g, '')) : 0;
            c.classList.toggle('drp2-big', n >= 5000);
        });
        var art = document.querySelector('.fc-root .fc-art'), icon = document.getElementById('chest-icon');
        if (art && !art.querySelector('.drp2-rays')) {
            var r1 = document.createElement('div'); r1.className = 'drp2-rays'; var r2 = document.createElement('div'); r2.className = 'drp2-halo';
            art.insertBefore(r2, art.firstChild); art.insertBefore(r1, art.firstChild);
            for (var i = 0; i < 9; i++) { var s = document.createElement('span'); s.className = 'drp2-spark'; s.style.left = (30 + Math.random() * 40) + '%'; s.style.top = (45 + Math.random() * 30) + '%'; s.style.animationDelay = (Math.random() * 2.4).toFixed(2) + 's'; art.appendChild(s); }
        }
        if (art && icon) art.classList.toggle('drp2-locked', icon.classList.contains('is-locked'));
    }
    var pend = 0;
    function later() { if (pend) return; pend = setTimeout(function () { pend = 0; decorate(); }, 120); }
    function boot() { decorate(); var r = document.querySelector('.ptc-root, .fc-root, .tk-root'); if (r && !r.__drp2) { r.__drp2 = 1; new MutationObserver(later).observe(r, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'disabled'] }); } }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    setTimeout(boot, 1500);

    /* ============ COFRE: animacion nueva (reemplaza la del cofre, misma interfaz) ============ */
    if (!/\/p\/faucet\.html/.test(path)) return;
    var FX = (function () {
        var S = null, AC = null;
        function au() { try { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); return AC; } catch (e) { return null; } }
        function tone(f, d, type, vol, slide) {
            if (!S || S.mute) return; var a = au(); if (!a) return;
            try { var o = a.createOscillator(), g = a.createGain(), t = a.currentTime; o.type = type || 'square'; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
                g.gain.setValueAtTime(vol || .08, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + .02); } catch (e) {}
        }
        function noise(d, vol) {
            if (!S || S.mute) return; var a = au(); if (!a) return;
            try { var n = Math.floor(a.sampleRate * d), b = a.createBuffer(1, n, a.sampleRate), ch = b.getChannelData(0); for (var i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n);
                var s = a.createBufferSource(), g = a.createGain(); s.buffer = b; g.gain.value = vol || .2; s.connect(g); g.connect(a.destination); s.start(); } catch (e) {}
        }
        var PAL = { o: '#0b0d14', b1: '#2f5fb3', b2: '#10213f', g1: '#f8b800', g2: '#ffe066', hl: 'rgba(255,255,255,.28)' };
        function rnd(a, b) { return a + Math.random() * (b - a); }
        function prize(o) {
            S = { W: o.W, H: o.H, k: o.k || 1, dpr: o.dpr || 1, title: o.title || 'MYSTERY CHEST!', note: o.note || '', items: (o.items || []).map(function (it) { var x = { id: it.id, name: it.name, img: null }; if (it.img) { var im = new Image(); im.src = it.img; x.img = im; } return x; }),
                  mute: !!o.mute, t: 0, phase: 0, burst: false, parts: [], ring: 0, flash: 0, shake: 0, lid: 0, done: false, skipAt: 4.3, stars: [] };
            for (var i = 0; i < 90; i++) S.stars.push({ x: Math.random(), y: Math.random(), s: rnd(.5, 2), p: Math.random() * 6 });
            tone(110, .5, 'sawtooth', .05, 70);
        }
        function spawn(n, cx, cy, sp) {
            var cols = ['#ffd24d', '#ffe680', '#ff3df2', '#00e5ff', '#2ee6a6', '#ffffff'];
            for (var i = 0; i < n; i++) { var a = rnd(-Math.PI * .95, -Math.PI * .05), v = rnd(.35, 1) * sp; S.parts.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: rnd(1.4, 2.6), t: 0, c: cols[i % cols.length], s: rnd(3, 7), coin: Math.random() < .35, rot: rnd(0, 6) }); }
        }
        function update(dt) {
            if (!S) return; dt = Math.min(.05, dt); S.t += dt; var t = S.t, k = S.k;
            var cx = S.W / 2, cy = S.H * .58;
            if (t < .7) S.phase = 0; else if (t < 2.1) S.phase = 1; else S.phase = 2;
            if (S.phase === 1) { S.shake = (t - .7) / 1.4 * 7 * k; if (Math.random() < dt * 9) tone(rnd(300, 520), .06, 'square', .03); }
            else S.shake = Math.max(0, S.shake - dt * 30);
            if (S.phase === 2 && !S.burst) { S.burst = true; S.flash = 1; S.ring = 0; spawn(160, cx, cy - 30 * k, 900 * k); noise(.5, .25); tone(196, .7, 'square', .09, 784); setTimeout(function () { tone(523, .18, 'square', .07); }, 120); setTimeout(function () { tone(659, .18, 'square', .07); }, 240); setTimeout(function () { tone(1046, .35, 'square', .07); }, 360); }
            if (S.burst) { S.lid = Math.min(1, S.lid + dt * 5); S.ring += dt * 900 * k; S.flash = Math.max(0, S.flash - dt * 2.2); if (t < 3.4 && Math.random() < dt * 30) spawn(3, cx, cy - 30 * k, 600 * k); }
            for (var i = S.parts.length - 1; i >= 0; i--) { var p = S.parts[i]; p.t += dt; p.vy += 1100 * k * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += dt * 8; if (p.t > p.life) S.parts.splice(i, 1); }
            if (t > 9 && !S.done) S.done = true;
        }
        function chest(c, x, y, s, lid) {
            function r(px, py, w, h, col) { c.fillStyle = col; c.fillRect(x + px * s, y + py * s, w * s, h * s); }
            r(-56, 40, 112, 8, 'rgba(0,0,0,.35)');
            r(-56, -4, 112, 46, PAL.o); r(-52, 0, 104, 38, PAL.b1); r(-52, 26, 104, 4, PAL.b2); r(-52, 0, 104, 3, PAL.hl);
            r(-40, -4, 8, 46, PAL.o); r(32, -4, 8, 46, PAL.o); r(-38, -2, 4, 42, PAL.g1); r(34, -2, 4, 42, PAL.g1);
            r(-10, 0, 20, 16, PAL.o); r(-8, 2, 16, 12, PAL.g1); r(-2, 5, 4, 6, PAL.o);
            c.save(); c.translate(x, y - 4 * s); c.rotate(-lid * 1.9); c.translate(-x, -(y - 4 * s));
            r(-56, -34, 112, 32, PAL.o); r(-52, -30, 104, 26, PAL.b1); r(-52, -30, 104, 4, PAL.hl); r(-52, -10, 104, 4, PAL.b2);
            r(-40, -34, 8, 32, PAL.o); r(32, -34, 8, 32, PAL.o); r(-38, -32, 4, 28, PAL.g1); r(34, -32, 4, 28, PAL.g1);
            c.restore();
        }
        function draw(c) {
            if (!S) return; var W = S.W, H = S.H, k = S.k, t = S.t, d = S.dpr;
            c.setTransform(d, 0, 0, d, 0, 0);
            var g = c.createRadialGradient(W / 2, H * .55, 10, W / 2, H * .55, Math.max(W, H) * .8); g.addColorStop(0, '#1b1440'); g.addColorStop(.6, '#090b18'); g.addColorStop(1, '#030409'); c.fillStyle = g; c.fillRect(0, 0, W, H);
            S.stars.forEach(function (s) { c.globalAlpha = .35 + .35 * Math.sin(t * 2 + s.p); c.fillStyle = '#fff'; c.fillRect(s.x * W, s.y * H, s.s, s.s); }); c.globalAlpha = 1;
            var cx = W / 2, cy = H * .58, sc = 2.2 * k;
            /* rayos */
            var ra = S.phase === 0 ? 0 : S.phase === 1 ? (t - .7) / 1.4 * .5 : .9;
            if (ra > 0) { c.save(); c.translate(cx, cy - 20 * k); c.rotate(t * .4); for (var i = 0; i < 16; i++) { c.rotate(Math.PI * 2 / 16); c.fillStyle = i % 2 ? 'rgba(255,210,77,' + (.16 * ra) + ')' : 'rgba(255,61,242,' + (.10 * ra) + ')'; c.beginPath(); c.moveTo(0, 0); c.lineTo(-40 * k, -Math.max(W, H)); c.lineTo(40 * k, -Math.max(W, H)); c.closePath(); c.fill(); } c.restore();
                var hg = c.createRadialGradient(cx, cy - 20 * k, 0, cx, cy - 20 * k, 220 * k); hg.addColorStop(0, 'rgba(255,230,128,' + (.55 * ra) + ')'); hg.addColorStop(1, 'rgba(255,230,128,0)'); c.fillStyle = hg; c.fillRect(0, 0, W, H); }
            /* cofre que cae */
            var dropY = S.phase === 0 ? (function () { var p = Math.min(1, t / .55); var e = 1 - Math.pow(1 - p, 3); var b = t > .55 ? Math.sin((t - .55) * 18) * Math.exp(-(t - .55) * 9) * 14 * k : 0; return -H * .7 * (1 - e) - b; })() : 0;
            var sx = (Math.random() - .5) * S.shake, sy = (Math.random() - .5) * S.shake;
            if (S.phase >= 1 && !S.burst) { c.save(); c.globalAlpha = .4 + .4 * Math.sin(t * 20); c.fillStyle = '#ffe680'; c.fillRect(cx - 3 * sc + sx, cy + 1 * sc + sy, 6 * sc, 16 * sc); c.restore(); }
            chest(c, cx + sx, cy + dropY + sy, sc, S.lid);
            /* onda */
            if (S.burst && S.ring < Math.max(W, H)) { c.strokeStyle = 'rgba(255,255,255,' + Math.max(0, 1 - S.ring / (400 * k)) + ')'; c.lineWidth = 6 * k; c.beginPath(); c.arc(cx, cy - 20 * k, S.ring, 0, Math.PI * 2); c.stroke(); }
            /* particulas */
            S.parts.forEach(function (p) { var a = Math.max(0, 1 - p.t / p.life); c.globalAlpha = a; if (p.coin) { c.save(); c.translate(p.x, p.y); c.scale(Math.abs(Math.cos(p.rot)) + .15, 1); c.fillStyle = '#b07800'; c.beginPath(); c.arc(0, 0, p.s * 1.5 * k, 0, 7); c.fill(); c.fillStyle = '#ffd24d'; c.beginPath(); c.arc(0, 0, p.s * 1.15 * k, 0, 7); c.fill(); c.restore(); } else { c.fillStyle = p.c; c.fillRect(p.x, p.y, p.s * k, p.s * k); } }); c.globalAlpha = 1;
            /* titulo */
            c.textAlign = 'center'; c.textBaseline = 'middle';
            var fs = Math.round(26 * k), ty = H * .13; c.font = fs + 'px "Press Start 2P", monospace';
            var tg = c.createLinearGradient(0, ty - fs, 0, ty + fs); tg.addColorStop(0, '#fff3b0'); tg.addColorStop(1, '#ffb000');
            c.fillStyle = '#000'; c.fillText(S.title, cx + 3, ty + 4); c.fillStyle = tg; c.fillText(S.title, cx, ty + Math.sin(t * 3) * 3);
            /* premios */
            if (S.burst) {
                var since = t - 2.1, n = S.items.length;
                S.items.forEach(function (it, i) {
                    var st0 = .25 + i * .55, p = Math.max(0, Math.min(1, (since - st0) / .45)); if (p <= 0) return;
                    var e = 1 - Math.pow(1 - p, 3), x = cx + (i - (n - 1) / 2) * 230 * k, y = cy - 70 * k - e * 120 * k + Math.sin(t * 2.4 + i) * 4 * k;
                    c.globalAlpha = Math.min(1, p * 1.4);
                    var gl = c.createRadialGradient(x, y, 0, x, y, 80 * k); gl.addColorStop(0, it.id === 'DTC' ? 'rgba(255,210,77,.55)' : 'rgba(46,230,166,.55)'); gl.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = gl; c.fillRect(x - 90 * k, y - 90 * k, 180 * k, 180 * k);
                    if (it.id === 'DTC') { c.fillStyle = '#7a5200'; c.beginPath(); c.arc(x, y, 34 * k, 0, 7); c.fill(); c.fillStyle = '#ffd24d'; c.beginPath(); c.arc(x, y, 29 * k, 0, 7); c.fill(); c.fillStyle = '#b07800'; c.font = Math.round(24 * k) + 'px "Press Start 2P", monospace'; c.fillText('D', x + 1, y + 2); }
                    else if (it.img && it.img.complete && it.img.naturalWidth) { var s2 = 64 * k; c.imageSmoothingEnabled = false; c.drawImage(it.img, x - s2 / 2, y - s2 / 2, s2, s2); }
                    else { c.fillStyle = '#2ee6a6'; c.fillRect(x - 14 * k, y - 22 * k, 28 * k, 40 * k); }
                    var lbl = it.name; if (it.id === 'DTC') { var m = String(it.name).match(/[\d,]+/); var v = m ? Number(m[0].replace(/,/g, '')) : 0; lbl = '+' + Math.round(v * Math.min(1, (since - st0) / 1.1)).toLocaleString('en-US') + ' DTC'; }
                    c.font = Math.round(16 * k) + 'px "Press Start 2P", monospace'; c.fillStyle = '#000'; c.fillText(lbl, x + 2, y + 62 * k + 2); c.fillStyle = it.id === 'DTC' ? '#ffe066' : '#7dffcf'; c.fillText(lbl, x, y + 62 * k);
                    c.globalAlpha = 1;
                });
                if (S.note && since > 1.2) { c.font = Math.round(12 * k) + 'px "Press Start 2P", monospace'; c.fillStyle = '#ff9df5'; c.globalAlpha = Math.min(1, since - 1.2); c.fillText(S.note, cx, H * .82); c.globalAlpha = 1; }
                if (since > 2.2) { c.globalAlpha = .5 + .5 * Math.sin(t * 5); c.font = Math.round(10 * k) + 'px "Press Start 2P", monospace'; c.fillStyle = '#b8c0dc'; c.fillText('TAP TO CONTINUE', cx, H * .92); c.globalAlpha = 1; }
            }
            if (S.flash > 0) { c.fillStyle = 'rgba(255,255,240,' + S.flash + ')'; c.fillRect(0, 0, W, H); }
        }
        return {
            prize: prize, prizeUpdate: update, prizeDraw: draw,
            prizeDone: function () { return !S || S.done; },
            prizeSkip: function () { if (!S) return; if (!S.burst) { S.t = 2.1; return; } if (S.t > S.skipAt) S.done = true; },
            prizeFinish: function () { S = null; }
        };
    })();
    function hook() {
        var f = window.BossFXFaucet; if (!f) return false;
        if (f.__drp2) return true;
        f.prize = FX.prize; f.prizeUpdate = FX.prizeUpdate; f.prizeDraw = FX.prizeDraw; f.prizeDone = FX.prizeDone; f.prizeSkip = FX.prizeSkip; f.prizeFinish = FX.prizeFinish; f.__drp2 = 1;
        return true;
    }
    if (!hook()) { var tries = 0, iv = setInterval(function () { if (hook() || ++tries > 40) clearInterval(iv); }, 250); }
    window.DrChestFXTest = function (pot) {   /* para probar: DrChestFXTest(true) */
        var m = document.getElementById('prize-modal'), cv = document.getElementById('prize-canvas'); if (!m || !cv) return;
        var W = innerWidth, H = innerHeight, d = Math.min(2, devicePixelRatio || 1); cv.width = W * d; cv.height = H * d; m.style.display = 'block';
        FX.prize({ W: W, H: H, k: Math.max(.8, Math.min(1.4, W / 960)), dpr: d, items: [{ id: 'DTC', name: '250 DTC' }].concat(pot ? [{ id: 'POTION_01', name: 'Potion' }] : []), note: pot ? 'LUCKY! A POTION WAS HIDDEN INSIDE' : '', mute: true });
        var last = 0, ctx = cv.getContext('2d');
        function fr(ts) { var dt = last ? (ts - last) / 1000 : .016; last = ts; FX.prizeUpdate(dt); FX.prizeDraw(ctx); if (FX.prizeDone()) { m.style.display = 'none'; FX.prizeFinish(); return; } requestAnimationFrame(fr); }
        m.onpointerdown = function () { FX.prizeSkip(); }; requestAnimationFrame(fr);
    };
})();
