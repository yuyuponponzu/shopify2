import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import HomeImage from '../atoms/atom/homeimage';
import HamburgerMenu from '../atoms/organisms/hamburgermenu';
import { sketch } from '../atoms/atom/p5home';
import { useShopify } from '../hooks';

export default (props) => {
    const { cartStatus } = useShopify();

    return (
        <>
            <div className="Header">
                <HamburgerMenu />
                <div className="title_text">itone</div>
            </div>
            <div className="Content">
                {/* p5のCanvasがDOMガン無視で作られるので、画像なのか動画なのか背景に流すものが決まったらp5内で設定する方がいいかも
				　　 p5内で作ったとしても結局兄弟要素としてvideoタグが作られるだけっぽい */}
                <HomeImage className="home_image" />
                {/* ショートサーキットで消してしまうと再度リロードされてしまうので、p5にprops渡して消すようにする */}
                <P5Wrapper sketch={sketch} cartStatus={cartStatus} />
            </div>
        </>
    );
};
