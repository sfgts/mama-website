function escapeHtml(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nl2br(value) {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

const DOCUMENT_RENDERERS = {
  geburtsurkunde_de: function (data) {
    const v = (key) => escapeHtml(data[key]);
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";
    return `
      <div class="doc-page">
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="">` : ""}
        <div class="doc-note">Übersetzung aus dem Ukrainischen ins Deutsche</div>
        <div class="cert-box">
          <div class="cert-country">Ukraine</div>
          <div class="cert-emblem">Staatswappen der Ukraine</div>
          <div class="cert-title">GEBURTSURKUNDE</div>
          <div class="row"><div class="label">Name</div><div class="value">${v("name")}</div></div>
          <div class="row"><div class="label">Vorname</div><div class="value">${v("vorname")}<span class="inline-label">Vatersname</span>${v("vatersname")}</div></div>
          <div class="row"><div class="label">wurde</div><div class="value">${v("geburtsdatum_ziffer")}&nbsp;&nbsp;&nbsp;${v("geburtsdatum_worte")} <span class="normal">geboren.</span></div></div>
          <div class="note">(TAG, MONAT, JAHR, IN ZIFFER UND WORTEN)</div>
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
          <div class="row"><div class="label">Eintragungsort</div><div class="value">${nl2br(data.eintragungsort)}</div></div>
          <div class="note">(BEZEICHNUNG UND STANDORT DES STANDESAMTS)</div>
          <div class="row"><div class="label">Ausstellungsstandesamt</div><div class="value">${nl2br(data.ausstellungsstandesamt)}</div></div>
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
        <div class="cert-footer">
          <div class="footer-stamp">${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="">` : ""}</div>
          <div class="footer-stamp">${stampRightSrc ? `<img src="${stampRightSrc}" alt="">` : ""}</div>
        </div>
      </div>
    `;
  },

  heiratsurkunde_de: function (data) {
    const v = (key) => escapeHtml(data[key]);
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";
    return `
      <div class="doc-page">
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="">` : ""}
        <div class="doc-note">Übersetzung aus dem Ukrainischen ins Deutsche</div>
        <div class="cert-box">
          <div class="cert-country">UKRAINE</div>
          <div class="cert-emblem">Staatswappen der Ukraine</div>
          <div class="cert-title">HEIRATSURKUNDE</div>
          <div class="row"><div class="label">Name</div><div class="value">${v("mann_name")}</div></div>
          <div class="row"><div class="label">Vorname</div><div class="value">${v("mann_vorname")}<span class="inline-label">Vatersname</span>${v("mann_vatersname")}</div></div>
          <div class="row"><div class="label">Geburtsdatum</div><div class="value">${v("mann_geburtsdatum")}</div></div>
          <div class="row"><div class="label"></div><div class="value">${v("mann_geburtsort")}</div></div>
          <div class="note">(GEBURTSORT: STAAT, GEBIET, BEZIRK, STADT, DORF)</div>
          <div class="row"><div class="label"></div><div class="value">Staatsangehöriger ${v("mann_staat")}</div></div>
          <div class="note">(STAATSANGEHÖRIGKEIT)</div>
          <div class="row" style="margin-top:3mm"><div class="label">Name</div><div class="value">${v("frau_name")}</div></div>
          <div class="row"><div class="label">Vorname</div><div class="value">${v("frau_vorname")}<span class="inline-label">Vatersname</span>${v("frau_vatersname")}</div></div>
          <div class="row"><div class="label">Geburtsdatum</div><div class="value">${v("frau_geburtsdatum")}</div></div>
          <div class="row"><div class="label"></div><div class="value">${v("frau_geburtsort")}</div></div>
          <div class="note">(GEBURTSORT: STAAT, GEBIET, BEZIRK, STADT, DORF)</div>
          <div class="row"><div class="label"></div><div class="value">Staatsangehörige ${v("frau_staat")}</div></div>
          <div class="note">(STAATSANGEHÖRIGKEIT)</div>
          <div class="row" style="margin-top:3mm"><div class="label">haben am</div><div class="value">${v("ehe_datum_ziffer")}&nbsp;&nbsp;&nbsp;${v("ehe_datum_worte")}</div></div>
          <div class="note">(IN ZIFFER UND WORTEN EINGETRAGEN)</div>
          <div class="row"><div class="label"></div><div class="value normal-weight">eine Ehe geschlossen</div></div>
          <p class="reg-line">Die Eintragung in das Eheschließungsregister erfolgte am <b>${v("eintragung_datum")}</b> unter Nr. <b>${v("eintragung_nr")}</b></p>
          <p class="reg-line" style="margin-top:1mm">Nach der Eheschließung führen die Eheleute folgende Namen:</p>
          <div class="row"><div class="label">Ehemann</div><div class="value">${v("name_ehemann")}</div></div>
          <div class="row"><div class="label">Ehefrau</div><div class="value">${v("name_ehefrau")}</div></div>
          <div class="row" style="margin-top:2mm"><div class="label">Registrierort</div><div class="value">${nl2br(data.registrierort)}</div></div>
          <div class="note">(BEZEICHNUNG UND STANDORT DES STANDESAMTES)</div>
          <div class="row"><div class="label">ausgestellt von</div><div class="value">${nl2br(data.ausgestellt_von)}</div></div>
          <div class="note">(BEZEICHNUNG UND STANDORT DES STANDESAMTES)</div>
          <div class="row" style="margin-top:2mm"><div class="label">ausgestellt</div><div class="value">${v("ausstellungsdatum")}</div></div>
          <div class="sig-line">
            <span class="italic">Siegel</span>
            <span>Leiter des Standesamtes</span>
            <span class="italic">Unterschrift</span>
            <span class="bold">${v("leiter_name")}</span>
          </div>
          <div class="serie-line"><b>Serie ${v("serie")} &nbsp;&nbsp; Nr. ${v("urkunde_nr")}</b></div>
        </div>
        <div class="cert-footer">
          <div class="footer-stamp">${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="">` : ""}</div>
          <div class="footer-stamp">${stampRightSrc ? `<img src="${stampRightSrc}" alt="">` : ""}</div>
        </div>
      </div>
    `;
  }
,

  geburtsurkunde_en: function (data) {
    const v = (key) => escapeHtml(data[key]);
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";
    return `
      <div class="doc-page">
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="">` : ""}
        <div class="doc-note">Translation from Ukrainian into English</div>
        <div class="cert-box">
          <div class="cert-country">Ukraine</div>
          <div class="cert-emblem">State Emblem of Ukraine</div>
          <div class="cert-title">BIRTH CERTIFICATE</div>
          <div class="row"><div class="label">Last name</div><div class="value">${v("name")}</div></div>
          <div class="row"><div class="label">First name</div><div class="value">${v("vorname")}<span class="inline-label">Patronymic</span>${v("vatersname")}</div></div>
          <div class="row"><div class="label">was born on</div><div class="value">${v("geburtsdatum_ziffer")}&nbsp;&nbsp;&nbsp;${v("geburtsdatum_worte")} <span class="normal"></span></div></div>
          <div class="note">(DAY, MONTH, YEAR, IN DIGITS AND IN WORDS)</div>
          <div class="row"><div class="label">Place of birth</div><div class="value">${v("geburtsort")}</div></div>
          <div class="note">(COUNTRY, REGION, DISTRICT, CITY, VILLAGE)</div>
          <p class="reg-line">The corresponding civil registry entry was made on <b>${v("eintragung_datum")}</b> under No. <b>${v("eintragung_nr")}</b>.</p>
          <div class="eltern-title">PARENTS:</div>
          <div class="row"><div class="label">Father</div><div class="value">${v("vater_name")}</div></div>
          <div class="note">(FIRST NAME, PATRONYMIC, LAST NAME)</div>
          <div class="row"><div class="label">&nbsp;</div><div class="value">Citizen of ${v("vater_staat")}</div></div>
          <div class="note">(CITIZENSHIP)</div>
          <div class="row"><div class="label">Mother</div><div class="value">${v("mutter_name")}</div></div>
          <div class="note">(FIRST NAME, PATRONYMIC, LAST NAME)</div>
          <div class="row"><div class="label">&nbsp;</div><div class="value">Citizen of ${v("mutter_staat")}</div></div>
          <div class="note">(CITIZENSHIP)</div>
          <div class="row"><div class="label">Place of registration</div><div class="value">${nl2br(data.eintragungsort)}</div></div>
          <div class="note">(NAME AND LOCATION OF THE REGISTRY OFFICE)</div>
          <div class="row"><div class="label">Issuing registry office</div><div class="value">${nl2br(data.ausstellungsstandesamt)}</div></div>
          <div class="note">(NAME AND LOCATION OF THE REGISTRY OFFICE)</div>
          <div class="row"><div class="label">Date of issue</div><div class="value">${v("ausstellungsdatum")}</div></div>
          <div class="sig-line">
            <span class="italic">Seal</span>
            <span>Head of Registry Office</span>
            <span class="italic">Signature</span>
            <span class="bold">${v("leiter_name")}</span>
          </div>
          <div class="serie-line"><b>Series: ${v("serie")} &nbsp;&nbsp; No.: ${v("urkunde_nr")}</b></div>
        </div>
        <div class="cert-footer">
          <div class="footer-stamp">${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="">` : ""}</div>
          <div class="footer-stamp">${stampRightSrc ? `<img src="${stampRightSrc}" alt="">` : ""}</div>
        </div>
      </div>
    `;
  },

  heiratsurkunde_en: function (data) {
    const v = (key) => escapeHtml(data[key]);
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";
    return `
      <div class="doc-page">
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="">` : ""}
        <div class="doc-note">Translation from Ukrainian into English</div>
        <div class="cert-box">
          <div class="cert-country">UKRAINE</div>
          <div class="cert-emblem">State Emblem of Ukraine</div>
          <div class="cert-title">MARRIAGE CERTIFICATE</div>
          <div class="row"><div class="label">Last name</div><div class="value">${v("mann_name")}</div></div>
          <div class="row"><div class="label">First name</div><div class="value">${v("mann_vorname")}<span class="inline-label">Patronymic</span>${v("mann_vatersname")}</div></div>
          <div class="row"><div class="label">Date of birth</div><div class="value">${v("mann_geburtsdatum")}</div></div>
          <div class="row"><div class="label"></div><div class="value">${v("mann_geburtsort")}</div></div>
          <div class="note">(PLACE OF BIRTH: COUNTRY, REGION, DISTRICT, CITY, VILLAGE)</div>
          <div class="row"><div class="label"></div><div class="value">Citizen of ${v("mann_staat")}</div></div>
          <div class="note">(CITIZENSHIP)</div>
          <div class="row" style="margin-top:3mm"><div class="label">Last name</div><div class="value">${v("frau_name")}</div></div>
          <div class="row"><div class="label">First name</div><div class="value">${v("frau_vorname")}<span class="inline-label">Patronymic</span>${v("frau_vatersname")}</div></div>
          <div class="row"><div class="label">Date of birth</div><div class="value">${v("frau_geburtsdatum")}</div></div>
          <div class="row"><div class="label"></div><div class="value">${v("frau_geburtsort")}</div></div>
          <div class="note">(PLACE OF BIRTH: COUNTRY, REGION, DISTRICT, CITY, VILLAGE)</div>
          <div class="row"><div class="label"></div><div class="value">Citizen of ${v("frau_staat")}</div></div>
          <div class="note">(CITIZENSHIP)</div>
          <div class="row" style="margin-top:3mm"><div class="label">got married on</div><div class="value">${v("ehe_datum_ziffer")}&nbsp;&nbsp;&nbsp;${v("ehe_datum_worte")}</div></div>
          <div class="note">(IN DIGITS AND IN WORDS)</div>
          <div class="row"><div class="label"></div><div class="value normal-weight">and registered a marriage</div></div>
          <p class="reg-line">The entry in the marriage register was made on <b>${v("eintragung_datum")}</b> under No. <b>${v("eintragung_nr")}</b></p>
          <p class="reg-line" style="margin-top:1mm">After the marriage the spouses bear the following names:</p>
          <div class="row"><div class="label">Husband</div><div class="value">${v("name_ehemann")}</div></div>
          <div class="row"><div class="label">Wife</div><div class="value">${v("name_ehefrau")}</div></div>
          <div class="row" style="margin-top:2mm"><div class="label">Place of registration</div><div class="value">${nl2br(data.registrierort)}</div></div>
          <div class="note">(NAME AND LOCATION OF THE REGISTRY OFFICE)</div>
          <div class="row"><div class="label">Issued by</div><div class="value">${nl2br(data.ausgestellt_von)}</div></div>
          <div class="note">(NAME AND LOCATION OF THE REGISTRY OFFICE)</div>
          <div class="row" style="margin-top:2mm"><div class="label">Date of issue</div><div class="value">${v("ausstellungsdatum")}</div></div>
          <div class="sig-line">
            <span class="italic">Seal</span>
            <span>Head of Registry Office</span>
            <span class="italic">Signature</span>
            <span class="bold">${v("leiter_name")}</span>
          </div>
          <div class="serie-line"><b>Series ${v("serie")} &nbsp;&nbsp; No. ${v("urkunde_nr")}</b></div>
        </div>
        <div class="cert-footer">
          <div class="footer-stamp">${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="">` : ""}</div>
          <div class="footer-stamp">${stampRightSrc ? `<img src="${stampRightSrc}" alt="">` : ""}</div>
        </div>
      </div>
    `;
  }
,

  blank_de: function (data) {
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";
    const body = data.content || "";
    return `
      <div class="doc-page">
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="">` : ""}
        <div class="doc-note">Übersetzung aus dem Ukrainischen ins Deutsche</div>
        <div class="cert-box freetext-box">${body}</div>
        <div class="cert-footer">
          <div class="footer-stamp">${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="">` : ""}</div>
          <div class="footer-stamp">${stampRightSrc ? `<img src="${stampRightSrc}" alt="">` : ""}</div>
        </div>
      </div>
    `;
  },

  blank_en: function (data) {
    const headSrc       = (typeof ASSETS !== "undefined" && ASSETS.head)       || "";
    const stampLeftSrc  = (typeof ASSETS !== "undefined" && ASSETS.stampLeft)  || "";
    const stampRightSrc = (typeof ASSETS !== "undefined" && ASSETS.stampRight) || "";
    const body = data.content || "";
    return `
      <div class="doc-page">
        ${headSrc ? `<img class="doc-header-img" src="${headSrc}" alt="">` : ""}
        <div class="doc-note">Translation from Ukrainian into English</div>
        <div class="cert-box freetext-box">${body}</div>
        <div class="cert-footer">
          <div class="footer-stamp">${stampLeftSrc ? `<img src="${stampLeftSrc}" alt="">` : ""}</div>
          <div class="footer-stamp">${stampRightSrc ? `<img src="${stampRightSrc}" alt="">` : ""}</div>
        </div>
      </div>
    `;
  }

};


async function buildPdf(templateId, data) {
  const renderer = DOCUMENT_RENDERERS[templateId];
  if (!renderer) throw new Error("Макет не найден для этого типа документа.");

  let host = document.getElementById("pdf-render-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "pdf-render-host";
    document.body.appendChild(host);
  }
  host.innerHTML = renderer(data);
  const pageEl = host.querySelector(".doc-page");

  await waitForImages(pageEl);

  const canvas = await html2canvas(pageEl, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    imageTimeout: 0,
    logging: false
  });

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth  = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgData = canvas.toDataURL("image/png");

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
  const namePart = [data.name || data.mann_name, data.vorname || data.mann_vorname].filter(Boolean).join("_") || "dokument";
  const safe = namePart.replace(/[^\p{L}\p{N}_-]+/gu, "_");
  return `${safe}_${templateId}.pdf`;
}
