import React from 'react';
import HamburgerMenu from '../atoms/organisms/hamburgermenu';
import { useShopify } from '../hooks';

export default (props) => {
    const { cartStatus } = useShopify();

    return (
        <>
            <div className="Header">
                <HamburgerMenu />
                <div className="title_text">itone</div>
            </div>
        </>
    );
};
