import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

// Material-UI Styling
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    position: "relative",
    padding: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 10,
  },
  pos: {
    marginBottom: 12,
  },
  status: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "5px 10px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
  },
  open: {
    backgroundColor: "green",
  },
  closed: {
    backgroundColor: "red",
  },
});

export default function TicketCard(props) {
  const classes = useStyles();

  return (
    <div
      className="container my-2"
      onClick={() => {
        props.onTicketClick(props.id);
      }}
    >

      <Card className={classes.root}>
        {/* Status indicator */}
        <div
          className={`${classes.status} ${
            props.status === "OPEN" ? classes.open : classes.closed
          }`}
        >
          {props.status}
        </div>
        <CardContent>
          <h5 className="ticket-description" color="textSecondary">
            Created on {props.createdDate.substring(0, 10)}
          </h5>
          <p className="ticket-card-heading" style={{ fontSize: "16px", fontWeight: "bold", margin: "0" }}>{props.title}</p>
          <br>
          </br>
          <h5 className="ticket-description">
            By <span>{props.author}</span>
          </h5>
        </CardContent>
      </Card>

    </div>
  );
}
