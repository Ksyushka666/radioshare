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
  Radio,
  Route,
  Wifi,
} from "lucide-react";

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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeMode, setActiveMode] = useState("long");

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="RadioShare — на главную">
          <img src="/manus-storage/radioshare-logo_37d11637.png" alt="" />
          <span>Radio<span>Share</span></span>
        </a>
        <nav className="main-nav" aria-label="Основная навигация">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>0{sections.indexOf(section) + 1}</span>{section.label}
            </a>
          ))}
        </nav>
        <a className="header-action" href="#contact">Узнать о прототипе <ArrowUpRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-art" aria-hidden="true">
          <img src="/manus-storage/radioshare-hero_7d84bb74.png" alt="" />
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

      <section className="architecture section-dark">
        <div className="container">
          <div className="section-head"><SectionMarker number="01/03" label="Как работает слой" /><span className="head-meta">STORE / FORWARD / DELIVER</span></div>
          <div className="architecture-grid">
            <div className="arch-copy"><h2>Дальше —<br /><span>через узлы.</span></h2><p>Каждый шлюз видит соседние узлы, запоминает маршрут и передаёт пакет дальше. Если связь оборвалась, система не начинает сначала.</p><a className="arrow-link" href="#transfer">Разобрать передачу <ArrowUpRight size={16} /></a></div>
            <div className="mesh-visual"><img src="/manus-storage/radioshare-mesh_8c32d596.png" alt="Схема mesh-сети с ретрансляционными узлами" /><div className="mesh-caption"><span className="mono">MESH TOPOLOGY / 07 NODES</span><span>ROUTE HEALTH <b>GOOD</b></span></div></div>
          </div>
          <div className="principles"><div><span>01</span><strong>Сообщения</strong><p>Короткие пакеты идут по дальнему каналу, с подтверждением каждого участка.</p></div><div><span>02</span><strong>Маршруты</strong><p>Промежуточные узлы расширяют зону связи без центрального сервера.</p></div><div><span>03</span><strong>Состояние</strong><p>Очередь хранится локально — отключение не стирает прогресс.</p></div></div>
        </div>
      </section>

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

      <footer className="site-footer" id="contact"><div className="container footer-top"><div className="footer-brand"><div className="brand"><img src="/manus-storage/radioshare-logo_37d11637.png" alt="" /><span>Radio<span>Share</span></span></div><p>Радиослой для связи<br />без обязательного облака.</p></div><div className="footer-cta"><span className="mono">NEXT STEP / PROTOTYPE</span><h2>Собрать<br /><em>полевую версию.</em></h2><a className="button button-primary" href="mailto:hello@radioshare.local">Обсудить прототип <ArrowUpRight size={17} /></a></div></div><div className="container footer-bottom"><span>© 2026 RadioShare</span><span>DESIGNED FOR DISCONNECTED PLACES</span><span className="footer-status"><i /> SYSTEM CONCEPT / ONLINE</span></div></footer>
    </main>
  );
}

