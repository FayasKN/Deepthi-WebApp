// src/data/alphabet.ts
// Add your images to /public/images/alphabet/
// Add your audio to /public/audio/en/ and /public/audio/ml/

export interface LessonItem {
  id: string;
  letter_en: string;
  letter_ml: string;
  word_en: string;
  word_ml: string;
  emoji: string;         // fallback when image not yet added
  image: string;         // path from /public e.g. /images/alphabet/apple.png
  audio_en: string;      // path from /public e.g. /audio/en/A.mp3
  audio_ml: string;
  audio_rp: string;
  quiz: {
    question_en: string;
    question_ml: string;
    options: string[];   // emoji or image paths
    answer: string;
  };
}

import { alphabetDataFZ } from "./alphabet_fz";

export const alphabetDataAE: LessonItem[] = [
  {
    id: "A",
    letter_en: "A",
    letter_ml: "അ",
    word_en: "Apple",
    word_ml: "ആപ്പിൾ",
    emoji: "🍎",
    image: "/images/alphabet/apple.jpg",
    audio_en: "/audio/en/A.mp3",
    audio_ml: "/audio/ml/A.mp3",
    audio_rp: "/audio/rp/A.mp3",
    quiz: {
      question_en: "Which one is Apple?",
      question_ml: "ഏതാണ് ആപ്പിൾ?",
      options: ["🍎", "🐘", "🚗", "🐶"],
      answer: "🍎",
    },
  },
  {
    id: "B",
    letter_en: "B",
    letter_ml: "ബ",
    word_en: "Ball",
    word_ml: "പന്ത്",
    emoji: "⚽",
    image: "/images/alphabet/ball.jpg",
    audio_en: "/audio/en/B.mp3",
    audio_ml: "/audio/ml/B.mp3",
    audio_rp: "/audio/rp/B.mp3",
    quiz: {
      question_en: "Which one is a Ball?",
      question_ml: "ഏതാണ് പന്ത്?",
      options: ["🍎", "⚽", "🚗", "🐶"],
      answer: "⚽",
    },
  },
  {
    id: "C",
    letter_en: "C",
    letter_ml: "ക",
    word_en: "Cat",
    word_ml: "പൂച്ച",
    emoji: "🐱",
    image: "/images/alphabet/cat.jpg",
    audio_en: "/audio/en/C.mp3",
    audio_ml: "/audio/ml/C.mp3",
    audio_rp: "/audio/rp/C.mp3",
    quiz: {
      question_en: "Which one is a Cat?",
      question_ml: "ഏതാണ് പൂച്ച?",
      options: ["🍎", "⚽", "🐱", "🐶"],
      answer: "🐱",
    },
  },
  {
    id: "D",
    letter_en: "D",
    letter_ml: "ഡ",
    word_en: "Dog",
    word_ml: "നായ",
    emoji: "🐶",
    image: "/images/alphabet/dog.jpg",
    audio_en: "/audio/en/D.mp3",
    audio_ml: "/audio/ml/D.mp3",
    audio_rp: "/audio/rp/D.mp3",
    quiz: {
      question_en: "Which one is a Dog?",
      question_ml: "ഏതാണ് നായ?",
      options: ["🍎", "⚽", "🐱", "🐶"],
      answer: "🐶",
    },
  },
  {
    id: "E",
    letter_en: "E",
    letter_ml: "ഇ",
    word_en: "Elephant",
    word_ml: "ആന",
    emoji: "🐘",
    image: "/images/alphabet/elephant.jpg",
    audio_en: "/audio/en/E.mp3",
    audio_ml: "/audio/ml/E.mp3",
    audio_rp: "/audio/rp/E.mp3",
    quiz: {
      question_en: "Which one is an Elephant?",
      question_ml: "ഏതാണ് ആന?",
      options: ["🍎", "🐘", "🐱", "🐶"],
      answer: "🐘",
    },
  },
];
export const alphabetData: LessonItem[] = [...alphabetDataAE, ...alphabetDataFZ];