// src/data/modules.ts
// Numbers, Animals, Plants, Daily Routine, Manners

import { numbersData6to100 } from "./numbers_6to100";


export interface NumberItem {
  id: string;
  numeral: number;
  word_en: string;
  word_ml: string;
  dots: number;        // count of dots to render
  audio_en: string;
  audio_ml: string;
  quiz: { question_en: string; question_ml: string; options: number[]; answer: number };
}

export const numbersData1to5: NumberItem[] = [
  { id: "1", numeral: 1, word_en: "One", word_ml: "ഒന്ന്", dots: 1, audio_en: "/audio/en/1.mp3", audio_ml: "/audio/ml/1.mp3", quiz: { question_en: "Which is number 1?", question_ml: "ഏതാണ് 1?", options: [1, 2, 3, 4], answer: 1 } },
  { id: "2", numeral: 2, word_en: "Two", word_ml: "രണ്ട്", dots: 2, audio_en: "/audio/en/2.mp3", audio_ml: "/audio/ml/2.mp3", quiz: { question_en: "Which is number 2?", question_ml: "ഏതാണ് 2?", options: [1, 2, 3, 4], answer: 2 } },
  { id: "3", numeral: 3, word_en: "Three", word_ml: "മൂന്ന്", dots: 3, audio_en: "/audio/en/3.mp3", audio_ml: "/audio/ml/3.mp3", quiz: { question_en: "Which is number 3?", question_ml: "ഏതാണ് 3?", options: [1, 2, 3, 4], answer: 3 } },
  { id: "4", numeral: 4, word_en: "Four", word_ml: "നാല്", dots: 4, audio_en: "/audio/en/4.mp3", audio_ml: "/audio/ml/4.mp3", quiz: { question_en: "Which is number 4?", question_ml: "ഏതാണ് 4?", options: [1, 2, 3, 4], answer: 4 } },
  { id: "5", numeral: 5, word_en: "Five", word_ml: "അഞ്ച്", dots: 5, audio_en: "/audio/en/5.mp3", audio_ml: "/audio/ml/5.mp3", quiz: { question_en: "Which is number 5?", question_ml: "ഏതാണ് 5?", options: [1, 2, 3, 4, 5], answer: 5 } },
];

export const numbersData: NumberItem[] = [...numbersData1to5, ...numbersData6to100];

export interface ContentItem {
  id: string;
  name_en: string;
  name_ml: string;
  emoji: string;
  image: string;
  audio_en: string;
  audio_ml: string;
  sound?: string;       // animal sound (optional)
}

