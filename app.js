@font-face{font-family:"Unbounded";src:url('assets/fonts/Unbounded-Variable.ttf') format('truetype');font-display:swap;font-weight:100 900;font-style:normal}
@font-face{font-family:"Ostrovsky";src:url('assets/fonts/Ostrovsky-Bold.otf') format('opentype');font-display:swap;font-weight:700;font-style:normal}

:root{
  --black:#000500;
  --snow:#fffbff;
  --almond:#f1dabf;
  --taupe:#92817a;
  --coffee:#362417;
  --line:rgba(241,218,191,.18);
  --line-strong:rgba(241,218,191,.34);
  --muted:rgba(255,251,255,.58);
  --width:min(1440px,calc(100% - 64px));
  --radius:28px;
  --ease:cubic-bezier(.2,.75,.2,1);
  --theme-bg:#000500;
  --theme-glow:rgba(241,218,191,.085);
  --theme-glow-2:rgba(54,36,23,.28);
  --mx:0px;
  --my:0px;
}

*{box-sizing:border-box}
html{scroll-behavior:smooth;background:var(--black);scroll-padding-top:95px}
body{margin:0;background:transparent;color:var(--snow);font-family:"Unbounded",Arial,sans-serif;font-weight:350;line-height:1.5;letter-spacing:-.012em;overflow-x:hidden;font-synthesis:none;isolation:isolate}
body::before{content:"";position:fixed;inset:0;z-index:90;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E")}
img{display:block;max-width:100%;height:auto}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit}
button,a{-webkit-tap-highlight-color:transparent}
::selection{background:var(--almond);color:var(--black)}
.page-width{width:var(--width);margin-inline:auto}

/* Brandbook-inspired living canvas */
.brand-motion-bg{position:fixed;inset:0;z-index:-3;overflow:hidden;pointer-events:none;background:radial-gradient(circle at calc(18% + var(--mx)) calc(22% + var(--my)),var(--theme-glow),transparent 34%),radial-gradient(circle at 78% 82%,var(--theme-glow-2),transparent 42%),var(--theme-bg);transition:background 1.1s var(--ease)}
.brand-motion-bg::after{content:"";position:absolute;inset:-12%;opacity:.24;background:linear-gradient(115deg,transparent 0 38%,rgba(241,218,191,.035) 39%,transparent 41% 58%,rgba(146,129,122,.035) 60%,transparent 62%);transform:translate3d(var(--mx),var(--my),0);animation:bgSheen 16s ease-in-out infinite alternate}
.brand-rays{position:absolute;inset:0;transform:translate3d(var(--mx),var(--my),0);will-change:transform}
.brand-ray{position:absolute;left:-19vw;bottom:-8vh;width:92vw;height:14vh;background:linear-gradient(90deg,rgba(241,218,191,0),rgba(241,218,191,.075) 18%,rgba(241,218,191,.025) 74%,rgba(241,218,191,0));clip-path:polygon(0 36%,70% 0,100% 16%,28% 100%);transform-origin:0 50%;animation:rayDrift 14s ease-in-out infinite alternate;opacity:.48}
.brand-ray:nth-child(1){transform:rotate(-21deg) scaleX(1.03);bottom:0;animation-delay:-1s}
.brand-ray:nth-child(2){transform:rotate(-13deg) scaleX(.93);bottom:7vh;opacity:.36;animation-delay:-4s}
.brand-ray:nth-child(3){transform:rotate(-5deg) scaleX(.82);bottom:14vh;opacity:.28;animation-delay:-7s}
.brand-ray:nth-child(4){transform:rotate(4deg) scaleX(.72);bottom:21vh;opacity:.22;animation-delay:-10s}
.motion-symbol{position:absolute;width:min(74vw,1080px);height:auto;opacity:.045;will-change:transform;animation:symbolDrift 18s ease-in-out infinite alternate}
.motion-symbol-one{right:-20vw;top:9vh;transform:rotate(10deg)}
.motion-symbol-two{left:-28vw;bottom:-8vh;opacity:.025;transform:rotate(-9deg) scale(.78);animation-delay:-8s}
@keyframes rayDrift{from{translate:-1.5vw 0;scale:1 1}to{translate:3.5vw -1.5vh;scale:1.035 1}}
@keyframes symbolDrift{from{translate:0 0}to{translate:-4vw 3vh}}
@keyframes bgSheen{from{translate:-2% 0}to{translate:3% -2%}}

.page-progress{position:fixed;z-index:100;left:0;right:0;top:0;height:3px;background:rgba(241,218,191,.07);pointer-events:none}
.page-progress span{display:block;width:0;height:100%;background:linear-gradient(90deg,var(--almond),var(--taupe));box-shadow:0 0 18px rgba(241,218,191,.28);transition:width .08s linear}

/* Navigation */
.site-header{position:fixed;z-index:80;top:0;left:0;right:0;padding:18px 0;pointer-events:none;transition:padding .3s ease}
.nav-shell{pointer-events:auto;display:grid;grid-template-columns:minmax(160px,1fr) auto minmax(160px,1fr);align-items:center;gap:24px;min-height:66px;padding:9px 12px 9px 18px;border:1px solid rgba(241,218,191,.13);border-radius:999px;background:rgba(0,5,0,.52);backdrop-filter:blur(20px);box-shadow:0 18px 60px rgba(0,0,0,.16);transition:background .3s ease,border-color .3s ease,transform .3s ease}
.site-header.is-scrolled{padding-top:10px}
.site-header.is-scrolled .nav-shell{background:rgba(0,5,0,.76);border-color:rgba(241,218,191,.2)}
.brand-mark{display:block;width:152px;flex:0 0 auto;justify-self:start}
.brand-mark img{width:100%;height:auto}
.desktop-nav{display:flex;align-items:center;justify-self:center;gap:clamp(20px,2vw,32px);font-size:10px;color:rgba(255,251,255,.64)}
.desktop-nav a{position:relative;transition:color .2s ease}
.desktop-nav a::after{content:"";position:absolute;left:0;right:100%;bottom:-7px;height:1px;background:var(--almond);transition:right .3s var(--ease)}
.desktop-nav a:hover,.desktop-nav a.is-active{color:var(--almond)}
.desktop-nav a:hover::after,.desktop-nav a.is-active::after{right:0}
.nav-cta,.button{display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:52px;padding:0 22px;border-radius:999px;font-size:10px;font-weight:560;letter-spacing:-.015em;transition:transform .28s var(--ease),background .28s ease,border-color .28s ease,color .28s ease}
.nav-cta{justify-self:end;background:var(--almond);color:var(--black);padding-inline:20px}
.nav-cta:hover,.button:hover{transform:translateY(-3px)}
.nav-cta span,.button span{font-size:15px;line-height:0;transition:transform .25s var(--ease)}
.nav-cta:hover span,.button:hover span{transform:translate(2px,-2px)}
.menu-toggle{display:none;border:1px solid var(--line);background:transparent;border-radius:999px;padding:10px 13px;font-size:10px;cursor:pointer}
.mobile-nav{display:none}

/* Hero */
.hero{min-height:100svh;padding-top:clamp(130px,11vw,172px);padding-bottom:clamp(70px,7vw,104px);display:grid;align-items:end;position:relative}
.hero-grid{width:100%;display:grid;grid-template-columns:minmax(0,1.06fr) minmax(390px,.94fr);gap:clamp(42px,6.5vw,104px);align-items:end}
.hero-copy{padding-bottom:clamp(14px,3vw,42px)}
.eyebrow{margin:0;color:var(--taupe);font-size:9px;line-height:1.2;font-weight:560;text-transform:uppercase;letter-spacing:.16em}
.hero h1{font-size:clamp(52px,8.25vw,126px);font-weight:720;line-height:.88;letter-spacing:-.068em;margin:23px 0 0;max-width:880px}
.hero h1 em,.section-heading h2 em,.route-heading h2 em,.school-main h2 em,.join-card h2 em{font-family:"Ostrovsky",Georgia,serif;font-weight:700;font-style:normal;letter-spacing:-.045em;color:var(--almond)}
.hero-lead{max-width:640px;margin:31px 0 0;color:var(--muted);font-size:clamp(15px,1.35vw,20px);line-height:1.62;letter-spacing:-.025em;font-weight:320}
.hero-actions{display:flex;gap:11px;flex-wrap:wrap;margin-top:33px}
.button-primary{background:var(--almond);color:var(--black);border:1px solid var(--almond)}
.button-quiet{border:1px solid var(--line);color:var(--snow);background:rgba(255,255,255,.018)}
.button-quiet:hover{border-color:rgba(241,218,191,.6);background:rgba(241,218,191,.07)}
.hero-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:clamp(48px,5vw,70px);padding-top:18px;border-top:1px solid var(--line);max-width:650px}
.hero-facts div{display:flex;flex-direction:column;gap:5px;padding-right:22px}
.hero-facts div+div{padding-left:22px;border-left:1px solid rgba(241,218,191,.1)}
.hero-facts strong{font-size:19px;line-height:1;color:var(--almond);font-weight:580}
.hero-facts span{color:rgba(255,251,255,.45);font-size:10px;line-height:1.35;font-weight:320}

.hero-art{position:relative;height:min(72vh,760px);min-height:570px;overflow:visible;isolation:isolate;perspective:1200px}
.hero-art::before{content:"";position:absolute;inset:7% 0 0 7%;border:1px solid rgba(241,218,191,.12);border-radius:var(--radius);background:linear-gradient(155deg,rgba(255,255,255,.018),rgba(0,5,0,.02));z-index:-1}
.art-kicker{position:absolute;z-index:6;top:2%;left:3%;padding:8px 11px;border:1px solid rgba(241,218,191,.16);border-radius:999px;background:rgba(0,5,0,.2);font-size:8px;letter-spacing:.15em;color:rgba(241,218,191,.72)}
.hero-symbol{position:absolute;z-index:0;width:172%;max-width:none;left:-52%;bottom:-13%;opacity:.14;transform:rotate(-7deg) translate3d(var(--hero-x,0px),var(--hero-y,0px),0);filter:drop-shadow(0 24px 46px rgba(0,0,0,.36));animation:pulseSymbol 7s ease-in-out infinite;pointer-events:none}
.hero-media-card{position:absolute;z-index:3;top:6%;right:8%;width:72%;height:78%;overflow:hidden;border-radius:20px;box-shadow:0 38px 100px rgba(0,0,0,.43);transform:rotate(1.3deg) translate3d(var(--hero-x,0px),var(--hero-y,0px),0);transition:transform .6s var(--ease),box-shadow .6s ease;background:#17130f}
.hero-media-card::before{content:"";position:absolute;z-index:4;inset:-25% -60%;background:linear-gradient(110deg,transparent 38%,rgba(241,218,191,.18) 49%,rgba(255,255,255,.08) 52%,transparent 63%);transform:translateX(-72%) rotate(4deg);opacity:0;pointer-events:none}
.hero-media-card::after{content:"";position:absolute;z-index:3;inset:0;background:linear-gradient(180deg,rgba(0,5,0,.025) 0%,transparent 48%,rgba(0,5,0,.28) 100%);pointer-events:none}
.hero-media-card .hero-slide{position:absolute;z-index:1;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;transform:scale(1.075) rotate(.35deg);filter:blur(9px) brightness(.82) saturate(.86);clip-path:inset(5% 5% 5% 5% round 18px);transition:opacity 1.05s ease,transform 1.45s var(--ease),filter 1.05s ease,clip-path 1.25s var(--ease);will-change:opacity,transform,filter,clip-path}
.hero-media-card .hero-slide.is-active{z-index:2;opacity:1;transform:scale(1) rotate(0);filter:blur(0) brightness(1) saturate(1);clip-path:inset(0 0 0 0 round 0)}
.hero-media-card.is-changing::before{animation:heroSlideSheen 1.35s var(--ease) both}
.hero-slide-sheen{position:absolute;z-index:5;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(241,218,191,.38),transparent);opacity:.36;pointer-events:none}
.hero-art:hover .hero-media-card{transform:rotate(-.2deg) translate3d(var(--hero-x,0px),calc(var(--hero-y,0px) - 8px),0);box-shadow:0 52px 120px rgba(0,0,0,.5)}
.hero-art:hover .hero-media-card .hero-slide.is-active{transform:scale(1.035);filter:brightness(1.035) contrast(1.02)}
@keyframes heroSlideSheen{0%{transform:translateX(-72%) rotate(4deg);opacity:0}22%{opacity:.48}72%{opacity:.18}100%{transform:translateX(72%) rotate(4deg);opacity:0}}
.art-orbit{position:absolute;z-index:1;border:1px solid rgba(241,218,191,.12);border-radius:50%;pointer-events:none;animation:orbitBreath 9s ease-in-out infinite}
.orbit-a{width:68%;aspect-ratio:1;right:-20%;top:7%;transform:rotate(-18deg)}
.orbit-b{width:50%;aspect-ratio:1;left:-17%;bottom:-9%;border-color:rgba(146,129,122,.18);animation-delay:-4s}
.route-chip{position:absolute;z-index:7;left:0;right:2%;bottom:10%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 17px;border:1px solid rgba(241,218,191,.2);border-radius:999px;background:rgba(0,5,0,.63);backdrop-filter:blur(14px);font-size:9px;box-shadow:0 15px 48px rgba(0,0,0,.2)}
.route-chip b{font-size:15px;color:var(--almond);font-weight:400}
.art-note{position:absolute;z-index:7;left:3%;right:3%;bottom:0;padding-top:14px;border-top:1px solid rgba(241,218,191,.16);display:flex;justify-content:space-between;gap:26px}
.art-note span,.art-index{color:var(--taupe);font-size:8px;letter-spacing:.11em}
.art-note p{max-width:330px;margin:0;color:rgba(241,218,191,.73);font-size:10px;line-height:1.5;font-weight:330}
.art-index{position:absolute;z-index:7;right:4%;top:1%;transform:translateY(-150%)}
@keyframes pulseSymbol{0%,100%{filter:drop-shadow(0 8px 20px rgba(146,129,122,.04))}50%{filter:drop-shadow(0 24px 42px rgba(146,129,122,.24))}}
@keyframes orbitBreath{0%,100%{scale:1;opacity:.65}50%{scale:1.035;opacity:1}}

