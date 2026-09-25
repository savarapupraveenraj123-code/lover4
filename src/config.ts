// ============================================================
//  PERSONALIZATION CONFIG
//  Edit this file to customize the entire experience.
//  Everything below feeds into every scene — no other file
//  needs to be touched to personalize the website.
// ============================================================

export const config = {
  // --- Who is this for? ---
  partnerName: 'JAHNAVI',
  yourName: 'Your Name', // <- change to your name

  // --- The very first screen ---
  intro: {
    greeting: 'Hey You... ❤️',
    subtitle: 'I made something for you.',
    button: 'Begin Our Story →',
  },

  // --- Scene 1: The Beginning ---
  scene1: {
    lines: [
      'Every beautiful story has a beginning...',
      'And somehow, mine began when I met you.',
    ],
    button: 'Continue ❤️',
  },

  // --- Scene 2: Memories ---
  // Add as many memory cards as you like. Each has a title,
  // date, one-line description, and an optional photo URL.
  // Replace the photo URLs with your own images later.
  memories: [
    {
      title: 'That first conversation...',
      date: 'The Beginning',
      description: 'Two strangers, one conversation, and something neither of us expected.',
      photo: '', // <- add your photo URL here
    },
    {
      title: 'That first laugh...',
      date: 'Early Days',
      description: 'The moment your laugh became my favorite sound in the world.',
      photo: '',
    },
    {
      title: 'That moment I realized you were special...',
      date: 'A Quiet Evening',
      description: 'It was never one moment. It was every moment, quietly adding up.',
      photo: '',
    },
    {
      title: 'All those little moments...',
      date: 'Every Day',
      description: 'The late-night talks, the silly arguments, the comfortable silences.',
      photo: '',
    },
    {
      title: 'The day everything changed...',
      date: 'A Day I Remember',
      description: 'When "liking you" quietly turned into something I couldn\'t ignore anymore.',
      photo: '',
    },
  ],

  // --- Scene 3: The Reasons ---
  reasonsTitle: 'Do you know why I love you?',
  reasons: [
    'Your smile.',
    'Your voice.',
    'The way you care.',
    'The way you make ordinary moments feel special.',
    'Simply... you.',
  ],

  // --- Scene 4: The Heartbeat ---
  scene4: {
    lines: [
      "There's something I've been wanting to tell you...",
      'My heart has known the answer for a long time.',
      'I just needed the courage to ask.',
    ],
    button: 'One Last Thing...',
  },

  // --- Scene 5: The Proposal ---
  proposal: {
    name: 'JAHNAVI ❤️',
    lines: [
      "I don't want a perfect story...",
      'I just want our story.',
    ],
    askWord: 'So...',
    question: 'Will you be mine? ❤️',
    buttons: ['YES ❤️', 'Absolutely YES 💍'],
    celebrationLines: [
      'YOU JUST MADE ME THE HAPPIEST PERSON ALIVE ❤️',
      'Our story officially begins here...',
      'Forever sounds pretty good with you. ❤️',
    ],
  },

  // --- Easter egg (click the small heart icon in the corner) ---
  easterEgg: {
    lines: [
      'P.S. I could have written a thousand reasons...',
      '...but my favorite reason is simply YOU. ❤️',
    ],
  },

  // --- Footer ---
  footer: 'Made with ❤️',

  // --- Background music ---
  // Replace this URL with your own song. This is a soft
  // ambient placeholder track.
  musicUrl:
    'https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3',

  // --- Accent color (used for glows, particles, highlights) ---
  accent: {
    primary: '#c41e3a', // crimson
    secondary: '#f48fb1', // rose
    gold: '#e8d5a8', // champagne
  },
};

export type AppConfig = typeof config;
