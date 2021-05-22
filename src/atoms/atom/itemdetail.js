import React from 'react';

export default (props) => {
    return (
        <div className="product_itemdetail">
            <div className="product_itemdetail_text">Pants</div>
            <div className="product_itemdetail_underbar"></div>
            <img
                src="/images/codinate.jpg"
                alt="アイテム詳細画像"
                className="product_itemdetail_img"
            />
        </div>
    );
};
