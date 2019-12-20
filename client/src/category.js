import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostBook from "./PostBook";

export default class Category extends Component {

    render() {

        if (!this.props.books) return <p>Loading books...</p>;
        const category = this.props.getCategory(this.props.id);
        var test = category;

        let trList = this.props.books.map(function(elm) {

            if(elm.category === "english"){

                return <li key={elm._id}><Link className="list-item" to={"/book/" + elm._id}>{elm.text}</Link></li>;
            }

        }.bind(this));

        return (
            <>

                <div className="container">

                <section className="section">
                        {category ? <h2 className={"title is-4"}>Books in: {category.category}</h2> : <p>"loading text..."</p>}

                        <ul className="has-background-white-bis">
                            {this.props.books.map(function(elm) {
                                if (category) {
                                    console.log(elm.category);
                                    console.log(category.category);
                                    if(elm.category === category.category){
                                        return <li key={elm._id}><Link className="list-item" to={"/book/" + elm._id}>{elm.text}</Link></li>;
                                    }
                                }
                            }.bind(this))}
                        </ul>
                        <div className="container">
                            <PostBook onPostBook={this.props.onPostBook}/>
                        </div>
                </section>

                </div>
            </>
        )
    };
}