-- Q Rator Kids - Sample Content Seed Data
-- Run this AFTER the main schema migration
-- This creates sample lessons, stories, and assignments for testing

-- =====================================================
-- SAMPLE LESSONS (10 lessons across all characters)
-- =====================================================

-- Leo's Lessons (Drawing & Sketching)
INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Drawing Perfect Circles',
  'Learn how to draw circles by hand! Leo shows you the secret tricks to make round shapes look amazing.',
  'Beginner',
  id,
  10,
  false, -- FREE
  1
FROM characters WHERE name = 'Leo the Lion';

INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Sketching Simple Animals',
  'Draw cute animals using basic shapes! Start with circles and triangles to create dogs, cats, and more.',
  'Beginner',
  id,
  15,
  true, -- PREMIUM
  2
FROM characters WHERE name = 'Leo the Lion';

-- Bella's Lessons (Colors & Painting)
INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Meet the Rainbow Colors',
  'Discover all the beautiful colors of the rainbow! Bella teaches you their names and how to use them.',
  'Beginner',
  id,
  8,
  false, -- FREE
  3
FROM characters WHERE name = 'Bella the Butterfly';

INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Mixing Colors Magic',
  'What happens when you mix colors together? Create new colors and learn amazing color combinations!',
  'Intermediate',
  id,
  12,
  true, -- PREMIUM
  4
FROM characters WHERE name = 'Bella the Butterfly';

-- Ollie's Lessons (Shapes & Patterns)
INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Shape Detective Challenge',
  'Find shapes everywhere! Ollie helps you spot circles, squares, and triangles in the world around you.',
  'Beginner',
  id,
  10,
  false, -- FREE
  5
FROM characters WHERE name = 'Ollie the Owl';

INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Creating Cool Patterns',
  'Make repeating patterns that look super cool! Learn how artists use patterns in their artwork.',
  'Intermediate',
  id,
  15,
  true, -- PREMIUM
  6
FROM characters WHERE name = 'Ollie the Owl';

-- Zara's Lessons (Lines & Textures)
INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Drawing Different Lines',
  'Straight, wavy, zigzag! Zara shows you all the different kinds of lines you can draw.',
  'Beginner',
  id,
  10,
  false, -- FREE (3rd free lesson)
  7
FROM characters WHERE name = 'Zara the Zebra';

INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Texture Adventure',
  'Make your drawings look furry, bumpy, or smooth! Learn to add texture to your art.',
  'Intermediate',
  id,
  12,
  true, -- PREMIUM
  8
FROM characters WHERE name = 'Zara the Zebra';

-- Frankie's Lessons (Composition & Storytelling)
INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Your Art Tells Stories',
  'Every picture can tell a story! Frankie teaches you how to share your ideas through drawing.',
  'Intermediate',
  id,
  15,
  true, -- PREMIUM
  9
FROM characters WHERE name = 'Frankie the Fox';

