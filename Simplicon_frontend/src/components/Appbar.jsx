import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "./../services/auth";

const useStyles = makeStyles((theme) => ({
  bar: {
    fontFamily: "Inconsolata",
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonAppBar = (props) => {
  const classes = useStyles();

  const handleSignup = (props) => {
    props.history.push("/signup");
  };

  const hadleLogin = (props) => {
    props.history.push("/signin");
  };

  const hadleSignOut = (props) => {
    signout();
    props.history.push("/");
  };

  const hadleBlog = (props) => {
    props.history.push("/create/ticket");
  };

  const listTickets = (props) => {
    props.history.push("/tickets");
  };


  const contactUS = (props) => {
    props.history.push("/Contact_US");
  };

  const services = (props) => {
    props.history.push("/Services");
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.bar}
        style={{ background: "#3a3535", color: "#f4f4f4" }}
      >
        <Toolbar>
          <h3 variant="h6" className={classes.title}>
            <Link
                to="/"
                className="App-heading-font"
                style={{color: "inherit", textDecoration: "none", display: "flex", alignItems: "center"}}
            >
              <img
                  src="/LOGO.png"
                  style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "8px",
                  }}
                  alt="Logo"
              />
              Simplicon Tax Advisors
            </Link>
          </h3>



          {!isAuthenticated() && (
              <>

                <Button onClick={() => contactUS(props)} color="inherit">
                  Contact US
                </Button>
                <Button onClick={() => services(props)} color="inherit">
                  Services
                </Button>
                <Button onClick={() => hadleLogin(props)} color="inherit">
                  sign-in
                </Button>
                <Button onClick={() => handleSignup(props)} color="inherit">
                  sign-up
                </Button>
              </>
          )}
          {isAuthenticated() && (
              <Button
                  onClick={() => listTickets(props)}
                  className="write-blog-btn"
                  color="inherit"
              >
                Tickets
              </Button>
          )}
          {isAuthenticated() && (
              <Button
                  onClick={() => contactUS(props)}
                  className="write-blog-btn"
                  color="inherit"
              >
                Contact US
              </Button>
          )}
          {isAuthenticated() && (
              <Button
                  onClick={() => hadleBlog(props)}
                  className="write-blog-btn"
                  color="inherit"
              >
                Create Ticket
              </Button>
          )}
          {isAuthenticated() && (
              <Button
                  onClick={() => services(props)}
                  className="write-blog-btn"
                  color="inherit"
              >
                Services
              </Button>
          )}

          {isAuthenticated() && (
              <Button onClick={() => hadleSignOut(props)} color="inherit"
                  style={{backgroundColor: "#f4f9f4", color: "black"}}>
                signout
              </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(ButtonAppBar);
