import { useEffect, useState } from "react";
import AvatarCard from "./AvatarCard";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

export default function AvatarFeed() {
    const [totalPages, setTotalPages] = useState(0);
    const [avatarData, setAvatarData] = useState([]);
    const [filter, setFilter] = useState('Any');
    const [sort, setSort] = useState('Oldest');
    const [error, setError] = useState(null); // Error state

    // Fetch total pages 
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch total pages");
                }
                return res.json();
            })
            .then((data) => {
                setTotalPages(data.info.pages);  // Set the total number of pages
            })
            .catch((err) => {
                setError(err.message);  // Set error state
            });
    }, []);

    // Fetch characters from all pages
    useEffect(() => {
        const fetchCharacters = async () => {
            let allCharacters = [];
            try {
                for (let i = 1; i <= totalPages; i++) {
                    await fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error(`Failed to fetch page ${i}`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            allCharacters = [...allCharacters, ...data.results];  // Merge results with existing character data
                        });
                }
                setAvatarData(allCharacters);  // Update state after fetching all characters
            } catch (err) {
                setError(err.message);  // Set error state
            }
        };

        if (totalPages > 0) {  // Ensure totalPages is set before fetching characters
            fetchCharacters();
        }
    }, [totalPages]);

    // Sorts avatars either Oldest-Newest or Newest-Oldest
    const sortedAvatars = avatarData.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        if (sort === "Oldest") {
            return dateA - dateB;
        }
        return dateB - dateA;
    });

    // Filters avatars based on selected status filter
    const filteredAvatars = sortedAvatars.filter((avatar) => {
        if (filter === 'Any') return true;
        return avatar.status === filter;
    });

    return (
        <div>
            {/* Show error message if there's an error */}
            {error && <p className="error-message">{error}</p>}

            <div className="refineBar">
                {/* Filter dropdown menu */}
                <div className="dropdown">
                    <button className="dropdownButton">
                        <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-content">
                        <div onClick={() => setFilter('Alive')}>Alive</div>
                        <div onClick={() => setFilter('Dead')}>Dead</div>
                        <div onClick={() => setFilter('unknown')}>Unknown</div>
                        <div onClick={() => setFilter('Any')}>Any</div>
                    </div>
                </div>

                {/* Sort dropdown menu */}
                <div className="dropdown">
                    <button className="dropdownButton">
                        <i className="fa fa-sort"></i>
                    </button>
                    <div className="dropdown-content">
                        <div onClick={() => setSort('Newest')}>Newest to Oldest</div>
                        <div onClick={() => setSort('Oldest')}>Oldest to Newest</div>
                    </div>
                </div>

                {/* Display current filter and sort */}
                <div className="current-selections">
                    <span className="tag">Status: {filter}</span>
                    <span className="tag">Sort by: {sort}</span>
                </div>
            </div>

            {/* Display cards */}
            <div className="cardContainer">
                {filteredAvatars.length > 0 ? (
                    filteredAvatars.map((avatar) => (
                        <AvatarCard
                            key={avatar.id}
                            name={avatar.name}
                            species={avatar.species}
                            status={avatar.status}
                            gender={avatar.gender}
                            created={avatar.created}
                            img={avatar.image}
                        />
                    ))
                ) : (
                    <p>No characters found</p>
                )}
            </div>
        </div>
    );
}
