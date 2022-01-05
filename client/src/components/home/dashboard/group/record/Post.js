import React from 'react';
import { useParams } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Comment from './post/Comment';
import AddCommentForm from "./post/AddCommentForm";
import { deletePost } from '../../../../../actions/postActions';

const Post = ({ post, authState, deletePost }) => {
    const { groupId, recordId } = useParams();
    const { title, body, author, date, comments } = post;
    const { user } = authState;
    const createMarkup = () => {
        return {__html: body}
    }

    return (
        <div className='card post'>
            <div className="author-actions">
            <h3>{title}</h3>
            {user._id === author._id && <button type='button' className='btn-delete' onClick={() => deletePost(groupId, recordId, post._id)}><i className="fas fa-trash-alt fa-lg"></i></button>}
            </div>
            <p className='post-author'>Posted by {author.name} on {date.split("T")[0]}</p>
            <p>{body}</p>
            <div className='comments'>
                {comments.map(comment => (<Comment key={comment._id} comment={comment} postId={post._id}/>))}
            </div>
            <AddCommentForm postId={post._id} />
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authState: state.auth
})

const addState = connect(mapStateToProps, { deletePost })

export default addState(Post);