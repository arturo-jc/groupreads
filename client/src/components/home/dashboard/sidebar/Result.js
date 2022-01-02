import React, { useState, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { clearGroupSearchResults, sendRequest } from "../../../../actions/groupActions";

const Result = ({result, sendRequest, clearGroupSearchResults }) => {

    const [request, setRequest] = useState({sent: false});

    const send = () => {
        sendRequest(result._id)
        setRequest({sent: true})
    }

    const searchAnother = () => {
        setRequest({sent: false})
        clearGroupSearchResults()
    }

    if (request.sent){
        return (
            <Fragment>
            <h3>Success</h3>
            <p>Your request has been successfully sent. You may close this now.</p>
            <button className='btn btn-yellow' onClick={searchAnother}>Find another group.</button>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h3>{result.name}</h3>
            <p>Members: {result.members.map(member => member.name).join(", ")}</p>
            <button className='btn btn-yellow' onClick={send}>Join group</button>
            <button className='btn btn-grey' onClick={() => clearGroupSearchResults()}>Find another group</button>
        </Fragment>
    )
}

Result.propTypes = {
    clearGroupSearchResults: PropTypes.func.isRequired,
    sendRequest: PropTypes.func.isRequired
}

const addState = connect(null, { clearGroupSearchResults, sendRequest });

export default addState(Result)
