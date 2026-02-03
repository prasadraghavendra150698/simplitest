import React, { useState, useEffect } from "react";
import MDSpinner from "react-md-spinner";
import TicketCard from "./TicketCard";
import { getTickets } from "../services/ticket";

const sizeOfLoader = 150;
const loaderColor = "#f4f4f4";

const TicketList = ({ history }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getTickets();
        console.log(tickets);
        setTickets(tickets);
      } catch (ex) {
        console.log(`error fetching tickets ${ex}`);
      }
    };
    fetchTickets();
  }, []);

  const handleView = async (id) => {
    console.log("Ticket is clicked ", id + "This is in Ticket list page");

    history.push({
      pathname: "/ticket" + "/" + id,
    });
  };

  if (!tickets.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "30vh" }}>
        <MDSpinner size={sizeOfLoader} singleColor={loaderColor} />
      </div>
    );
  }

  return (
    <div>
      {tickets.map((ticket) => (
        <TicketCard
          author={ticket.user.username}
          createdDate={ticket.createdAt}
          title={ticket.title}
          status={ticket.status}
          id={ticket._id}
          key={ticket._id}
          onTicketClick={handleView}
        />
      ))}
    </div>
  );
};

export default TicketList;
