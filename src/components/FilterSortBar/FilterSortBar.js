import Dropdown from "../Dropdown/Dropdown";
import PropTypes from 'prop-types';
import './FilterSortBar.css';
export default function FilterSortBar({ filter, setFilter, sort, setSort }) {
    return(
        <div className="refineBar">
            <Dropdown state={filter} setState={setFilter} options={['Alive', 'Dead', 'unknown', 'Any']} icon='fa fa-filter' />
            <Dropdown state={sort} setState={setSort} options={['Newest to Oldest', 'Oldest to Newest']} icon='fa fa-sort'/>

            {/* Display current filter and sort tags */}
            <div className="tag-container">
                <div className="tag">Status: {filter}</div>
                <div className="tag">Sort: {sort}</div>
            </div>
        </div>
    )
}

FilterSortBar.propTypes = {
    filter: PropTypes.string.isRequired, 
    setFilter: PropTypes.func.isRequired, 
    sort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
};