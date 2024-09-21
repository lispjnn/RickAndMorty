
export default function AvatarCard({ name, species, status, gender, created, img}){
    return(
        <div className="card">
            <img src={img} alt=""></img>
            <h2>{name}</h2>
            <div>Species: {species}</div>
            <div>Status: {status}</div>
            <div>Gender: {gender}</div>
            <div>Created: {created}</div>
        </div>
    )
}