/* Ticker */
.ticker{overflow:hidden;position:relative;padding:11px 0 19px;color:var(--almond);white-space:nowrap;opacity:.74;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.ticker::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--line),transparent)}
.ticker-track{display:flex;width:max-content;will-change:transform;backface-visibility:hidden;transform:translate3d(0,0,0);animation:tickerCycle 28s linear infinite}
.ticker-run{display:flex;flex:none;align-items:center;gap:clamp(24px,3vw,50px);padding-right:clamp(24px,3vw,50px);font-size:10px;letter-spacing:.1em}
.ticker-run b{font-size:15px;font-weight:400;color:var(--taupe)}
@keyframes tickerCycle{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}

/* Editorial sections */
.section{padding-top:clamp(120px,12vw,190px);padding-bottom:clamp(120px,12vw,190px);position:relative}
.section-label{display:flex;align-items:center;gap:12px;margin-bottom:clamp(38px,4vw,56px);color:var(--taupe);font-size:9px;text-transform:uppercase;letter-spacing:.14em}
.section-label span:first-child{display:grid;place-items:center;width:29px;height:29px;border:1px solid var(--line);border-radius:50%;color:var(--almond);font-size:9px}
.idea-layout{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(48px,8vw,132px);align-items:start}
.section-heading h2,.route-heading h2,.directions .section-heading h2,.partners .section-heading h2{margin:19px 0 0;font-size:clamp(42px,5.7vw,82px);line-height:.94;letter-spacing:-.062em;font-weight:680}
.lead-copy{margin:0;font-size:clamp(20px,2.35vw,33px);line-height:1.3;letter-spacing:-.04em;max-width:760px;font-weight:380}
.mission-card{margin-top:clamp(42px,5vw,68px);padding:23px 0 0;border-top:1px solid var(--line);background:none}
.card-label{display:block;color:var(--taupe);font-size:9px;letter-spacing:.15em}
.mission-card p{margin:28px 0 0;color:var(--almond);font-size:clamp(20px,2.2vw,31px);line-height:1.28;letter-spacing:-.04em;max-width:760px}
.values-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin-top:clamp(72px,8vw,110px);border-top:1px solid var(--line)}
.value-card{min-height:220px;padding:22px 22px 12px 0;display:flex;flex-direction:column;background:none;position:relative;transition:transform .35s var(--ease)}
.value-card+.value-card{border-left:1px solid rgba(241,218,191,.1);padding-left:22px}
.value-card:hover{transform:translateY(-7px)}
.value-card span,.audience-format,.audience-age,.step-top,.school-block span{color:var(--taupe);font-size:9px;line-height:1.4;letter-spacing:.1em;text-transform:uppercase}
.value-card h3{margin:auto 0 0;padding-top:28px;color:var(--almond);font-size:16px;letter-spacing:-.035em;font-weight:560}
.value-card p{margin:14px 0 0;color:rgba(255,251,255,.5);font-size:11px;line-height:1.55;font-weight:320}

/* Route as a brand palette sequence */
.route-section{width:100%;padding-inline:0;overflow:hidden}
.route-section::before{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:linear-gradient(90deg,transparent,var(--line),transparent)}
.route-heading{display:grid;grid-template-columns:1fr .78fr;column-gap:54px;align-items:end;margin-bottom:clamp(46px,5vw,70px)}
.route-heading .eyebrow{grid-column:1/-1}
.route-heading h2{margin-top:18px}
.route-heading>p:last-child{margin:0;color:rgba(255,251,255,.51);font-size:13px;line-height:1.6;max-width:450px;font-weight:320}
.route-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;width:100vw;margin-left:calc(50% - 50vw)}
.route-card{min-height:clamp(510px,45vw,650px);padding:clamp(28px,3vw,46px) clamp(24px,3.4vw,54px);display:flex;flex-direction:column;position:relative;overflow:hidden;transition:filter .35s ease,transform .45s var(--ease)}
.route-card::after{content:"";position:absolute;width:300px;height:300px;border-radius:50%;right:-180px;top:-180px;background:rgba(255,255,255,.07);opacity:0;transition:opacity .35s ease,transform .6s var(--ease)}
.route-card:hover{transform:translateY(-8px);filter:brightness(1.035)}
.route-card:hover::after{opacity:1;transform:scale(1.25)}
.route-card-light{background:var(--almond);color:var(--black)}
.route-card-dark{background:#080a08;color:var(--snow);box-shadow:inset 0 0 0 1px rgba(241,218,191,.14)}
.route-card-coffee{background:var(--coffee);color:var(--almond)}
.step-top{display:flex;justify-content:space-between;gap:12px}
.route-card-light .step-top{color:rgba(0,5,0,.45)}
.route-card h3{font-size:clamp(38px,4.2vw,64px);line-height:.92;letter-spacing:-.07em;margin:clamp(62px,6vw,90px) 0 24px;font-weight:680}
.route-card>p{max-width:420px;font-size:12px;line-height:1.6;margin:0;opacity:.72;font-weight:340}
.route-card ul{list-style:none;padding:0;margin:auto 0 0}
.route-card li{padding:10px 0;border-top:1px solid currentColor;font-size:9px;letter-spacing:.04em;opacity:.64}

/* Audience */
.wide-heading{max-width:940px}
.audience-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:12px;margin-top:clamp(60px,7vw,96px);align-items:stretch}
.audience-card{grid-column:span 4;min-height:310px;padding:24px;border:1px solid rgba(241,218,191,.14);border-radius:22px;background:rgba(255,255,255,.014);display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .4s var(--ease),border-color .3s ease,background .3s ease}
.audience-card:nth-child(4){grid-column:span 5}
.audience-card-wide{grid-column:span 7}
.audience-card::after{content:"";position:absolute;inset:auto -30% -65% auto;width:220px;height:220px;border:1px solid rgba(241,218,191,.08);border-radius:50%;transition:transform .7s var(--ease),border-color .3s ease}
.audience-card:hover{transform:translateY(-8px);border-color:rgba(241,218,191,.3);background:rgba(241,218,191,.025)}
.audience-card:hover::after{transform:scale(1.35);border-color:rgba(241,218,191,.18)}
.audience-card-accent{background:linear-gradient(145deg,rgba(241,218,191,.98),rgba(220,192,160,.9));color:var(--black);border-color:rgba(241,218,191,.82);box-shadow:0 26px 80px rgba(0,0,0,.18);isolation:isolate}
.audience-card-accent::before{content:"";position:absolute;right:-18%;top:7%;width:76%;aspect-ratio:2.53;background:url('assets/symbol.png') center/contain no-repeat;opacity:.085;filter:brightness(.1);transform:rotate(8deg);pointer-events:none;z-index:0;transition:transform .75s var(--ease),opacity .35s ease}
.audience-card-accent::after{display:none}
.audience-card-accent>*{position:relative;z-index:1}
.audience-card-accent:hover{background:linear-gradient(145deg,rgba(246,225,202,.99),rgba(225,197,165,.94));border-color:rgba(241,218,191,1);box-shadow:0 34px 96px rgba(0,0,0,.23)}
.audience-card-accent:hover::before{transform:rotate(5deg) translate(-6px,4px) scale(1.025);opacity:.11}
.audience-card-accent .audience-age,.audience-card-accent .audience-format{color:rgba(0,5,0,.5)}
.audience-card h3{margin:clamp(40px,5vw,72px) 0 0;font-size:clamp(19px,2vw,27px);line-height:1.05;letter-spacing:-.045em;font-weight:600}
.audience-card-accent h3{font-size:clamp(25px,2.35vw,34px);max-width:330px;font-weight:680;letter-spacing:-.055em}
.audience-card p{margin:18px 0 0;max-width:430px;color:rgba(255,251,255,.54);font-size:12px;line-height:1.58;font-weight:320}
.audience-card-accent p{color:rgba(0,5,0,.64);max-width:390px}
.audience-card-accent .audience-format{margin-top:auto;padding-top:17px;border-top:1px solid rgba(0,5,0,.14)}
.audience-format{margin-top:auto;padding-top:36px}

/* Directions */
.directions{padding-inline:0}
.directions-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:clamp(54px,8vw,128px);align-items:start}
.directions .section-heading{position:sticky;top:128px}
.heading-note{max-width:500px;margin:28px 0 0;color:rgba(255,251,255,.5);font-size:12px;line-height:1.62;font-weight:320}
.inside-accent{display:inline-block}
.direction-list{border-top:1px solid var(--line)}
.direction-item{display:grid;grid-template-columns:34px 1fr 26px;gap:20px;align-items:start;padding:27px 0;border-bottom:1px solid var(--line);position:relative;transition:padding .35s var(--ease)}
.direction-item::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(241,218,191,.06),transparent 60%);transform:scaleX(0);transform-origin:left;transition:transform .45s var(--ease);z-index:-1}
.direction-item:hover{padding-left:14px}
.direction-item:hover::before{transform:scaleX(1)}
.direction-item>span{color:var(--taupe);font-size:9px}
.direction-item h3{margin:0;color:var(--almond);font-size:clamp(17px,1.55vw,23px);letter-spacing:-.04em;font-weight:570}
.direction-item p{margin:10px 0 0;color:rgba(255,251,255,.5);font-size:11px;line-height:1.55;max-width:600px;font-weight:320}
.direction-item b{color:var(--taupe);font-size:20px;font-weight:300;transition:transform .35s var(--ease),color .25s ease}
.direction-item:hover b{transform:translate(4px,-4px) rotate(5deg);color:var(--almond)}

