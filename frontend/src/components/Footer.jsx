import React from 'react'
import { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="footer footer-center p-4 bg-base-300 text-base-content object-bottom">
        <div>
        <p>{`© ${year}. All Rights Reserved.`}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;