export const animalsData: ContentItem[] = [
  { id: "lion",     name_en: "Lion",     name_ml: "സിംഹം",   emoji: "🦁", image: "/images/animals/lion.jpg",     audio_en: "/audio/en/lion.mp3",     audio_ml: "/audio/ml/lion.mp3",     sound: "/audio/sounds/lion.mp3" },
  { id: "elephant", name_en: "Elephant", name_ml: "ആന",      emoji: "🐘", image: "/images/animals/elephant.jpg", audio_en: "/audio/en/elephant.mp3", audio_ml: "/audio/ml/elephant.mp3", sound: "/audio/sounds/elephant.mp3" },
  { id: "tiger",    name_en: "Tiger",    name_ml: "കടുവ",    emoji: "🐯", image: "/images/animals/tiger.jpg",    audio_en: "/audio/en/tiger.mp3",    audio_ml: "/audio/ml/tiger.mp3",    sound: "/audio/sounds/tiger.mp3" },
  { id: "dog",      name_en: "Dog",      name_ml: "നായ",      emoji: "🐶", image: "/images/animals/dog.jpg",      audio_en: "/audio/en/dog.mp3",      audio_ml: "/audio/ml/dog.mp3",      sound: "/audio/sounds/dog.mp3" },
  { id: "cat",      name_en: "Cat",      name_ml: "പൂച്ച",   emoji: "🐱", image: "/images/animals/cat.jpg",      audio_en: "/audio/en/cat.mp3",      audio_ml: "/audio/ml/cat.mp3",      sound: "/audio/sounds/cat.mp3" },
  { id: "cow",      name_en: "Cow",      name_ml: "പശു",      emoji: "🐄", image: "/images/animals/cow.jpg",      audio_en: "/audio/en/cow.mp3",      audio_ml: "/audio/ml/cow.mp3",      sound: "/audio/sounds/cow.mp3" },
  { id: "goat",     name_en: "Goat",     name_ml: "ആട്",      emoji: "🐐", image: "/images/animals/goat.jpg",     audio_en: "/audio/en/goat.mp3",     audio_ml: "/audio/ml/goat.mp3",     sound: "/audio/sounds/goat.mp3" },
  { id: "horse",    name_en: "Horse",    name_ml: "കുതിര",   emoji: "🐴", image: "/images/animals/horse.jpg",    audio_en: "/audio/en/horse.mp3",    audio_ml: "/audio/ml/horse.mp3",    sound: "/audio/sounds/horse.mp3" },
  { id: "rabbit",   name_en: "Rabbit",   name_ml: "മുയൽ",    emoji: "🐰", image: "/images/animals/rabbit.jpg",   audio_en: "/audio/en/rabbit.mp3",   audio_ml: "/audio/ml/rabbit.mp3"},
  { id: "monkey",   name_en: "Monkey",   name_ml: "കുരങ്ങ്", emoji: "🐒", image: "/images/animals/monkey.jpg",   audio_en: "/audio/en/monkey.mp3",   audio_ml: "/audio/ml/monkey.mp3",   sound: "/audio/sounds/monkey.mp3" },
  { id: "bear",     name_en: "Bear",     name_ml: "കരടി",    emoji: "🐻", image: "/images/animals/bear.jpg",     audio_en: "/audio/en/bear.mp3",     audio_ml: "/audio/ml/bear.mp3",     sound: "/audio/sounds/bear.mp3" },
  { id: "zebra",    name_en: "Zebra",    name_ml: "സീബ്ര",   emoji: "🦓", image: "/images/animals/zebra.jpg",    audio_en: "/audio/en/zebra.mp3",    audio_ml: "/audio/ml/zebra.mp3"},
  { id: "giraffe",  name_en: "Giraffe",  name_ml: "ജിറാഫ്", emoji: "🦒", image: "/images/animals/giraffe.jpg",  audio_en: "/audio/en/giraffe.mp3",  audio_ml: "/audio/ml/giraffe.mp3",  sound: "/audio/sounds/giraffe.mp3" },
  { id: "fish",     name_en: "Fish",     name_ml: "മീൻ",     emoji: "🐟", image: "/images/animals/fish.jpg",     audio_en: "/audio/en/fish.mp3",     audio_ml: "/audio/ml/fish.mp3"},
  { id: "frog",     name_en: "Frog",     name_ml: "തവള",     emoji: "🐸", image: "/images/animals/frog.jpg",     audio_en: "/audio/en/frog.mp3",     audio_ml: "/audio/ml/frog.mp3",     sound: "/audio/sounds/frog.mp3" },
];

