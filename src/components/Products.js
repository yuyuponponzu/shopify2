import React from 'react';
import Product from './Product';
import HamburgerMenu from '../atoms/organisms/hamburgermenu';
import ToggleBar from '../atoms/atom/togglebar';
import { useShopify } from '../hooks';

export default (props) => {
    const content_name = props.match.params.contentName;
    const { modalStatus, changeModalStatus } = useShopify();

    // コーディネートリスト
    if (!modalStatus) {
        return (
            <>
                <div className="Header">
                    <HamburgerMenu />
                    <div className="title_text">itone</div>
                </div>
                <div
                    className="toggle_bar"
                    onclick={() => {
                        changeModalStatus();
                    }}
                >
                    <ToggleBar status="list" />
                </div>
                <div className="Products-wrapper">
                    <div className="content_name">{content_name}</div>
                    <Product history={props.history} />
                </div>
            </>
        );

        // コーディネート詳細
    } else {
        return (
            <>
                <div className="Header">
                    <HamburgerMenu />
                    <div className="title_text">itone</div>
                </div>
                <div
                    className="toggle_bar"
                    onclick={() => {
                        changeModalStatus();
                    }}
                >
                    <ToggleBar status="list" />
                </div>
                <div className="Products-wrapper">
                    <div className="content_name">{content_name}</div>
                    <Product history={props.history} />
                </div>
            </>
        );
    }
};
