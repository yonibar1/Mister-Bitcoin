
import { Component } from 'react'
import './ContactFilter.scss'

export class ContactFilter extends Component {
    state={
        term:''
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter({ ...this.state })
        })
    }
    render() {
        const {term} = this.state
        return (
            <div className="contact-filter">
                <label htmlFor="input">Search</label>
                <input placeholder="Search..." type="text" value={term} onChange={this.handleChange} name="term" id="input"/>
            </div>
        )
    }
}
