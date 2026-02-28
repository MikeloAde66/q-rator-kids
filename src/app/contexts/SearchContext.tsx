import { createContext, useContext, useState, ReactNode } from 'react';

export type ContentType = 'all' | 'lessons' | 'stories' | 'assignments';
export type DifficultyLevel = 'all' | 'beginner' | 'intermediate';
export type SortOption = 'newest' | 'popular' | 'difficulty' | 'alphabetical';

interface SearchFilters {
  contentType: ContentType;
  difficulty: DifficultyLevel;
  character: string; // 'all' or specific character name
  sortBy: SortOption;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SearchFilters;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  isSearchActive: boolean;
}

const defaultFilters: SearchFilters = {
  contentType: 'all',
  difficulty: 'all',
  character: 'all',
  sortBy: 'newest',
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const isSearchActive = searchQuery.length > 0 || 
    filters.contentType !== 'all' || 
    filters.difficulty !== 'all' || 
    filters.character !== 'all' ||
    filters.sortBy !== 'newest';

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filters,
        updateFilters,
        resetFilters,
        isSearchActive,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
