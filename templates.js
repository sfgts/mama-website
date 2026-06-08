/*
 * Описание шаблонов документов.
 * Чтобы добавить новый тип документа:
 *   1. Добавить объект в массив TEMPLATES ниже (id, label, sections с полями).
 *   2. В pdf-builder.js добавить функцию построения PDF с тем же id в PDF_BUILDERS.
 *
 * Тип поля:
 *   "text"     – однострочное поле
 *   "textarea" – многострочное поле
 */

const TEMPLATES = [
  {
    id: "geburtsurkunde_de",
    label: "Свидетельство о рождении — перевод на немецкий (Geburtsurkunde)",
    sections: [
      {
        title: "Ребёнок",
        fields: [
          { key: "name", label: "Фамилия (Name)", type: "text", placeholder: "BORTNIK", sample: "BORTNIK" },
          { key: "vorname", label: "Имя (Vorname)", type: "text", placeholder: "Anna", sample: "Anna" },
          { key: "vatersname", label: "Отчество (Vatersname)", type: "text", placeholder: "Yuriwna", sample: "Yuriwna" },
          { key: "geburtsdatum_ziffer", label: "Дата рождения цифрами", type: "text", placeholder: "09.07.2012", sample: "09.07.2012" },
          { key: "geburtsdatum_worte", label: "Дата рождения прописью (по-немецки)", type: "text", placeholder: "neunten Juli zweitausendzwölf", sample: "neunten Juli zweitausendzwölf" },
          { key: "geburtsort", label: "Место рождения (Geburtsort)", type: "textarea", placeholder: "Ukraine, Gebiet Charkiw, Charkiw", sample: "Ukraine, Gebiet Charkiw, Charkiw" }
        ]
      },
      {
        title: "Родители",
        fields: [
          { key: "vater_name", label: "Отец — ФИО (Vater)", type: "text", placeholder: "Bortnik Yurii Wolodymyrowytsch", sample: "Bortnik Yurii Wolodymyrowytsch" },
          { key: "vater_staat", label: "Гражданство отца", type: "text", placeholder: "der Ukraine", sample: "der Ukraine" },
          { key: "mutter_name", label: "Мать — ФИО (Mutter)", type: "text", placeholder: "Budna Kateryna Mykolajiwna", sample: "Budna Kateryna Mykolajiwna" },
          { key: "mutter_staat", label: "Гражданство матери", type: "text", placeholder: "der Ukraine", sample: "der Ukraine" }
        ]
      },
      {
        title: "Регистрация записи акта",
        fields: [
          { key: "eintragung_datum", label: "Дата актовой записи", type: "text", placeholder: "24.07.2012", sample: "24.07.2012" },
          { key: "eintragung_nr", label: "Номер актовой записи", type: "text", placeholder: "1999", sample: "1999" },
          { key: "standesamt", label: "Орган регистрации (Eintragungsort / Ausstellungsstandesamt)", type: "textarea",
            placeholder: "Abteilung für staatliche Registrierung der Personenstandsurkunden der Stadt Charkiw des Registrierungsdienstes der Charkiwer städtischen Justizverwaltung",
            sample: "Abteilung für staatliche Registrierung der Personenstandsurkunden der Stadt Charkiw des Registrierungsdienstes der Charkiwer städtischen Justizverwaltung" }
        ]
      },
      {
        title: "Выдача документа",
        fields: [
          { key: "ausstellungsdatum", label: "Дата выдачи (прописью)", type: "text", placeholder: "24. Juli 2012", sample: "24. Juli 2012" },
          { key: "serie", label: "Серия бланка", type: "text", placeholder: "I-ВЛ", sample: "I-ВЛ" },
          { key: "urkunde_nr", label: "Номер бланка", type: "text", placeholder: "288374", sample: "288374" },
          { key: "leiter_name", label: "ФИО подписавшего (руководитель ЗАГС)", type: "text", placeholder: "E. V. Lomakina", sample: "E. V. Lomakina" }
        ]
      }
    ]
  }
];
