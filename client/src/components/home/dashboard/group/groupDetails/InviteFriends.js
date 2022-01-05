import React from 'react';
import { useParams } from 'react-router-dom';

const InviteFriends = () => {
    const { groupId } = useParams()
    return (
        <div className='invite-friends'>
            <h3>Invite friends</h3>
            <p>To invite a friend to join this group:
                <ol>
                    <li>Have your friend create an account if they don't have one already.</li>
                    <li>Give them this code: { groupId }</li>
                    <li>Have them click on "Find group" and enter the code.</li>
                    <li>Have them click on "join" to send a request.</li>
                    <li>Once your friend sends a request, you should be able to see it in the current page next time you log in or refresh your browser.</li>
                    <li>Click on "accept".</li>
                    <li>Done! Next time your friend logs in or refreshes their browser, they should be able to see this group.</li>
                </ol>
            </p>
        </div>
    )
}

export default InviteFriends
