import React from 'react';

const styles = {
    backdrop: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: '100',
        left: '0',
        top: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
};

const backdrop = (props) => (
    props.modalOpened ? <div style={styles.backdrop} onClick={props.modalClosed}></div> : null
);

export default backdrop;