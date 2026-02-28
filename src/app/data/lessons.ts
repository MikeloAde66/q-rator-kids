export interface Lesson {
  id: string;
  level: 'beginner' | 'intermediate';
  title: string;
  description: string;
  artBuddyId: string;
  artBuddyName: string;
  artBuddyImage: string;
  videoUrl: string;
  duration: string;
  skills: string[];
  assignment: {
    title: string;
    downloadUrl: string;
    materials: string[];
  };
  completed?: boolean;
  ageRange: string;
}

// Import individual character images
import leoImage from 'figma:asset/b7f7f06d5d7da3fb415cc36510d3685a58abf625.png';
import ellieImage from 'figma:asset/f721ada2b20300215ea48dbf55829aed1a05373b.png';
import curatorImage from 'figma:asset/d7e4bf10eb35abda3e367c7c50bdb2c23724aff2.png';
import millyImage from 'figma:asset/a81e645a0ec479f0fca65dcfac3e3ce0575d6e5e.png';
import bennyImage from 'figma:asset/0620bc37ef1517274755fca6ee19a94128c08e1a.png';

export const lessons: Lesson[] = [
  // BEGINNER LESSONS (Ages 6-8) - Crayons & Basic Fun!
  {
    id: 'beginner-1',
    level: 'beginner',
    title: 'Hold Your Crayon Like a Pro!',
    description: 'Leo shows you the super fun way to hold your crayon! Get ready to make amazing colors!',
    artBuddyId: 'leo-lion',
    artBuddyName: 'Leo the Lion',
    artBuddyImage: leoImage,
    videoUrl: '/videos/beginner-1-crayon-grip.mp4', // Replace with your actual video URL
    duration: '5 mins',
    skills: ['Holding Crayons', 'Making Lines', 'Having Fun!'],
    assignment: {
      title: 'Rainbow Lines Party!',
      downloadUrl: '/assignments/beginner-1.pdf',
      materials: ['Crayons', 'Paper']
    },
    ageRange: '6-8 years'
  },
  {
    id: 'beginner-2',
    level: 'beginner',
    title: 'Draw Circles, Squares & Triangles!',
    description: 'Benny the Bunny hops into shapes! Learn to draw circles, squares, and triangles - they\'re everywhere!',
    artBuddyId: 'benny-bunny',
    artBuddyName: 'Benny the Bunny',
    artBuddyImage: bennyImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '6 mins',
    skills: ['Circles', 'Squares', 'Triangles'],
    assignment: {
      title: 'Shape Safari Adventure!',
      downloadUrl: '/assignments/beginner-2.pdf',
      materials: ['Crayons', 'Paper']
    },
    ageRange: '6-8 years'
  },
  {
    id: 'beginner-3',
    level: 'beginner',
    title: 'Mix Colors & Make Magic!',
    description: 'Milly loves colors! See what happens when you mix red and blue, or yellow and red! It\'s like magic!',
    artBuddyId: 'milly-monkey',
    artBuddyName: 'Milly the Monkey',
    artBuddyImage: millyImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '7 mins',
    skills: ['Red + Blue = Purple!', 'Yellow + Red = Orange!', 'Mixing Fun'],
    assignment: {
      title: 'Color Mixing Magic!',
      downloadUrl: '/assignments/beginner-3.pdf',
      materials: ['Crayons', 'Paper']
    },
    ageRange: '6-8 years'
  },
  {
    id: 'beginner-4',
    level: 'beginner',
    title: 'Draw Your First Animal!',
    description: 'The Curator teaches you how to draw a super cute cat using just circles and triangles!',
    artBuddyId: 'the-curator',
    artBuddyName: 'The Curator',
    artBuddyImage: curatorImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '8 mins',
    skills: ['Drawing Animals', 'Using Shapes', 'Adding Details'],
    assignment: {
      title: 'Draw Cute Pets!',
      downloadUrl: '/assignments/beginner-4.pdf',
      materials: ['Crayons', 'Paper']
    },
    ageRange: '6-8 years'
  },
  {
    id: 'beginner-5',
    level: 'beginner',
    title: 'Color Inside the Lines!',
    description: 'Ellie shows you how to stay inside the lines and make your coloring look AWESOME!',
    artBuddyId: 'ellie-elephant',
    artBuddyName: 'Ellie the Elephant',
    artBuddyImage: ellieImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '6 mins',
    skills: ['Coloring Carefully', 'Staying in Lines', 'Being Patient'],
    assignment: {
      title: 'Super Coloring Pages!',
      downloadUrl: '/assignments/beginner-5.pdf',
      materials: ['Crayons', 'Paper']
    },
    ageRange: '6-8 years'
  },

  // INTERMEDIATE LESSONS (Ages 9-12) - Colored Pencils & Real Drawing!
  {
    id: 'intermediate-1',
    level: 'intermediate',
    title: 'Colored Pencils - Level Up!',
    description: 'Ready for colored pencils? Leo shows you how they\'re different from crayons and super cool!',
    artBuddyId: 'leo-lion',
    artBuddyName: 'Leo the Lion',
    artBuddyImage: leoImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '8 mins',
    skills: ['Using Colored Pencils', 'Light & Dark Pressure', 'Blending Colors'],
    assignment: {
      title: 'Colored Pencil Practice!',
      downloadUrl: '/assignments/intermediate-1.pdf',
      materials: ['Colored Pencils', 'Paper', 'Eraser']
    },
    ageRange: '9-12 years'
  },
  {
    id: 'intermediate-2',
    level: 'intermediate',
    title: 'Make Things Look 3D!',
    description: 'The Curator teaches you how to add shadows and light to make your drawings pop off the page!',
    artBuddyId: 'the-curator',
    artBuddyName: 'The Curator',
    artBuddyImage: curatorImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '10 mins',
    skills: ['Light & Shadow', 'Making Things 3D', 'Shading'],
    assignment: {
      title: '3D Drawing Challenge!',
      downloadUrl: '/assignments/intermediate-2.pdf',
      materials: ['Colored Pencils', 'Paper', 'Blending Tool']
    },
    ageRange: '9-12 years'
  },
  {
    id: 'intermediate-3',
    level: 'intermediate',
    title: 'Draw Amazing Faces!',
    description: 'Milly shows you the secrets to drawing faces - eyes, nose, mouth, and smiles!',
    artBuddyId: 'milly-monkey',
    artBuddyName: 'Milly the Monkey',
    artBuddyImage: millyImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '12 mins',
    skills: ['Drawing Faces', 'Eyes & Expressions', 'Proportions'],
    assignment: {
      title: 'Draw Your Friends & Family!',
      downloadUrl: '/assignments/intermediate-3.pdf',
      materials: ['Colored Pencils', 'Paper', 'Mirror']
    },
    ageRange: '9-12 years'
  },
  {
    id: 'intermediate-4',
    level: 'intermediate',
    title: 'Backgrounds & Scenes!',
    description: 'Benny teaches you how to draw backgrounds so your characters have cool places to live!',
    artBuddyId: 'benny-bunny',
    artBuddyName: 'Benny the Bunny',
    artBuddyImage: bennyImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '11 mins',
    skills: ['Drawing Backgrounds', 'Trees & Clouds', 'Making Scenes'],
    assignment: {
      title: 'Create Your Own World!',
      downloadUrl: '/assignments/intermediate-4.pdf',
      materials: ['Colored Pencils', 'Large Paper']
    },
    ageRange: '9-12 years'
  },
  {
    id: 'intermediate-5',
    level: 'intermediate',
    title: 'Your First Comic Strip!',
    description: 'Ellie shows you how to tell stories with pictures! Make your own 3-panel comic!',
    artBuddyId: 'ellie-elephant',
    artBuddyName: 'Ellie the Elephant',
    artBuddyImage: ellieImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '13 mins',
    skills: ['Comic Panels', 'Storytelling', 'Speech Bubbles'],
    assignment: {
      title: 'Make Your Own Comic!',
      downloadUrl: '/assignments/intermediate-5.pdf',
      materials: ['Colored Pencils', 'Paper', 'Black Pen']
    },
    ageRange: '9-12 years'
  }
];

export const getLessonsByLevel = (level: 'beginner' | 'intermediate') => {
  return lessons.filter(lesson => lesson.level === level);
};

export const getLessonById = (id: string) => {
  return lessons.find(lesson => lesson.id === id);
};