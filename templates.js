const TEMPLATES = [
  {
    id: "geburtsurkunde_de",
    lang: "de",
    docLabel: "Свидетельство о рождении",
    docIcon: "📄",
    sections: [
      { title: "Ребёнок", fields: [
        { key: "name",                  label: "Фамилия (Name)",                 type: "text" },
        { key: "vorname",               label: "Имя (Vorname)",                  type: "text" },
        { key: "vatersname",            label: "Отчество (Vatersname)",          type: "text" },
        { key: "geburtsdatum_ziffer",   label: "Дата рождения цифрами",          type: "text" },
        { key: "geburtsdatum_worte",    label: "Дата рождения прописью (нем.)",  type: "text" },
        { key: "geburtsort",            label: "Место рождения (Geburtsort)",    type: "textarea" }
      ]},
      { title: "Родители", fields: [
        { key: "vater_name",   label: "Отец — ФИО (Vater)",   type: "text" },
        { key: "vater_staat",  label: "Гражданство отца",      type: "text" },
        { key: "mutter_name",  label: "Мать — ФИО (Mutter)",  type: "text" },
        { key: "mutter_staat", label: "Гражданство матери",    type: "text" }
      ]},
      { title: "Регистрация записи акта", fields: [
        { key: "eintragung_datum",       label: "Дата актовой записи",                    type: "text" },
        { key: "eintragung_nr",          label: "Номер актовой записи",                   type: "text" },
        { key: "eintragungsort",         label: "Место регистрации (Eintragungsort)",     type: "textarea" },
        { key: "ausstellungsstandesamt", label: "Орган выдачи (Ausstellungsstandesamt)", type: "textarea" }
      ]},
      { title: "Выдача документа", fields: [
        { key: "ausstellungsdatum", label: "Дата выдачи (прописью)", type: "text" },
        { key: "serie",             label: "Серия бланка",           type: "text" },
        { key: "urkunde_nr",        label: "Номер бланка",           type: "text" },
        { key: "leiter_name",       label: "ФИО подписавшего",       type: "text" }
      ]}
    ]
  },
  {
    id: "heiratsurkunde_de",
    lang: "de",
    docLabel: "Свидетельство о браке",
    docIcon: "💍",
    sections: [
      { title: "Муж (Ehemann)", fields: [
        { key: "mann_name",         label: "Фамилия (Name)",        type: "text" },
        { key: "mann_vorname",      label: "Имя (Vorname)",         type: "text" },
        { key: "mann_vatersname",   label: "Отчество (Vatersname)", type: "text" },
        { key: "mann_geburtsdatum", label: "Дата рождения",         type: "text" },
        { key: "mann_geburtsort",   label: "Место рождения",        type: "textarea" },
        { key: "mann_staat",        label: "Гражданство",           type: "text" }
      ]},
      { title: "Жена (Ehefrau)", fields: [
        { key: "frau_name",         label: "Фамилия (Name)",        type: "text" },
        { key: "frau_vorname",      label: "Имя (Vorname)",         type: "text" },
        { key: "frau_vatersname",   label: "Отчество (Vatersname)", type: "text" },
        { key: "frau_geburtsdatum", label: "Дата рождения",         type: "text" },
        { key: "frau_geburtsort",   label: "Место рождения",        type: "textarea" },
        { key: "frau_staat",        label: "Гражданство",           type: "text" }
      ]},
      { title: "Бракосочетание", fields: [
        { key: "ehe_datum_ziffer", label: "Дата бракосочетания цифрами",         type: "text" },
        { key: "ehe_datum_worte",  label: "Дата бракосочетания прописью (нем.)", type: "text" },
        { key: "eintragung_datum", label: "Дата актовой записи",                 type: "text" },
        { key: "eintragung_nr",    label: "Номер актовой записи",                type: "text" }
      ]},
      { title: "Имена после брака", fields: [
        { key: "name_ehemann", label: "Фамилия мужа (Ehemann)", type: "text" },
        { key: "name_ehefrau", label: "Фамилия жены (Ehefrau)", type: "text" }
      ]},
      { title: "Регистрация", fields: [
        { key: "registrierort",     label: "Место регистрации (Registrierort)", type: "textarea" },
        { key: "ausgestellt_von",   label: "Орган выдачи (ausgestellt von)",    type: "textarea" },
        { key: "ausstellungsdatum", label: "Дата выдачи",                       type: "text" },
        { key: "serie",             label: "Серия бланка",                      type: "text" },
        { key: "urkunde_nr",        label: "Номер бланка",                      type: "text" },
        { key: "leiter_name",       label: "ФИО подписавшего",                  type: "text" }
      ]}
    ]
  },
  {
    id: "geburtsurkunde_en",
    lang: "en",
    docLabel: "Birth Certificate",
    docIcon: "📄",
    sections: [
      { title: "Ребёнок", fields: [
        { key: "name",                  label: "Фамилия (Last name)",               type: "text" },
        { key: "vorname",               label: "Имя (First name)",                  type: "text" },
        { key: "vatersname",            label: "Отчество (Patronymic)",             type: "text" },
        { key: "geburtsdatum_ziffer",   label: "Дата рождения цифрами",             type: "text" },
        { key: "geburtsdatum_worte",    label: "Дата рождения прописью (англ.)",    type: "text" },
        { key: "geburtsort",            label: "Место рождения (Place of birth)",   type: "textarea" }
      ]},
      { title: "Родители", fields: [
        { key: "vater_name",   label: "Отец — ФИО (Father)", type: "text" },
        { key: "vater_staat",  label: "Гражданство отца",    type: "text" },
        { key: "mutter_name",  label: "Мать — ФИО (Mother)", type: "text" },
        { key: "mutter_staat", label: "Гражданство матери",  type: "text" }
      ]},
      { title: "Регистрация записи акта", fields: [
        { key: "eintragung_datum",       label: "Дата актовой записи",           type: "text" },
        { key: "eintragung_nr",          label: "Номер актовой записи",          type: "text" },
        { key: "eintragungsort",         label: "Место регистрации",             type: "textarea" },
        { key: "ausstellungsstandesamt", label: "Орган выдачи (Issuing office)", type: "textarea" }
      ]},
      { title: "Выдача документа", fields: [
        { key: "ausstellungsdatum", label: "Дата выдачи (прописью)", type: "text" },
        { key: "serie",             label: "Серия бланка",           type: "text" },
        { key: "urkunde_nr",        label: "Номер бланка",           type: "text" },
        { key: "leiter_name",       label: "ФИО подписавшего",       type: "text" }
      ]}
    ]
  },
  {
    id: "heiratsurkunde_en",
    lang: "en",
    docLabel: "Marriage Certificate",
    docIcon: "💍",
    sections: [
      { title: "Муж (Husband)", fields: [
        { key: "mann_name",         label: "Фамилия (Last name)",    type: "text" },
        { key: "mann_vorname",      label: "Имя (First name)",       type: "text" },
        { key: "mann_vatersname",   label: "Отчество (Patronymic)",  type: "text" },
        { key: "mann_geburtsdatum", label: "Дата рождения",          type: "text" },
        { key: "mann_geburtsort",   label: "Место рождения",         type: "textarea" },
        { key: "mann_staat",        label: "Гражданство",            type: "text" }
      ]},
      { title: "Жена (Wife)", fields: [
        { key: "frau_name",         label: "Фамилия (Last name)",    type: "text" },
        { key: "frau_vorname",      label: "Имя (First name)",       type: "text" },
        { key: "frau_vatersname",   label: "Отчество (Patronymic)",  type: "text" },
        { key: "frau_geburtsdatum", label: "Дата рождения",          type: "text" },
        { key: "frau_geburtsort",   label: "Место рождения",         type: "textarea" },
        { key: "frau_staat",        label: "Гражданство",            type: "text" }
      ]},
      { title: "Бракосочетание", fields: [
        { key: "ehe_datum_ziffer", label: "Дата бракосочетания цифрами",          type: "text" },
        { key: "ehe_datum_worte",  label: "Дата бракосочетания прописью (англ.)", type: "text" },
        { key: "eintragung_datum", label: "Дата актовой записи",                  type: "text" },
        { key: "eintragung_nr",    label: "Номер актовой записи",                 type: "text" }
      ]},
      { title: "Имена после брака", fields: [
        { key: "name_ehemann", label: "Фамилия мужа (Husband)", type: "text" },
        { key: "name_ehefrau", label: "Фамилия жены (Wife)",    type: "text" }
      ]},
      { title: "Регистрация", fields: [
        { key: "registrierort",     label: "Место регистрации",        type: "textarea" },
        { key: "ausgestellt_von",   label: "Орган выдачи (Issued by)", type: "textarea" },
        { key: "ausstellungsdatum", label: "Дата выдачи",              type: "text" },
        { key: "serie",             label: "Серия бланка",             type: "text" },
        { key: "urkunde_nr",        label: "Номер бланка",             type: "text" },
        { key: "leiter_name",       label: "ФИО подписавшего",         type: "text" }
      ]}
    ]
  }

,
  {
    id: "blank_de",
    lang: "de",
    docLabel: "Свободный текст",
    docIcon: "✏️",
    sections: [
      { title: "Содержание документа", fields: [
        { key: "content", label: "", type: "richtext" }
      ]}
    ]
  },
  {
    id: "blank_en",
    lang: "en",
    docLabel: "Free text",
    docIcon: "✏️",
    sections: [
      { title: "Document content", fields: [
        { key: "content", label: "", type: "richtext" }
      ]}
    ]
  }

];