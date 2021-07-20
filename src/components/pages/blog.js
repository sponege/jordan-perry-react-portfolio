import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [], // array that will be populated with items from api
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false,
    };

    this.getBlogItems = () => {
      this.setState({
        currentPage: this.state.currentPage + 1,
        isLoading: true,
      });

      axios
        .get(
          `https://sponege.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          this.setState({
            blogItems: this.state.blogItems.concat(
              response.data.portfolio_blogs
            ),
            totalCount: response.data.meta.total_records,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.log("blog error", error);
        });
    };

    this.onScroll = () => {
      if (
        this.state.isLoading ||
        this.state.blogItems.length == this.state.totalCount
      ) {
        // if still loading blog items from api
        // if reached end of blogs
        return;
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // if user scrolled to bottom of screen
        this.getBlogItems();
      }
    };

    window.addEventListener("scroll", this.onScroll, false);

    this.handleNewBlogClick = () => {
      this.setState({
        blogModalIsOpen: true,
      });
    };

    this.handleModalClose = () => {
      this.setState({
        blogModalIsOpen: false,
      });
    };

    this.handleNewBlogSubmission = (blog) => {
      this.setState({
        blogModalIsOpen: false,
        blogItems: [blog].concat(this.state.blogItems),
      });
    };

    this.handleDeleteClick = (blog) => {
      axios
        .delete(
          `https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,
          { withCredentials: true }
        )
        .then((response) => {
          this.setState({
            blogItems: this.state.blogItems.filter((blogItem) => {
              return blogItem.id != blog.id;
            }),
          });

          return response.data;
        })
        .catch((error) => {
          console.log("delete blog error", error);
        });
    };
  }

  componentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map((item) => {
      if (this.props.loggedInStatus == "LOGGED_IN") {
        return (
          <div key={item.id} className="admin-blog-wrapper">
            <BlogItem blogItem={item} />
            <a onClick={() => this.handleDeleteClick(item)}>
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        );
      } else {
        return <BlogItem key={item.id} blogItem={item} />;
      }
    });

    return (
      <div className="blog-container">
        <BlogModal
          handleNewBlogSubmission={this.handleNewBlogSubmission}
          modalIsOpen={this.state.blogModalIsOpen}
          handleModalClose={this.handleModalClose}
        />

        {this.props.loggedInStatus == "LOGGED_IN" ? (
          <div className="new-blog-link">
            <a onClick={this.handleNewBlogClick}>
              <FontAwesomeIcon icon="plus-circle" />
            </a>
          </div>
        ) : null}

        <div className="content-container">{blogRecords}</div>

        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Blog;
