import React from 'react'
import PostListItem from '../post-list-item'
import { ListGroup } from 'reactstrap'
import './post-list.css'

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item
        return (
            <li key={id} className="list-group-item">
                <PostListItem 
                onDelete={() => onDelete(id)}
                onToggleImportant={() => onToggleImportant(id, 'important')}
                onToggleLiked={() => onToggleLiked(id, 'like')}
                {...itemProps}/>
            </li>
        )
    })

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;


