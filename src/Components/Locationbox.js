import locationIcon from '../Images/locationIcon.svg';
import arrowDown from '../Images/arrowDown.svg';

const Locationbox = ({
  selectedRegion,
  handleRegionSelect,
  dropdownlocationVisible,
  locationhandleClick,
}) => {
  return (
    <div className="select2" onClick={locationhandleClick}>
      <div className="locationBox ">
        <img src={locationIcon} className="locationIcon" alt="Icon" />
        {selectedRegion}
        <img src={arrowDown} className="arrowIcon" alt="Icon" />
      </div>

      {dropdownlocationVisible && (
        <ul className="dropdownList">
          <li
            className={`listItem ${
              selectedRegion === 'All regions' ? 'selected' : ''
            }`}
            onClick={() => handleRegionSelect('All regions')}
          >
            All regions
          </li>
          <li
            className={`listItem ${
              selectedRegion === 'Nashville' ? 'selected' : ''
            }`}
            onClick={() => handleRegionSelect('Nashville')}
          >
            Nashville
          </li>
          <li
            className={`listItem ${
              selectedRegion === 'Manchester' ? 'selected' : ''
            }`}
            onClick={() => handleRegionSelect('Manchester')}
          >
            Manchester
          </li>
          <li
            className={`listItem ${
              selectedRegion === 'Anchorage' ? 'selected' : ''
            }`}
            onClick={() => handleRegionSelect('Anchorage')}
          >
            Anchorage
          </li>
          <li
            className={`listItem ${
              selectedRegion === 'Louisville' ? 'selected' : ''
            }`}
            onClick={() => handleRegionSelect('Louisville')}
          >
            Louisville
          </li>
          <li
            className={`listItem ${
              selectedRegion === 'Washington' ? 'selected' : ''
            }`}
            onClick={() => handleRegionSelect('Washington')}
          >
            Washington
          </li>
        </ul>
      )}
    </div>
  );
};

export default Locationbox;
