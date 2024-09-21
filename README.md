# Rick and Morty Submission

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Running the Project

After cloning the repository, open the folder in an IDE. Open a new terminal, ensuring it's navigated to the root of the project file. Type `npm i` to download the necessary library. Then, type `npm start` to run the app in your browser at [http://localhost:3000](http://localhost:3000).

### My Approach to the Problem

#### Key Aspects
- Functional Components & Hooks: The application is built using functional components and React hooks (useState, useEffect, useMemo) to manage state and handle data fetching, sorting, and filtering without relying on class-based components. useMemo() prevents unnecessary re-renders unless a filter/sort option changes from its current state. 
- Fetching Data: The data is fetched from the API across all pages and consolidated into a single list of characters, allowing for an infinite scroll. Error handling and loading states ensure smooth UX.
- Filtering & Sorting: Dropdown menus provide dynamic filtering of characters by status (Alive, Dead, Unknown, Any) and sorting by creation date (Oldest to Newest and vice versa). Hooks update the character list based on user selections.
- Skeleton Loading: A skeleton loading animation gives feedback during the data-fetching process, enhancing the user experience.
- Modular & Styled Components: Reusable components like AvatarCard are styled with CSS for consistent visual presentation, with cards displayed in a grid layout. Additional hover styles are applied to dropdowns and buttons for interactivity.

#### More About My Component Heirarchy 
1. App
    - Renders the 'Rick and Morty' logo
    - Fetches all relevant data from the API, rendering a custom loader until this data (or an error message) is fetched
    - Implements filtering/sorting functionality using React hooks, displaying error messages if no characters are found for a particular query
    - Child Components: 'Grid', 'GridLoader', and 'FilterSortBar'

[Note: The components below are located in /src/components]

2. FilterSortBar
    - Renders the filter/sort menus and tags
    - Child Components: 'Dropdown'
3. Grid
    - Renders the grid, which arranges all the cards
    - Child Components: 'Card' 
4. Card
    - Renders each individual character's information 
        - name
        - species
        - status
        - created
        - gender
        - image link
5. Dropdown 
    - Styles a dropdown menu that is reusable for both filter and sort functions

#### Extras Implemented
1. Infinite Scroll
2. Responsive Design: Hovering over buttons activates secondary color, and hovering over cards activates an animation. Changes to filter/sort options will be displayed on the corresponding filter/sort tags. Custom loader is displayed until all data is fetched and rendered.