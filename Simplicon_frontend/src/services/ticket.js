import { API } from "../backend";
import { isAuthenticated } from "./auth";

export const submitTicket = (ticket) => {
  const result = isAuthenticated();
  const token = result.token;
  const id = result._id;

  const formData = new FormData();
  formData.append("title", ticket.title);
  formData.append("description", ticket.description);

  console.log("ticket Files: ", ticket.files);
  // Append each file to the form data
  if (ticket.files) {
    const { files } = ticket.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  }
  console.log("stringify:: ", JSON.stringify(ticket));
  console.log("final ticket ", ticket);
  return fetch(`${API}/create/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: formData,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getTickets = () => {
  const user = isAuthenticated();
  const token = user.token;
  const userId = user._id;

  return fetch(`${API}/tickets/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const fetchComments = (ticketId) => {
  const user = isAuthenticated();
  const token = user.token;
  const userId = user._id;

  return fetch(`${API}/comments/${userId}/${ticketId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// API calls separated
export const fetchTicketDetails = async (ticketId) => {
  const user = isAuthenticated();
  const userId = user._id;
  const token = user.token;
  return fetch(`${API}/ticketDetails/${userId}/${ticketId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const addCommentToTicket = async (ticketId, commentText) => {
  const user = isAuthenticated();
  const userId = user._id;
  const token = user.token;

  console.log("Comment: ", commentText);
  return fetch(`${API}/comments/${userId}/${ticketId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ content: commentText }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
