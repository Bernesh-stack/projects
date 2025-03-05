

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { INITIAL_USER, useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import { link } from 'fs';
//jus t import npm with link
import { INavLink } from '@/types';


const LeftSidebar = () => {
    const { mutate: signout, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const { user, setUser, setIsAuthenticated } = useUserContext();

    useEffect(() => {
        if (isSuccess) {
            setUser(INITIAL_USER);
            setIsAuthenticated(false);
            navigate(0);
        }
    }, [isSuccess]);



    return (
        <nav className="leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to={"/"} className='flex items-center gap-3'>
                    <img src='/Assetss/images/logo.svg' width={170} height={36} />
                </Link>

                <Link to={`/profile/${user.id}`} className='items-center gap-3 flex' >
                    <img src='/Assetss/icons/profile-placeholder.svg' className='h-14 w-14 rounded-full'></img>
                    <div className='flex flex-col'>
                        <p className='body-bold'>{user.name}</p>
                        <p className='sm-regular text-light-3'>@{user.username}</p>


                    </div>


                </Link>
                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link:INavLink) => {
                        const isActive = pathname === link.route;
                        return(
                            <li  key={link.label} className={`leftsidebar-link ${isActive ? 'bg-primary-500' : ''}`}>
                                <NavLink to={link.route} className="flex gap-4 items-center p-4">

                                    {link.label}

                                </NavLink>
                            </li>
                        )
                    })}

                    <li>

                    </li>

                </ul>

            </div>

            <Button
                variant="ghost"
                className='shad-button_ghost'
                onClick={() => signout()} >
                <img src='/Assetss/icons/logout.svg' />
                <p className='small-medium lg:base-medium'>Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar