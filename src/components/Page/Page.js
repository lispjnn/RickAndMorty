import './Page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'; 

export default function Page({ page, totalAvatars, avatarsPerPage, setPage }) {
    const totalPages = Math.ceil(totalAvatars / avatarsPerPage);

    const nextPage = () => setPage(prev => prev + 1);
    const prevPage = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

    const firstPage = () => setPage(1);
    const lastPage = () => setPage(totalPages);
  
    return (
        <div className="page">
            {/* Skip to first page button */}
            <button onClick={firstPage} disabled={page === 1}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} /> 
            </button>

            {/* Previous page button */}
            <button onClick={prevPage} disabled={page === 1}>
                <FontAwesomeIcon icon={faChevronLeft} /> 
            </button>

            {/* Page number indicator */}
            <span>Page {page} of {totalPages}</span>

            {/* Next page button */}
            <button onClick={nextPage} disabled={page === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Skip to last page button */}
            <button onClick={lastPage} disabled={page === totalPages}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
        </div>
    );
}
