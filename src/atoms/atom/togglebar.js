import React from 'react';

export default (props) => {
    return (
        <>
            <div class={`${props.status === 'list' ? 'toggle_line1' : 'toggle_line1_modal'}`}></div>
            <div class={`${props.status === 'list' ? 'toggle_line2' : 'toggle_line2_modal'}`}></div>
        </>
    );
};