INSERT INTO lessons (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Making Art Come Alive',
  'Learn how to arrange things in your picture to make them exciting and fun to look at!',
  'Intermediate',
  id,
  18,
  true, -- PREMIUM
  10
FROM characters WHERE name = 'Frankie the Fox';

-- =====================================================
-- SAMPLE STORIES (10 stories)
-- =====================================================

-- Leo's Stories
INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Leo''s First Drawing',
  'Watch Leo remember when he was a little cub learning to draw! A heartwarming story about never giving up.',
  'Beginner',
  id,
  5,
  false, -- FREE
  1
FROM characters WHERE name = 'Leo the Lion';

INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'The Drawing Contest',
  'Leo enters a big art contest! Will his drawing win? Learn that it''s not about winning, it''s about having fun!',
  'Intermediate',
  id,
  7,
  true, -- PREMIUM
  2
FROM characters WHERE name = 'Leo the Lion';

-- Bella's Stories
INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Bella''s Rainbow Adventure',
  'Join Bella as she flies through the sky discovering all the colors of the rainbow!',
  'Beginner',
  id,
  5,
  false, -- FREE
  3
FROM characters WHERE name = 'Bella the Butterfly';

INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'The Lost Color',
  'Oh no! One of the colors is missing! Help Bella find it in this colorful mystery adventure.',
  'Beginner',
  id,
  6,
  true, -- PREMIUM
  4
FROM characters WHERE name = 'Bella the Butterfly';

-- Ollie's Stories
INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Ollie''s Shape School',
  'It''s the first day at Shape School! Follow Ollie as he teaches young shapes how to be the best they can be.',
  'Beginner',
  id,
  5,
  false, -- FREE (3rd free story)
  5
FROM characters WHERE name = 'Ollie the Owl';

INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'The Pattern Mystery',
  'A mysterious pattern appears in the forest! Ollie uses his wisdom to solve the puzzle.',
  'Intermediate',
  id,
  8,
  true, -- PREMIUM
  6
FROM characters WHERE name = 'Ollie the Owl';

-- Zara's Stories
INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Zara''s Stripe Story',
  'Ever wonder how zebras got their stripes? Zara shares the magical tale!',
  'Beginner',
  id,
  4,
  true, -- PREMIUM
  7
FROM characters WHERE name = 'Zara the Zebra';

INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'The Line Dance Party',
  'All the lines are having a dance party! Join Zara for a fun, wiggly, zigzaggy adventure.',
  'Beginner',
  id,
  6,
  true, -- PREMIUM
  8
FROM characters WHERE name = 'Zara the Zebra';

-- Frankie's Stories
INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'The Clever Artist',
  'Frankie uses his art to help his friends solve a problem. A story about creativity and teamwork!',
  'Intermediate',
  id,
  7,
  true, -- PREMIUM
  9
FROM characters WHERE name = 'Frankie the Fox';

INSERT INTO stories (title, description, difficulty_level, character_id, duration_minutes, is_premium, order_index)
SELECT 
  'Picture Perfect Adventure',
  'Frankie goes on a quest to take the perfect picture. Learn that every picture is special!',
  'Intermediate',
  id,
  8,
  true, -- PREMIUM
  10
FROM characters WHERE name = 'Frankie the Fox';

-- =====================================================
-- SAMPLE ASSIGNMENTS (10 assignments)
-- =====================================================

-- Leo's Assignments
INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Draw Your Favorite Animal',
  'Use simple shapes to draw your favorite animal! It can be a pet, a zoo animal, or even a made-up creature.',
  'Beginner',
  id,
  20,
  'Step 1: Start with basic shapes (circles, ovals, triangles)
Step 2: Add details like eyes, nose, and ears
Step 3: Draw legs, tail, and any special features
Step 4: Color your animal with your favorite colors!',
  false, -- FREE
  1
FROM characters WHERE name = 'Leo the Lion';

INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Design a Superhero',
  'Create your own superhero character! What special powers do they have?',
  'Intermediate',
  id,
  25,
  'Step 1: Draw the superhero''s body and costume
Step 2: Add a cool cape, mask, or special outfit
Step 3: Draw their superpowers (flying, lasers, etc.)
Step 4: Color and add a background!',
  true, -- PREMIUM
  2
FROM characters WHERE name = 'Leo the Lion';

-- Bella's Assignments
INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Paint a Rainbow Picture',
  'Create a beautiful rainbow scene! Add clouds, sun, and maybe a pot of gold.',
  'Beginner',
  id,
  15,
  'Step 1: Draw an arch for your rainbow
Step 2: Color it with red, orange, yellow, green, blue, purple
Step 3: Add fluffy clouds on both ends
Step 4: Draw a sun, birds, or anything else you like!',
  false, -- FREE
  3
FROM characters WHERE name = 'Bella the Butterfly';

INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Color Mixing Experiment',
  'Mix primary colors to make new colors! Create a color wheel showing what you discovered.',
  'Intermediate',
  id,
  30,
  'Step 1: Draw circles for red, blue, and yellow
Step 2: Mix red + blue = purple, blue + yellow = green, red + yellow = orange
Step 3: Paint each new color you make
Step 4: Label all your colors!',
  true, -- PREMIUM
  4
FROM characters WHERE name = 'Bella the Butterfly';

-- Ollie's Assignments
INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Shape Robot',
  'Build a robot using only shapes! Use circles, squares, triangles, and rectangles.',
  'Beginner',
  id,
  20,
  'Step 1: Use shapes to make the robot''s body and head
Step 2: Add arms and legs with rectangles
Step 3: Use circles for buttons and details
Step 4: Color your robot with metallic colors!',
  false, -- FREE (3rd free assignment)
  5
FROM characters WHERE name = 'Ollie the Owl';

INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Pattern Quilt Design',
  'Design a beautiful quilt with repeating patterns in each square!',
  'Intermediate',
  id,
  35,
  'Step 1: Draw a grid of squares (4x4 or 5x5)
Step 2: Create a different pattern in each square
Step 3: Make some patterns repeat
Step 4: Color with a color scheme!',
  true, -- PREMIUM
  6
FROM characters WHERE name = 'Ollie the Owl';

-- Zara's Assignments
INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Line Art Masterpiece',
  'Create a picture using only lines! Use straight lines, wavy lines, and zigzag lines.',
  'Beginner',
  id,
  20,
  'Step 1: Choose what you want to draw (flower, house, face)
Step 2: Draw ONLY with lines (no solid shapes)
Step 3: Try different line types for different parts
Step 4: Color between the lines if you want!',
  true, -- PREMIUM
  7
FROM characters WHERE name = 'Zara the Zebra';

INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Texture Collage',
  'Draw things with different textures: something soft, bumpy, smooth, and rough!',
  'Intermediate',
  id,
  30,
  'Step 1: Divide your paper into 4 sections
Step 2: In each section, draw something with that texture (fur, rocks, water, tree bark)
Step 3: Use different line and shading techniques
Step 4: Label each texture!',
  true, -- PREMIUM
  8
FROM characters WHERE name = 'Zara the Zebra';

-- Frankie's Assignments
INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Draw Your Dream Adventure',
  'Illustrate a story about your dream adventure! Where would you go? What would you do?',
  'Intermediate',
  id,
  30,
  'Step 1: Think of your adventure story
Step 2: Draw the main scene or moment
Step 3: Add yourself and other characters
Step 4: Include details that tell the story!',
  true, -- PREMIUM
  9
FROM characters WHERE name = 'Frankie the Fox';

INSERT INTO assignments (title, description, difficulty_level, character_id, estimated_minutes, instructions, is_premium, order_index)
SELECT 
  'Create a Comic Strip',
  'Make a 4-panel comic strip telling a funny or exciting story!',
  'Intermediate',
  id,
  40,
  'Step 1: Draw 4 boxes for your panels
Step 2: Plan your story (beginning, middle, end, punchline)
Step 3: Draw simple characters and scenes in each panel
Step 4: Add speech bubbles with text!',
  true, -- PREMIUM
  10
FROM characters WHERE name = 'Frankie the Fox';

-- =====================================================
-- VERIFY SEED DATA
-- =====================================================

-- Check counts
SELECT 'Lessons' as content_type, COUNT(*) as total, SUM(CASE WHEN is_premium = false THEN 1 ELSE 0 END) as free FROM lessons
UNION ALL
SELECT 'Stories' as content_type, COUNT(*) as total, SUM(CASE WHEN is_premium = false THEN 1 ELSE 0 END) as free FROM stories
UNION ALL
SELECT 'Assignments' as content_type, COUNT(*) as total, SUM(CASE WHEN is_premium = false THEN 1 ELSE 0 END) as free FROM assignments;

-- Should show:
-- Lessons: 10 total, 3 free (Beginner lessons from Leo, Bella, Zara)
-- Stories: 10 total, 3 free (Beginner stories from Leo, Bella, Ollie)
-- Assignments: 10 total, 3 free (Beginner assignments from Leo, Bella, Ollie)
