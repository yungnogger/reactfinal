import React, {Component} from 'react';

export default class PostBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            book: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onPostBook(this.state.book);
        this.setState({book: ""})
    }

    onChange(event) {
        this.setState({
            book: event.target.value
        });
    }

    render() {
        return (
            <form>

                <div className="field">
                    <label className="label" htmlFor="QuestionInput">Add a book of your choice</label>
                    <textarea className="textarea" onChange={this.onChange} name="book"
                           value={this.state.book}
                           placeholder="name of book, date, etc"
                           id="QuestionInput"/>
                           <input type="hidden" name="category" value="testcat"/>
                </div>
                <div className="field">
                    <button className="button is-primary" onClick={this.handleInput} type="submit"
                            id="QuestionButton">Add book
                    </button>
                </div>
            </form>
        )
    };
}