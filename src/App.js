import 'font-awesome/css/font-awesome.min.css'; 
import Logo from './Rick-and-Morty-Logo.png';
import FilterSortBar from "./components/FilterSortBar/FilterSortBar";
import Grid from "./components/Grid/Grid";
import GridLoader from "./components/GridLoader/GridLoader";
import Page from './components/Page/Page';
import { useEffect, useState, useMemo } from "react";

export default function App() {
  const [avatarData, setAvatarData] = useState([]);
  const [filter, setFilter] = useState('Any');
  const [sort, setSort] = useState('Oldest to Newest');
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [page, setPage] = useState(1);
  const avatarsPerPage = 20;
  // Fetch characters from all pages
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        if (!res.ok) throw new Error("Failed to fetch characters");

        const data = await res.json();
        const totalPages = data.info.pages;

        const characterPromises = Array.from({ length: totalPages }, (_, i) =>
          fetch(`https://rickandmortyapi.com/api/character?page=${i + 1}`).then(res => {
              if (!res.ok) throw new Error("Failed to fetch characters");
              return res.json();
          })
        );

        const allCharacters = await Promise.all(characterPromises);
        setAvatarData(allCharacters.flatMap(page => page.results));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filtering and sorting functions
  const filteredAvatars = useMemo(() => {
    const filterFunction = avatar => filter === 'Any' || avatar.status === filter;
    const sortFunction = (a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return sort === "Oldest to Newest" ? dateA - dateB : dateB - dateA;
    };

    return avatarData.filter(filterFunction).sort(sortFunction);
  }, [avatarData, filter, sort]);

  // Calculate avatars to display for the current page
  const indexOfLastAvatar = page * avatarsPerPage;
  const indexOfFirstAvatar = indexOfLastAvatar - avatarsPerPage;
  const currentAvatars = filteredAvatars.slice(indexOfFirstAvatar, indexOfLastAvatar);

  return (
    <center>
      {/* Logo */}
      <img src={Logo} className="logo" alt=""></img>

      {/* Filter/sort buttons and tags */}
      <FilterSortBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />

      {/* Display loader or avatar grid */}
      {loading ? (
        <GridLoader />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <Grid avatars={currentAvatars} />
          <Page page={page} totalAvatars={filteredAvatars.length} avatarsPerPage={avatarsPerPage} setPage={setPage} />
        </>
      )}
    </center>
  );
}