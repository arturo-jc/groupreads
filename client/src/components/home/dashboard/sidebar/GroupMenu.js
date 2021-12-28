import React, {useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Modal from "../../../Modal";
import NewGroupForm from './NewGroupForm';
import FindGroupForm from './FindGroupForm';

const GroupMenu = ({ groupState  }) => {
    const [newGroupModal, setNewGroupModal] = useState({ show: false });
    const [findGroupModal, setFindGroupModal] = useState({show: false});
    
    const showNewGroupModal = () => {
        setNewGroupModal({
            ...newGroupModal,
            show: true
        })
    }
    const hideNewGroupModal = () => {
        setNewGroupModal({
            ...newGroupModal,
            show: false
        })
    }
    const showFindGroupModal = () => {
        setFindGroupModal({
            ...findGroupModal,
            show: true
        })
    }
    const hideFindGroupModal = () => {
        setFindGroupModal({
            ...findGroupModal,
            show: false
        })
    }

    const { groups, loading } = groupState;


    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
            <div className="card">
                <h3>Groups</h3>
                {!groups || groups.length === 0 ?
                    (<p>You don't have any groups yet</p>)
                    :
                    (groups.map(group =>
                        <Link to={`/groups/${group._id}`} key={group._id}>
                            {group.name}
                        </Link>))
                }
                <button onClick={showNewGroupModal}>New group</button>
                <Modal show={newGroupModal.show} handleClose={hideNewGroupModal} Component={NewGroupForm}/>
                <button onClick={showFindGroupModal}>Find group</button>
                <Modal show={findGroupModal.show} handleClose={hideFindGroupModal} Component={FindGroupForm}/>
                
            </div>
    )
};

GroupMenu.propTypes = {
    groupState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps);

export default addState(GroupMenu);