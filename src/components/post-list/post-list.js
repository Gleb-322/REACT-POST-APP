import React from 'react'
import PostListItem from '../post-list-item'
import './post-list.css'

const PostList = ({posts}) => {

    function isEmpty(item) {
        for (let key in item) {
            return true
        } 
        return false
    }

    const elements = posts.map(item => {
        if (typeof item === 'object' && isEmpty(item)) {
            const {id, ...itemProps} = item
            return (
                <li key={id} className="list-group-item">
                    <PostListItem {...itemProps}/> {/* тоже самое, но с использованием спред оператора */}
                    {/* <PostListItem
                    label={item.label}
                    important={item.important}
                    /> */}
                </li>
            )
        }
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;