/* School */
.school-card{display:grid;grid-template-columns:1.35fr .65fr;min-height:640px;border:1px solid rgba(241,218,191,.14);border-radius:var(--radius);overflow:hidden;background:linear-gradient(145deg,rgba(241,218,191,.96),rgba(220,192,160,.88));color:var(--black);position:relative;box-shadow:0 35px 100px rgba(0,0,0,.13)}
.school-card::after{content:"";position:absolute;right:-18%;bottom:-14%;width:64%;aspect-ratio:2.53;background:url('assets/symbol.png') center/contain no-repeat;opacity:.105;filter:brightness(.1);transform:rotate(-7deg);pointer-events:none;transition:transform 1.1s var(--ease)}
.school-card:hover::after{transform:rotate(-4deg) translateY(-8px) scale(1.02)}
.school-main{padding:clamp(42px,5vw,76px);display:flex;flex-direction:column;position:relative;z-index:1}
.school-main .card-label{color:rgba(0,5,0,.47)}
.school-main h2{margin:38px 0 0;font-size:clamp(44px,5.7vw,82px);line-height:.93;letter-spacing:-.067em;font-weight:700;max-width:890px}
.school-main h2 em{color:var(--coffee)}
.school-main p{margin:31px 0 0;max-width:700px;color:rgba(0,5,0,.62);font-size:13px;line-height:1.6;font-weight:360}
.button-light{align-self:flex-start;margin-top:auto;background:var(--black);color:var(--snow);border:1px solid var(--black)}
.school-side{padding:28px 30px;border-left:1px solid rgba(0,5,0,.14);display:flex;flex-direction:column;justify-content:space-between;position:relative;z-index:1;background:rgba(255,251,255,.09);backdrop-filter:blur(2px)}
.school-block{padding:22px 0;border-bottom:1px solid rgba(0,5,0,.12)}
.school-block:last-child{border-bottom:0}
.school-block span{display:block;color:rgba(0,5,0,.46)}
.school-block strong{display:block;margin-top:15px;font-size:12px;line-height:1.5;font-weight:540}

/* Partners */
.partners-layout{display:grid;grid-template-columns:.92fr 1.08fr;gap:clamp(50px,8vw,132px);align-items:start}
.partners-copy>p{margin:0;font-size:clamp(20px,2.2vw,31px);line-height:1.3;letter-spacing:-.038em;font-weight:380}
.partner-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:48px}
.partner-tags span{padding:11px 15px;border:1px solid var(--line);border-radius:999px;color:rgba(255,251,255,.58);font-size:9px;transition:background .25s ease,color .25s ease,border-color .25s ease,transform .25s var(--ease)}
.partner-tags span:hover{background:var(--almond);border-color:var(--almond);color:var(--black);transform:translateY(-3px)}

/* Contacts */
.contacts-layout{display:grid;grid-template-columns:.92fr 1.08fr;gap:clamp(50px,8vw,132px);align-items:stretch}
.contact-card{min-width:0;min-height:470px;padding:clamp(32px,4.4vw,64px);border-radius:var(--radius);background:linear-gradient(145deg,rgba(241,218,191,.98),rgba(220,192,160,.9));color:var(--black);display:flex;flex-direction:column;position:relative;overflow:hidden;box-shadow:0 35px 100px rgba(0,0,0,.16)}
.contact-card::after{content:"";position:absolute;right:-31%;top:-5%;width:82%;aspect-ratio:2.53;background:url('assets/symbol.png') center/contain no-repeat;opacity:.1;filter:brightness(.13);transform:rotate(8deg);pointer-events:none}
.contact-card .card-label{position:relative;z-index:1;color:rgba(0,5,0,.48)}
.contact-card h3{position:relative;z-index:1;margin:38px 0 0;font-size:clamp(40px,4.4vw,64px);line-height:.94;letter-spacing:-.06em;font-weight:700}
.contact-links{position:relative;z-index:1;margin-top:auto;padding-top:54px}
.contact-links a{min-width:0;display:grid;grid-template-columns:92px minmax(0,1fr) auto;gap:22px;align-items:center;padding:19px 0;border-top:1px solid rgba(0,5,0,.15);transition:padding .28s var(--ease),background .28s ease}
.contact-links a:last-child{border-bottom:1px solid rgba(0,5,0,.15)}
.contact-links a:hover{padding-left:12px;padding-right:10px;background:rgba(255,251,255,.18)}
.contact-links span{font-size:8px;text-transform:uppercase;letter-spacing:.13em;color:rgba(0,5,0,.48)}
.contact-links strong{min-width:0;font-size:clamp(12px,1.25vw,17px);font-weight:560;letter-spacing:-.03em;overflow-wrap:anywhere}
.contact-links b{font-size:20px;font-weight:400;transition:transform .25s var(--ease)}
.contact-links a:hover b{transform:translate(3px,-3px)}
.contact-page{min-height:100svh;padding-top:clamp(110px,12vw,170px);display:flex;flex-direction:column;justify-content:center}
.contact-back{margin-top:36px;width:max-content}

/* CTA */
.join{padding-top:clamp(30px,4vw,60px);padding-bottom:clamp(110px,11vw,170px)}
.join-card{position:relative;overflow:hidden;display:grid;grid-template-columns:1.08fr .92fr;gap:clamp(45px,8vw,130px);align-items:end;padding:clamp(44px,5.4vw,82px);border:1px solid rgba(241,218,191,.2);border-radius:var(--radius);background:linear-gradient(135deg,rgba(54,36,23,.54),rgba(0,5,0,.88));box-shadow:0 35px 100px rgba(0,0,0,.18)}
.join-card::after{content:"";position:absolute;width:min(62vw,820px);aspect-ratio:2.53;right:-25%;top:-8%;background:url('assets/symbol.png') center/contain no-repeat;opacity:.06;transform:rotate(9deg);pointer-events:none;transition:transform 1.1s var(--ease)}
.join-card:hover::after{transform:rotate(5deg) translate(-18px,8px)}
.join-card h2{position:relative;z-index:1;margin:20px 0 0;font-size:clamp(48px,6.5vw,94px);line-height:.9;letter-spacing:-.07em;font-weight:700}
.join-copy{position:relative;z-index:1}
.join-copy>p{margin:0;color:rgba(255,251,255,.58);font-size:13px;line-height:1.62;max-width:560px;font-weight:320}
.join-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:34px}
.button-quiet-dark{border:1px solid var(--line);background:rgba(0,5,0,.34);color:var(--snow)}
.button-quiet-dark:hover{background:rgba(241,218,191,.08);border-color:rgba(241,218,191,.4)}

.site-footer{padding:34px 0 46px;border-top:1px solid rgba(241,218,191,.12)}
.footer-row{display:grid;grid-template-columns:1fr auto 1fr;gap:30px;align-items:center;color:rgba(255,251,255,.43);font-size:9px}
.footer-row .brand-mark{width:136px}
.footer-row p{margin:0;text-align:center}
.back-top{justify-self:end;transition:color .2s ease,transform .25s var(--ease)}
.back-top:hover{color:var(--almond);transform:translateY(-2px)}

/* Reveal motion: presentation-like, without turning sections into panels */
.reveal{opacity:1}
.motion-ready .reveal .section-label,.motion-ready .reveal .section-heading,.motion-ready .reveal .route-heading,.motion-ready .reveal .idea-copy,.motion-ready .reveal .values-grid,.motion-ready .reveal .route-grid,.motion-ready .reveal .audience-grid,.motion-ready .reveal .direction-list,.motion-ready .reveal .school-card,.motion-ready .reveal .partners-copy,.motion-ready .reveal .contacts-layout,.motion-ready .reveal .join-card{opacity:0;transform:translateY(34px);transition:opacity .85s ease,transform .9s var(--ease)}
.motion-ready .reveal.visible .section-label,.motion-ready .reveal.visible .section-heading,.motion-ready .reveal.visible .route-heading,.motion-ready .reveal.visible .idea-copy,.motion-ready .reveal.visible .values-grid,.motion-ready .reveal.visible .route-grid,.motion-ready .reveal.visible .audience-grid,.motion-ready .reveal.visible .direction-list,.motion-ready .reveal.visible .school-card,.motion-ready .reveal.visible .partners-copy,.motion-ready .reveal.visible .contacts-layout,.motion-ready .reveal.visible .join-card{opacity:1;transform:none}
.motion-ready .reveal.visible .section-heading,.motion-ready .reveal.visible .route-heading,.motion-ready .reveal.visible .idea-copy{transition-delay:.08s}
.motion-ready .reveal.visible .values-grid,.motion-ready .reveal.visible .route-grid,.motion-ready .reveal.visible .audience-grid,.motion-ready .reveal.visible .direction-list,.motion-ready .reveal.visible .school-card,.motion-ready .reveal.visible .partners-copy,.motion-ready .reveal.visible .contacts-layout,.motion-ready .reveal.visible .join-card{transition-delay:.16s}
.motion-ready .hero.reveal .hero-copy>*{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .85s var(--ease)}
.motion-ready .hero.reveal.visible .hero-copy>*{opacity:1;transform:none}
.motion-ready .hero.reveal.visible .hero-copy>*:nth-child(2){transition-delay:.06s}.motion-ready .hero.reveal.visible .hero-copy>*:nth-child(3){transition-delay:.13s}.motion-ready .hero.reveal.visible .hero-copy>*:nth-child(4){transition-delay:.2s}.motion-ready .hero.reveal.visible .hero-copy>*:nth-child(5){transition-delay:.27s}
.motion-ready .hero.reveal .hero-art{opacity:0;transform:translateY(34px) scale(.97);transition:opacity 1s ease,transform 1.05s var(--ease)}
.motion-ready .hero.reveal.visible .hero-art{opacity:1;transform:none;transition-delay:.14s}

/* Secondary stagger: elements inside each chapter arrive in sequence. */
.motion-ready .reveal .value-card,.motion-ready .reveal .route-card,.motion-ready .reveal .audience-card,.motion-ready .reveal .direction-item,.motion-ready .reveal .school-block,.motion-ready .reveal .partner-tags span{opacity:0;translate:0 18px;transition-property:opacity,translate,transform,background,border-color,padding,color;transition-duration:.65s,.75s,.4s,.3s,.3s,.35s,.25s;transition-timing-function:ease,var(--ease),var(--ease),ease,ease,var(--ease),ease}
.motion-ready .reveal.visible .value-card,.motion-ready .reveal.visible .route-card,.motion-ready .reveal.visible .audience-card,.motion-ready .reveal.visible .direction-item,.motion-ready .reveal.visible .school-block,.motion-ready .reveal.visible .partner-tags span{opacity:1;translate:0 0}
.motion-ready .reveal.visible :is(.value-card,.route-card,.audience-card,.direction-item,.school-block,.partner-tags span):nth-child(1){transition-delay:.22s}
.motion-ready .reveal.visible :is(.value-card,.route-card,.audience-card,.direction-item,.school-block,.partner-tags span):nth-child(2){transition-delay:.28s}
.motion-ready .reveal.visible :is(.value-card,.route-card,.audience-card,.direction-item,.school-block,.partner-tags span):nth-child(3){transition-delay:.34s}
.motion-ready .reveal.visible :is(.value-card,.route-card,.audience-card,.direction-item,.school-block,.partner-tags span):nth-child(4){transition-delay:.40s}
.motion-ready .reveal.visible :is(.value-card,.route-card,.audience-card,.direction-item,.school-block,.partner-tags span):nth-child(5){transition-delay:.46s}
.motion-ready .reveal.visible .partner-tags span:nth-child(n+6){transition-delay:.52s}

