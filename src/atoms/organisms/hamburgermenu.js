import React, { useState } from 'react';
import Hamburger from '../atom/hamburger';
import MenuLink from '../atom/menulink';
import { useShopify } from '../../hooks/';

export default () => {
    const { menuText } = useShopify();
    const [clickToggle, setClickToggle] = useState(false);

    return (
        <div
            id="navArea"
            onClick={() => setClickToggle(!clickToggle)}
            className={clickToggle ? 'open' : ''}
        >
            <MenuLink menulinks={menuText} />
            <Hamburger />
            {/* 背景をマスクする */}
            <div id="mask" onClick={() => setClickToggle(false)}></div>
        </div>
    );
};
