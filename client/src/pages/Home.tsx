/* Signal Field: graphite ether, Radio Amber pulse, editorial asymmetry, Space Grotesk + IBM Plex Sans/Mono. */
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  FileArchive,
  Gauge,
  LockKeyhole,
  Pause,
  Play,
  Radio,
  Route,
  Smartphone,
  Wifi,
} from "lucide-react";

const assetPath = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const sections = [
  { id: "system", label: "Система" },
  { id: "modes", label: "Режимы" },
  { id: "transfer", label: "Передача" },
];

function Waveform() {
  return (
    <div className="waveform" aria-hidden="true">
      {Array.from({ length: 52 }).map((_, index) => (
        <span key={index} style={{ height: `${10 + ((index * 17) % 48)}%` }} />
      ))}
    </div>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-marker">
      <span>{number}</span>
      <span>{label}</span>
    </div>
  );
}

function GlobalMeshMap() {
  const [selectedNode, setSelectedNode] = useState("lisbon");
  const [paused, setPaused] = useState(false);
  const nodes = [
    { id: "seattle", name: "SEATTLE", x: 122, y: 135, kind: "Relay", meta: "Wi‑Fi HaLow bridge" },
    { id: "new-york", name: "NEW YORK", x: 312, y: 178, kind: "Relay", meta: "LoRa / FSK" },
    { id: "lisbon", name: "LISBON", x: 488, y: 245, kind: "Destination", meta: "Android · NODE 04" },
    { id: "lagos", name: "LAGOS", x: 535, y: 360, kind: "Relay", meta: "LoRa / FSK" },
    { id: "dubai", name: "DUBAI", x: 704, y: 270, kind: "Relay", meta: "LoRa / FSK" },
    { id: "singapore", name: "SINGAPORE", x: 860, y: 360, kind: "Relay", meta: "Wi‑Fi HaLow bridge" },
    { id: "tokyo", name: "TOKYO", x: 920, y: 160, kind: "Origin", meta: "Windows · NODE 01" },
  ];
  const routes = [
    "M920 160 C850 145 775 220 704 270",
    "M704 270 C625 245 570 232 488 245",
    "M704 270 C770 305 820 345 860 360",
    "M488 245 C425 210 370 180 312 178",
    "M312 178 C250 155 180 128 122 135",
    "M535 360 C515 320 500 280 488 245",
    "M860 360 C885 290 905 225 920 160",
  ];
  const activeRoutes = [0, 1, 3, 4];
  const selected = nodes.find((node) => node.id === selectedNode) ?? nodes[2];

  return (
    <section className="global-map section-dark" id="map">
      <div className="container">
        <div className="section-head"><SectionMarker number="LIVE MAP" label="Маршрутизация" /><span className="head-meta">CONCEPTUAL GLOBAL MESH / DEMO</span></div>
        <div className="map-heading"><div><h2>Пакет знает<br /><span>следующий узел.</span></h2><p>Нажмите на узел, чтобы увидеть его роль в маршруте. Анимация показывает, как файл движется по сети через store-and-forward.</p></div><div className="map-controls"><button onClick={() => setPaused(!paused)} aria-label={paused ? "Продолжить анимацию" : "Поставить анимацию на паузу"}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? "CONTINUE" : "PAUSE"}</button><span className="mono">ROUTE / 04 HOPS</span></div></div>
        <div className={`map-shell ${paused ? "is-paused" : ""}`}>
          <div className="map-meta map-meta-left"><span className="mono">FILE ROUTE</span><strong>mission_archive.zip</strong><small>70.0 GB / CHUNK 7 424</small></div>
          <svg className="mesh-map" viewBox="0 0 1000 480" role="img" aria-label="Анимированная схема маршрута файла через глобальную mesh-сеть">
            <defs><pattern id="mapDots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="rgba(243,168,59,.2)" /></pattern><filter id="mapGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
            <rect width="1000" height="480" fill="url(#mapDots)" opacity=".4" />
            <path className="continent continent-a" d="M74 118l46-29 66 8 53 43-18 44-63 24-52-30-42 4-25-29z" /><path className="continent continent-b" d="M382 216l45-18 51 21 21 43-23 41-40 11-30-47-35-27z" /><path className="continent continent-c" d="M596 139l68-28 83 24 21 48-39 36-50-6-47 34-42-34z" /><path className="continent continent-d" d="M690 307l57-14 79 31 16 47-67 38-60-17-39-44z" />
            {routes.map((route, index) => <path key={route} className={`route-line ${activeRoutes.includes(index) ? "active-route" : ""}`} d={route} />)}
            {routes.map((route, index) => <g key={`packet-${index}`} className={activeRoutes.includes(index) ? "packet-group" : "packet-group dim-packet"}><circle r={index % 2 ? 3 : 4} className="packet" key={`${paused}-${index}`}><animateMotion dur={`${3.2 + index * .3}s`} repeatCount="indefinite" begin={paused ? "indefinite" : "0s"} path={route} /></circle></g>)}
            {nodes.map((node) => <g key={node.id} className={`map-node ${node.id === selectedNode ? "selected-node" : ""}`} role="button" tabIndex={0} aria-label={`${node.name}, ${node.kind}`} onClick={() => setSelectedNode(node.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedNode(node.id); }}><circle className="node-halo" cx={node.x} cy={node.y} r="17" /><circle className="node-core" cx={node.x} cy={node.y} r="5" /><text x={node.x + 13} y={node.y - 10}>{node.name}</text></g>)}
            <g className="map-legend"><circle cx="29" cy="436" r="4" /><text x="42" y="440">ACTIVE ROUTE</text><circle cx="174" cy="436" r="4" className="legend-dim" /><text x="187" y="440">AVAILABLE LINK</text></g>
          </svg>
          <div className="map-meta map-meta-right"><span className="mono">SELECTED NODE</span><strong>{selected.name}</strong><small>{selected.kind} / {selected.meta}</small><span className="node-state"><i /> READY TO RELAY</span></div>
        </div>
        <div className="map-footer"><span><b>01</b> ORIGIN / TOKYO</span><span className="map-arrow">→</span><span><b>02</b> RELAY / DUBAI</span><span className="map-arrow">→</span><span><b>03</b> DESTINATION / LISBON</span><span className="map-live"><i /> PACKETS MOVING</span></div>
      </div>
    </section>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeMode, setActiveMode] = useState("long");

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="RadioShare — на главную">
          <img src={assetPath("radioshare-logo.jpg")} alt="" />
          <span>Radio<span>Share</span></span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>0{sections.indexOf(section) + 1}</span>{section.label}
            </a>
          ))}
        </nav>
        <a className="header-action" href="#downloads">Скачать приложения <ArrowUpRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-art" aria-hidden="true">
          <img src={assetPath("radioshare-hero.jpg")} alt="" />
          <div className="hero-grid" />
          <div className="hero-pulse" />
        </div>
        <div className="hero-content">
          <div className="eyebrow"><span className="status-dot" /> OFFLINE-FIRST / MESH NETWORK</div>
          <h1>Связь<br /><em>не требует</em><br />облака.</h1>
          <p className="hero-copy">RadioShare соединяет Windows и Android через радиосеть, которая не ждёт интернет. Сообщения идут далеко. Файлы — по быстрому каналу, когда он доступен.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#system">Как это устроено <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#limits">Смотреть ограничения <span>↓</span></a>
          </div>
        </div>
        <div className="hero-readout">
          <div className="readout-top"><span>FIELD READOUT</span><span>30.08.26 / 08:58</span></div>
          <div className="readout-signal"><span className="readout-label">SIGNAL</span><strong>-72 <small>dBm</small></strong><span className="signal-bars"><i /><i /><i /><i /><i /></span></div>
          <Waveform />
          <div className="readout-bottom"><span>NODE 01</span><span>LINK STABLE</span></div>
        </div>
        <div className="hero-stamp">RS<br /><span>01</span></div>
      </section>

      <section className="intro-band" id="system">
        <div className="container intro-layout">
          <SectionMarker number="01" label="Система" />
          <div className="intro-statement"><p>Ваша сеть — это не один маршрут. Это <strong>полевой слой</strong>, который хранит, подтверждает и передаёт.</p></div>
          <div className="intro-note"><span className="mono">DESIGNED FOR</span><p>Места, где инфраструктура нестабильна, недоступна или просто не нужна.</p></div>
        </div>
      </section>

      <section className="quick-start section-paper" id="quick-start">
        <div className="container quick-start-layout">
          <div className="quick-start-heading"><SectionMarker number="START" label="Быстрый старт" /><h2>Пять минут<br /><span>до первого ping.</span></h2><p>Начните с локального теста. Радиоэфир подключается только после проверки оборудования и регионального профиля.</p><a className="arrow-link" href="https://github.com/Ksyushka666/radioshare/blob/main/docs/hardware-setup.md" target="_blank" rel="noreferrer">Открыть полное руководство <ArrowUpRight size={16} /></a></div>
          <div className="quick-start-steps">
            {[['01','Установите приложение','Скачайте Alpha для Windows или Android из GitHub.'],['02','Подключите шлюз','Используйте LoRa-модуль через USB/Bluetooth или запустите simulated bridge.'],['03','Выберите профиль','Укажите регион, частоту и параметры PHY из паспорта оборудования.'],['04','Проверьте ping','Сначала включите приём, затем отправьте короткое тестовое сообщение соседнему узлу.'],['05','Передайте файл','Для больших файлов включите быстрый Wi‑Fi-мост: LoRa переносит управление, не 70 ГБ.']].map(([number,title,body]) => <div className="quick-step" key={number}><span className="quick-step-number">{number}</span><div><strong>{title}</strong><p>{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="architecture section-dark">
        <div className="container">
          <div className="section-head"><SectionMarker number="01/03" label="Как работает слой" /><span className="head-meta">STORE / FORWARD / DELIVER</span></div>
          <div className="architecture-grid">
            <div className="arch-copy"><h2>Дальше —<br /><span>через узлы.</span></h2><p>Каждый шлюз видит соседние узлы, запоминает маршрут и передаёт пакет дальше. Если связь оборвалась, система не начинает сначала.</p><a className="arrow-link" href="#transfer">Разобрать передачу <ArrowUpRight size={16} /></a></div>
            <div className="mesh-visual"><img src={assetPath("radioshare-mesh.jpg")} alt="Схема mesh-сети с ретрансляционными узлами" /><div className="mesh-caption"><span className="mono">MESH TOPOLOGY / 07 NODES</span><span>ROUTE HEALTH <b>GOOD</b></span></div></div>
          </div>
          <div className="principles"><div><span>01</span><strong>Сообщения</strong><p>Короткие пакеты идут по дальнему каналу, с подтверждением каждого участка.</p></div><div><span>02</span><strong>Маршруты</strong><p>Промежуточные узлы расширяют зону связи без центрального сервера.</p></div><div><span>03</span><strong>Состояние</strong><p>Очередь хранится локально — отключение не стирает прогресс.</p></div></div>
        </div>
      </section>

      <GlobalMeshMap />

      <section className="modes section-paper" id="modes">
        <div className="container">
          <div className="section-head"><SectionMarker number="02/03" label="Два радиослоя" /><span className="head-meta dark-meta">ONE APP / TWO CHANNELS</span></div>
          <div className="mode-intro"><h2>Один интерфейс.<br /><span>Два разных темпа.</span></h2><p>Дальний канал не должен притворяться быстрым. RadioShare разделяет задачу честно: сигнал ведёт, мост переносит.</p></div>
          <div className="mode-switcher" role="tablist" aria-label="Режимы связи">
            <button className={activeMode === "long" ? "active" : ""} onClick={() => setActiveMode("long")} role="tab"><span>01</span><Radio size={18} /> LONG-RANGE CONTROL</button>
            <button className={activeMode === "fast" ? "active" : ""} onClick={() => setActiveMode("fast")} role="tab"><span>02</span><Wifi size={18} /> HIGH-SPEED FILE LINK</button>
          </div>
          <div className="mode-panel">
            {activeMode === "long" ? <><div className="mode-number">01</div><div><h3>LoRa / FSK mesh</h3><p>Километры при прямой видимости. Низкая скорость, высокая живучесть. Здесь живут текстовые сообщения, служебные пакеты и команда на передачу.</p><div className="mode-stats"><span><b>0.3–27</b> кбит/с</span><span><b>KM+</b> дальность зависит от среды</span><span><b>AEAD</b> шифрование пакетов</span></div></div></> : <><div className="mode-number">02</div><div><h3>Wi‑Fi Direct / HaLow</h3><p>Быстрый радиомост для больших файлов. Когда устройства видят такой канал, приложение переключает поток и продолжает с нужного места.</p><div className="mode-stats"><span><b>70 GB</b> размер очереди</span><span><b>1–8 MB</b> размер чанка</span><span><b>SHA-256</b> проверка целостности</span></div></div></>}
          </div>
        </div>
      </section>

      <section className="transfer section-ink" id="transfer">
        <div className="container">
          <div className="section-head"><SectionMarker number="03/03" label="Передача файла" /><span className="head-meta">RESUME / VERIFY / COMPLETE</span></div>
          <div className="transfer-layout"><div><h2>Не начинать<br /><em>сначала.</em></h2><p>Файл разбивается на части, а не грузится целиком в память. Получатель сообщает, что уже получил. Система отправляет только недостающее.</p></div><div className="transfer-card"><div className="file-row"><FileArchive size={24} /><div><strong>mission_archive.zip</strong><span>70.0 GB / 8 960 chunks</span></div><span className="file-status">TRANSFERRED</span></div><div className="progress-track"><div className="progress-fill" /></div><div className="transfer-meta"><span>7 424 / 8 960</span><span>82.8% complete</span></div><div className="transfer-checks"><span><Check size={14} /> SHA-256 verified</span><span><Check size={14} /> Resume enabled</span></div></div></div>
          <div className="feature-strip"><div><LockKeyhole size={19} /><span>End-to-end<br /><b>encrypted</b></span></div><div><Route size={19} /><span>Chunked<br /><b>delivery</b></span></div><div><Download size={19} /><span>Disk-first<br /><b>storage</b></span></div><div><Gauge size={19} /><span>Route<br /><b>aware</b></span></div></div>
        </div>
      </section>

      <section className="limits section-paper" id="limits">
        <div className="container limits-layout"><div><SectionMarker number="NOTE" label="Физика сигнала" /><h2>Дальность —<br /><span>это среда.</span></h2></div><div className="limits-copy"><p>RadioShare не обещает невозможного. Дальность зависит от частоты, антенн, рельефа, помех и правил страны. Для глобальной работы без интернета нужна инфраструктура: сеть узлов, спутниковый канал или другое покрытие.</p><div className="limit-table"><div><span>LoRa / FSK</span><b>Сообщения и маршруты</b><em>Дальний / медленный</em></div><div><span>Wi‑Fi HaLow</span><b>Файлы и мосты</b><em>Дальний / быстрый*</em></div><div><span>* при подходящем оборудовании</span></div></div></div></div>
      </section>

      <section className="faq section-paper">
        <div className="container faq-layout"><SectionMarker number="FAQ" label="Вопросы до старта" /><div className="faq-list">{[
          ["Работает ли это без интернета?", "Да. Пользовательские данные идут напрямую между устройствами и радиошлюзами. Интернет не является условием работы сети."],
          ["Можно ли передать 70 ГБ через LoRa?", "Технически пакетную передачу можно реализовать, но практически это непригодно из-за очень низкой скорости. Для больших файлов нужен высокоскоростной радиомост."],
          ["Нужны ли внешние устройства?", "Для связи на километры — да. Приложение не может превратить обычный Bluetooth или Wi‑Fi в дальнобойный передатчик без радиомодуля и антенны."],
        ].map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>0{index + 1}</span><strong>{question}</strong><ChevronDown size={18} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></div>
      </section>

      <section className="downloads section-paper" id="downloads">
        <div className="container downloads-layout"><div><SectionMarker number="GET THE BUILD" label="Загрузки" /><h2>Поставить<br /><span>на устройство.</span></h2><p>Альфа-сборки уже опубликованы в репозитории. Перед подключением радиошлюза изучите руководство по настройке оборудования и региональным ограничениям.</p></div><div className="download-list"><a className="download-card" href="https://github.com/Ksyushka666/radioshare/releases/download/v0.1.2-alpha/RadioShare-0.1.2-alpha.exe" target="_blank" rel="noreferrer"><div className="download-icon"><Radio size={22} /></div><div><span className="mono">DESKTOP CLIENT</span><strong>RadioShare для Windows</strong><small>Windows 10/11 · x64 · Alpha 0.1.2</small></div><span className="download-arrow"><ArrowUpRight size={17} /></span></a><a className="download-card" href="https://github.com/Ksyushka666/radioshare/releases/download/v0.1.2-alpha/RadioShare-0.1.2-alpha.apk" target="_blank" rel="noreferrer"><div className="download-icon"><Smartphone size={22} /></div><div><span className="mono">MOBILE CLIENT</span><strong>RadioShare для Android</strong><small>Android 9+ · APK · Alpha 0.1.2</small></div><span className="download-arrow"><ArrowUpRight size={17} /></span></a><div className="download-note"><span className="status-dot" /> <a href="https://github.com/Ksyushka666/radioshare/releases/tag/v0.1.2-alpha" target="_blank" rel="noreferrer">Смотреть все файлы последнего Alpha Release <ArrowUpRight size={14} /></a></div></div></div>
      </section>

      <footer className="site-footer" id="contact"><div className="container footer-top"><div className="footer-brand"><div className="brand"><img src={assetPath("radioshare-logo.jpg")} alt="" /><span>Radio<span>Share</span></span></div><p>Радиослой для связи<br />без обязательного облака.</p></div><div className="footer-cta"><span className="mono">NEXT STEP / PROTOTYPE</span><h2>Собрать<br /><em>полевую версию.</em></h2><a className="button button-primary" href="https://github.com/Ksyushka666/radioshare" target="_blank" rel="noreferrer">Получить сборку <ArrowUpRight size={17} /></a></div></div><div className="container footer-bottom"><span>© 2026 RadioShare</span><span>DESIGNED FOR DISCONNECTED PLACES</span><span className="footer-status"><i /> SYSTEM CONCEPT / ONLINE</span></div></footer>
    </main>
  );
}

