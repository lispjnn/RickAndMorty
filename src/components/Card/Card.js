import './Card.css';
import PropTypes from 'prop-types';

export default function Card({ name, species, status, gender, created, img }) {
    return (
        <div className="card">
            <img src={img} alt=''/>
            <h1>{name}</h1>
            <div>Species: {species}</div>
            <div>Status: {status}</div>
            <div>Gender: {gender}</div>
            <div>Created: {created}</div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    img: PropTypes.string,
};
