import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeaderProps } from '../interfaces';
import MainIcon from '../MainIcon/MainIcon';

const Header = (props: HeaderProps) => {
    const location = useLocation();

    return (
        <div
            className='bg-red-700 flex flex-row h-20 items-center p-4 justify-between w-full'
            data-testid="header-container-div"
        >
            <MainIcon data-testid="main-icon" />
            <div>
                {
                    props.links.map(
                        (headerLink, index) => {
                            const isActive = location.pathname === headerLink.url;
                            const classes = `
                                ${index < props.links.length - 1 ? 'mr-4' : ''} text-xl font-bold px-3 py-2 rounded
                                ${isActive ? 'bg-black text-red-500' : 'text-white'}
                            `;
                            const testId = `link-${index}`;
                            return (
                                <Link to={headerLink.url} className={classes} key={testId} data-testid={testId}>
                                    {headerLink.label}
                                </Link>
                            );
                        }
                    )
                }
            </div>
        </div>
    );
};

export default Header;