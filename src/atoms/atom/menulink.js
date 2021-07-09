import React from 'react';

export default (props) => {
    return (
        <nav>
            <div className="inner">
                <ul>
                    {props.menulinks.map((text) => {
                        return (
                            <li>
                                <a href={'/' + text}>{text}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};
