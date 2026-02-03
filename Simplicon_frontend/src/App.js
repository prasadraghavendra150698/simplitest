import React, { Component } from "react";
import ButtonAppBar from "./components/Appbar";
import { Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";
import { isAuthenticated } from "./services/auth";
import TicketForm from "./components/TicketForm";
import TicketDescription from "./components/TicketDescription";
import TicketList from "./components/BlogList";
import ContactUs from "./components/ContactUs";
import Services from "./components/Services";
import WelcomePage from "./components/welcomepage";

class App extends Component {
  state = { user: "" };
  componentDidMount() {
    if (isAuthenticated()) {
      const { user, _id } = isAuthenticated();
      console.log("user id ", _id);
      const username = user.username;
      this.setState({ user: username });
      console.log(username);
    }
  }

  render() {
    return (
        <>
          <ButtonAppBar user={this.state.user}/>
          <Switch>
            <Route path="/signup" component={SignUp}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/create/ticket" component={TicketForm}/>
            <Route path="/ticket/:ticketId" component={TicketDescription}/>
            <Route path="/tickets" component={TicketList}/>
            <Route path="/Contact_US" component={ContactUs}/>
            <Route path="/Services" component={Services}/>
            <Route path="/" component={WelcomePage}/>

          </Switch>
        </>
    );
  }
}

export default App;
