import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";
import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false,
    };

    this.getBlogItem = () => {
      axios
        .get(
          `https://sponege.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
        )
        .then((response) => {
          this.setState({
            blogItem: response.data.portfolio_blog,
          });
        })
        .then((error) => {
          console.log("get blog item error", error);
        });
    };

    this.handleEditClick = () => {
      if (this.props.loggedInStatus == "LOGGED_IN") {
        this.setState({ editMode: true });
      }
    };

    this.handleFeaturedImageDelete = () => {
      this.setState({
        blogItem: {
          featured_image_url: "",
        },
      });
    };

    this.handleUpdateFormSubmission = (blog) => {
      this.setState({
        blogItem: blog,
        editMode: false,
      });
    };
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    const {
      title,
      content,
      featured_image_url,
      blog_status,
    } = this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        return (
          <BlogForm
            handleFeaturedImageDelete={this.handleFeaturedImageDelete}
            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
            editMode={this.state.editMode}
            blog={this.state.blogItem}
          />
        );
      } else {
        return (
          <div className="content-container">
            <h1 onClick={this.handleEditClick}>{title}</h1>
            <BlogFeaturedImage img={featured_image_url} />
            <div className="content">{ReactHtmlParser(content)}</div>
          </div>
        );
      }
    };

    return <div className="blog-container">{contentManager()}</div>;
  }
}