@media (min-width:1001px){
  main>.section:not(.route-section):not(.directions),main>.join{content-visibility:auto;contain-intrinsic-size:900px 1400px}
}

@media (max-width:1100px){
  :root{--width:min(100% - 40px,1440px)}
  .desktop-nav{gap:18px}
  .hero-grid{grid-template-columns:1fr;align-items:start}
  .hero-copy{max-width:920px}
  .hero-art{height:600px;min-height:0;max-width:780px;margin-left:auto;width:100%}
  .hero-media-card{width:64%;right:10%}
  .idea-layout,.directions-layout,.partners-layout,.contacts-layout{grid-template-columns:1fr;gap:48px}
  .directions .section-heading{position:relative;top:auto;max-width:850px}
  .values-grid{grid-template-columns:repeat(3,1fr)}
  .value-card:nth-child(4),.value-card:nth-child(5){border-top:1px solid var(--line)}
  .audience-card{grid-column:span 6}
  .audience-card:nth-child(4),.audience-card-wide{grid-column:span 6}
  .school-card{grid-template-columns:1fr .76fr}
}

@media (max-width:760px){
  :root{--width:calc(100% - 28px);--radius:22px}
  html{scroll-padding-top:78px}
  .brand-ray{width:135vw;height:12vh;left:-45vw;opacity:.25}
  .brand-ray:nth-child(3),.brand-ray:nth-child(4),.motion-symbol-two{display:none}
  .motion-symbol-one{width:120vw;right:-58vw;top:22vh;opacity:.028}
  .site-header{padding:10px 0}.site-header.is-scrolled{padding-top:7px}
  .nav-shell{padding:7px 8px 7px 12px}.brand-mark{width:128px}
  .desktop-nav,.nav-cta{display:none}.menu-toggle{display:block}
  .mobile-nav{pointer-events:auto;position:absolute;display:block;top:67px;left:10px;right:10px;width:auto;padding:10px;border:1px solid var(--line);border-radius:20px;background:rgba(0,5,0,.94);backdrop-filter:blur(20px);box-shadow:0 30px 80px rgba(0,0,0,.42)}
  .mobile-nav[hidden]{display:none}.mobile-nav a{display:flex;align-items:center;justify-content:space-between;padding:14px 12px;border-bottom:1px solid rgba(241,218,191,.11);font-size:11px}.mobile-nav a:last-child{border-bottom:0;color:var(--almond)}
  .hero{padding-top:105px;padding-bottom:60px;min-height:auto}.hero-grid{gap:44px}
  .hero h1{font-size:clamp(48px,14.7vw,82px);line-height:.9;letter-spacing:-.055em;margin-top:20px}
  .hero-lead{font-size:15px;line-height:1.56}.hero-actions{margin-top:27px}.button{min-height:46px;padding-inline:16px}
  .hero-facts{margin-top:42px}.hero-facts div{padding-right:12px}.hero-facts div+div{padding-left:12px}.hero-facts strong{font-size:16px}.hero-facts span{font-size:8px}
  .hero-art{height:auto;aspect-ratio:4/5.3;max-height:560px;min-height:430px;overflow:hidden;border-radius:24px;background:radial-gradient(circle at 72% 18%,rgba(146,129,122,.11),transparent 34%)}
  .hero-art::before{inset:0;border-radius:24px}.hero-media-card{width:72%;height:71%;right:9%;top:8%;border-radius:17px}.hero-symbol{width:165%;left:-42%;bottom:-6%;opacity:.115}.art-kicker{top:16px;left:16px}.art-index{display:none}
  .route-chip{left:16px;right:16px;bottom:76px;font-size:8px;padding:12px}.art-note{left:16px;right:16px;bottom:17px}.art-note p{font-size:9px;max-width:205px}
  .ticker{padding:8px 0 15px}.ticker-track{animation-duration:21s}.ticker-run{gap:28px;padding-right:28px;font-size:9px}
  .section{padding-top:88px;padding-bottom:88px}.section-label{margin-bottom:31px}
  .idea-layout,.directions-layout,.partners-layout,.contacts-layout{gap:36px}
  .section-heading h2,.route-heading h2,.directions .section-heading h2,.partners .section-heading h2{font-size:clamp(40px,11vw,62px)}
  .lead-copy,.partners-copy>p{font-size:21px}.mission-card{margin-top:32px}.mission-card p{font-size:21px}
  .values-grid{grid-template-columns:1fr;margin-top:52px;border-top:0}.value-card,.value-card+.value-card{min-height:0;padding:20px 0;border-left:0;border-top:1px solid var(--line)}.value-card h3{margin:24px 0 0}.value-card p{max-width:470px}
  .route-heading{grid-template-columns:1fr;gap:16px;margin-bottom:36px}.route-heading>p:last-child{font-size:12px}.route-grid{grid-template-columns:1fr}.route-card{min-height:430px;padding:24px 20px}.route-card:hover{transform:none}.route-card h3{margin-top:54px;font-size:47px}.route-card>p{font-size:11px}
  .audience-grid{grid-template-columns:1fr;margin-top:48px}.audience-card,.audience-card:nth-child(4),.audience-card-wide{grid-column:auto;min-height:245px}.audience-card h3{margin-top:32px}.audience-card p{font-size:11px}.audience-format{padding-top:25px}
  .heading-note{font-size:11px}.direction-item{grid-template-columns:27px 1fr 20px;gap:11px;padding:22px 0}.direction-item:hover{padding-left:0}.direction-item h3{font-size:16px}.direction-item p{font-size:10px}.direction-item b{font-size:17px}
  .school-card{grid-template-columns:1fr;min-height:0}.school-main{min-height:470px;padding:31px 23px 34px}.school-main h2{font-size:47px;margin-top:33px}.school-main p{font-size:11px}.button-light{margin-top:auto}.school-side{padding:8px 23px 22px;border-left:0;border-top:1px solid rgba(0,5,0,.13)}.school-block strong{font-size:11px}
  .partner-tags{margin-top:34px}
  .contact-card{min-height:390px;padding:31px 23px}.contact-card h3{margin-top:32px;font-size:clamp(24px,8.9vw,42px);line-height:.96;letter-spacing:-.055em}.contact-links{padding-top:44px}.contact-links a{grid-template-columns:70px 1fr auto;gap:12px;padding:16px 0}.contact-links a:hover{padding-left:0;padding-right:0}.contact-links strong{font-size:11px}.contact-page{padding-top:90px;padding-bottom:70px}
  .join{padding-bottom:90px}.join-card{grid-template-columns:1fr;gap:31px;padding:33px 23px}.join-card h2{font-size:50px}.join-copy>p{font-size:11px}
  .footer-row{grid-template-columns:1fr auto;gap:20px}.footer-row p{grid-column:1/-1;grid-row:2;text-align:left}.back-top{font-size:9px}
}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
  .brand-motion-bg,.brand-motion-bg::after,.brand-rays,.motion-symbol,.hero-symbol,.art-orbit{transform:none!important}
  .reveal .section-label,.reveal .section-heading,.reveal .route-heading,.reveal .idea-copy,.reveal .values-grid,.reveal .route-grid,.reveal .audience-grid,.reveal .direction-list,.reveal .school-card,.reveal .partners-copy,.reveal .contacts-layout,.reveal .join-card,.hero.reveal .hero-copy>*,.hero.reveal .hero-art,.reveal .value-card,.reveal .route-card,.reveal .audience-card,.reveal .direction-item,.reveal .school-block,.reveal .partner-tags span{opacity:1!important;transform:none!important;translate:none!important}
}

/* Contact links mobile visibility fix */
.contact-links a[href^="tel:"] strong{
  font-size:clamp(18px,2.2vw,28px);
  font-weight:700;
  letter-spacing:-.04em;
}
.contact-links a[href^="tel:"] span{
  opacity:.75;
}
@media(max-width:760px){
  .contact-links a{
    grid-template-columns:minmax(0,1fr) auto;
    grid-template-areas:"label arrow" "value arrow";
    gap:8px 12px;
    padding:18px 0;
  }
  .contact-links span{grid-area:label;font-size:9px;}
  .contact-links strong{grid-area:value;font-size:13px;line-height:1.35;}
  .contact-links b{grid-area:arrow;align-self:center;justify-self:end;}
  .contact-links a[href^="tel:"] strong{
    display:block;
    font-size:clamp(16px,5.4vw,22px);
    line-height:1.2;
    white-space:nowrap;
  }
}

/* Spacing refinement — keep the visual system, add more breathing room. */
.hero{padding-bottom:clamp(96px,9.5vw,142px)}
.hero-grid{gap:clamp(64px,8vw,132px)}
.hero-lead{margin-top:42px}
.hero-actions{margin-top:50px;gap:14px}
.hero-facts{margin-top:clamp(70px,7vw,96px);padding-top:28px}

.section{padding-top:clamp(160px,15vw,240px);padding-bottom:clamp(160px,15vw,240px)}
.section-label{margin-bottom:clamp(56px,5.5vw,82px)}
.idea-layout{gap:clamp(74px,10vw,170px)}
.mission-card{margin-top:clamp(62px,7vw,94px);padding-top:32px}
.mission-card p{margin-top:38px}
.values-grid{margin-top:clamp(102px,10vw,150px)}
.value-card{min-height:270px;padding:32px 32px 22px 0}
.value-card+.value-card{padding-left:32px}
.value-card h3{padding-top:42px}
.value-card p{margin-top:20px}

.route-heading{column-gap:82px;margin-bottom:clamp(72px,7vw,102px)}
.route-card{min-height:clamp(560px,48vw,700px);padding:clamp(42px,4.3vw,68px) clamp(34px,4.4vw,70px)}
.route-card-light{background:var(--almond);color:var(--black)}
.route-card h3{margin:clamp(86px,7.5vw,116px) 0 34px}
.route-card>p{line-height:1.72}
.route-card li{padding:15px 0}

.audience-grid{gap:18px;margin-top:clamp(88px,9vw,132px)}
.audience-card{min-height:360px;padding:34px}
.audience-card h3{margin-top:clamp(60px,6.5vw,92px)}
.audience-card p{margin-top:24px;line-height:1.68}
.audience-format{padding-top:50px}
.audience-card-accent .audience-format{padding-top:30px}

.directions-layout{gap:clamp(80px,10vw,160px)}
.heading-note{margin-top:42px}
.direction-item{gap:26px;padding:40px 0}
.direction-item p{margin-top:16px;line-height:1.66}

.school-main{padding:clamp(64px,6.8vw,100px)}
.school-main h2{margin-top:56px}
.school-main p{margin:44px 0 64px;line-height:1.72}
.school-side{padding:46px}
.school-block{padding:30px 0}
.school-block strong{margin-top:20px;line-height:1.62}

.partners-layout,.contacts-layout{gap:clamp(80px,10vw,168px)}
.partner-tags{gap:12px;margin-top:68px}
.partner-tags span{padding:14px 18px}
.contact-card{min-height:560px;padding:clamp(52px,5.7vw,86px)}
.contact-card h3{margin-top:54px}
.contact-links{padding-top:84px}
.contact-links a{gap:28px;padding:28px 0}
.contact-back{margin-top:56px}

.join{padding-top:clamp(86px,8vw,120px);padding-bottom:clamp(190px,17vw,260px)}
.join-card{gap:clamp(86px,10vw,170px);padding:clamp(78px,7.5vw,118px)}
.join-card h2{margin-top:34px}
.join-copy>p{line-height:1.78;max-width:600px}
.join-actions{gap:14px;margin-top:62px}
.site-footer{padding:68px 0 82px}
.footer-row{gap:44px}

