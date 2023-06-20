import React from 'react';
import areebaLogo from '../Images/areebaLogo.svg';

const Navbar = () => {
  return (
    <div className="nav">
      <div className="left-nav">
        <img src={areebaLogo} alt="logo" className="logo" />
        <p className="p1">Merchants</p>
      </div>
      <div className="right-nav">
        <a href="https://www.areeba.com/" className="links">
          About areeba
        </a>
        <a href="https://www.areeba.com/english/contact-us" className="links">
          Get In Touch
        </a>
      </div>
    </div>
  );
};

export default Navbar;
