import { Lesson } from '../data/lessons';
import { Story } from '../data/stories';
import { Assignment } from '../data/assignments';
import { DifficultyLevel, SortOption } from '../contexts/SearchContext';

/**
 * Search utility functions for filtering and sorting content
 */

// Generic search function that checks multiple fields
export function searchInText(query: string, ...fields: string[]): boolean {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return true;
  
  return fields.some(field => 
    field?.toLowerCase().includes(lowerQuery)
  );
}

// Filter lessons by search query and filters
export function filterLessons(
  lessons: Lesson[],
  searchQuery: string,
  difficulty: DifficultyLevel,
  character: string
): Lesson[] {
  return lessons.filter(lesson => {
    // Search in title, description, skills
    const matchesSearch = searchInText(
      searchQuery,
      lesson.title,
      lesson.description,
      ...lesson.skills,
      lesson.teacher
    );

    // Filter by difficulty
    const matchesDifficulty = difficulty === 'all' || lesson.level === difficulty;

    // Filter by character
    const matchesCharacter = character === 'all' || lesson.teacher === character;

    return matchesSearch && matchesDifficulty && matchesCharacter;
  });
}

// Filter stories by search query and filters
export function filterStories(
  stories: Story[],
  searchQuery: string,
  difficulty: DifficultyLevel,
  character: string
): Story[] {
  return stories.filter(story => {
    // Search in title, description, moral
    const matchesSearch = searchInText(
      searchQuery,
      story.title,
      story.description,
      story.moral,
      story.character
    );

    // Filter by difficulty (stories might not have levels, so we'll use age range)
    const matchesDifficulty = difficulty === 'all' || 
      (difficulty === 'beginner' && story.ageRange.includes('6-8')) ||
      (difficulty === 'intermediate' && story.ageRange.includes('9-12'));

    // Filter by character
    const matchesCharacter = character === 'all' || story.character === character;

    return matchesSearch && matchesDifficulty && matchesCharacter;
  });
}

// Filter assignments by search query and filters
export function filterAssignments(
  assignments: Assignment[],
  searchQuery: string,
  difficulty: DifficultyLevel,
  character: string
): Assignment[] {
  return assignments.filter(assignment => {
    // Search in title, description, skills
    const matchesSearch = searchInText(
      searchQuery,
      assignment.title,
      assignment.description,
      ...assignment.skills,
      assignment.teacher
    );

    // Filter by difficulty
    const matchesDifficulty = difficulty === 'all' || assignment.level === difficulty;

    // Filter by character
    const matchesCharacter = character === 'all' || assignment.teacher === character;

    return matchesSearch && matchesDifficulty && matchesCharacter;
  });
}

// Sort lessons based on sort option
export function sortLessons(lessons: Lesson[], sortBy: SortOption): Lesson[] {
  const sorted = [...lessons];

  switch (sortBy) {
    case 'newest':
      // Assuming newer lessons have higher IDs
      return sorted.reverse();
    
    case 'popular':
      // For now, randomize. In production, use actual popularity data
      return sorted.sort(() => Math.random() - 0.5);
    
    case 'difficulty':
      // Sort beginner first, then intermediate
      return sorted.sort((a, b) => {
        if (a.level === 'beginner' && b.level === 'intermediate') return -1;
        if (a.level === 'intermediate' && b.level === 'beginner') return 1;
        return 0;
      });
    
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    default:
      return sorted;
  }
}

// Sort stories based on sort option
export function sortStories(stories: Story[], sortBy: SortOption): Story[] {
  const sorted = [...stories];

  switch (sortBy) {
    case 'newest':
      return sorted.reverse();
    
    case 'popular':
      return sorted.sort(() => Math.random() - 0.5);
    
    case 'difficulty':
      // Sort by age range
      return sorted.sort((a, b) => {
        const aIsYounger = a.ageRange.includes('6-8');
        const bIsYounger = b.ageRange.includes('6-8');
        if (aIsYounger && !bIsYounger) return -1;
        if (!aIsYounger && bIsYounger) return 1;
        return 0;
      });
    
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    default:
      return sorted;
  }
}

// Sort assignments based on sort option
export function sortAssignments(assignments: Assignment[], sortBy: SortOption): Assignment[] {
  const sorted = [...assignments];

  switch (sortBy) {
    case 'newest':
      return sorted.reverse();
    
    case 'popular':
      return sorted.sort(() => Math.random() - 0.5);
    
    case 'difficulty':
      return sorted.sort((a, b) => {
        if (a.level === 'beginner' && b.level === 'intermediate') return -1;
        if (a.level === 'intermediate' && b.level === 'beginner') return 1;
        return 0;
      });
    
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    
    default:
      return sorted;
  }
}

// Search across all content types
export interface SearchResult {
  type: 'lesson' | 'story' | 'assignment';
  item: Lesson | Story | Assignment;
}

export function searchAllContent(
  lessons: Lesson[],
  stories: Story[],
  assignments: Assignment[],
  searchQuery: string,
  difficulty: DifficultyLevel,
  character: string
): SearchResult[] {
  const results: SearchResult[] = [];

  // Search lessons
  const filteredLessons = filterLessons(lessons, searchQuery, difficulty, character);
  filteredLessons.forEach(lesson => {
    results.push({ type: 'lesson', item: lesson });
  });

  // Search stories
  const filteredStories = filterStories(stories, searchQuery, difficulty, character);
  filteredStories.forEach(story => {
    results.push({ type: 'story', item: story });
  });

  // Search assignments
  const filteredAssignments = filterAssignments(assignments, searchQuery, difficulty, character);
  filteredAssignments.forEach(assignment => {
    results.push({ type: 'assignment', item: assignment });
  });

  return results;
}
