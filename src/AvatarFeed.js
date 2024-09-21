import { useEffect, useState, useMemo } from "react";
import AvatarCard from "./AvatarCard";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome

export default function AvatarFeed() {
    const [avatarData, setAvatarData] = useState([]);
    const [filter, setFilter] = useState('Any');
    const [sort, setSort] = useState('Oldest');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 

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
            return sort === "Oldest" ? dateA - dateB : dateB - dateA;
        };

        return avatarData.filter(filterFunction).sort(sortFunction);
    }, [avatarData, filter, sort]);

    return (
        <div>
            <div className="refineBar">
                {/* Filter dropdown menu */}
                <div className="dropdown">
                    <button className="dropdownButton">
                        <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-content">
                        {['Alive', 'Dead', 'unknown', 'Any'].map(status => (
                            <div key={status} onClick={() => setFilter(status)}>
                                {status}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sort dropdown menu */}
                <div className="dropdown">
                    <button className="dropdownButton">
                        <i className="fa fa-sort"></i>
                    </button>
                    <div className="dropdown-content">
                        {['Newest', 'Oldest'].map(order => (
                            <div key={order} onClick={() => setSort(order)}>
                                {order === 'Newest' ? 'Newest to Oldest' : 'Oldest to Newest'}
                            </div>
                        ))}
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
                    Array.from({ length: 10 }, (_, idx) => (
                        <div key={idx} className="skeleton-card">
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-shimmer"></div>
                        </div>
                    ))
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : filteredAvatars.length > 0 ? (
                    filteredAvatars.map(avatar => (
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
