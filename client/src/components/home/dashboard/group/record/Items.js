import React, {useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Post from './Post';
import Bookmark from './Bookmark';
import { getPostsFor } from '../../../../../actions/postActions';
import { getBookmarksFor } from '../../../../../actions/bookmarkActions';

const Items = ({ postState, bookmarkState, getPostsFor, getBookmarksFor }) => {

    const {groupId, recordId} = useParams();

    useEffect(() => {
        getPostsFor(groupId, recordId);
        getBookmarksFor(groupId, recordId);
    }, [recordId])

    const { posts } = postState;
    const { bookmarks } = bookmarkState;

    const items = posts.concat(bookmarks);
    items.sort(function(a, b){
        return new Date(b.date) - new Date(a.date)
    });

    return (
        <Fragment>
            {items && (items.map(item => item.title? (<Post key={item._id} post={item}/>):(<Bookmark key={item._id} bookmark={item}/>)))}
        </Fragment>
    )
}

Items.propTypes = {
    postState: PropTypes.object.isRequired,
    bookmarkState: PropTypes.object.isRequired,
    getPostsFor: PropTypes.func.isRequired,
    getBookmarksFor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    postState: state.post,
    bookmarkState: state.bookmark
})

const addState = connect(mapStateToProps, {getPostsFor, getBookmarksFor});

export default addState(Items)
