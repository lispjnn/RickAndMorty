# Rick and Morty Submission

This project showcases characters from the *Rick and Morty* API.

## Getting Started
You can check out my deployment at: [https://rick-and-morty-hazel-omega.vercel.app/](https://rick-and-morty-hazel-omega.vercel.app/), or follow the steps below!
### Prerequisites
- Node.js installed on your machine.

### Running the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/lispjnn/RickAndMorty.git
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
- **Functional Components & Hooks:** Built entirely with functional components, employing React hooks (useState, useEffect, useMemo) for state management. 
- **Data Fetching:** The application fetches data from the API across all available pages, consolidating character information into an array. Error handling and loading states enhance user experience and robustness.
- **Filtering & Sorting:** Hooks manage updates to the displayed character list based on user selections. useMemo() is utilized to prevent unnecessary re-renders if filter/sort options aren't being updated.
- **Skeleton Loading:** A skeleton loading animation provides visual feedback during data fetching.
- **Modular & Styled Components:** Components, such as Card and Dropdown, are designed for reusability, consistent design, and consistent animations.

### Component Hierarchy
- **App:** Displays logo, handles data fetching, manages loading/error states, implements filtering and sorting functionality.
    - **FilterSortBar:** Manages filter and sort menus.
        - **Dropdown:** Dropdown menu for filter/sort options.
    - **Grid:** Displays the character cards.
        - **Card:** Renders individual character details (name, species, status, gender, image, created date).
## Extras
1. **Responsive Design**
   - Flexbox allows UI elements to adapt to various screen sizes
   - Hover effects for buttons and cards enhance interactivity
   - Updates to filter/sort options are displayed on the corresponding filter/sort tags
   - Custom loader
