import { useEffect, useState } from "react";
import AvatarCard from "./AvatarCard";
export default function AvatarFeed(){
    const [totalPages, setTotalPages] = useState(0);
    const [avatarData, setAvatarData] = useState([]);
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Oldest');
    // Fetch total pages and character data
    useEffect(() => {
        // Fetch total number of pages
        fetch('https://rickandmortyapi.com/api/character')
        .then((res) => res.json())
        .then((data) => {
            setTotalPages(data.info.pages);  // Set the total number of pages
        });
    }, []);

    // Fetch characters from all pages
    useEffect(() => {
        // Use a function to fetch data page by page
        const fetchCharacters = async () => {
            let allCharacters = [];
            for (let i = 1; i <= totalPages; i++) {  // Fetch data for each page (page numbers start from 1)
                await fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
                .then((res) => res.json())
                .then((data) => {
                    allCharacters = [...allCharacters, ...data.results];  // Merge results with existing character data
                });
            }
            setAvatarData(allCharacters);  // Update state after fetching all characters
        };

        if (totalPages > 0) {  // Ensure totalPages is set before fetching characters
            fetchCharacters();
        }
    }, [totalPages]);

    const sortedAvatars = avatarData.sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        if(sort === "Oldest"){
            return dateA - dateB;
        }
        return dateB - dateA;
    })

    const filteredAvatars = sortedAvatars.filter((avatar) => {
        if(filter === 'All') return true;
        return avatar.status === filter;
    })

    return(
       <div>
        <div className="dropdown">
            <button className="dropdownButton">Filter</button>
            <div className="dropdown-content">
            <div onClick={() => setFilter('Alive')}>Alive</div>
                <div onClick={() => setFilter('Dead')}>Dead</div>
                <div onClick={() => setFilter('unknown')}>Unknown</div>
                <div onClick={() => setFilter('All')}>All</div> 
            </div>
        </div>

        <div className="dropdown">
            <button className="dropdownButton">Sort</button>
            <div className="dropdown-content">
                <div onClick={() => setSort('Newest')}>Newest to Oldest</div>
                <div onClick={() => setSort('Oldest')}>Oldest to Newest</div>
            </div>
        </div>

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
        
    )
    
}