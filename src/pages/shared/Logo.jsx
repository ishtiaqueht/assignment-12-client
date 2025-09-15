import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
         <Link to="/">
      <div className="flex items-end">
        <img className=" w-10 h-10 object-contain" src="/src/assets/logo.png" alt="" />
        <p className="text-3xl -ml-2 font-extrabold">EduPulse</p>
      </div>
    </Link>
    );
};

export default Logo;