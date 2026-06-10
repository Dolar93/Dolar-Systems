/**
 * Dolar-Systems WaaS — Widget Chatbot
 * Mock UI (bez prawdziwego API). Konfiguracja przez window.ChatbotConfig.
 *
 * PODPIĘCIE PRAWDZIWEGO API:
 * W funkcji sendMessage() znajdź komentarz "// TUTAJ PRAWDZIWE API"
 * i zamień setTimout z mockową odpowiedzią na fetch do Anthropic API:
 *
 *   const resp = await fetch('https://api.anthropic.com/v1/messages', {
 *     method: 'POST',
 *     headers: {
 *       'x-api-key': 'sk-ant-TWÓJ_KLUCZ',
 *       'anthropic-version': '2023-06-01',
 *       'content-type': 'application/json',
 *       'anthropic-dangerous-request-options': 'allow-browser',
 *     },
 *     body: JSON.stringify({
 *       model: 'claude-sonnet-4-6',
 *       max_tokens: 512,
 *       system: window.ChatbotConfig.systemPrompt || 'Jesteś pomocnym asystentem.',
 *       messages: history,
 *     }),
 *   });
 *   const data = await resp.json();
 *   const reply = data.content?.[0]?.text ?? '...';
 */
(function () {
  'use strict';

  /* ── Domyślna konfiguracja — nadpisz przez window.ChatbotConfig ── */
  const cfg = Object.assign({
    botName:        'Asystent AI',
    welcomeMessage: 'Dzień dobry! Jak mogę Ci pomóc?',
    quickReplies: [
      { label: 'Umów wizytę',       response: 'Możesz umówić wizytę przez nasz kalendarz online. Jaki termin Ci odpowiada?' },
      { label: 'Godziny otwarcia',  response: 'Pracujemy pn–pt 8:00–20:00, sob 9:00–15:00.' },
      { label: 'Cennik',            response: 'Szczegółowy cennik znajdziesz na stronie. Masz pytanie o konkretną usługę?' },
    ],
    defaultResponse: 'Dziękuję! Przekażę to do naszego zespołu. Jak jeszcze mogę pomóc?',
    primaryColor:    '#1B6B4A',
    primaryLight:    'rgba(27,107,74,0.12)',
    buttonLabel:     '💬 Czat 24/7',
    avatar:          '🤖',
    systemPrompt:    'Jesteś pomocnym asystentem firmowym.',
  }, window.ChatbotConfig || {});

  /* ── Wstrzyknięcie CSS ── */
  const s = document.createElement('style');
  s.textContent = `
  #ds-root{position:fixed;bottom:24px;right:24px;z-index:999999;display:flex;flex-direction:column;align-items:flex-end;gap:12px;font-family:inherit;}

  /* Przycisk bańki */
  #ds-btn{background:${cfg.primaryColor};color:#fff;border:none;border-radius:28px;padding:0 20px;height:52px;font-size:14px;font-weight:700;letter-spacing:.02em;cursor:pointer;display:flex;align-items:center;gap:9px;box-shadow:0 4px 24px ${cfg.primaryColor}66;transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .2s;outline:none;}
  #ds-btn:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 8px 32px ${cfg.primaryColor}88;}
  .ds-live{width:8px;height:8px;background:#4ade80;border-radius:50%;animation:ds-live 2s infinite;}
  @keyframes ds-live{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(1.4);}}

  /* Panel czatu */
  #ds-panel{width:340px;max-height:500px;background:#fff;border-radius:20px;box-shadow:0 20px 70px rgba(0,0,0,.22),0 2px 8px rgba(0,0,0,.06);display:flex;flex-direction:column;overflow:hidden;transform-origin:bottom right;transform:scale(.85) translateY(12px);opacity:0;pointer-events:none;transition:transform .32s cubic-bezier(.34,1.56,.64,1),opacity .22s;}
  #ds-panel.ds-open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}

  /* Nagłówek */
  #ds-hdr{background:${cfg.primaryColor};padding:15px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
  #ds-hdr-info{display:flex;align-items:center;gap:11px;}
  #ds-av{width:38px;height:38px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
  .ds-name{font-weight:700;font-size:14.5px;color:#fff;}
  .ds-status{font-size:11px;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:4px;margin-top:1px;}
  .ds-sdot{width:6px;height:6px;background:#4ade80;border-radius:50%;}
  #ds-close{background:rgba(255,255,255,.15);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:background .15s;}
  #ds-close:hover{background:rgba(255,255,255,.3);}

  /* Wiadomości */
  #ds-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth;}
  #ds-msgs::-webkit-scrollbar{width:3px;}
  #ds-msgs::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:2px;}
  .ds-row{display:flex;gap:7px;align-items:flex-end;animation:ds-in .22s ease forwards;}
  @keyframes ds-in{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}
  .ds-row.ds-bot{align-self:flex-start;max-width:88%;}
  .ds-row.ds-user{flex-direction:row-reverse;align-self:flex-end;max-width:88%;}
  .ds-mav{width:26px;height:26px;background:${cfg.primaryLight};border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;}
  .ds-bbl{padding:9px 13px;border-radius:16px;font-size:13.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word;}
  .ds-bot .ds-bbl{background:#f1f5f9;color:#1e293b;border-bottom-left-radius:4px;}
  .ds-user .ds-bbl{background:${cfg.primaryColor};color:#fff;border-bottom-right-radius:4px;}

  /* Quick replies */
  #ds-qr{display:flex;flex-wrap:wrap;gap:7px;padding:0 14px 10px;}
  .ds-qbtn{background:transparent;border:1.5px solid ${cfg.primaryColor};color:${cfg.primaryColor};border-radius:20px;padding:5px 13px;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s,transform .12s;}
  .ds-qbtn:hover{background:${cfg.primaryColor};color:#fff;transform:translateY(-1px);}

  /* Typing */
  #ds-typing{display:none;align-self:flex-start;gap:7px;align-items:flex-end;}
  #ds-typing.ds-show{display:flex;}
  .ds-dots{background:#f1f5f9;border-radius:16px;border-bottom-left-radius:4px;padding:10px 14px;display:flex;gap:4px;}
  .ds-d{width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:ds-bnc 1.2s infinite ease-in-out both;}
  .ds-d:nth-child(2){animation-delay:.15s;}
  .ds-d:nth-child(3){animation-delay:.3s;}
  @keyframes ds-bnc{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-6px);}}

  /* Footer inputu */
  #ds-ftr{padding:9px 12px 13px;border-top:1px solid #f0f2f4;flex-shrink:0;}
  .ds-irow{display:flex;gap:8px;align-items:flex-end;}
  #ds-inp{flex:1;border:1.5px solid #e2e8f0;border-radius:12px;padding:8px 12px;font-size:13.5px;resize:none;min-height:38px;max-height:100px;overflow-y:auto;outline:none;color:#1e293b;transition:border-color .18s;line-height:1.4;}
  #ds-inp:focus{border-color:${cfg.primaryColor};}
  #ds-inp::placeholder{color:#aab4be;}
  #ds-send{width:38px;height:38px;background:${cfg.primaryColor};border:none;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .15s,transform .12s;}
  #ds-send:hover:not(:disabled){opacity:.82;}
  #ds-send:active:not(:disabled){transform:scale(.9);}
  #ds-send:disabled{background:#cbd5e1;cursor:not-allowed;}

  /* Responsywność mobilna */
  @media(max-width:480px){
    #ds-root{bottom:16px;right:16px;}
    #ds-panel{position:fixed;bottom:0;left:0;right:0;width:100%;border-radius:20px 20px 0 0;max-height:82vh;transform-origin:bottom center;}
  }
  `;
  document.head.appendChild(s);

  /* ── Budowanie DOM ── */
  const root = document.createElement('div');
  root.id = 'ds-root';
  root.innerHTML = `
    <div id="ds-panel" role="dialog" aria-modal="true" aria-label="Czat">
      <div id="ds-hdr">
        <div id="ds-hdr-info">
          <div id="ds-av">${cfg.avatar}</div>
          <div>
            <div class="ds-name">${cfg.botName}</div>
            <div class="ds-status"><span class="ds-sdot"></span>Online teraz</div>
          </div>
        </div>
        <button id="ds-close" aria-label="Zamknij czat">✕</button>
      </div>
      <div id="ds-msgs" role="log" aria-live="polite"></div>
      <div id="ds-qr"></div>
      <div id="ds-ftr">
        <div class="ds-irow">
          <textarea id="ds-inp" placeholder="Napisz wiadomość…" rows="1" aria-label="Wiadomość"></textarea>
          <button id="ds-send" disabled aria-label="Wyślij">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
    <button id="ds-btn" aria-expanded="false" aria-controls="ds-panel">
      <span class="ds-live"></span>${cfg.buttonLabel}
    </button>
  `;
  document.body.appendChild(root);

  /* ── Referencje ── */
  const btn    = document.getElementById('ds-btn');
  const panel  = document.getElementById('ds-panel');
  const close  = document.getElementById('ds-close');
  const msgs   = document.getElementById('ds-msgs');
  const qr     = document.getElementById('ds-qr');
  const inp    = document.getElementById('ds-inp');
  const send   = document.getElementById('ds-send');

  /* Wskaźnik pisania */
  const typing = document.createElement('div');
  typing.id = 'ds-typing';
  typing.innerHTML = `<div class="ds-mav">${cfg.avatar}</div><div class="ds-dots"><div class="ds-d"></div><div class="ds-d"></div><div class="ds-d"></div></div>`;
  msgs.appendChild(typing);

  let isOpen   = false;
  let welcomed = false;
  let qrShown  = false;
  let busy     = false;
  const history = [];

  /* ── Dodawanie wiadomości ── */
  function addMsg(role, text) {
    const row = document.createElement('div');
    row.className = `ds-row ds-${role}`;
    row.innerHTML = role === 'user'
      ? `<div class="ds-bbl">${text}</div>`
      : `<div class="ds-mav">${cfg.avatar}</div><div class="ds-bbl">${text}</div>`;
    msgs.insertBefore(row, typing);
    msgs.scrollTop = msgs.scrollHeight;
  }

  /* ── Quick replies ── */
  function showQR() {
    if (qrShown) return;
    qrShown = true;
    cfg.quickReplies.forEach(item => {
      const b = document.createElement('button');
      b.className = 'ds-qbtn';
      b.textContent = item.label;
      b.addEventListener('click', () => {
        qr.innerHTML = '';
        addMsg('user', item.label);
        history.push({ role: 'user', content: item.label });
        showTyping();
        setTimeout(() => {
          hideTyping();
          addMsg('bot', item.response);
          history.push({ role: 'assistant', content: item.response });
        }, 900 + Math.random() * 700);
      });
      qr.appendChild(b);
    });
  }

  function showTyping() { busy = true; send.disabled = true; typing.classList.add('ds-show'); msgs.scrollTop = msgs.scrollHeight; }
  function hideTyping()  { busy = false; typing.classList.remove('ds-show'); send.disabled = !inp.value.trim(); }

  /* ── Otwieranie / zamykanie ── */
  function open() {
    isOpen = true;
    panel.classList.add('ds-open');
    btn.setAttribute('aria-expanded', 'true');
    if (!welcomed) {
      welcomed = true;
      setTimeout(() => {
        addMsg('bot', cfg.welcomeMessage);
        history.push({ role: 'assistant', content: cfg.welcomeMessage });
        setTimeout(showQR, 700);
      }, 700);
    }
    setTimeout(() => inp.focus(), 350);
  }
  function closeChat() {
    isOpen = false;
    panel.classList.remove('ds-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click',  () => isOpen ? closeChat() : open());
  close.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeChat(); });

  /* ── Obsługa inputu ── */
  inp.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    send.disabled = !this.value.trim() || busy;
  });
  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!send.disabled) sendMessage(); }
  });
  send.addEventListener('click', sendMessage);

  /* ── Wysyłanie wiadomości (MOCK) ── */
  function sendMessage() {
    const text = inp.value.trim();
    if (!text || busy) return;
    inp.value = '';
    inp.style.height = 'auto';
    send.disabled = true;
    qr.innerHTML = '';
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    showTyping();

    // TUTAJ PRAWDZIWE API — zamień setTimeout na fetch() do Anthropic
    setTimeout(() => {
      hideTyping();
      const reply = cfg.defaultResponse;
      addMsg('bot', reply);
      history.push({ role: 'assistant', content: reply });
    }, 1200 + Math.random() * 800);
  }

})();
