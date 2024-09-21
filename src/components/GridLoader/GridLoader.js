import './GridLoader.css';

export default function GridLoader() {
    return(
        Array.from({ length: 10 }, (_, idx) => (
            <div key={idx} className="skeleton-card">
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-shimmer"></div>
            </div>
        ))
    )
}