/* Header breakpoint: switch before the desktop navigation starts to crowd. */
@media (max-width:1020px){
  .site-header{padding:14px 0}.site-header.is-scrolled{padding-top:9px}
  .nav-shell{grid-template-columns:1fr auto;gap:18px;min-height:62px;padding:8px 10px 8px 16px}
  .brand-mark{width:142px}
  .desktop-nav,.nav-cta{display:none}
  .menu-toggle{display:block;justify-self:end;padding:11px 15px}
  .mobile-nav{pointer-events:auto;position:absolute;display:block;top:78px;left:20px;right:20px;width:auto;padding:12px;border:1px solid var(--line);border-radius:22px;background:rgba(0,5,0,.96);backdrop-filter:blur(20px);box-shadow:0 30px 80px rgba(0,0,0,.42)}
  .mobile-nav[hidden]{display:none}
  .mobile-nav a{display:flex;align-items:center;justify-content:space-between;padding:16px 14px;border-bottom:1px solid rgba(241,218,191,.11);font-size:11px}
  .mobile-nav a:last-child{border-bottom:0;color:var(--almond)}
}

@media (max-width:1100px){
  .idea-layout,.directions-layout,.partners-layout,.contacts-layout{gap:68px}
}

@media (max-width:760px){
  .site-header{padding:11px 0}.site-header.is-scrolled{padding-top:8px}
  .nav-shell{padding:8px 9px 8px 14px;min-height:60px}.brand-mark{width:132px}
  .mobile-nav{top:72px;left:14px;right:14px;padding:11px}
  .mobile-nav a{padding:16px 13px}

  .hero{padding-bottom:86px}
  .hero-grid{gap:62px}
  .hero-lead{margin-top:34px}
  .hero-actions{margin-top:44px;gap:12px}
  .hero-facts{margin-top:60px;padding-top:24px}
  .button{min-height:50px;padding-inline:18px}

  .section{padding-top:116px;padding-bottom:116px}
  .section-label{margin-bottom:46px}
  .idea-layout,.directions-layout,.partners-layout,.contacts-layout{gap:52px}
  .mission-card{margin-top:48px;padding-top:30px}
  .mission-card p{margin-top:34px}
  .values-grid{margin-top:76px}
  .value-card,.value-card+.value-card{padding:32px 0}
  .value-card h3{margin-top:0;padding-top:36px}
  .value-card p{margin-top:20px}

  .route-heading{gap:22px;margin-bottom:56px}
  .route-card{min-height:500px;padding:34px 26px}
  .route-card h3{margin-top:72px;margin-bottom:32px}
  .route-card li{padding:14px 0}

  .audience-grid{gap:16px;margin-top:72px}
  .audience-card,.audience-card:nth-child(4),.audience-card-wide{min-height:300px;padding:32px 26px}
  .audience-card h3{margin-top:46px}
  .audience-card p{margin-top:22px}
  .audience-format{padding-top:38px}
  .audience-card-accent .audience-format{padding-top:34px}

  .heading-note{margin-top:36px}
  .direction-item{gap:16px;padding:34px 0}
  .direction-item p{margin-top:14px}

  .school-main{min-height:540px;padding:44px 30px 50px}
  .school-main h2{margin-top:44px}
  .school-main p{margin:38px 0 52px}
  .school-side{padding:18px 30px 34px}
  .school-block{padding:29px 0}
  .school-block strong{margin-top:18px}

  .partner-tags{margin-top:48px;gap:10px}
  .contact-card{min-height:460px;padding:44px 30px}
  .contact-card h3{margin-top:44px}
  .contact-links{padding-top:64px}
  .contact-links a{gap:12px 15px;padding:24px 0}
  .contact-back{margin-top:48px}

  .join{padding-top:72px;padding-bottom:146px}
  .join-card{gap:52px;padding:50px 30px}
  .join-card h2{margin-top:28px}
  .join-actions{gap:12px;margin-top:52px}
  .site-footer{padding:58px 0 70px}
  .footer-row{gap:30px}
}

/* Spacious refinement override */
:root{--width:min(1440px,calc(100% - 96px))}
.site-header{padding:8px 0}
.nav-shell{min-height:54px;padding:5px 9px 5px 14px;gap:20px}
.brand-mark{width:108px}
.desktop-nav{gap:clamp(18px,2vw,28px);font-size:9px}
.nav-cta{min-height:40px;padding-inline:18px}

section{scroll-margin-top:120px}
.hero{padding-top:clamp(160px,14vw,220px);padding-bottom:clamp(100px,10vw,150px)}
.hero-lead{margin-top:42px;max-width:680px}
.hero-actions{margin-top:46px;gap:16px}

.section{padding-block:clamp(110px,12vw,190px)}
.section-heading h2,.route-heading h2{margin-top:28px}
.lead-copy{margin-top:18px}
.values-grid{margin-top:clamp(100px,12vw,160px)}
.value-card{min-height:260px;padding-top:34px}
.value-card p{margin-top:22px}

.route-heading{margin-bottom:clamp(70px,8vw,120px)}
.route-card{padding:clamp(42px,5vw,72px);min-height:clamp(580px,55vw,760px)}
.route-card h3{margin-top:clamp(90px,10vw,140px);margin-bottom:34px}
.route-card ul{margin-top:70px}
.route-card li{padding:14px 0}

.audience-grid{margin-top:clamp(90px,10vw,140px);gap:20px}
.audience-card{padding:36px;min-height:380px}
.audience-card h3{margin-top:clamp(60px,7vw,100px)}
.audience-card p{margin-top:26px}

.directions-layout,.idea-layout,.partners-layout{gap:clamp(70px,10vw,160px)}
.direction-item{padding:38px 0}

.school-card{min-height:720px}
.school-main{padding:clamp(56px,7vw,96px)}
.school-main h2{margin-top:48px}
.school-main p{margin-top:44px}
.button-light{margin-top:70px}

/* final CTA breathing room */
.join-card,.cta-card,.contacts-card{padding:clamp(48px,7vw,96px)!important}
.join-card h2,.cta-card h2{margin-bottom:34px!important}
.join-card p,.cta-card p{max-width:720px;line-height:1.75}
.join-card .button,.cta-card .button{margin-top:58px}

/* heard block palette */
.route-card-light{background:var(--almond)!important}

@media(max-width:1020px){
 :root{--width:min(100% - 48px)}
 .site-header{padding:16px 0}
 .nav-shell{min-height:68px;padding:10px 14px 10px 18px}
 .desktop-nav,.nav-cta{display:none}
 .menu-toggle{display:block;justify-self:end}
}

/* Mobile stabilization — final cascade layer.
   These rules intentionally live last so desktop spacing refinements cannot leak back into phone layouts. */
