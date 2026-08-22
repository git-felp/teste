/* ============================================================
   CredFácil · Kit de Conversão do Front (prova social + atividade ao vivo)
   Auto-injeta estilo e widgets. Basta incluir em qualquer página:
   <script src="js/front-boost.js" defer></script>
   ============================================================ */
(function () {
  if (window.__cfBoost) return; window.__cfBoost = true;

  var NOMES = ['Maria S.','João P.','Ana C.','Carlos M.','Juliana R.','Pedro A.','Fernanda L.','Lucas O.','Patrícia G.','Rafael T.','Camila F.','Bruno N.','Aline D.','Marcos V.','Beatriz S.','Diego R.','Larissa M.','Thiago C.','Vanessa P.','Gustavo H.'];
  var CIDADES = ['São Paulo, SP','Rio de Janeiro, RJ','Belo Horizonte, MG','Curitiba, PR','Salvador, BA','Recife, PE','Fortaleza, CE','Porto Alegre, RS','Goiânia, GO','Campinas, SP','Manaus, AM','Brasília, DF','Belém, PA','Guarulhos, SP','São Luís, MA'];
  var VALORES = ['5.000','7.500','9.000','12.000','15.000','18.000','20.000','25.000','30.000'];
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function rint(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

  var css = ''
    + '.cfb-toast{position:fixed;left:14px;top:12px;z-index:99000;max-width:288px;background:#fff;border:1px solid #e6eae8;border-left:4px solid #16a34a;border-radius:14px;box-shadow:0 14px 34px -12px rgba(6,55,26,.32);padding:10px 13px;display:flex;gap:11px;align-items:center;transform:translateY(-170%);opacity:0;transition:transform .55s cubic-bezier(.2,.75,.2,1),opacity .4s;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}'
    + '.cfb-toast.cfb-show{transform:none;opacity:1}'
    + '.cfb-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#16a34a,#22c55e);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0}'
    + '.cfb-tx{font-size:12.5px;color:#0f172a;line-height:1.35}'
    + '.cfb-tx b{font-weight:700}'
    + '.cfb-tx .ok{display:block;color:#16a34a;font-size:11px;font-weight:600;margin-top:1px}'
    + '.cfb-tx .ago{color:#94a3b8;font-weight:400;font-size:10.5px}'
    + '.cfb-live{position:fixed;left:14px;bottom:16px;z-index:98000;background:rgba(15,23,42,.88);backdrop-filter:blur(6px);color:#fff;font-family:Inter,system-ui,sans-serif;font-size:11.5px;font-weight:600;padding:8px 14px;border-radius:100px;display:flex;align-items:center;gap:7px;box-shadow:0 8px 20px -8px rgba(0,0,0,.4);opacity:0;transition:opacity .45s}'
    + '.cfb-live.cfb-show{opacity:1}'
    + '.cfb-live i{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 0 rgba(74,222,128,.7);animation:cfbPulse 1.6s infinite}'
    + '@keyframes cfbPulse{0%{box-shadow:0 0 0 0 rgba(74,222,128,.6)}70%{box-shadow:0 0 0 7px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}'
    + '@media (max-width:380px){.cfb-toast{max-width:84vw}}'
    + '@media (prefers-reduced-motion:reduce){.cfb-toast,.cfb-live{transition:opacity .3s}.cfb-toast{transform:none}}';

  function inject() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    /* contador "ao vivo" no canto inferior */
    var live = document.createElement('div'); live.className = 'cfb-live';
    var base = rint(180, 320);
    live.innerHTML = '<i></i> <span>' + base + ' pessoas analisando agora</span>';
    document.body.appendChild(live);
    setTimeout(function(){ live.classList.add('cfb-show'); }, 900);
    setInterval(function(){
      base += rint(-3, 5); if (base < 120) base = 120 + rint(0,30);
      live.querySelector('span').textContent = base + ' pessoas analisando agora';
    }, 4000);

    /* toast de prova social */
    var toast = document.createElement('div'); toast.className = 'cfb-toast';
    toast.innerHTML = '<div class="cfb-av" id="cfbAv"></div><div class="cfb-tx"><b id="cfbNome"></b> <span class="ago" id="cfbAgo"></span><span class="ok" id="cfbOk"></span></div>';
    document.body.appendChild(toast);
    var nomeEl = toast.querySelector('#cfbNome'), agoEl = toast.querySelector('#cfbAgo'), okEl = toast.querySelector('#cfbOk'), avEl = toast.querySelector('#cfbAv');

    function showOne() {
      var nome = pick(NOMES), cidade = pick(CIDADES), valor = pick(VALORES), ago = rint(1, 9);
      avEl.textContent = nome.charAt(0);
      nomeEl.textContent = nome + ' — ' + cidade;
      agoEl.textContent = '· há ' + ago + ' min';
      okEl.textContent = '✓ Crédito de R$ ' + valor + ' aprovado';
      toast.classList.add('cfb-show');
      setTimeout(function(){ toast.classList.remove('cfb-show'); }, 4000);
    }
    setTimeout(showOne, 12000);   // 1ª aparição só depois de 12s
    setInterval(showOne, 35000);  // depois, no máximo a cada 35s (muito menos)
  }

  if (document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);
})();
