import React from 'react';

const Terms = () => {
  return (
    <div className="terms">
      <p className="terms-title">Terms &amp; Conditions</p>
      <ul className="terms-text">
        <li>
          areebamerchants.com displays eligible merchants to help cardholders
          find places that accept<br></br> Mastercard cards.
        </li>
        <li>To be an eligible merchant, the merchant must:</li>
        <ul>
          <li>Welcome Mastercard cards international and local</li>
          <li>
            Have processed at least one Mastercard international or local
            transaction in the last 6 months
          </li>
          <li>Not surcharge an extra fee on the cardholders</li>
        </ul>
      </ul>
    </div>
  );
};

export default Terms;
