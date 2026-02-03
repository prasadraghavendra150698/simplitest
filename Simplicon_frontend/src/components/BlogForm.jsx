import React, { useState } from "react";
import Joi from "joi-browser";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { submitTicket } from "../services/ticket";

const BlogForm = () => {
  const [blog, setBlog] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const [blogSubmitted, setBlogSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const schema = {
    title: Joi.string().required().min(5).label("Title"),
    description: Joi.string().required().min(25).label("Description"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const res = Joi.validate(blog, schema, options);
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

    console.log("blog submitted");
    doSubmit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value, name);
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleOnchange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    setBlog((prevBlog) => ({ ...prevBlog, description: data }));
  };

  const doSubmit = () => {
    console.log("when submitted ", blog.title);
    setSubmitting(true);

    submitTicket({ title: blog.title, description: blog.description }).then(
      (data) => {
        console.log(data);
        if (data.error) {
          console.log("inside data.error if block ", data.error);
          setErrors((prevErrors) => ({ ...prevErrors, title: data.error }));
        } else {
          console.log("inside else block ");
          setBlog({ title: "", description: "" });
          setBlogSubmitted(true);
          setSubmitting(false);
        }
      }
    );
  };

  return (
    <div className="container my-5">
      <h1 className="form-headings">Blog Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            value={blog.title}
            onChange={handleChange}
            className="form-control input-field"
            id="title"
            name="title"
            type="text"
          />
          {errors.title && <p className="text-danger">{errors.title}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <CKEditor
            editor={ClassicEditor}
            onChange={handleOnchange}
            data={blog.description}
          />
          {errors.description && (
            <p className="text-danger">{errors.description}</p>
          )}
        </div>
        <button className="btn btn-dark mr-5" type="submit">
          {submitting ? "POSTING..." : "POST"}
        </button>
        {blogSubmitted && (
          <span className="text-success">Blog Submitted Successfully!</span>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
