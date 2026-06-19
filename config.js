/* ══════════════════════════════════════════════════════
   SRAN.DEV — КОНФИГ
   Здесь меняешь все ссылки, картинки и проекты.
   Остальное подтягивается автоматически.
══════════════════════════════════════════════════════ */

const SRANDEV_CONFIG = {

  /* ── СОЦСЕТИ И КОНТАКТЫ ─────────────────────────── */
  social: {
    telegram_personal:  "https://t.me/DanielleChoster",   // личный TG
    telegram_channel:   "https://t.me/CPAHb_dev",         // канал разработки
    telegram_stars_bot: "https://t.me/BEISTARS_bot",      // бот BE Stars
    telegram_chat:      "https://t.me/beistarsreviews",   // чат/отзывы
    github:             "",   // https://github.com/твой_ник
    itchio:             "https://daniellechoster.itch.io/",   // https://твой_ник.itch.io
    vk:                 "",   // https://vk.com/твоя_страница
    // добавь любую соцсеть сюда
  },

  /* ── ИГРЫ ───────────────────────────────────────── */
  games: [
    {
      id:          "outpatient",
      title:       "OUTPATIENT",
      genre_en:    "Roguelike",
      genre_ru:    "Рогалик",
      desc_en:     "A roguelike built in Unity. Details under wraps — follow on Telegram.",
      desc_ru:     "Рогалик на Unity. Детали засекречены — следи в Telegram.",
      platform:    "Windows",          // Windows / Android / Windows + Android
      engine:      "Unity",
      status:      "wip",              // "wip" = в разработке, "done" = вышла
      status_en:   "In Development",
      status_ru:   "В разработке",
      featured:    true,               // показывать на главной и первой в списке
      gif:         "game.gif",         // путь к гифке (положи рядом с index.html)
                                       // или GitHub raw: "https://raw.githubusercontent.com/USER/REPO/main/game.gif"
      link_itch:   "",                 // ссылка на itch.io когда выйдет
      link_github: "",                 // ссылка на github если открытый
      link_play:   "",                 // прямая ссылка на игру
    },
    {
      id:          "game2",
      title:       "LOOP PROTOCOL",         // ← вставь название
      genre_en:    "puzzle",
      genre_ru:    "пазл",
      desc_en:     "Program. Observe. Edit.",
      desc_ru:     "Програмируй.Наблюдай.Редактируй.",
      platform:    "Windows + Android",
      engine:      "Unity",
      status:      "done",
      status_en:   "Released",
      status_ru:   "Выпущено",
      featured:    false,
      gif:         "",                 // "" = без картинки
      image:       "",                 // обычная картинка вместо гифки: "game2.png"
      link_itch:   "https://daniellechoster.itch.io/loop-protocol",
      link_github: "",
      link_play:   "",
    },
    {
      id:          "game3",
      title:       "LATCH",
      genre_en:    "coop-survival",
      genre_ru:    "кооперативный выживач",
      desc_en:     "Space. An old ship. Co-op. Hope for survival.",
      desc_ru:     "Космос. старый корабль. Кооператив. Надежда на жизнь.",
      platform:    "Windows",
      engine:      "Unity",
      status:      "wip",
      status_en:   "In development",
      status_ru:   "В разработке",
      featured:    false,
      gif:         "",
      image:       "",
      link_itch:   "",
      link_github: "",
      link_play:   "",
    },
    // ── ДОБАВИТЬ ЕЩЁ ИГРУ:
    // Скопируй блок выше от { до }, и вставь сюда.
  ],

  /* ── BE APP ─────────────────────────────────────── */
  be_app: {
    apk_file: "boldandeasy.apk",  // имя файла APK (лежит рядом с index.html)
  },

};

/* ══ АВТОПОДСТАНОВКА ══════════════════════════════════
   Ниже код который читает конфиг и вставляет данные
   на страницу. Не трогай если не знаешь зачем.
══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const cfg = SRANDEV_CONFIG;
  const lang = localStorage.getItem("srandev_lang") || "en";

  /* Подставляем все ссылки по data-атрибутам */
  const linkMap = {
    "data-link-tg-personal":  cfg.social.telegram_personal,
    "data-link-tg-channel":   cfg.social.telegram_channel,
    "data-link-tg-bot":       cfg.social.telegram_stars_bot,
    "data-link-tg-chat":      cfg.social.telegram_chat,
    "data-link-github":       cfg.social.github,
    "data-link-itch":         cfg.social.itchio,
    "data-link-vk":           cfg.social.vk,
    "data-link-apk":          cfg.be_app.apk_file,
  };
  Object.entries(linkMap).forEach(([attr, val]) => {
    if (!val) return;
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      if (el.tagName === "A") el.href = val;
      else el.textContent = val;
    });
  });

  /* Рендер карточек игр на странице games.html */
  const gamesGrid = document.getElementById("gamesGrid");
  if (gamesGrid) renderGames(gamesGrid, cfg.games, lang);

  /* Рендер featured игры (главная + games.html hero) */
  const featuredWrap = document.getElementById("featuredGame");
  if (featuredWrap) {
    const feat = cfg.games.find(g => g.featured);
    if (feat) renderFeatured(featuredWrap, feat, lang);
  }
});

