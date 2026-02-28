import { useState } from 'react';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useSearch } from '../contexts/SearchContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SearchBar() {
  const { searchQuery, setSearchQuery, filters, updateFilters, resetFilters, isSearchActive } = useSearch();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  const activeFilterCount = [
    filters.contentType !== 'all',
    filters.difficulty !== 'all',
    filters.character !== 'all',
    filters.sortBy !== 'newest',
  ].filter(Boolean).length;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
        <Input
          type="text"
          placeholder="Search lessons, stories, and activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-12 pr-24 py-6 text-lg font-bold border-4 border-purple-300 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 bg-white shadow-lg"
        />
        
        {/* Clear Button */}
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-16 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Filter Button */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-100 rounded-xl"
            >
              <SlidersHorizontal className="w-5 h-5 text-purple-500" />
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-6 border-4 border-purple-300 rounded-2xl" align="end">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-purple-500" />
                  Filters
                </h3>
                {isSearchActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-purple-600 hover:text-purple-700 font-bold"
                  >
                    Reset All
                  </Button>
                )}
              </div>

              {/* Content Type Filter */}
              <div>
                <Label className="text-sm font-black text-gray-700 mb-2 block">
                  Content Type
                </Label>
                <Select
                  value={filters.contentType}
                  onValueChange={(value: any) => updateFilters({ contentType: value })}
                >
                  <SelectTrigger className="border-2 border-purple-200 rounded-xl font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">🎨 All Content</SelectItem>
                    <SelectItem value="lessons">📚 Lessons Only</SelectItem>
                    <SelectItem value="stories">📖 Stories Only</SelectItem>
                    <SelectItem value="assignments">✏️ Assignments Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <Label className="text-sm font-black text-gray-700 mb-2 block">
                  Difficulty Level
                </Label>
                <Select
                  value={filters.difficulty}
                  onValueChange={(value: any) => updateFilters({ difficulty: value })}
                >
                  <SelectTrigger className="border-2 border-purple-200 rounded-xl font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">🖍️ Beginner (Ages 6-8)</SelectItem>
                    <SelectItem value="intermediate">✏️ Intermediate (Ages 9-12)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Character Filter */}
              <div>
                <Label className="text-sm font-black text-gray-700 mb-2 block">
                  Teacher Character
                </Label>
                <Select
                  value={filters.character}
                  onValueChange={(value) => updateFilters({ character: value })}
                >
                  <SelectTrigger className="border-2 border-purple-200 rounded-xl font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teachers</SelectItem>
                    <SelectItem value="Luna the Wise Owl">🦉 Luna the Wise Owl</SelectItem>
                    <SelectItem value="Max the Playful Monkey">🐵 Max the Playful Monkey</SelectItem>
                    <SelectItem value="Bella the Kind Bunny">🐰 Bella the Kind Bunny</SelectItem>
                    <SelectItem value="Leo the Brave Lion">🦁 Leo the Brave Lion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <Label className="text-sm font-black text-gray-700 mb-2 block">
                  Sort By
                </Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value: any) => updateFilters({ sortBy: value })}
                >
                  <SelectTrigger className="border-2 border-purple-200 rounded-xl font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">🆕 Newest First</SelectItem>
                    <SelectItem value="popular">⭐ Most Popular</SelectItem>
                    <SelectItem value="difficulty">📊 By Difficulty</SelectItem>
                    <SelectItem value="alphabetical">🔤 A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {searchQuery && (
              <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300 font-bold px-3 py-1.5">
                Search: "{searchQuery}"
              </Badge>
            )}
            {filters.contentType !== 'all' && (
              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-300 font-bold px-3 py-1.5">
                {filters.contentType === 'lessons' ? '📚 Lessons' : 
                 filters.contentType === 'stories' ? '📖 Stories' : 
                 '✏️ Assignments'}
              </Badge>
            )}
            {filters.difficulty !== 'all' && (
              <Badge className="bg-green-100 text-green-700 border-2 border-green-300 font-bold px-3 py-1.5">
                {filters.difficulty === 'beginner' ? '🖍️ Beginner' : '✏️ Intermediate'}
              </Badge>
            )}
            {filters.character !== 'all' && (
              <Badge className="bg-orange-100 text-orange-700 border-2 border-orange-300 font-bold px-3 py-1.5">
                {filters.character}
              </Badge>
            )}
            {filters.sortBy !== 'newest' && (
              <Badge className="bg-pink-100 text-pink-700 border-2 border-pink-300 font-bold px-3 py-1.5">
                Sort: {filters.sortBy === 'popular' ? '⭐ Popular' : 
                       filters.sortBy === 'difficulty' ? '📊 Difficulty' : 
                       '🔤 A-Z'}
              </Badge>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
