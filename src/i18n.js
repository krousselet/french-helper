// src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  fr: {
    // NAV
    home: "Accueil",
    about: "À propos",
    alphabet: "Alphabet",
    expressions: "Expressions",
    // SLOGAN
    slogan: "Travailler en s'amusant",
    // EXPRESSIONS PAGE
    greetings: "Salutations",
    food: "Nourriture",
    sports: "Sports",
    arts: "Arts",
  },
  ja:
  {
      // NAV
    home: "ホメパゲ",
    about: "について",
    alphabet: "アルファベット",
    expressions: "表現",
    // SLOGAN
    slogan: "",
    // EXPRESSIONS PAGE
    greetings: "ご挨拶",
    food: "食べ物",
    sports: "スポーツ",
    arts: "芸術",
  }
}

const i18n = createI18n({
  legacy: false, // Composition API
  locale: localStorage.getItem("lang") || "fr",
  fallbackLocale: "fr",
  messages,
});

export default i18n;
