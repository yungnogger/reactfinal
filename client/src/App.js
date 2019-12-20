import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import {connect} from "react-redux";

import Book from "./book";
import Category from "./category";
import Categories from "./categories";
import Login from "./Login";
import Alert from "./Alert";
import UserHeader from "./UserHeader";

import {login, logout, loadBooks, postBook, hideAlert, loadCategories} from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.props.loadBooks();
        this.props.loadCategories();
    }

    resetAlert() {
        this.setState({
            alertMsg: "",
            suppressInfo: true
        })
    }


    render() {

        let notification = <></>;
        if (this.props.notifications.active) {
            const notif = this.props.notifications;
            const level = notif.level === "error" ? "is-danger" : "is-warning";

            notification = <section className={`hero ${level} is-small`}>
                <div className="hero-body">
                    <div className="container">
                        <button onClick={() => this.props.hideAlert()} className="delete is-large is-pulled-right" />
                        <h1 className="title">
                            {notif.title}
                        </h1>
                        <h2 className="subtitle">
                            {notif.text}
                        </h2>
                    </div>
                </div>
            </section>
        }

        return (
            <>
                {notification}

                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <Link to="/"><h1 className="title is-2">Anders's book sale</h1></Link>
                            <h2 className="subtitle">
                                Remember to login before you can add any books for sale
                            </h2>
                        </div>
                    </div>
                </section>

                <UserHeader username={this.props.user.username} logout={_ => this.props.logout()}/>

                <section className="section">
                    <Alert msg={this.state.alertMsg}/>

                    <Router>

                        <Categories path ="/"
                                    categories={this.props.categories}
                        />
                        <Category path={"category/:id"}
                                  getCategory={(id) => this.props.categories.find(e => e._id === id)}
                                  books={this.props.books}
                                  onPostBook={(text, category) => this.props.postBook(text, category)}

                        />
                        <Book path="/book/:id"
                              getQuestion={(id) => this.props.books.find(e => e._id === id)}
                        />

                        <Login path="/login"
                            login={(username, password) => this.props.login(username, password)}
                            infoMsg={this.state.infoMsg}
                        />
                    </Router>

                </section>

            </>
        );
    }
}

const mapStateToProps = state => ({
    books: state.books,
    categories: state.categories,
    user: state.user,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    loadBooks: _ => dispatch(loadBooks()),
    loadCategories: _ => dispatch(loadCategories()),
    postBook: text => dispatch(postBook(text)),
    login: (username, password) => dispatch(login(username, password)),
    logout: _ => dispatch(logout()),
    hideAlert: _ => dispatch(hideAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

