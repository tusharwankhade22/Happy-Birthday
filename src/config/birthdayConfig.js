/**
 * ============================================================================
 *  GAYATRI'S BIRTHDAY SURPRISE — EASY CUSTOMIZATION FILE
 * ============================================================================
 *  Edit this file to personalize:
 *   1. Recipient details & date
 *   2. Balloon surprise messages
 *   3. Memory Lane photos & captions (place real photos in public/images/memories/)
 *   4. Final Love Letter paragraphs & signature
 *   5. Background music file (place an MP3 at public/music/birthday-song.mp3)
 */

export const BIRTHDAY_PERSON = {
  name: 'Gayatri',
  age: '24',
  from: 'Tushar',
  date: '26 November',
  heroEyebrow: "It's officially your day!",
  heroHeading: 'Happy Birthday, Gayatri!',
  cakeHeading: 'A little sweetness for someone special!',
  cakeWishMessage: 'May all your wishes come true, Gayatri!',
  balloonCompleteMessage: "That's not all... I have some more surprises for you! ❤️",
};

export const BALLOON_MESSAGES = [
  {
    id: 1,
    message: 'You deserve all the happiness in the world!',
    color: '#F4A6C1',
    highlight: '#FFD6E5',
    shadow: '#E879A9',
    label: 'Pink Wish',
  },
  {
    id: 2,
    message: 'Never stop smiling. Your smile is magical!',
    color: '#D8B4FE',
    highlight: '#F3E8FF',
    shadow: '#C084FC',
    label: 'Lavender Wish',
  },
  {
    id: 3,
    message: 'May every dream of yours come true!',
    color: '#FEC5BB',
    highlight: '#FFE5D9',
    shadow: '#F4978E',
    label: 'Peach Wish',
  },
  {
    id: 4,
    message: 'Keep shining and being the wonderful person you are!',
    color: '#FEF3C7',
    highlight: '#FFFBEB',
    shadow: '#FCD34D',
    label: 'Cream Wish',
  },
  {
    id: 5,
    message: 'Today is all about YOU! Enjoy every second!',
    color: '#FFFFFF',
    highlight: '#FFF0F5',
    shadow: '#F4A6C1',
    label: 'White Wish',
  },
];

/**
 * Memory Lane Gallery (6 Polaroid memories from public/images/)
 */
export const MEMORIES = [
  {
    id: 1,
    src: '/images/gallery-1.jpg',
    caption: 'Your laugh is my favourite sound.',
    tag: 'Pure Joy',
    rotation: -3,
    gradient: 'from-pink-200 via-rose-100 to-purple-100',
  },
  {
    id: 2,
    src: '/images/gallery-2.jpg',
    caption: 'You make ordinary days feel special.',
    tag: 'Bestie Moments',
    rotation: 2.5,
    gradient: 'from-purple-200 via-pink-100 to-rose-100',
  },
  {
    id: 3,
    src: '/images/gallery-3.jpg',
    caption: 'A little chaos, a lot of love, and memories for life.',
    tag: 'Golden Days',
    rotation: -2,
    gradient: 'from-rose-200 via-amber-50 to-pink-100',
  },
  {
    id: 4,
    src: '/images/gallery-4.jpg',
    caption: 'The world is kinder with you in it.',
    tag: 'Sunshine',
    rotation: 3,
    gradient: 'from-pink-100 via-fuchsia-100 to-purple-200',
  },
  {
    id: 5,
    src: '/images/gallery-5.jpg',
    caption: 'You believed in me when I didn’t.',
    tag: 'Forever Grateful',
    rotation: -2.5,
    gradient: 'from-rose-100 via-pink-200 to-purple-100',
  },
  {
    id: 6,
    src: '/images/hero-bg.jpg',
    caption: 'You remember the little things I forget.',
    tag: '26 Nov Magic',
    rotation: 2,
    gradient: 'from-purple-100 via-pink-100 to-rose-200',
  },
];

export const LOVE_LETTER = {
  introPrompt: 'One last thing... I have something special for you.',
  buttonLabel: 'Open Your Letter ❤️',
  salutation: 'Dear Gayatri,',
  paragraphs: [
    'Every year I try to find the perfect words and every year I fall short, so here is the honest version: you make my most ordinary days feel worth remembering. 🎂',
    'Happy Birthday to one of the most wonderful people in my life! ❤️',
    'Today is your special day, and I just want to remind you how amazing you are.',
    'May your life always be filled with happiness, endless laughter, beautiful memories, and everything your heart wishes for.',
    'Keep smiling, keep shining, and never stop being the beautiful person you are.',
    'I hope this little surprise brings a smile to your face because you truly deserve all the happiness in the world.',
    'Once again, Happiest 24th Birthday, my favourite person! ❤️',
  ],
  closing: 'With lots of love,',
  signature: 'Tushar',
  footerNote: 'Made with ❤️ by Tushar, just for you.',
};

export const MUSIC_CONFIG = {
  /**
   * YouTube song link & start time (in seconds)
   */
  youtubeVideoId: 'NZGHXy1IAHM',
  startSeconds: 60,
  audioSrc: '/music/birthday-song.mp3',
  trackTitle: 'A Thousand Years',
  defaultVolume: 35,
};

export const CAT_VIDEO_CONFIG = {
  /**
   * YouTube Shorts / Video URL (or leave empty to use local public/video/birthday-cat.mp4)
   */
  youtubeUrl: 'https://www.youtube.com/shorts/x2_ioi-04_w',
  videoSrc: '/video/birthday-cat.mp4',
  title: 'A Special Birthday Serenade! 🐱',
};
