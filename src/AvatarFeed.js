import { useEffect, useState } from "react";
import AvatarCard from "./AvatarCard";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

export default function AvatarFeed() {
    const [totalPages, setTotalPages] = useState(0);
    const [avatarData, setAvatarData] = useState([]);
    const [filter, setFilter] = useState('Any');
    const [sort, setSort] = useState('Oldest');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 

    // Fetch total pages 
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch characters");
                }
                return res.json();
            })
            .then((data) => {
                setTotalPages(data.info.pages);  
            })
            .catch((err) => {
                setError(err.message);  
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
                                throw new Error(`Failed to fetch characters`);
                            }
                            return res.json();
                        })
                        .then((data) => {
                            allCharacters = [...allCharacters, ...data.results];  
                        });
                }
                setAvatarData(allCharacters);  
            } catch (err) {
                setError(err.message);  
            } finally {
                setLoading(false);  
            }
        };

        if (totalPages > 0) {  
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

                {/* Display current filter and sort tags */}
                <div className="current-selections">
                    <span className="tag">Status: {filter}</span>
                    <span className="tag">Sort by: {sort}</span>
                </div>
            </div>

            {/* Display loader, then render cards or an error message */}
            <div className="cardContainer">
                {loading ? (
                    <>
                    {Array(10).fill().map((_, idx) => (
                            <div key={idx} className="skeleton-card">
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-shimmer"></div>
                            </div>
                        ))}
                    </>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : filteredAvatars.length > 0 ? (
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
