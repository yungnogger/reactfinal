import React, {Component} from 'react';
import { Link } from "@reach/router";
import PostBook from "./PostBook";

export default class Books extends Component {

    render() {
        if (!this.props.books) return <p>Loading...</p>;

        let trList = this.props.books.map(elm =>
            <li key={elm._id}><Link className="list-item" to={"/book/" + elm._id}>{elm.text}</Link></li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Book categories</h2>

                <ul className="has-background-white-bis">
                    {trList}
                </ul>
                <div className="container">
                    <PostBook onPostBook={this.props.onPostBook}/>
                </div>
            </div>
        )
    };
}