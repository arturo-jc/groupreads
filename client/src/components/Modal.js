import React from 'react';
import PropTypes from 'prop-types'

const NewGroupModal = ({handleClose, show, Component}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <Component handleClose={handleClose}/>
                <button type='button' onClick={handleClose}>Close</button>
            </section>
        </div>
    )
}

NewGroupModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    component: PropTypes.element
}

export default NewGroupModal