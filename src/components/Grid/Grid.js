import Card from "../Card/Card";
import './Grid.css';
export default function Grid({ avatars }) {
    return (
        <div className="grid">
            {avatars.length > 0 ? (
                avatars.map(avatar => (
                    <Card
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
    );
}
