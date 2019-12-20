import React, {Component} from 'react';
import { Link } from "@reach/router";
import PostBook from "./PostBook";

export default class Categories extends Component {

    render() {
        if (!this.props.categories) return <p>Loading...</p>;

        let trList = this.props.categories.map(elm =>
            <li key={elm._id}><Link className="list-item" to={"/category/" + elm._id}>{elm.category}</Link></li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Book categories</h2>

                <ul className="has-background-white-bis">
                    {trList}
                </ul>

            </div>
        )
    };
}