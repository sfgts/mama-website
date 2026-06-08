const STORAGE_KEY = "doc-generator-state-v3";

const LANGS = [
  { id: "de", flag: "🇩🇪", name: "Немецкий",   sub: "DE" },
  { id: "en", flag: "🇬🇧", name: "Английский", sub: "EN" }
];

const els = {
  langToggle:  document.getElementById("langToggle"),
  docTypeGrid: document.getElementById("docTypeGrid"),
  form:        document.getElementById("docForm"),
  generateBtn: document.getElementById("generateBtn"),
  resetBtn:    document.getElementById("resetBtn"),
  status:      document.getElementById("status")
};

let state = loadState();
let currentTemplate = null;
let previewTimer = null;

init();

function init() {
  buildLangToggle();
  els.generateBtn.addEventListener("click", onGenerate);
  els.resetBtn.addEventListener("click", onReset);

  const savedLang = state.lang || "de";
  selectLang(savedLang);

  const savedId = state.templateId && TEMPLATES.find(t => t.id === state.templateId && t.lang === savedLang)
    ? state.templateId
    : TEMPLATES.find(t => t.lang === savedLang)?.id;
  if (savedId) selectDocType(savedId);
}

/* ── LANGUAGE TOGGLE ─────────────────────────── */

function buildLangToggle() {
  els.langToggle.innerHTML = "";
  LANGS.forEach(lang => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-btn";
    btn.dataset.lang = lang.id;
    btn.innerHTML = `<span class="lang-flag">${lang.flag}</span><span class="lang-name">${lang.name}</span><span class="lang-sub">${lang.sub}</span>`;
    btn.addEventListener("click", () => selectLang(lang.id));
    els.langToggle.appendChild(btn);
  });
}

function selectLang(langId) {
  state.lang = langId;
  saveState();
  document.querySelectorAll(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === langId));
  buildDocTypeGrid(langId);
  const first = TEMPLATES.find(t => t.lang === langId);
  if (first) selectDocType(first.id);
}

/* ── DOCTYPE GRID ────────────────────────────── */

function buildDocTypeGrid(langId) {
  els.docTypeGrid.innerHTML = "";
  TEMPLATES.filter(t => t.lang === langId).forEach(tpl => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "doctype-btn";
    btn.dataset.id = tpl.id;
    btn.innerHTML = `<span class="doctype-icon">${tpl.docIcon}</span><span class="doctype-label">${tpl.docLabel}</span>`;
    btn.addEventListener("click", () => selectDocType(tpl.id));
    els.docTypeGrid.appendChild(btn);
  });
}

function selectDocType(templateId) {
  document.querySelectorAll(".doctype-btn").forEach(b => b.classList.toggle("active", b.dataset.id === templateId));
  renderTemplate(templateId);
}

/* ── FORM ────────────────────────────────────── */

function renderTemplate(templateId) {
  currentTemplate = TEMPLATES.find(t => t.id === templateId);
  state.templateId = templateId;
  saveState();
  els.form.innerHTML = "";
  if (!currentTemplate) return;

  const savedValues = (state.values && state.values[templateId]) || {};

  currentTemplate.sections.forEach(section => {
    const heading = document.createElement("div");
    heading.className = "section-title";
    heading.textContent = section.title;
    els.form.appendChild(heading);

    section.fields.forEach(field => {
      const wrapper = document.createElement("div");
      wrapper.className = "field";

      if (field.type === "richtext") {
        const toolbar = createRTEToolbar(fid(field.key));
        wrapper.appendChild(toolbar);

        const editor = document.createElement("div");
        editor.className = "rte-editor";
        editor.id = fid(field.key);
        editor.contentEditable = "true";
        editor.dataset.placeholder = "Начните вводить текст…";
        editor.innerHTML = savedValues[field.key] || "";
        editor.addEventListener("input", () => {
          state.values = state.values || {};
          state.values[currentTemplate.id] = state.values[currentTemplate.id] || {};
          state.values[currentTemplate.id][field.key] = editor.innerHTML;
          saveState();
          schedulePreview();
        });
        wrapper.appendChild(editor);
        els.form.appendChild(wrapper);
        return;
      }

      const label = document.createElement("label");
      label.className = "field-label";
      label.setAttribute("for", fid(field.key));
      label.textContent = field.label;
      wrapper.appendChild(label);

      let input;
      if (field.type === "textarea") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");
        input.type = "text";
      }
      input.id = fid(field.key);
      input.name = field.key;
      input.value = savedValues[field.key] !== undefined ? savedValues[field.key] : "";
      input.addEventListener("input", () => onFieldInput(field.key, input.value));
      wrapper.appendChild(input);
      els.form.appendChild(wrapper);
    });
  });

  schedulePreview();
}

function fid(key) { return "field_" + key; }

