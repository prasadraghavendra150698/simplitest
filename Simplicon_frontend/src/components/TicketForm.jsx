import React, { useState } from "react";
import Joi from "joi-browser";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { submitTicket } from "./../services/ticket";

const TicketForm = () => {
  const [ticket, setTicket] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const schema = {
    title: Joi.string().required().min(5).label("Title"),
    description: Joi.string().required().min(25).label("Description"),
    files: Joi.any().optional().label("Files"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const res = Joi.validate(ticket, schema, options);
    console.log(res);
    if (!res.error) return null;

    const validationErrors = {};
    for (let item of res.error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    console.log(validationErrors);
    setErrors(validationErrors || {});
    if (validationErrors) return;

    console.log("ticket submitted");
    doSubmit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value, name);
    setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
  };

  const handleOnchange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    setTicket((prevTicket) => ({ ...prevTicket, description: data }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles((prevTicket) => ({ ...prevTicket, files }));
  };

  const doSubmit = () => {
    console.log("when submitted ", ticket.title);
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", ticket.title);
    formData.append("description", ticket.description);

    if (files) {
      Array.from(files).forEach((file) => formData.append("files", file));
    }

    console.log("Files: ", files);

    submitTicket({
      title: ticket.title,
      description: ticket.description,
      files,
    }).then((data) => {
      console.log(data);
      if (data.error) {
        console.log("inside data.error if block ", data.error);
        setErrors((prevErrors) => ({ ...prevErrors, title: data.error }));
      } else {
        console.log("inside else block ");
        setTicket({ title: "", description: "" });
        setFiles(null);
        setTicketSubmitted(true);
        setSubmitting(false);
      }
    });
  };

  return (
    <div className="container my-5">
      <h1 className="form-headings">Create Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={ticket.title}
            onChange={handleChange}
            className="form-control input-field"
            id="title"
            name="title"
            type="text"
          />
          {errors.title && <p className="text-danger">{errors.title}</p>}
        </div>
        <div className="form-group">
          {/*not here*/}
          <label htmlFor="description">Description</label>
          <CKEditor
            editor={ClassicEditor}
            onChange={handleOnchange}
            data={ticket.description}
          />
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="files">Attach Files</label>
          <input
            type="file"
            id="files"
            name="files"
            className="form-control input-field"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button className="btn btn-dark mr-5" type="submit">
          {submitting ? "POSTING..." : "POST"}
        </button>
        {ticketSubmitted && (
          <span className="text-success">Ticket Submitted Successfully!</span>
        )}
      </form>
    </div>
  );
};

export default TicketForm;
