import React from 'react';

const Table = ({
  filteredData,
  rowsPerPage,
  handleRowsPerPageChange,
  startIndex,
  endIndex,
  currentPage,
  goToPreviousPage,
  goToNextPage,
  arrow,
  nextArrow,
  PreviousIcon,
}) => {
  return (
    <div className="table-container">
      <p className="table-title">{filteredData.length} Results</p>
      <div className="table-padding">
        <div className="table">
          <table className="table-color">
            <thead>
              <tr className="table-header-left">
                <th className="table-header">Name</th>
                <th className="table-header">City</th>
                <th className="table-header">Email</th>
                <th className="table-header">Category</th>
                <th className="table-header">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(startIndex, endIndex).map((item, index) => (
                <tr key={index}>
                  <td className="table-data">{item.maidenName}</td>
                  <td className="table-data">{item.address.city}</td>
                  <td className="table-data">{item.email}</td>
                  <td className="table-data">{item.company.department}</td>
                  <td className="table-data">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="last-row">
            <select
              className="select-rows"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10 Rows</option>
              <option value="25">25 Rows</option>
              <option value="50">50 Rows</option>
            </select>
            <img src={arrow} className="arrow-padding" alt="" />
          </div>
          <div className="flex">
            <div className="indexes">
              <span className="index1">
                {startIndex + 1} - {Math.min(endIndex, filteredData.length)}
              </span>
              &nbsp;
              <span className="index2">of {filteredData.length}</span>
            </div>
            <div className="flex">
              <div className="footer-arrows">
                <div>
                  {currentPage === 1 ? (
                    <PreviousIcon
                      className="previous"
                      onClick={goToPreviousPage}
                    />
                  ) : (
                    <img
                      className="previous2"
                      src={nextArrow}
                      alt="Next"
                      onClick={goToPreviousPage}
                    />
                  )}
                </div>
                <div>
                  {currentPage <
                    Math.ceil(filteredData.length / rowsPerPage) && (
                    <img
                      className="next"
                      src={nextArrow}
                      alt="Next"
                      onClick={goToNextPage}
                    />
                  )}
                  {currentPage ===
                    Math.ceil(filteredData.length / rowsPerPage) &&
                    filteredData.slice(
                      currentPage * rowsPerPage,
                      (currentPage + 1) * rowsPerPage,
                    ).length === 0 && <PreviousIcon onClick={goToNextPage} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
