# pokemon-todo

MVP
1. Basic User Flow
Login System:
- Users should be able to log in and register to create an account
- Redirect them to the home screen after successful login (Start with dummy authentication before using backend)

2. Habit Tracking
Add Habits
- Users can create new habits with a name (e.g., "Exercise").
Track Progress
- Allow users to mark habits as completed for the day.
Display Progress
- Show a basic habit card with name and completion progress.

3. Pokémon Integration (Gamification)
- Link a Pokémon to each habit.
- Create a basic XP system: Completing a habit earns XP for its associated Pokémon.
- Set XP thresholds for Pokémon to level up or evolve.

4. Navigation
- Include buttons or navigation links: Move between login, home, and habit tracker pages seamlessly.
- Ensure the app has a clean layout.

5. Database & Data Persistence
- Use a free PostgreSQL database (e.g., Supabase or Render) to store habits and progress if you want real persistence.

Development Milestones
1. Frontend Setup:
- Create the , , and  components.
- Design a simple UI with buttons for navigation.
2. State Management:
- Use React's  to manage habits, Pokémon XP, and authentication state.
3. Basic Gamification:
- Implement the XP system for Pokémon linked to habits.
4. Testing User Flow:
- Ensure users can log in, add habits, track progress, and see Pokémon leveling up.