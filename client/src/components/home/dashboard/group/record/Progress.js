import React, {useEffect} from 'react';
import { connect } from "react-redux";

const Progress = ({recordState, addMarker}) => {

    const [newMarkerModal, setNewMarkerModal] = useState({show: false})
    const [statusHistoryModal, setStatusHistoryModal] = useState({show: false})

    const {groupId, recordId} = useParams();
    const { records } = recordState;
    const record = records.find(record => record._id === recordId);

    useEffect(() => {
        if(record){
            setCurrentRecord(record);
            getMarkersFor(groupId, record);
        }
    }, [record])

    
    const { markers } = markerState;

    let currentPage = 0;
    if (markers.length > 0){
        markers.sort(function(a, b){
            return new Date(b.date) - new Date(a.date)
        });
        currentPage = markers[0].page
    }

    let completed = 0;
    if (current && current.book.pageCount){
        completed = Math.round((currentPage / current.book.pageCount) * 100);
    }

    const markComplete = () => {
        addMarker(groupId, recordId, {page: current.book.pageCount})
    }

    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    recordState: state.record
})

const addState = connect(mapStateToProps, {addMarker})

export default addState(Progress);