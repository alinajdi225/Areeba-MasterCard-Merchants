import allTypes from '../Images/allTypes.svg';
import arrowDown from '../Images/arrowDown.svg';

const Typesbox = ({ dropdowntypesVisible, typeshandleClick }) => {
  return (
    <div className="select2" onClick={typeshandleClick}>
      <div className="typesBox">
        <img src={allTypes} className="locationIcon" alt="Icon" />
        All Types
        <img src={arrowDown} className="arrowIcon" alt="Icon" />
      </div>
      {dropdowntypesVisible && (
        <ul className="typesdropdownList">
          <li className="listItem">All types</li>
          <li className="listItem">Physical store</li>
          <li className="listItem">Online store</li>
        </ul>
      )}
    </div>
  );
};

export default Typesbox;
