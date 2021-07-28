import React, { Component } from 'react'
import './post-add-form.css'

export default class PostAddForm extends Component {

    state = {
        text: ""
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.onAdd(this.state.text)
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form 
            className="bottom-panel d-flex"
            onSubmit={this.onSubmit}>
                <input
                    onChange={this.onChange}    
                    type="text"
                    className="form-control new-post-label"
                    placeholder="О чем вы думаете сейчас?"
                    value={this.state.text} /* эта строчка нужна, чтобы сделать инпут контролируемым, сделать связь между элементом и state */
                />
                <button 
                    type="submit"
                    className="btn btn-outline-secondary">Добавить
                </button>
            </form>
        )
    }
}

