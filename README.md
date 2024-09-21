# Rick and Morty Character Feed

This project showcases a character feed from the *Rick and Morty* API, utilizing React for a dynamic user experience.

## Getting Started

### Prerequisites
- Node.js installed on your machine.

### Running the Project

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
2. **Open the Project -** Open the cloned folder in your preferred IDE.

2. **Install Dependencies -** Open a terminal in the root of the project folder and run:
   ```bash
   npm install

3. **Run Program -** In the same terminal, run:
   ```bash
   npm start
This will launch the application in your browser at [http://localhost:3000](http://localhost:3000).

## Approach to the Problem
### Key Features
- **Functional Components & Hooks:** Built entirely with functional components, employing React hooks (useState, useEffect, useMemo) for state management and lifecycle methods. This avoids class-based components, promoting cleaner code. useMemo() optimizes performance by preventing unnecessary re-renders.
- **Data Fetching:** The application fetches data from the API across all available pages, consolidating character information for efficient rendering. Error handling and loading states enhance user experience during data retrieval.
- **Filtering & Sorting:** Dynamic filtering options by character status (Alive, Dead, Unknown, Any) and sorting by creation date (Oldest to Newest and vice versa) enable users to customize their view. Hooks manage updates to the displayed character list based on user selections.
- **Skeleton Loading:** A skeleton loading animation provides visual feedback during data fetching, improving user engagement.
- **Modular & Styled Components:** Components such as Card and Dropdown are designed for reusability, with CSS applied for a consistent visual aesthetic and smooth animations.

### Component Hierarchy
- **App:** Displays logo, handles data fetching, manages loading/error states, implements filtering and sorting functionality.
    - **FilterSortBar:** Manages filter and sort menus.
        - **Dropdown:** Reusable dropdown menu for filter/sort options.
    - **Grid:** Displays the character cards.
        - **Card:** Renders individual character details (name, species, status, gender, image, created date).
## Extras
1. **Infinite Scroll**
2. **Responsive Design**
   - Flexbox allows UI elements to adapt to various screen sizes
   - Hover effects for buttons and cards enhance interactivity
   - Updates to filter/sort options are displayed on the corresponding filter/sort tags
   - Custom loader
