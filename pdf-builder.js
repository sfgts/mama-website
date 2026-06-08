/*
 * Построение PDF из HTML-разметки документа.
 *
 * Подход: для каждого типа документа описываем его внешний вид как HTML-фрагмент
 * (см. DOCUMENT_RENDERERS). Этот фрагмент рендерится в скрытом контейнере размером
 * с лист A4, поверх него накладываются картинки печати/подписи, затем весь блок
 * конвертируется в изображение (html2canvas) и кладётся на страницу PDF (jsPDF).
 *
 * Такой способ сам по себе решает проблему со шрифтами: текст рисуется браузером
 * (поддерживает кириллицу, немецкие умляуты и т.д.), а не встроенными шрифтами PDF.
 *
 * Чтобы добавить новый тип документа — добавьте функцию в DOCUMENT_RENDERERS
 * с тем же id, что и в templates.js.
 */

function escapeHtml(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Превращает текст с переносами строк в HTML с <br>
function nl2br(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

const DOCUMENT_RENDERERS = {
  geburtsurkunde_de: function (data) {
    const v = (key) => escapeHtml(data[key]);

    // Встроенные изображения из assets-embedded.js
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";

    return `
      <div class="doc-page">

        <!-- Шапка-изображение (letterhead) -->
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="letterhead">` : ""}

        <div class="doc-note">Übersetzung aus dem Ukrainischen ins Deutsche</div>

        <div class="cert-box">
          <div class="cert-country">Ukraine</div>
          <div class="cert-emblem">Staatswappen der Ukraine</div>
          <div class="cert-title">GEBURTSURKUNDE</div>

          <div class="row"><div class="label">Name</div><div class="value">${v("name")}</div></div>
          <div class="row">
            <div class="label">Vorname</div>
            <div class="value">${v("vorname")}<span class="inline-label">Vatersname</span>${v("vatersname")}</div>
          </div>
          <div class="row">
            <div class="label">wurde</div>
            <div class="value">${v("geburtsdatum_ziffer")}&nbsp;&nbsp;&nbsp;${v("geburtsdatum_worte")} <span class="normal">geboren.</span></div>
          </div>
          <div class="note">(TAG, MONAT, JAHR, &emsp;&emsp; IN ZIFFER UND WORTEN)</div>

          <div class="row"><div class="label">Geburtsort</div><div class="value">${v("geburtsort")}</div></div>
          <div class="note">(STAAT, GEBIET, BEZIRK, STADT, DORF)</div>

          <p class="reg-line">Die entsprechende standesamtliche Eintragung wurde am <b>${v("eintragung_datum")}</b> unter Nr. <b>${v("eintragung_nr")}</b> gemacht.</p>
          <div class="eltern-title">ELTERN:</div>

          <div class="row"><div class="label">Vater</div><div class="value">${v("vater_name")}</div></div>
          <div class="note">(VORNAME, VATERSNAME, NAME)</div>
          <div class="row"><div class="label">&nbsp;</div><div class="value">Staatsangehöriger ${v("vater_staat")}</div></div>
          <div class="note">(STAATSANGEHÖRIGKEIT)</div>

          <div class="row"><div class="label">Mutter</div><div class="value">${v("mutter_name")}</div></div>
          <div class="note">(VORNAME, VATERSNAME, NAME)</div>
          <div class="row"><div class="label">&nbsp;</div><div class="value">Staatsangehörige ${v("mutter_staat")}</div></div>
          <div class="note">(STAATSANGEHÖRIGKEIT)</div>

          <div class="row"><div class="label">Eintragungsort</div><div class="value">${nl2br(data.standesamt)}</div></div>
          <div class="note">(BEZEICHNUNG UND STANDORT DES STANDESAMTS)</div>

          <div class="row"><div class="label">Ausstellungsstandesamt</div><div class="value">${nl2br(data.standesamt)}</div></div>
          <div class="note">(BEZEICHNUNG UND STANDORT DES STANDESAMTS)</div>

          <div class="row"><div class="label">Ausstellungsdatum</div><div class="value">${v("ausstellungsdatum")}</div></div>

          <div class="sig-line">
            <span class="italic">Siegel</span>
            <span>Leiterin des Standesamtes</span>
            <span class="italic">Unterschrift</span>
            <span class="bold">${v("leiter_name")}</span>
          </div>

          <div class="serie-line"><b>Serie: ${v("serie")} &nbsp;&nbsp; Nr.: ${v("urkunde_nr")}</b></div>
        </div>

        <!-- Нижние печати — левая (штамп+подпись) и правая (круглая) -->
        <div class="cert-footer">
          <div class="footer-stamp">
            ${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="Печать и подпись">` : ""}
          </div>
          <div class="footer-stamp">
            ${stampRightSrc ? `<img src="${stampRightSrc}" alt="Сертификационная печать">` : ""}
          </div>
        </div>

      </div>
    `;
  }
};

/**
 * Рендерит документ в скрытом контейнере, конвертирует его в изображение
 * и собирает итоговый PDF-файл (формат A4).
 *
 * @param {string} templateId  id шаблона (см. templates.js)
 * @param {object} data        значения полей формы { key: value }
 * @param {object} images      { stamp: dataURL|null, signature: dataURL|null }
 * @returns {Promise<{blob: Blob, fileName: string}>}
 */
async function buildPdf(templateId, data) {
  const renderer = DOCUMENT_RENDERERS[templateId];
  if (!renderer) {
    throw new Error("Для этого типа документа ещё не настроен макет PDF.");
  }

  // 1. Рендерим документ в скрытом контейнере
  let host = document.getElementById("pdf-render-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "pdf-render-host";
    document.body.appendChild(host);
  }
  host.innerHTML = renderer(data);
  const pageEl = host.querySelector(".doc-page");

  // Дожидаемся загрузки изображений (печать/подпись), чтобы html2canvas их не пропустил
  await waitForImages(pageEl);

  // 2. Рендерим в канвас — scale 3 для чёткого текста без размытия
  const canvas = await html2canvas(pageEl, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    imageTimeout: 0,
    logging: false
  });

  // 3. Собираем PDF (A4: 210 x 297 мм)
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth  = pdf.internal.pageSize.getWidth();   // 210
  const pageHeight = pdf.internal.pageSize.getHeight();  // 297

  // PNG — без потерь, текст не мылится
  const imgData = canvas.toDataURL("image/png");

  // Масштабируем контент под одну A4-страницу.
  // Если содержимое чуть длиннее 297мм — сжимаем пропорционально,
  // чтобы всё вошло на один лист без разрезания.
  const naturalHeightMm = (canvas.height * pageWidth) / canvas.width;
  const renderHeight = Math.min(naturalHeightMm, pageHeight);
  const renderWidth  = (renderHeight / naturalHeightMm) * pageWidth;
  const xOffset = (pageWidth - renderWidth) / 2;

  pdf.addImage(imgData, "PNG", xOffset, 0, renderWidth, renderHeight);

  const blob = pdf.output("blob");
  const fileName = buildFileName(templateId, data);
  return { blob, fileName };
}

function waitForImages(container) {
  const imgs = Array.from(container.querySelectorAll("img"));
  return Promise.all(
    imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    })
  );
}

function buildFileName(templateId, data) {
  const namePart = [data.name, data.vorname].filter(Boolean).join("_") || "dokument";
  const safe = namePart.replace(/[^\p{L}\p{N}_-]+/gu, "_");
  return `${safe}_${templateId}.pdf`;
}
