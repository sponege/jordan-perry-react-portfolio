import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item"

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [
        // { title: "Apple", category: "Fruit", slug: 'apple' },
        // { title: "Banana", category: "Fruit", slug: 'banana' },
        // { title: "Corn", category: "Veggie", slug: 'corn' }
      ]
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category == filter
      })
    })
  }

  getPortfolioItems() {
    // Make a request for a user with a given ID
    axios.get('https://jordan.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
        this.setState({
          data: response.data.portfolio_items
        })
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return (
        <PortfolioItem
          key={item.id}
          item={item}
        />
      );
    })
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
      <h2>{this.state.pageTitle}</h2>

      <button onClick={() => this.handleFilter("Fruit")}>Fruit</button>
      <button onClick={() => this.handleFilter("Veggie")}>Veggie</button>

      {this.portfolioItems()}
      </div>
    )
  }
}