export const plantsData: ContentItem[] = [
  { id: "mango",      name_en: "Mango Tree",     name_ml: "മാവ്",        emoji: "🥭", image: "/images/plants/mango.png",      audio_en: "/audio/en/mango.mp3",      audio_ml: "/audio/ml/mango.mp3" },
  { id: "banana",     name_en: "Banana Tree",    name_ml: "വാഴ",         emoji: "🍌", image: "/images/plants/banana.png",     audio_en: "/audio/en/banana.mp3",     audio_ml: "/audio/ml/banana.mp3" },
  { id: "rose",       name_en: "Rose",           name_ml: "റോസ്",        emoji: "🌹", image: "/images/plants/rose.png",       audio_en: "/audio/en/rose.mp3",       audio_ml: "/audio/ml/rose.mp3" },
  { id: "coconut",    name_en: "Coconut Tree",   name_ml: "തെങ്ങ്",      emoji: "🌴", image: "/images/plants/coconut.png",    audio_en: "/audio/en/coconut.mp3",    audio_ml: "/audio/ml/coconut.mp3" },
  { id: "jackfruit",  name_en: "Jackfruit Tree", name_ml: "പ്ലാവ്",      emoji: "🌳", image: "/images/plants/jackfruit.png",  audio_en: "/audio/en/jackfruit.mp3",  audio_ml: "/audio/ml/jackfruit.mp3" },
  { id: "papaya",     name_en: "Papaya Tree",    name_ml: "പപ്പായ",      emoji: "🌿", image: "/images/plants/papaya.png",     audio_en: "/audio/en/papaya.mp3",     audio_ml: "/audio/ml/papaya.mp3" },
  { id: "guava",      name_en: "Guava Tree",     name_ml: "പേര",         emoji: "🍃", image: "/images/plants/guava.png",      audio_en: "/audio/en/guava.mp3",      audio_ml: "/audio/ml/guava.mp3" },
  { id: "neem",       name_en: "Neem Tree",      name_ml: "വേപ്പ്",      emoji: "🌱", image: "/images/plants/neem.png",       audio_en: "/audio/en/neem.mp3",       audio_ml: "/audio/ml/neem.mp3" },
  { id: "tulsi",      name_en: "Tulsi Plant",    name_ml: "തുളസി",       emoji: "🌿", image: "/images/plants/tulsi.png",      audio_en: "/audio/en/tulsi.mp3",      audio_ml: "/audio/ml/tulsi.mp3" },
  { id: "lotus",      name_en: "Lotus",          name_ml: "താമര",        emoji: "🪷", image: "/images/plants/lotus.png",      audio_en: "/audio/en/lotus.mp3",      audio_ml: "/audio/ml/lotus.mp3" },
  { id: "jasmine",    name_en: "Jasmine",        name_ml: "മുല്ല",       emoji: "🌸", image: "/images/plants/jasmine.png",    audio_en: "/audio/en/jasmine.mp3",    audio_ml: "/audio/ml/jasmine.mp3" },
  { id: "sunflower",  name_en: "Sunflower",      name_ml: "സൂര്യകാന്തി", emoji: "🌻", image: "/images/plants/sunflower.png",  audio_en: "/audio/en/sunflower.mp3",  audio_ml: "/audio/ml/sunflower.mp3" },
  { id: "bamboo",     name_en: "Bamboo",         name_ml: "മുള",         emoji: "🎍", image: "/images/plants/bamboo.png",     audio_en: "/audio/en/bamboo.mp3",     audio_ml: "/audio/ml/bamboo.mp3" },
  { id: "peepal",     name_en: "Peepal Tree",    name_ml: "അരയാൽ",      emoji: "🌳", image: "/images/plants/peepal.png",     audio_en: "/audio/en/peepal.mp3",     audio_ml: "/audio/ml/peepal.mp3" },
  { id: "cactus",     name_en: "Cactus",         name_ml: "കള്ളിമുള്ള്", emoji: "🌵", image: "/images/plants/cactus.png",     audio_en: "/audio/en/cactus.mp3",     audio_ml: "/audio/ml/cactus.mp3" },
];

export interface RoutineItem {
  id: string;
  action_en: string;
  action_ml: string;
  emoji: string;
  image: string;
  video?: string;       // optional short video clip path
  audio_en: string;
  audio_ml: string;
}

