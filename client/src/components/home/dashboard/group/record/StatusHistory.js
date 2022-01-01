import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { deleteMarker } from '../../../../../actions/markerActions';

const StatusHistory = ({markerState, deleteMarker}) => {

    const { markers } = markerState;
    markers.sort(function(a, b){
        return new Date(a.date) - new Date(b.date)
    });
    const { groupId, recordId } = useParams();

    return (
        <div className='status-history'>
            <h3>Status History</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Page</th>
                    </tr>
                </thead>
                <tbody>
                    {markers && markers.map(marker => (
                            <tr key={marker._id}>
                                <td>{marker.date.split("T")[0]}</td>
                                <td>{marker.page}</td>
                                <td>
                                <button type='button' className='link-style-btn' onClick={() => deleteMarker(groupId, recordId, marker._id)}>Delete</button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

StatusHistory.propTypes = {
    markerState: PropTypes.object.isRequired,
    deleteMarker: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    markerState: state.marker
})

const addState = connect(mapStateToProps, {deleteMarker});

export default addState(StatusHistory);