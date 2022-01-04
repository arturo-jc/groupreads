import React, {useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Modal from "../../../Modal";
import NewGroupForm from './NewGroupForm';
import FindGroupForm from './FindGroupForm';
import Spinner from '../../../Spinner';
import Group from './Group';
import { openModal, closeModal } from '../../../../actions/modalActions';

const GroupMenu = ({ groupState, openModal, closeModal  }) => {
    const [newGroupModal, setNewGroupModal] = useState({ show: false });
    const [findGroupModal, setFindGroupModal] = useState({show: false});
    
    const showNewGroupModal = () => {
        setNewGroupModal({
            ...newGroupModal,
            show: true
        })
        openModal()
    }
    const hideNewGroupModal = () => {
        setNewGroupModal({
            ...newGroupModal,
            show: false
        })
        closeModal()
    }
    const showFindGroupModal = () => {
        setFindGroupModal({
            ...findGroupModal,
            show: true
        })
        openModal()
    }
    const hideFindGroupModal = () => {
        setFindGroupModal({
            ...findGroupModal,
            show: false
        })
        closeModal()
    }

    const { groups, loading } = groupState;

    if (loading) {
        return <Spinner/>
    }

    return (
            <Fragment>
                <h3>Groups & Books</h3>
                {groups && groups.map(group =>
                        <Group key={group._id} group={group}/>)
                }

                <button className='btn btn-yellow' onClick={showNewGroupModal}>New group</button>
                <button className='btn btn-grey' onClick={showFindGroupModal}>Find group</button>

                <Modal show={newGroupModal.show} handleClose={hideNewGroupModal} Component={NewGroupForm}/>
                <Modal show={findGroupModal.show} handleClose={hideFindGroupModal} Component={FindGroupForm}/>
            </Fragment>
    )
};

GroupMenu.propTypes = {
    groupState: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { openModal, closeModal});

export default addState(GroupMenu);