export const routineData: RoutineItem[] = [
  { id: "brush",    action_en: "Brush Your Teeth",  action_ml: "പല്ല് തേക്കുക",      emoji: "🪥", image: "/images/routine/brush.png",    audio_en: "/audio/en/brush.mp3",    audio_ml: "/audio/ml/brush.mp3" },
  { id: "wash",     action_en: "Wash Your Hands",   action_ml: "കൈ കഴുകുക",          emoji: "🧼", image: "/images/routine/wash.png",     audio_en: "/audio/en/wash.mp3",     audio_ml: "/audio/ml/wash.mp3" },
  { id: "eat",      action_en: "Eat Your Food",     action_ml: "ഭക്ഷണം കഴിക്കുക",    emoji: "🍽️", image: "/images/routine/eat.png",      audio_en: "/audio/en/eat.mp3",      audio_ml: "/audio/ml/eat.mp3" },
  { id: "sleep",    action_en: "Sleep on Time",     action_ml: "സമയത്ത് ഉറങ്ങുക",    emoji: "😴", image: "/images/routine/sleep.png",    audio_en: "/audio/en/sleep.mp3",    audio_ml: "/audio/ml/sleep.mp3" },
  { id: "exercise", action_en: "Do Exercise",       action_ml: "വ്യായാമം ചെയ്യുക",    emoji: "🏃", image: "/images/routine/exercise.png", audio_en: "/audio/en/exercise.mp3", audio_ml: "/audio/ml/exercise.mp3" },
];

export const mannersData: RoutineItem[] = [
  { id: "thankyou", action_en: "Say Thank You",      action_ml: "നന്ദി പറയുക",       emoji: "🙏", image: "/images/manners/thankyou.png", audio_en: "/audio/en/thankyou.mp3", audio_ml: "/audio/ml/thankyou.mp3" },
  { id: "sorry",    action_en: "Say Sorry",          action_ml: "ക്ഷമ ചോദിക്കുക",    emoji: "😔", image: "/images/manners/sorry.png",    audio_en: "/audio/en/sorry.mp3",    audio_ml: "/audio/ml/sorry.mp3" },
  { id: "greet",    action_en: "Greet Elders",       action_ml: "മൂത്തവരെ ബഹുമാനിക്കുക", emoji: "🤝", image: "/images/manners/greet.png",    audio_en: "/audio/en/greet.mp3",    audio_ml: "/audio/ml/greet.mp3" },
  { id: "share",    action_en: "Share with Friends", action_ml: "കൂട്ടുകാരുമായി പങ്കിടുക", emoji: "🤲", image: "/images/manners/share.png",    audio_en: "/audio/en/share.mp3",    audio_ml: "/audio/ml/share.mp3" },
];

// Module registry — used by Home screen and routing
export type ModuleId = "alphabet" | "numbers" | "animals" | "plants" | "routine" | "manners";

export interface Module {
  id: ModuleId;
  title_en: string;
  title_ml: string;
  emoji: string;
  color: string;   // Tailwind bg class
  textColor: string;
}

export const MODULES: Module[] = [
  { id: "alphabet", title_en: "Alphabet",       title_ml: "അക്ഷരമാല",     emoji: "🔤", color: "bg-module-alphabet", textColor: "text-white" },
  { id: "numbers",  title_en: "Numbers",        title_ml: "അക്കങ്ങൾ",     emoji: "🔢", color: "bg-module-numbers",  textColor: "text-white" },
  { id: "animals",  title_en: "Animals",        title_ml: "മൃഗങ്ങൾ",     emoji: "🐘", color: "bg-module-animals",  textColor: "text-white" },
  { id: "plants",   title_en: "Plants",         title_ml: "സസ്യങ്ങൾ",    emoji: "🌿", color: "bg-module-plants",   textColor: "text-white" },
  { id: "routine",  title_en: "Daily Routine",  title_ml: "ദൈനദിന ദിനചര്യ", emoji: "🚿", color: "bg-module-routine",  textColor: "text-white" },
  { id: "manners",  title_en: "Good Manners",   title_ml: "നല്ല മര്യാദ",   emoji: "🙏", color: "bg-module-manners",  textColor: "text-white" },
];