@media (max-width:1020px){
  :root{--width:min(calc(100% - 32px),1440px)}
  html{scroll-padding-top:92px}
  body.menu-open{overflow:hidden;overscroll-behavior:none}
  .site-header{padding:max(12px,env(safe-area-inset-top)) 0 0}
  .site-header.is-scrolled{padding-top:max(8px,env(safe-area-inset-top))}
  .nav-shell{grid-template-columns:1fr auto;min-height:62px;padding:8px 9px 8px 16px;gap:14px}
  .brand-mark{width:140px}
  .desktop-nav,.nav-cta{display:none}
  .menu-toggle{
    display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:44px;
    padding:0 14px 0 16px;border-color:rgba(241,218,191,.2);background:rgba(255,255,255,.018);
    font-size:9px;font-weight:560;letter-spacing:.04em;text-transform:uppercase;transition:background .25s ease,color .25s ease,border-color .25s ease
  }
  .menu-toggle::after{
    content:"";width:16px;height:11px;flex:0 0 auto;background:
      linear-gradient(currentColor,currentColor) 0 0/100% 1px no-repeat,
      linear-gradient(currentColor,currentColor) 0 50%/100% 1px no-repeat,
      linear-gradient(currentColor,currentColor) 0 100%/100% 1px no-repeat;
    opacity:.85
  }
  .menu-toggle[aria-expanded="true"]{background:var(--almond);border-color:var(--almond);color:var(--black)}
  .menu-toggle[aria-expanded="true"]::after{height:14px;background:
    linear-gradient(45deg,transparent 47%,currentColor 48% 52%,transparent 53%),
    linear-gradient(-45deg,transparent 47%,currentColor 48% 52%,transparent 53%);opacity:1}
  .mobile-nav{
    pointer-events:auto;position:fixed;z-index:3;display:block;top:calc(max(12px,env(safe-area-inset-top)) + 70px);left:16px;right:16px;width:auto;
    max-height:calc(100dvh - max(12px,env(safe-area-inset-top)) - 86px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;
    padding:10px;border:1px solid rgba(241,218,191,.2);border-radius:22px;background:rgba(0,5,0,.97);backdrop-filter:blur(24px);
    box-shadow:0 28px 90px rgba(0,0,0,.52)
  }
  .mobile-nav[hidden]{display:none}
  .mobile-nav a{display:flex;align-items:center;justify-content:space-between;min-height:50px;padding:14px 13px;border-bottom:1px solid rgba(241,218,191,.11);font-size:10px;line-height:1.35}
  .mobile-nav a:last-child{border-bottom:0;color:var(--almond)}
}

@media (max-width:760px){
  :root{--width:calc(100% - 28px);--radius:20px}
  html{scroll-padding-top:78px}
  body{font-size:15px}
  a,button{touch-action:manipulation}

  .site-header{padding:max(9px,env(safe-area-inset-top)) 0 0}
  .site-header.is-scrolled{padding-top:max(7px,env(safe-area-inset-top))}
  .nav-shell{min-height:56px;padding:6px 7px 6px 12px;gap:10px}
  .brand-mark{width:124px}
  .menu-toggle{min-height:42px;padding-inline:13px;font-size:8px}
  .mobile-nav{top:calc(max(9px,env(safe-area-inset-top)) + 62px);left:14px;right:14px;max-height:calc(100dvh - max(9px,env(safe-area-inset-top)) - 76px);padding:9px;border-radius:19px}
  .mobile-nav a{min-height:48px;padding:13px 12px;font-size:10px}

  .brand-motion-bg::after{opacity:.15;animation-duration:24s}
  .brand-ray{animation-duration:20s;will-change:auto}
  .motion-symbol{will-change:auto}

  .hero{min-height:auto;padding-top:100px;padding-bottom:74px}
  .hero-grid{grid-template-columns:1fr;gap:48px}
  .hero-copy{padding-bottom:0}
  .hero h1{font-size:clamp(44px,13.4vw,66px);line-height:.91;letter-spacing:-.058em;margin-top:19px}
  .hero-lead{margin-top:30px;font-size:14px;line-height:1.62}
  .hero-actions{margin-top:34px;gap:10px}
  .button{min-height:48px;padding-inline:16px;font-size:9px}
  .hero-facts{margin-top:48px;padding-top:22px;grid-template-columns:repeat(3,minmax(0,1fr))}
  .hero-facts div{min-width:0;padding-right:10px}
  .hero-facts div+div{padding-left:10px}
  .hero-facts strong{font-size:15px}
  .hero-facts span{font-size:7.5px;line-height:1.45}
  .hero-art{height:auto;min-height:0;max-height:none;aspect-ratio:4/5.25;border-radius:22px}
  .hero-art::before{inset:0;border-radius:22px}
  .hero-media-card{width:74%;height:70%;right:8%;top:7%;border-radius:16px}
  .route-chip{left:14px;right:14px;bottom:72px;padding:11px;font-size:7.5px;gap:7px}
  .art-note{left:14px;right:14px;bottom:15px}
  .art-note p{font-size:8px;line-height:1.45;max-width:210px}

  .ticker{padding:7px 0 13px}
  .ticker-run{font-size:8px;gap:24px;padding-right:24px}

  .section{padding-top:92px;padding-bottom:92px}
  .section-label{margin-bottom:36px}
  .idea-layout,.directions-layout,.partners-layout,.contacts-layout{grid-template-columns:1fr;gap:42px}
  .section-heading h2,.route-heading h2,.directions .section-heading h2,.partners .section-heading h2{margin-top:20px;font-size:clamp(38px,10.7vw,54px);line-height:.95}
  .lead-copy,.partners-copy>p{font-size:20px;line-height:1.36}
  .mission-card{margin-top:40px;padding-top:24px}
  .mission-card p{margin-top:28px;font-size:20px;line-height:1.34}

  .values-grid{grid-template-columns:1fr;margin-top:58px;border-top:0}
  .value-card,.value-card+.value-card{min-height:0;padding:26px 0;border-left:0;border-top:1px solid var(--line)}
  .value-card:hover{transform:none}
  .value-card h3{margin:0;padding-top:30px;font-size:16px}
  .value-card p{margin-top:16px;font-size:10px}

  .route-heading{grid-template-columns:1fr;gap:17px;margin-bottom:44px}
  .route-heading>p:last-child{font-size:11px}
  .route-grid{grid-template-columns:1fr}
  .route-card{min-height:460px;padding:30px 22px}
  .route-card:hover{transform:none}
  .route-card h3{margin:62px 0 28px;font-size:clamp(40px,12vw,50px)}
  .route-card>p{font-size:10.5px;line-height:1.68}
  .route-card ul{margin:46px 0 0}
  .route-card li{padding:12px 0;font-size:8px}

  .audience-grid{grid-template-columns:1fr;gap:13px;margin-top:58px}
  .audience-card,.audience-card:nth-child(4),.audience-card-wide{grid-column:auto;min-height:275px;padding:27px 23px}
  .audience-card:hover{transform:none}
  .audience-card h3,.audience-card-accent h3{margin-top:42px;font-size:22px}
  .audience-card p{margin-top:18px;font-size:10.5px;line-height:1.62}
  .audience-format{padding-top:30px}

  .heading-note{margin-top:30px;font-size:10.5px}
  .direction-item{grid-template-columns:26px minmax(0,1fr) 20px;gap:11px;padding:27px 0}
  .direction-item:hover{padding-left:0}
  .direction-item h3{font-size:16px;line-height:1.25}
  .direction-item p{margin-top:10px;font-size:9.5px}
  .direction-item b{font-size:17px}

  .school-card{grid-template-columns:1fr;min-height:0;border-radius:20px}
  .school-main{min-height:480px;padding:38px 24px 36px}
  .school-main h2{margin-top:38px;font-size:clamp(42px,12vw,54px)}
  .school-main p{margin:30px 0 0;font-size:11px;line-height:1.68}
  .button-light{margin-top:auto}
  .school-side{padding:10px 24px 26px;border-left:0;border-top:1px solid rgba(0,5,0,.13)}
  .school-block{padding:24px 0}
  .school-block strong{font-size:10.5px}

  .partner-tags{margin-top:38px;gap:8px}
  .partner-tags span{padding:10px 12px;font-size:8px}

  .contact-card{min-height:420px;padding:36px 24px;border-radius:20px}
  .contact-card h3{margin-top:36px;font-size:clamp(29px,9vw,40px)}
  .contact-links{padding-top:48px}
  .contact-links a{padding:18px 0}
  .contact-page{padding-top:96px;padding-bottom:76px}

  .join{padding-top:62px;padding-bottom:112px}
  .join-card{grid-template-columns:1fr;gap:42px;padding:38px 24px!important;border-radius:20px}
  .join-card h2{margin-top:24px;margin-bottom:0!important;font-size:clamp(44px,12vw,56px)}
  .join-copy>p{font-size:10.5px;line-height:1.72}
  .join-actions{margin-top:38px;gap:10px}
  .join-card .button,.cta-card .button{margin-top:0}

  .site-footer{padding:48px 0 58px}
  .footer-row{grid-template-columns:1fr auto;gap:18px}
  .footer-row .brand-mark{width:120px}
  .footer-row p{grid-column:1/-1;grid-row:2;text-align:left;font-size:8px}
  .back-top{font-size:8px}
}

@media (max-width:430px){
  :root{--width:calc(100% - 24px)}
  .brand-mark{width:116px}
  .menu-toggle{padding-inline:11px;gap:7px}
  .hero{padding-top:94px}
  .hero h1{font-size:clamp(42px,13.2vw,57px)}
  .hero-actions .button{flex:1 1 150px}
  .hero-facts span{font-size:7px}
  .route-card{min-height:440px;padding:28px 20px}
  .school-main{min-height:455px;padding-inline:21px}
  .contact-card,.join-card{padding-left:21px!important;padding-right:21px!important}
}

/* Final publication stabilization: compact navigation, resilient leader card, seamless ticker. */
@media (min-width:1021px){
  .site-header{padding:8px 0}
  .site-header.is-scrolled{padding-top:5px}
  .nav-shell{min-height:54px;padding:5px 9px 5px 14px;gap:20px}
  .brand-mark{width:108px}
  .desktop-nav{gap:clamp(18px,2vw,28px);font-size:9px}
  .nav-cta{min-height:40px;padding-inline:18px}
}

.ticker{isolation:isolate}
.ticker-track{display:flex;width:max-content;transform:translate3d(0,0,0);backface-visibility:hidden;will-change:transform;animation:tickerCycle 28s linear infinite}
.ticker-run{flex:0 0 auto;white-space:nowrap}
@keyframes tickerCycle{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}

.contact-card{
  min-height:clamp(440px,38vw,520px);
  padding:clamp(38px,4.5vw,66px);
}
.contact-card h3{max-width:11ch;text-wrap:balance}
.contact-links{padding-top:clamp(48px,5vw,68px)}
.contact-links a{grid-template-columns:88px minmax(0,1fr) 22px;gap:18px;padding:21px 0}
.contact-links strong{overflow-wrap:anywhere}
.contact-links a[href^="tel:"] strong{
  font-size:clamp(14px,1.45vw,20px);
  line-height:1.25;
  font-variant-numeric:tabular-nums;
  white-space:nowrap;
}

@media (max-width:1020px){
  .site-header{padding:max(7px,env(safe-area-inset-top)) 0 0}
  .site-header.is-scrolled{padding-top:max(5px,env(safe-area-inset-top))}
  .nav-shell{min-height:52px;padding:5px 6px 5px 12px;gap:9px}
  .brand-mark{width:104px}
  .menu-toggle{min-height:38px;padding-inline:11px}
  .mobile-nav{top:calc(max(7px,env(safe-area-inset-top)) + 61px)}
}

@media (max-width:760px){
  .site-header{padding:max(6px,env(safe-area-inset-top)) 0 0}
  .site-header.is-scrolled{padding-top:max(4px,env(safe-area-inset-top))}
  .nav-shell{min-height:48px;padding:4px 5px 4px 10px}
  .brand-mark{width:96px}
  .menu-toggle{min-height:36px;padding-inline:10px;font-size:8px}
  .mobile-nav{top:calc(max(6px,env(safe-area-inset-top)) + 56px)}
  .ticker-track{animation-duration:20s}
  .contact-card{min-height:390px;padding:30px 22px!important}
  .contact-card h3{margin-top:30px;font-size:clamp(27px,8.5vw,38px)}
  .contact-links{padding-top:40px}
  .contact-links a{grid-template-columns:minmax(0,1fr) 20px;grid-template-areas:"label arrow" "value arrow";gap:7px 10px;padding:17px 0}
  .contact-links span{grid-area:label}
  .contact-links strong{grid-area:value;font-size:12px;line-height:1.35}
  .contact-links b{grid-area:arrow;align-self:center;justify-self:end}
  .contact-links a[href^="tel:"] strong{font-size:clamp(14px,4.6vw,18px);white-space:nowrap}
}

@media (max-width:360px){
  .contact-card{padding-left:18px!important;padding-right:18px!important}
  .contact-links a[href^="tel:"] strong{font-size:13px;letter-spacing:-.045em}
}


/* Final visual polish — release pass for GitHub Pages. */
html{overflow-x:clip}
body{max-width:100%;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
:is(h1,h2,h3){text-wrap:balance}
:is(p,li){text-wrap:pretty}
a:focus-visible,button:focus-visible{outline:2px solid var(--almond);outline-offset:4px}
:is(.hero-grid,.idea-layout,.route-heading,.directions-layout,.partners-layout,.contacts-layout,.school-card,.join-card)>*{min-width:0}

/* Desktop rhythm: keep the editorial scale, remove oversized dead zones. */
@media (min-width:1021px){
  .hero{padding-top:clamp(138px,11vw,178px);padding-bottom:clamp(86px,7vw,116px)}
  .hero-lead{margin-top:34px}
  .hero-actions{margin-top:38px;gap:12px}
  .hero-facts{margin-top:clamp(54px,5vw,72px);padding-top:22px}

  .section{padding-block:clamp(112px,10vw,158px)}
  .section-label{margin-bottom:clamp(40px,3.8vw,56px)}
  .values-grid{margin-top:clamp(72px,7vw,108px)}
  .value-card{min-height:238px}
  .route-heading{margin-bottom:clamp(56px,6vw,84px)}
  .route-card{min-height:clamp(510px,43vw,640px);padding:clamp(36px,3.8vw,58px)}
  .route-card h3{margin-top:clamp(70px,6.5vw,96px)}
  .route-card ul{margin-top:54px}
  .audience-grid{margin-top:clamp(66px,7vw,100px);gap:16px}
  .audience-card{min-height:340px;padding:32px}
  .audience-card h3{margin-top:clamp(48px,5.5vw,76px)}
  .direction-item{padding:32px 0}
  .school-card{min-height:650px}
  .school-main{padding:clamp(50px,5.7vw,82px)}
  .school-main h2{margin-top:42px}
  .school-main p{margin-top:34px}
  .button-light{margin-top:58px}
  .partner-tags{margin-top:52px}
  .join{padding-top:clamp(72px,7vw,104px);padding-bottom:clamp(140px,12vw,190px)}
  .join-card{gap:clamp(60px,8vw,120px);padding:clamp(54px,6vw,86px)!important}
  .join-card .button,.cta-card .button{margin-top:0}
  .join-actions{margin-top:46px}
}

/* Tablet and mobile: clearer type, tighter rhythm, no accidental horizontal growth. */
@media (max-width:1020px){
  .hero-grid>*{min-width:0}
  .mobile-nav a{letter-spacing:-.01em}
}

@media (max-width:760px){
  .hero{padding-top:92px;padding-bottom:64px}
  .hero-grid{gap:42px}
  .hero h1{font-size:clamp(42px,12.9vw,62px);line-height:.92}
  .hero-lead{margin-top:26px;font-size:14px;line-height:1.66}
  .hero-actions{margin-top:30px}
  .hero-facts{margin-top:42px;padding-top:18px}
  .hero-facts span{font-size:8px;line-height:1.45}

  .ticker{opacity:.82}
  .ticker-run{font-size:8.5px;letter-spacing:.09em}

  .section{padding-top:84px;padding-bottom:84px}
  .section-label{margin-bottom:32px}
  .idea-layout,.directions-layout,.partners-layout,.contacts-layout{gap:36px}
  .section-heading h2,.route-heading h2,.directions .section-heading h2,.partners .section-heading h2{font-size:clamp(36px,10.2vw,50px);line-height:.97}
  .lead-copy,.partners-copy>p{font-size:19px;line-height:1.4}
  .mission-card{margin-top:34px}
  .mission-card p{font-size:19px;line-height:1.4}

  .values-grid{margin-top:50px}
  .value-card,.value-card+.value-card{padding:24px 0}
  .value-card h3{padding-top:26px;font-size:16px}
  .value-card p{margin-top:14px;font-size:11px;line-height:1.65}

  .route-heading{margin-bottom:38px}
  .route-heading>p:last-child{font-size:11.5px;line-height:1.68}
  .route-card{min-height:420px;padding:28px 21px}
  .route-card h3{margin:52px 0 24px;font-size:clamp(38px,11.2vw,48px)}
  .route-card>p{font-size:11.5px;line-height:1.7}
  .route-card ul{margin-top:38px}
  .route-card li{padding:11px 0;font-size:9px}

  .audience-grid{margin-top:50px}
  .audience-card,.audience-card:nth-child(4),.audience-card-wide{min-height:260px;padding:25px 21px}
  .audience-card h3,.audience-card-accent h3{margin-top:36px;font-size:21px}
  .audience-card p{font-size:11px;line-height:1.68}
  .audience-format{padding-top:26px;font-size:8.5px;line-height:1.55}

  .heading-note{font-size:11px;line-height:1.68}
  .direction-item{padding:24px 0}
  .direction-item h3{font-size:16px}
  .direction-item p{font-size:10.5px;line-height:1.65}

  .school-main{min-height:440px;padding:34px 22px}
  .school-main h2{margin-top:32px;font-size:clamp(39px,11vw,50px)}
  .school-main p{margin-top:26px;font-size:11.5px;line-height:1.72}
  .school-block{padding:22px 0}
  .school-block strong{font-size:11px;line-height:1.55}

  .partner-tags{margin-top:34px}
  .partner-tags span{font-size:8.5px}

  .contact-card{min-height:380px;padding:28px 21px!important}
  .contact-card h3{margin-top:28px}
  .contact-links{padding-top:34px}
  .contact-links a{padding:15px 0}
  .contact-links strong{font-size:12.5px}

  .join{padding-top:54px;padding-bottom:96px}
  .join-card{gap:34px;padding:34px 22px!important}
  .join-card h2{font-size:clamp(40px,11.4vw,52px)}
  .join-copy>p{font-size:11.5px;line-height:1.72}
  .join-actions{margin-top:32px}
  .site-footer{padding:42px 0 50px}
  .footer-row p{font-size:8.5px}
}

@media (max-width:360px){
  .hero h1{font-size:clamp(40px,12.5vw,46px)}
  .hero-actions .button{flex-basis:100%}
  .section-heading h2,.route-heading h2,.directions .section-heading h2,.partners .section-heading h2{font-size:clamp(34px,10.6vw,42px)}
  .contact-links a[href^="tel:"] strong{font-size:13.5px;letter-spacing:-.04em}
}



/* ===== Final typography pass: larger utility copy and stable font metrics. ===== */
html,body,button,a,input,textarea,select{
  font-synthesis:none;
  font-kerning:normal;
  text-rendering:optimizeLegibility;
}
body{letter-spacing:-.008em}

/* Header: keep compact geometry, restore readable brandbook-scale labels. */
.desktop-nav{
  font-size:11px;
  line-height:1.15;
  font-weight:400;
  letter-spacing:-.012em;
}
.nav-cta,.button{
  font-size:11px;
  line-height:1.1;
  font-weight:500;
  letter-spacing:-.012em;
}

/* Hero: normalize display metrics so Unbounded and Ostrovsky share one optical rhythm. */
.eyebrow{
  font-size:10.5px;
  line-height:1.35;
  font-weight:600;
  letter-spacing:.13em;
}
.hero h1{
  font-weight:700;
  line-height:.90;
  letter-spacing:-.055em;
}
.hero h1 em,
.section-heading h2 em,
.route-heading h2 em,
.school-main h2 em,
.join-card h2 em{
  letter-spacing:-.035em;
  line-height:.95;
}
.hero-lead{
  font-size:clamp(16px,1.35vw,21px);
  line-height:1.62;
  letter-spacing:-.012em;
  font-weight:300;
}
.hero-facts span{font-size:10.5px;line-height:1.45}
.art-kicker{font-size:9px;line-height:1.2}
.route-chip{font-size:10px;line-height:1.25}
.art-note p{font-size:11px;line-height:1.58}
.art-note span,.art-index{font-size:9px}

/* Small editorial labels were visually under-scale on large monitors. */
.section-label{font-size:10px}
.card-label,
.value-card span,.audience-format,.audience-age,.step-top,.school-block span{font-size:10px}
.value-card p{font-size:12px;line-height:1.62}
.route-heading>p:last-child{font-size:13.5px;line-height:1.68}
.route-card>p{font-size:12.5px;line-height:1.68}
.route-card li{font-size:9.5px}
.audience-card p{font-size:12px;line-height:1.66}
.heading-note{font-size:12.5px;line-height:1.68}
.direction-item p{font-size:11.5px;line-height:1.64}
.school-main p{font-size:13.5px;line-height:1.68}
.partner-tags span{font-size:9.5px}
.join-copy>p{font-size:13.5px;line-height:1.68}

@media(max-width:760px){
  .mobile-nav a{font-size:11px;line-height:1.4}
  .eyebrow{font-size:9.5px;line-height:1.4;letter-spacing:.12em}
  .hero h1{line-height:.92;letter-spacing:-.048em}
  .hero-lead{font-size:15px;line-height:1.65}
  .hero-facts span{font-size:8.5px;line-height:1.5}
  .route-chip{font-size:8.5px}
  .art-note p{font-size:9.5px;line-height:1.55}
  .section-label{font-size:9.5px}
  .value-card p{font-size:11.5px}
  .route-card>p{font-size:11.5px}
  .route-card li{font-size:9px}
  .audience-card p{font-size:11.5px}
  .direction-item p{font-size:10.5px}
  .school-main p{font-size:11.5px}
  .partner-tags span{font-size:9px}
  .join-copy>p{font-size:11.5px}
}

/* ===== Brandbook ticker clone: same geometry, typography and 3-copy cyclic motion. ===== */
.ticker{
  border:0;
  overflow:hidden;
  position:relative;
  white-space:nowrap;
  padding:10px 0 18px;
  color:var(--almond);
  font-family:"Unbounded",Arial,sans-serif!important;
  font-size:16px;
  font-weight:350;
  line-height:1.5;
  letter-spacing:-.008em;
  opacity:.72;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  animation:tickerGlow 3s ease-in-out infinite;
  isolation:auto;
}
.ticker::before{content:none}
.ticker-track{
  display:flex!important;
  width:max-content!important;
  min-width:0!important;
  padding-left:0!important;
  word-spacing:0!important;
  transform:none;
  backface-visibility:visible;
  will-change:transform;
  animation:npTickerCycle 30s linear infinite;
}
.ticker-run{
  display:flex;
  flex:none;
  align-items:center;
  gap:clamp(24px,3.2vw,56px);
  padding-right:clamp(24px,3.2vw,56px);
  font-size:inherit;
  letter-spacing:inherit;
  white-space:normal;
}
.ticker-run span{
  flex:none;
  white-space:nowrap;
}
@keyframes npTickerCycle{
  from{transform:translate3d(0,0,0)}
  to{transform:translate3d(-33.333333%,0,0)}
}
@keyframes tickerGlow{50%{letter-spacing:.12em}}
@media(max-width:660px){
  .ticker{font-size:14px;line-height:1.5}
  .ticker-track{animation-duration:20s}
  .ticker-run{gap:28px;padding-right:28px;font-size:inherit;letter-spacing:inherit}
}
@media(prefers-reduced-motion:reduce){
  .ticker-track{animation:none}
}

@media (prefers-reduced-motion:reduce){
  .hero-media-card .hero-slide{transition:none!important;filter:none!important;clip-path:none!important}
  .hero-media-card::before{display:none!important}
}

/* ===== Final footer QA: compact ending + clearer return-to-top controls. ===== */
.join{padding-bottom:clamp(76px,7vw,108px)}
.site-footer{padding:28px 0 34px;border-top:1px solid rgba(241,218,191,.14)}
.footer-row{min-height:68px;gap:28px;color:rgba(255,251,255,.50);font-size:10px;line-height:1.4}
.footer-row .brand-mark{width:132px;transition:opacity .22s ease,transform .28s var(--ease)}
.footer-row .brand-mark:hover{opacity:.86;transform:translateY(-2px)}
.footer-row p{letter-spacing:.01em}
.back-top{padding:10px 0;font-size:10px;color:rgba(255,251,255,.50);text-underline-offset:4px}
.back-top:hover{color:var(--almond);transform:translateY(-2px)}

@media(max-width:760px){
  .join{padding-bottom:68px}
  .site-footer{padding:24px 0 28px}
  .footer-row{min-height:64px;grid-template-columns:minmax(0,1fr) auto;gap:12px 20px;font-size:9px}
  .footer-row .brand-mark{width:112px}
  .footer-row p{grid-column:1/-1;grid-row:2;margin-top:0;text-align:left;font-size:9px;line-height:1.45}
  .back-top{font-size:9px;padding:9px 0}
}

@media(max-width:360px){
  .join{padding-bottom:58px}
  .site-footer{padding:22px 0 26px}
  .footer-row .brand-mark{width:106px}
}

/* ===== Concept expansion: benefits, project launch, proof, proposal. ===== */
.section-compact{padding-top:clamp(118px,10.5vw,168px);padding-bottom:clamp(118px,10.5vw,168px)}

/* Benefits */
.benefits-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.72fr);gap:clamp(62px,8vw,126px);align-items:end}
.benefits-head>*{min-width:0}
.benefits-lead{margin:0;max-width:620px;color:rgba(255,251,255,.74);font-size:clamp(16px,1.45vw,22px);line-height:1.58;letter-spacing:-.025em}
.benefits-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:clamp(72px,7.5vw,112px);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.benefit-card{min-width:0;min-height:330px;padding:34px 34px 30px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;flex-direction:column;background:linear-gradient(145deg,rgba(255,255,255,.018),transparent 68%);transition:background .3s ease,transform .35s var(--ease)}
.benefit-card:hover{background:rgba(241,218,191,.055);transform:translateY(-4px)}
.benefit-card>span{font-size:9.5px;line-height:1.4;color:rgba(241,218,191,.54);letter-spacing:.08em;text-transform:uppercase}
.benefit-card h3{margin:clamp(62px,5vw,86px) 0 0;font-size:clamp(22px,2.1vw,31px);line-height:1.04;letter-spacing:-.045em;font-weight:600}
.benefit-card p{margin:auto 0 0;padding-top:28px;color:rgba(255,251,255,.62);font-size:12.5px;line-height:1.68;max-width:410px}

