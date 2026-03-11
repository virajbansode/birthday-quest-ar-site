
// Birthday Quest configuration — edit just this file to personalize
window.QUEST_CONFIG = {
  herName: "Nitu",                            // <-- change to her name
  // Set the exact local unlock time for the final AR reveal page (optional; used for optional countdown widget)
  birthdayISO: "2026-03-20T00:00:00+05:30",        // midnight example (IST)
  theme: {
    primary: "#9b5de5",
    secondary: "#f15bb5",
    accent: "#fee440",
    bgGradient: "linear-gradient(135deg,#f8d7ff 0%, #ffe4f3 100%)"
  },
  domain: "",                                      // optional e.g., "https://yourdomain.com" for QR links

  // Define your quest steps (order matters). Keep answers simple; matching is case-insensitive and whitespace-trimmed.
  steps: [
    {
      id: "riddle-echo",
      title: "The Whispering Cave",
      type: "riddle",
      clue: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      hint: "It repeats you.",
      answer: "echo",
      token: "STEP1" // optional: if you want to gate this step via a QR token
    },
    {
      id: "memory-cafe",
      title: "Our First Date",
      type: "memory",
      clue: "Type the <b>first letter</b> of the café where we first had coffee together.",
      hint: "Check our old photos 👀",
      answer: "c", // change to match your story
      token: "STEP2"
    },
    {
      id: "anagram-heart",
      title: "Unscramble Me",
      type: "anagram",
      clue: "Unscramble these letters to form a word that defines us: <b>R E T H A</b>",
      hint: "It beats for you.",
      answer: "heart",
      token: "STEP3"
    },
    {
      id: "cipher-caesar",
      title: "Secret Message",
      type: "cipher",
      clue: "Decode this Caesar‑shifted (3) message: <b>KHOOR</b>",
      hint: "Shift backwards by 3.",
      answer: "hello",
      token: "STEP4"
    },
    {
      id: "math-armstrong",
      title: "Curious Number",
      type: "math",
      clue: "Which 3‑digit number equals the sum of the cubes of its digits?",
      hint: "An Armstrong number.",
      answer: "153",
      token: "STEP5"
    }
  ],

  // Optional finishing message
  finale: {
    headline: "You did it! 🎉",
    message: "Every clue was a piece of our story. Ready for the AR magic?"
  },

  // AR settings (marker-based via AR.js). Default uses the built-in HIRO marker.
  ar: {
    useHiro: true,                      // true = use preset="hiro"; false = use custom marker pattern
    // If useHiro=false, provide your marker pattern URL and marker size in meters.
    patternUrl: "",                     // e.g., "assets/markers/my-marker.patt"
    markerSize: 0.8,
    text: "Happy Birthday, <NAME>!",   // <NAME> will be replaced by herName
    colors: { text: "#FF69B4", shape1: "#FFD166", shape2: "#9b5de5" }
  }
};
