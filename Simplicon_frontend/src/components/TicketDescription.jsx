import React, { useState, useEffect } from "react";
import MDSpinner from "react-md-spinner";
import ReactHtmlParser from "react-html-parser";
import { API } from "./../backend";
import {
  addCommentToTicket,
  fetchComments,
  fetchTicketDetails,
} from "../services/ticket";

// Spinner constants
const sizeOfLoader = 150;
const loaderColor = "#f4f4f4";

const TicketDescription = ({ match, history }) => {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const getTicketDetails = async () => {
      try {
        const ticketData = await fetchTicketDetails(match.params.ticketId);
        setTicket(ticketData);
      } catch (ex) {
        console.error("Error fetching ticket details", ex);
      }
    };

    const getComments = async () => {
      try {
        const commentsData = await fetchComments(match.params.ticketId);
        setComments(commentsData);
      } catch (ex) {
        console.error("Error fetching comments", ex);
      } finally {
        setLoadingComments(false);
      }
    };

    getTicketDetails();
    getComments();
  }, [match.params.ticketId]);

  const handleBack = () => {
    history.goBack();
  };

  // const handleFileDownload = async (filename) => {
  //   try {
  //     console.log("FILE Name: ", filename);
  //     const fileURL = await fetch(`${API}/download`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ filename }),
  //     });
  //     console.log("RESPONSE FILE: ", fileURL);
  //     const link = document.createElement("a");
  //     link.href = fileURL;
  //     link.setAttribute("download", filename); // Specify the file name
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link); //
  //   } catch (error) {
  //     console.log("Error downloading file");
  //   }
  // };

  const handleFileDownload = async (filename) => {
  try {
    console.log("FILE Name: ", filename);

    const response = await fetch(`${API}/download`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    });
    if (!response.ok) {
      console.error("Failed to download file");
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    console.log("File download successful!");
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};



  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await addCommentToTicket(
        match.params.ticketId,
        commentText
      );
      if (response) {
        setCommentText("");
        const updatedComments = await fetchComments(match.params.ticketId);
        setComments(updatedComments);
      }
    } catch (ex) {
      console.error("Error submitting comment", ex);
    }
  };

  if (!ticket) {
    return (
      <div style={{ textAlign: "center", marginTop: "30vh" }}>
        <MDSpinner size={sizeOfLoader} singleColor={loaderColor} />
      </div>
    );
  }

  const { title, description, createdAt, user, files } = ticket;

  return (
    <>
      {/* Ticket Header */}
      <div className="ticket-header-background mb-5">
        <h1 className="ticket-heading">{title}</h1>
        <p className="ticket-author-details">
          By {user.username} on {createdAt.substring(0, 10)}
        </p>
      </div>

      {/* Ticket Description */}
      <div className="container">
        <div className="ticket-description ticket-text flex-wrap">
          {ReactHtmlParser(description)}
        </div>
      </div>

      {/* Files Section */}
      <div className="container mt-3">
        {files && files.length > 0 && (
          <div className="ticket-files-section">
            <h4>Attached Files:</h4>
            <ol>
              {files.map((file, index) => (
                <li key={index}>
                  <a
                    onClick={() => handleFileDownload(file)}
                    target="_blank"
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                    rel="noopener noreferrer"
                    className="btn btn-link"
                  >
                    {file}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="container mt-5">
        <h4 className="mb-4">Comments</h4>
        {loadingComments ? (
          <div className="d-flex justify-content-center">
            <MDSpinner size={sizeOfLoader} singleColor={loaderColor} />
          </div>
        ) : (
          <>
            <div className="comments-list">
              {comments.length > 0 ? (
                <ul className="list-unstyled">
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      className="comment-item p-3 mb-3 bg-light rounded shadow-sm"
                    >
                      <div className="d-flex align-items-center mb-2">
                        <small className="text-primary font-weight-bold mr-2">
                          {comment.user.username}
                        </small>
                        <small className="text-muted">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-0 text-dark">{comment.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No comments yet!</p>
              )}
            </div>

            <div className="comment-form mt-4">
              <textarea
                className="form-control"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                rows="3"
              />
              <button
                className="btn btn-dark mt-3"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>

      {/* Back Button */}
      <div className="container mt-3">
        <button className="btn btn-secondary" onClick={handleBack}>
          BACK
        </button>
      </div>
    </>
  );
};

export default TicketDescription;