/* Project launch flow */
.launch-heading{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(300px,.66fr);gap:clamp(62px,8vw,128px);align-items:end}
.launch-heading>*{min-width:0}
.launch-heading>p{margin:0 0 6px;color:rgba(255,251,255,.64);font-size:13.5px;line-height:1.72;max-width:560px}
.launch-flow{margin-top:clamp(76px,8vw,118px);display:grid;grid-template-columns:repeat(6,minmax(0,1fr));border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.launch-flow article{position:relative;min-width:0;min-height:350px;padding:28px 24px 32px;border-right:1px solid var(--line);display:flex;flex-direction:column;overflow:hidden}
.launch-flow article:last-child{border-right:0}
.launch-flow article::after{content:"";position:absolute;left:0;right:100%;bottom:0;height:2px;background:var(--almond);transition:right .45s var(--ease)}
.launch-flow article:hover::after{right:0}
.launch-flow article>span{font-size:11px;color:rgba(241,218,191,.58)}
.launch-flow h3{margin:clamp(80px,6vw,112px) 0 0;font-size:clamp(20px,1.8vw,27px);line-height:1.04;letter-spacing:-.045em}
.launch-flow p{margin:auto 0 0;padding-top:24px;color:rgba(255,251,255,.58);font-size:11px;line-height:1.66}

.school-actions{margin-top:auto;display:flex;align-items:center;gap:22px;flex-wrap:wrap}
.school-main .school-actions .button-light{margin-top:0}
.school-text-link{font-size:10px;text-decoration:underline;text-decoration-color:rgba(0,5,0,.34);text-underline-offset:5px;transition:opacity .2s ease,transform .25s var(--ease)}
.school-text-link:hover{opacity:.66;transform:translateX(3px)}

/* Practical result + formats */
.proof-layout{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:clamp(76px,10vw,160px);align-items:start}
.proof-layout>*{min-width:0}
.proof .section-heading{position:sticky;top:120px}
.proof-list{border-top:1px solid var(--line)}
.proof-list article{display:grid;grid-template-columns:48px minmax(0,1fr);gap:24px;padding:34px 0;border-bottom:1px solid var(--line);transition:padding-left .3s var(--ease),background .25s ease}
.proof-list article:hover{padding-left:12px}
.proof-list article>span{font-size:10px;color:rgba(241,218,191,.55);padding-top:4px}
.proof-list h3{margin:0;font-size:clamp(20px,2vw,29px);line-height:1.06;letter-spacing:-.04em}
.proof-list p{margin:14px 0 0;color:rgba(255,251,255,.58);font-size:12px;line-height:1.7;max-width:660px}
.formats-shell{margin-top:clamp(78px,8vw,118px);padding:clamp(38px,4.2vw,62px);border:1px solid var(--line);border-radius:var(--radius);display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr);gap:clamp(54px,7vw,110px);background:linear-gradient(135deg,rgba(241,218,191,.035),rgba(54,36,23,.09))}
.formats-shell>div{min-width:0}
.formats-shell h3{margin:28px 0 0;font-size:clamp(28px,3.2vw,46px);line-height:.98;letter-spacing:-.055em}
.formats-shell p{margin:22px 0 0;color:rgba(255,251,255,.56);font-size:11.5px;line-height:1.72;max-width:520px}
.formats-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-content:start;border-top:1px solid var(--line)}
.formats-grid span{padding:20px 8px 20px 0;border-bottom:1px solid var(--line);font-size:11.5px;line-height:1.45;color:rgba(255,251,255,.78)}
.formats-grid span:nth-child(odd){padding-right:20px}
.formats-grid span:nth-child(even){padding-left:20px;border-left:1px solid var(--line)}

