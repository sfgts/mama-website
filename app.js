/*
 * Связывает форму, шаблоны (templates.js) и генератор PDF (pdf-builder.js).
 * Значения полей сохраняются в localStorage — при следующем открытии форма
 * заполнится сама.
 */

const STORAGE_KEY = "doc-generator-state-v2";

const els = {
  docType:     document.getElementById("docType"),
  form:        document.getElementById("docForm"),
  generateBtn: document.getElementById("generateBtn"),
  resetBtn:    document.getElementById("resetBtn"),
  status:      document.getElementById("status")
};

let state = loadState();
let currentTemplate = null;

init();

function init() {
  populateDocTypeSelect();
  els.docType.addEventListener("change", onTemplateChange);
  els.generateBtn.addEventListener("click", onGenerate);
  els.resetBtn.addEventListener("click", onReset);

  const savedId = state.templateId && TEMPLATES.some((t) => t.id === state.templateId)
    ? state.templateId
    : TEMPLATES[0].id;
  els.docType.value = savedId;
  renderTemplate(savedId);
}

function populateDocTypeSelect() {
  els.docType.innerHTML = "";
  TEMPLATES.forEach((tpl) => {
    const opt = document.createElement("option");
    opt.value = tpl.id;
    opt.textContent = tpl.label;
    els.docType.appendChild(opt);
  });
}

function onTemplateChange() {
  renderTemplate(els.docType.value);
}

function renderTemplate(templateId) {
  currentTemplate = TEMPLATES.find((t) => t.id === templateId);
  state.templateId = templateId;
  saveState();

  els.form.innerHTML = "";
  if (!currentTemplate) return;

  const savedValues = (state.values && state.values[templateId]) || {};

  currentTemplate.sections.forEach((section) => {
    const heading = document.createElement("div");
    heading.className = "section-title";
    heading.textContent = section.title;
    els.form.appendChild(heading);

    section.fields.forEach((field) => {
      const wrapper = document.createElement("div");
      wrapper.className = "field";

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
      if (field.placeholder) input.placeholder = field.placeholder;
      input.value = savedValues[field.key] !== undefined ? savedValues[field.key] : "";
      input.addEventListener("input", () => onFieldInput(field.key, input.value));
      wrapper.appendChild(input);

      els.form.appendChild(wrapper);
    });
  });
}

function fid(key) { return "field_" + key; }

function onFieldInput(key, value) {
  if (!currentTemplate) return;
  state.values = state.values || {};
  state.values[currentTemplate.id] = state.values[currentTemplate.id] || {};
  state.values[currentTemplate.id][key] = value;
  saveState();
}

function collectFormData() {
  const data = {};
  if (!currentTemplate) return data;
  currentTemplate.sections.forEach((section) => {
    section.fields.forEach((field) => {
      const el = document.getElementById(fid(field.key));
      data[field.key] = el ? el.value.trim() : "";
    });
  });
  return data;
}

async function onGenerate() {
  if (!currentTemplate) return;
  setStatus("Генерация PDF…", "");
  els.generateBtn.disabled = true;

  try {
    const data = collectFormData();
    const { blob, fileName } = await buildPdf(currentTemplate.id, data);
    downloadBlob(blob, fileName);
    setStatus("Готово — файл «" + fileName + "» сохранён.", "ok");
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
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) || {} : {};
  } catch (e) { return {}; }
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}
