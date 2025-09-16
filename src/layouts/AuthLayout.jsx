import React from 'react';
import { Outlet } from 'react-router';
// import authImg from '../assets/authImage.png'
import Logo from '../pages/shared/Logo';

const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200">
            <div>
            <Logo></Logo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src="https://images.unsplash.com/photo-1543332164-6e82f355badc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2lnbiUyMHVwfGVufDB8fDB8fHww"
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;