function onFieldInput(key, value) {
  if (!currentTemplate) return;
  state.values = state.values || {};
  state.values[currentTemplate.id] = state.values[currentTemplate.id] || {};
  state.values[currentTemplate.id][key] = value;
  saveState();
  schedulePreview();
}

function collectFormData() {
  const data = {};
  if (!currentTemplate) return data;
  currentTemplate.sections.forEach(section => {
    section.fields.forEach(field => {
      const el = document.getElementById(fid(field.key));
      if (!el) { data[field.key] = ""; return; }
      data[field.key] = field.type === "richtext" ? el.innerHTML : el.value.trim();
    });
  });
  return data;
}

/* ── RICH TEXT EDITOR ────────────────────────── */

function createRTEToolbar(editorId) {
  const toolbar = document.createElement("div");
  toolbar.className = "rte-toolbar";

  const items = [
    { cmd: "bold",          html: "<b>B</b>",       title: "Жирный (Ctrl+B)" },
    { cmd: "italic",        html: "<i>I</i>",        title: "Курсив (Ctrl+I)" },
    { cmd: "underline",     html: "<u>U</u>",        title: "Подчёркнутый (Ctrl+U)" },
    { type: "sep" },
    { cmd: "justifyLeft",   html: "⬅",             title: "По левому краю" },
    { cmd: "justifyCenter", html: "☰",              title: "По центру" },
    { cmd: "justifyRight",  html: "➡",             title: "По правому краю" },
    { type: "sep" },
    { type: "size" },
    { type: "sep" },
    { cmd: "removeFormat",  html: "✕<sub style='font-size:8px'>fmt</sub>", title: "Убрать форматирование" }
  ];

  items.forEach(item => {
    if (item.type === "sep") {
      const sep = document.createElement("span");
      sep.className = "rte-sep";
      toolbar.appendChild(sep);
      return;
    }

    if (item.type === "size") {
      const sel = document.createElement("select");
      sel.className = "rte-size-select";
      [["1","8pt"],["2","10pt"],["3","12pt"],["4","14pt"],["5","18pt"],["6","24pt"],["7","36pt"]].forEach(([v,l]) => {
        const opt = document.createElement("option");
        opt.value = v;
        opt.textContent = l;
        if (v === "3") opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener("mousedown", e => e.stopPropagation());
      sel.addEventListener("change", () => {
        const editor = document.getElementById(editorId);
        editor.focus();
        document.execCommand("fontSize", false, sel.value);
        editor.dispatchEvent(new Event("input", { bubbles: true }));
      });
      toolbar.appendChild(sel);
      return;
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rte-btn";
    btn.innerHTML = item.html;
    btn.title = item.title;
    btn.addEventListener("mousedown", e => {
      e.preventDefault();
      const editor = document.getElementById(editorId);
      editor.focus();
      document.execCommand(item.cmd, false, null);
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    });
    toolbar.appendChild(btn);
  });

  return toolbar;
}

/* ── LIVE PREVIEW ────────────────────────────── */

function schedulePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(renderPreview, 130);
}

function renderPreview() {
  const inner = document.getElementById("preview-inner");
  const vp    = document.getElementById("preview-viewport");
  if (!inner || !vp || !currentTemplate) return;

  const renderer = typeof DOCUMENT_RENDERERS !== "undefined" && DOCUMENT_RENDERERS[currentTemplate.id];
  if (!renderer) return;

  const data = collectFormData();
  inner.innerHTML = renderer(data);

  const docPage = inner.querySelector(".doc-page");
  if (!docPage) return;

  const scale = vp.clientWidth / (docPage.scrollWidth || 794);
  docPage.style.transformOrigin = "top left";
  docPage.style.transform = `scale(${scale})`;
  inner.style.height = (docPage.scrollHeight * scale) + "px";
}

/* ── GENERATE ────────────────────────────────── */

async function onGenerate() {
  if (!currentTemplate) return;
  setStatus("Генерация PDF…", "");
  els.generateBtn.disabled = true;
  try {
    const data = collectFormData();
    const { blob, fileName } = await buildPdf(currentTemplate.id, data);
    downloadBlob(blob, fileName);
    setStatus("Готово — «" + fileName + "» сохранён.", "ok");
  } catch (err) {
    console.error(err);
    setStatus("Ошибка: " + (err.message || err), "err");
  } finally {
    els.generateBtn.disabled = false;
  }
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function onReset() {
  if (!currentTemplate) return;
  if (!confirm("Очистить все поля?")) return;
  state.values = state.values || {};
  state.values[currentTemplate.id] = {};
  saveState();
  renderTemplate(currentTemplate.id);
  setStatus("Форма очищена.", "");
}

function setStatus(text, kind) {
  els.status.textContent = text;
  els.status.className = "status" + (kind ? " " + kind : "");
}

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch (e) { return {}; }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}
