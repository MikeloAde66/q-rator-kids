// Animated stories about famous art - fun cartoon versions!

// Import individual character images
import leoImage from 'figma:asset/b7f7f06d5d7da3fb415cc36510d3685a58abf625.png';
import ellieImage from 'figma:asset/f721ada2b20300215ea48dbf55829aed1a05373b.png';
import curatorImage from 'figma:asset/d7e4bf10eb35abda3e367c7c50bdb2c23724aff2.png';
import millyImage from 'figma:asset/a81e645a0ec479f0fca65dcfac3e3ce0575d6e5e.png';
import bennyImage from 'figma:asset/0620bc37ef1517274755fca6ee19a94128c08e1a.png';

export interface Story {
  id: string;
  title: string;
  shortTitle: string;
  artistName: string;
  year: string;
  thumbnail: string;
  coverImage: string;
  description: string;
  funFacts: string[];
  artTricks: string[]; // What kids learn (simpler than "techniques")
  videoUrl: string;
  duration: string;
  ageRange: string;
  artBuddyHost: string;
  artBuddyImage: string;
}

export const stories: Story[] = [
  {
    id: 'mona-lisa-smile',
    title: "The Mystery of Mona Lisa's Smile!",
    shortTitle: 'Mona Lisa',
    artistName: 'Leonardo (a really cool artist from long ago!)',
    year: '500 years ago!',
    thumbnail: leoImage,
    coverImage: 'https://images.unsplash.com/photo-1580130732478-4e6d365e8a3d?w=800',
    description: 'Leo the Lion tells an ANIMATED story about a painting with the most famous smile ever! Why is she smiling? Let\'s find out!',
    funFacts: [
      '🎨 It took 4 YEARS to paint her!',
      '😊 Her smile looks different from every angle - magic!',
      '👀 Her eyes follow you around the room!',
      '🖼️ It\'s one of the most famous paintings EVER!'
    ],
    artTricks: [
      'How to draw a gentle smile',
      'Making soft, smooth colors',
      'Drawing realistic faces',
      'Being patient with your art'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '8 mins',
    ageRange: '6-12 years',
    artBuddyHost: 'Leo the Lion',
    artBuddyImage: leoImage
  },
  {
    id: 'starry-night-adventure',
    title: 'The Swirly Starry Night!',
    shortTitle: 'Starry Night',
    artistName: 'Vincent (who LOVED stars and colors!)',
    year: '130 years ago!',
    thumbnail: millyImage,
    coverImage: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800',
    description: 'Milly takes you on an ANIMATED adventure through the swirly, whirly, AMAZING starry sky!',
    funFacts: [
      '🌟 The stars are painted with THICK, swirly paint!',
      '🎨 Vincent used A LOT of blue and yellow!',
      '🌙 The moon is super bright and beautiful!',
      '💙 He painted what he saw from his window!'
    ],
    artTricks: [
      'Making swirly patterns',
      'Using thick paint strokes',
      'Mixing blues and yellows',
      'Drawing stars and moons'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '7 mins',
    ageRange: '6-12 years',
    artBuddyHost: 'Milly the Monkey',
    artBuddyImage: millyImage
  },
  {
    id: 'sunflowers-story',
    title: 'The Happiest Sunflowers Ever!',
    shortTitle: 'Sunflowers',
    artistName: 'Vincent (yes, the same star guy!)',
    year: '135 years ago!',
    thumbnail: curatorImage,
    coverImage: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=800',
    description: 'The Curator shows you ANIMATED sunflowers that are SO happy and bright, they make everyone smile!',
    funFacts: [
      '🌻 He painted 11 sunflowers in a vase!',
      '💛 SO MUCH YELLOW - his favorite color!',
      '😊 These flowers are super cheerful!',
      '🎨 The paint is thick like frosting on a cake!'
    ],
    artTricks: [
      'Drawing flowers',
      'Using lots of one color',
      'Making things look happy',
      'Thick paint techniques'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '6 mins',
    ageRange: '6-12 years',
    artBuddyHost: 'The Curator',
    artBuddyImage: curatorImage
  },
  {
    id: 'great-wave',
    title: 'The GIANT Wave!',
    shortTitle: 'The Great Wave',
    artistName: 'Hokusai (from Japan!)',
    year: '195 years ago!',
    thumbnail: bennyImage,
    coverImage: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
    description: 'Benny hops into an ANIMATED wave that\'s HUGE! Watch the boats brave the big waves!',
    funFacts: [
      '🌊 The wave looks like it has CLAWS!',
      '🗻 There\'s a mountain hiding in the background!',
      '⛵ Three boats are riding the wave!',
      '🎨 It was printed from carved wood blocks!'
    ],
    artTricks: [
      'Drawing water and waves',
      'Making things look powerful',
      'Using blue and white together',
      'Creating movement in art'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '7 mins',
    ageRange: '6-12 years',
    artBuddyHost: 'Benny the Bunny',
    artBuddyImage: bennyImage
  },
  {
    id: 'water-lilies',
    title: 'The Peaceful Water Lilies!',
    shortTitle: 'Water Lilies',
    artistName: 'Monet (who had a magical garden!)',
    year: '100 years ago!',
    thumbnail: ellieImage,
    coverImage: 'https://images.unsplash.com/photo-1485486312232-f0d995a59a1c?w=800',
    description: 'Ellie takes you on an ANIMATED journey to a peaceful pond with beautiful floating flowers!',
    funFacts: [
      '🌸 He had a real pond in his garden!',
      '🎨 He painted it over and over again!',
      '💚 The greens and pinks are SO pretty!',
      '😌 Looking at it makes you feel calm and happy!'
    ],
    artTricks: [
      'Painting water reflections',
      'Using soft colors',
      'Making peaceful scenes',
      'Blending colors smoothly'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '8 mins',
    ageRange: '6-12 years',
    artBuddyHost: 'Ellie the Elephant',
    artBuddyImage: ellieImage
  },
  {
    id: 'composition-shapes',
    title: 'Shapes Make Pictures!',
    shortTitle: 'Cool Shapes',
    artistName: 'Mondrian (the square and line master!)',
    year: '100 years ago!',
    thumbnail: leoImage,
    coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    description: 'Leo shows you ANIMATED art made from squares, rectangles, and primary colors - it\'s like art LEGOS!',
    funFacts: [
      '🟥 Only red, yellow, blue, black, and white!',
      '📐 Everything is made of straight lines!',
      '🎨 It looks simple but it\'s PERFECT!',
      '🏙️ It inspired designers all over the world!'
    ],
    artTricks: [
      'Using straight lines',
      'Making art with shapes',
      'Primary colors only',
      'Balance and design'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '6 mins',
    ageRange: '6-12 years',
    artBuddyHost: 'Leo the Lion',
    artBuddyImage: leoImage
  }
];

export const getStoryById = (id: string) => {
  return stories.find(story => story.id === id);
};