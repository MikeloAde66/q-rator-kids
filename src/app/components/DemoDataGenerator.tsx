import { useEffect } from 'react';
import { useActivity } from '../contexts/ActivityContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * Demo Data Generator - Creates sample activity data for testing the Parental Dashboard
 * This component runs once on mount to populate realistic activity data
 */
export function DemoDataGenerator() {
  const { childProfiles } = useAuth();
  const { trackLessonComplete, trackStoryComplete, trackAssignmentComplete } = useActivity();

  useEffect(() => {
    // Safety check - ensure childProfiles exists
    if (!childProfiles || childProfiles.length === 0) {
      return;
    }

    // Only generate demo data if we have child profiles and no existing activity
    const hasExistingData = localStorage.getItem('activity_sessions');
    
    if (!hasExistingData) {
      console.log('🎨 Generating demo activity data for Parental Dashboard...');
      
      // Generate sample data for each child
      childProfiles.forEach((child) => {
        // Simulate some lessons completed over the past week
        const sampleLessons = [
          { id: 'beginner-1', skills: ['Circles', 'Basic Shapes', 'Hand Control'] },
          { id: 'beginner-2', skills: ['Lines', 'Curved Lines', 'Pattern Making'] },
          { id: 'intermediate-1', skills: ['Shading', 'Light & Shadow', 'Blending'] },
        ];

        const sampleStories = [
          { id: 'story-1', skills: ['Color Recognition', 'Creativity'] },
          { id: 'story-2', skills: ['Imagination', 'Storytelling'] },
        ];

        const sampleAssignments = [
          { id: 'assignment-1', skills: ['Drawing Animals', 'Proportions'] },
        ];

        // Track random completions
        const randomCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < randomCount; i++) {
          if (Math.random() > 0.3 && sampleLessons[i]) {
            trackLessonComplete(sampleLessons[i].id, sampleLessons[i].skills);
          }
          if (Math.random() > 0.5 && sampleStories[i]) {
            trackStoryComplete(sampleStories[i].id, sampleStories[i].skills);
          }
          if (Math.random() > 0.7 && sampleAssignments[i]) {
            trackAssignmentComplete(sampleAssignments[i].id, sampleAssignments[i].skills);
          }
        }
      });

      console.log('✅ Demo data generated! Check the Parental Dashboard.');
    }
  }, [childProfiles?.length]); // Safe optional chaining

  // This component doesn't render anything
  return null;
}