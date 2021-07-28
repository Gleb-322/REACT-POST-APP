import React, { Component } from 'react'
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list'
import PostAddForm from '../post-add-form'
import './app.css'

import styled from 'styled-components'
import nextId from 'react-id-generator'

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`


export default class App extends Component {
    
    state = {
        data: [
            5,
            {},
            {label: "Going to learn React", important: true, like: false, id: nextId()},
            {label: "That is so good", important: false, like: false, id: nextId()},
            {label: "I need a break .....", important: false, like: false, id: nextId()}
        ],
        term: '',
        filter: 'all'
    }

   

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }    

    onToggleProperty = (id, property) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
            const old = data[index]
            const newItem = {...old, [property]: !old[property]}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false, 
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    searchPosts = (items, term) => {
        if (items.length === 0) {
            return items
        }
        function isEmpty(item) {
            for (let key in item) {
                return true
            } 
            return false
        }
        return items.filter((item) => {
            return typeof item === 'object' && isEmpty(item) && item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPosts = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const{data, term, filter} = this.state
        const liked = data.filter(item => item.like).length
        const allPosts = data.length
        const visiblePosts = this.filterPosts(this.searchPosts(data, term) , filter)
        
        return (
            <AppBlock>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                    posts={visiblePosts} 
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleProperty}
                    onToggleLiked={this.onToggleProperty}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </AppBlock>
        )
    }
  
}

