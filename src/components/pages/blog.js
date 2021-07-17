import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [], // array that will be populated with items from api
    };

    this.getBlogItems = () => {
      axios
        .get("https://jordan.devcamp.space/portfolio/portfolio_blogs", {
          withCredentials: true,
        })
        .then((response) => {
          this.setState({
            blogItems: response.data.portfolio_blogs,
          });
        })
        .catch((error) => {
          console.log("blog error", error);
        });
    };
  }

  componentWillMount() {
    this.getBlogItems();
  }

  render() {
    const blogRecords = this.state.blogItems.map((item) => {
      return <h1>{item.title}</h1>;
    });
    return (
      <div>
        <h2>Blog</h2>

        <div>{blogRecords}</div>

        <div>
          <Link to="/about-me">Read more about myself</Link>
        </div>
      </div>
    );
  }
}

export default Blog;