/* Mentors + partners */
.mentor-note{margin-top:40px;padding:26px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);display:grid;grid-template-columns:140px minmax(0,1fr);gap:28px}
.mentor-note span{font-size:9px;line-height:1.4;letter-spacing:.08em;color:rgba(241,218,191,.52)}
.mentor-note strong{font-size:13px;line-height:1.6;font-weight:450;color:rgba(255,251,255,.8)}

/* Idea proposal form */
.proposal-layout{display:grid;grid-template-columns:minmax(0,.76fr) minmax(0,1.24fr);gap:clamp(74px,9vw,150px);align-items:start}
.proposal-layout>*{min-width:0}
.proposal-intro{position:sticky;top:120px}
.proposal-intro h2{margin:18px 0 0;font-size:clamp(48px,5.4vw,78px);line-height:.92;letter-spacing:-.06em}
.proposal-intro h2 em{font-family:"Ostrovsky",Georgia,serif;font-style:normal;font-weight:700;color:var(--almond);letter-spacing:-.035em}
.proposal-intro>p:last-of-type{margin:34px 0 0;color:rgba(255,251,255,.62);font-size:12.5px;line-height:1.72;max-width:520px}
.proposal-points{display:flex;gap:8px;flex-wrap:wrap;margin-top:34px}
.proposal-points span{padding:9px 12px;border:1px solid var(--line);border-radius:999px;color:rgba(241,218,191,.65);font-size:8.5px;line-height:1.2}
.proposal-form{padding:clamp(28px,3.2vw,48px);border:1px solid var(--line);border-radius:var(--radius);background:rgba(255,255,255,.018)}
.proposal-form label{display:block;margin-bottom:22px}
.proposal-form label>span{display:block;margin-bottom:9px;font-size:9px;line-height:1.4;letter-spacing:.055em;text-transform:uppercase;color:rgba(241,218,191,.56)}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.proposal-form input,.proposal-form textarea,.proposal-form select{width:100%;border:1px solid rgba(241,218,191,.18);border-radius:14px;background:rgba(0,5,0,.52);color:var(--snow);font:inherit;font-size:12px;line-height:1.5;padding:15px 16px;outline:none;transition:border-color .2s ease,background .2s ease,box-shadow .2s ease}
.proposal-form textarea{resize:vertical;min-height:116px}
.proposal-form select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,rgba(241,218,191,.65) 50%),linear-gradient(135deg,rgba(241,218,191,.65) 50%,transparent 50%);background-position:calc(100% - 18px) 50%,calc(100% - 13px) 50%;background-size:5px 5px,5px 5px;background-repeat:no-repeat;padding-right:40px}
.proposal-form input::placeholder,.proposal-form textarea::placeholder{color:rgba(255,251,255,.28)}
.proposal-form input:focus,.proposal-form textarea:focus,.proposal-form select:focus{border-color:rgba(241,218,191,.55);background:rgba(0,5,0,.72);box-shadow:0 0 0 3px rgba(241,218,191,.06)}
.proposal-form option{background:#0a0c09;color:var(--snow)}
.proposal-submit{margin-top:5px;border:0;cursor:pointer}
.proposal-privacy{margin:16px 0 0;color:rgba(255,251,255,.38);font-size:8.5px;line-height:1.55}
.proposal-output{margin-top:26px;padding:clamp(28px,3.2vw,46px);border-radius:var(--radius);background:var(--almond);color:var(--black);display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);gap:28px 48px;align-items:start}
.proposal-output[hidden]{display:none}
.proposal-output h3{margin:22px 0 0;font-size:clamp(22px,2.4vw,34px);line-height:1.05;letter-spacing:-.045em}
.proposal-output pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:"Unbounded",Arial,sans-serif;font-size:10.5px;line-height:1.72;padding:24px;border:1px solid rgba(0,5,0,.16);border-radius:18px;background:rgba(255,255,255,.18)}
.proposal-output-actions{grid-column:2;display:flex;gap:10px;flex-wrap:wrap}
.proposal-output .button-light{background:var(--black);color:var(--snow);border-color:var(--black);cursor:pointer}
.proposal-output .button-quiet-dark{border-color:rgba(0,5,0,.22);color:var(--black)}
.proposal-output .button-quiet-dark:hover{background:rgba(0,5,0,.06)}
.proposal-output.is-copied #copyProposal{background:#1b2a18;color:var(--snow)}

/* Reveal extension for new concept sections. */
.motion-ready .reveal :is(.benefit-card,.launch-flow article,.proof-list article,.formats-shell,.proposal-form,.proposal-output){transition:opacity .68s ease,transform .76s var(--ease),background .3s ease}
.motion-ready .reveal:not(.visible) :is(.benefit-card,.launch-flow article,.proof-list article,.formats-shell,.proposal-form){opacity:0;transform:translateY(18px)}
.motion-ready .reveal.visible :is(.benefit-card,.launch-flow article,.proof-list article,.formats-shell,.proposal-form){opacity:1;transform:none}
.motion-ready .reveal.visible .benefit-card:nth-child(2),.motion-ready .reveal.visible .launch-flow article:nth-child(2),.motion-ready .reveal.visible .proof-list article:nth-child(2){transition-delay:.07s}
.motion-ready .reveal.visible .benefit-card:nth-child(3),.motion-ready .reveal.visible .launch-flow article:nth-child(3),.motion-ready .reveal.visible .proof-list article:nth-child(3){transition-delay:.13s}
.motion-ready .reveal.visible .benefit-card:nth-child(4),.motion-ready .reveal.visible .launch-flow article:nth-child(4),.motion-ready .reveal.visible .proof-list article:nth-child(4){transition-delay:.19s}
.motion-ready .reveal.visible .benefit-card:nth-child(5),.motion-ready .reveal.visible .launch-flow article:nth-child(5){transition-delay:.25s}
.motion-ready .reveal.visible .benefit-card:nth-child(6),.motion-ready .reveal.visible .launch-flow article:nth-child(6){transition-delay:.31s}

@media(max-width:1100px){
  .benefits-head,.launch-heading,.proof-layout,.proposal-layout{grid-template-columns:1fr;gap:48px}
  .benefits-lead,.launch-heading>p{max-width:760px}
  .benefits-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .launch-flow{grid-template-columns:repeat(3,minmax(0,1fr))}
  .launch-flow article:nth-child(3){border-right:0}.launch-flow article:nth-child(-n+3){border-bottom:1px solid var(--line)}
  .proof .section-heading,.proposal-intro{position:relative;top:auto;max-width:900px}
  .formats-shell{grid-template-columns:1fr;gap:44px}
}

@media(max-width:760px){
  .mobile-nav{max-height:calc(100dvh - 82px);overflow-y:auto;overscroll-behavior:contain}
  .section-compact{padding-top:78px;padding-bottom:78px}
  .benefits-head,.launch-heading,.proof-layout,.proposal-layout{gap:34px}
  .benefits-lead{font-size:15px;line-height:1.62}
  .benefits-grid{grid-template-columns:1fr;margin-top:50px;border-left:0}
  .benefit-card{min-height:250px;padding:24px 21px;border-left:0}
  .benefit-card h3{margin-top:42px;font-size:22px}
  .benefit-card p{font-size:11.5px;line-height:1.68}
  .launch-heading>p{font-size:11.5px;line-height:1.7}
  .launch-flow{grid-template-columns:1fr;margin-top:50px;border-top:0}
  .launch-flow article,.launch-flow article:nth-child(3),.launch-flow article:nth-child(-n+3){min-height:220px;padding:23px 20px;border-right:0;border-top:1px solid var(--line);border-bottom:0}
  .launch-flow article:last-child{border-bottom:1px solid var(--line)}
  .launch-flow h3{margin-top:38px;font-size:22px}
  .launch-flow p{font-size:11px;line-height:1.66}
  .school-actions{gap:16px}.school-text-link{font-size:9px}
  .proof-list article{grid-template-columns:32px minmax(0,1fr);gap:14px;padding:25px 0}.proof-list article:hover{padding-left:0}
  .proof-list h3{font-size:20px}.proof-list p{font-size:11px;line-height:1.68}
  .formats-shell{margin-top:56px;padding:27px 21px;gap:34px}.formats-shell h3{font-size:30px}.formats-shell p{font-size:11px}
  .formats-grid{grid-template-columns:1fr}.formats-grid span,.formats-grid span:nth-child(odd),.formats-grid span:nth-child(even){padding:15px 0;border-left:0;font-size:10.5px}
  .mentor-note{grid-template-columns:1fr;gap:12px;margin-top:30px;padding:22px 0}.mentor-note strong{font-size:11.5px}
  .proposal-intro h2{font-size:clamp(38px,11vw,52px)}.proposal-intro>p:last-of-type{margin-top:26px;font-size:11.5px}
  .proposal-form{padding:23px 19px}.field-grid{grid-template-columns:1fr;gap:0}
  .proposal-form label{margin-bottom:18px}.proposal-form input,.proposal-form textarea,.proposal-form select{font-size:11.5px;padding:14px}.proposal-form textarea{min-height:106px}
  .proposal-output{padding:24px 20px;grid-template-columns:1fr;gap:22px}.proposal-output pre{font-size:9.5px;padding:18px}.proposal-output-actions{grid-column:1}
}

@media(max-width:360px){
  .benefit-card{padding-inline:19px}.proposal-form{padding-inline:17px}.proposal-output{padding-inline:17px}
}

@media(prefers-reduced-motion:reduce){
  .motion-ready .reveal :is(.benefit-card,.launch-flow article,.proof-list article,.formats-shell,.proposal-form){opacity:1!important;transform:none!important}
}