function renderFeatured(wrap, g, lang) {
  const media = g.gif || g.image || "";
  const mediaTag = media
    ? `<img src="${media}" alt="${g.title} gameplay">`
    : `<div style="width:100%;height:100%;background:var(--card2);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:12px;letter-spacing:2px;">PREVIEW SOON</div>`;

  const platformBadge = g.platform || "PC";
  const linkBtn = g.link_play || g.link_itch
    ? `<a href="${g.link_play || g.link_itch}" class="btn-ghost" target="_blank" data-en="Play Now" data-ru="Играть">Play Now</a>`
    : "";

  wrap.innerHTML = `
    <div class="gh-media">${mediaTag}<div class="gh-media-overlay"></div></div>
    <div class="gh-info">
      <div class="gh-badge">
        ${g.status === "wip" ? '<span class="status-dot"></span>' : ""}
        <span data-en="${g.status_en}" data-ru="${g.status_ru}">${lang === "ru" ? g.status_ru : g.status_en}</span>
      </div>
      <div class="gh-title">${g.title}</div>
      <p class="gh-desc" data-en="${g.desc_en}" data-ru="${g.desc_ru}">${lang === "ru" ? g.desc_ru : g.desc_en}</p>
      <div class="gh-meta">
        <div class="gh-meta-row">
          <span class="gh-meta-key" data-en="Engine" data-ru="Движок">Engine</span>
          <span class="gh-meta-val">${g.engine}</span>
        </div>
        <div class="gh-meta-row">
          <span class="gh-meta-key" data-en="Platform" data-ru="Платформа">Platform</span>
          <span class="gh-meta-val">${platformBadge}</span>
        </div>
        <div class="gh-meta-row">
          <span class="gh-meta-key" data-en="Genre" data-ru="Жанр">Genre</span>
          <span class="gh-meta-val" data-en="${g.genre_en}" data-ru="${g.genre_ru}">${lang === "ru" ? g.genre_ru : g.genre_en}</span>
        </div>
      </div>
      <div class="gh-cta">
        <a href="${SRANDEV_CONFIG.social.telegram_personal}" class="btn-primary" target="_blank"
           data-en="↗ Follow on Telegram" data-ru="↗ Следить в Telegram">↗ Follow on Telegram</a>
        ${linkBtn}
      </div>
    </div>
  `;
}

function renderGames(grid, games, lang) {
  const others = games.filter(g => !g.featured);
  if (!others.length) {
    grid.innerHTML = `<div style="padding:48px;color:var(--muted);font-size:13px;" data-en="More games coming soon." data-ru="Скоро больше игр.">More games coming soon.</div>`;
    return;
  }
  grid.innerHTML = others.map((g, i) => {
    const media = g.gif || g.image
      ? `<div class="gc-media"><img src="${g.gif || g.image}" alt="${g.title}"></div>` : "";
    const link = g.link_play || g.link_itch || g.link_github || "#";
    const statusClass = g.status === "done" ? "done" : "wip";
    const statusText = lang === "ru" ? g.status_ru : g.status_en;
    const statusIcon = g.status === "done" ? "✓" : "⬛";
    return `
      <a href="${link}" class="game-card hov-target reveal${i > 0 ? " reveal-d" + Math.min(i, 3) : ""}"
         ${link === "#" ? "" : 'target="_blank"'}>
        ${media}
        <span class="gc-engine">${g.engine} · ${g.platform}</span>
        <div class="gc-title">${g.title}</div>
        <p class="gc-desc" data-en="${g.desc_en}" data-ru="${g.desc_ru}">${lang === "ru" ? g.desc_ru : g.desc_en}</p>
        <span class="gc-status ${statusClass}">${statusIcon} <span data-en="${g.status_en}" data-ru="${g.status_ru}">${statusText}</span></span>
      </a>`;
  }).join("");
}
