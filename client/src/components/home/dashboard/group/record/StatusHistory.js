import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

const StatusHistory = ({markerState}) => {
    const { markers } = markerState;
    markers.sort(function(a, b){
        return new Date(a.date) - new Date(b.date)
    });
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
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

StatusHistory.propTypes = {
    markerState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    markerState: state.marker
})

const addState = connect(mapStateToProps);

export default addState(StatusHistory);