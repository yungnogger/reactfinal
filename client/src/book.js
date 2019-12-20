import React, {Component} from 'react';

export default class Book extends Component {

    render() {
        const question = this.props.getQuestion(this.props.id);
        return (

            <>

                <div className="container">
                <section className="section">
                    {question ? <h3>{question.text}</h3> : <p>"loading text..."</p>}
                    {question ? <h3>category: {question.category}</h3> : <p>"loading text..."</p>}
                </section>
                </div>
            </>
        )
    };
}