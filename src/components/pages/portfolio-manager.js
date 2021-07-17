import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {},
    };

    this.getPortfolioItems = () => {
      axios
        .get(
          "https://sponege.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          this.setState({
            portfolioItems: [...response.data.portfolio_items], // same as response.data.portfolio_items, spreads the array out in a new array, pro is that you aren't using exact pointer
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    this.handleEditFormSubmission = () => {
      this.getPortfolioItems();
    };

    this.handleNewFormSubmission = (portfolioItem) => {
      // TODO: update the portfolioItems state
      // and add the portfolioItem to the list
      this.setState({
        portfolioItems: [portfolioItem].concat(this.state.portfolioItems),
      });
    };

    this.handleFormSubmissionError = (error) => {
      console.log("form submission error", error);
    };

    this.handleDeleteClick = (item) => {
      // portfolioItem
      axios
        .delete(
          // delete from server
          `https://api.devcamp.space/portfolio/portfolio_items/${item.id}`,
          { withCredentials: true }
        )
        .then((response) => {
          // delete from client
          this.setState({
            portfolioItems: this.state.portfolioItems.filter((item2) => {
              return item.id !== item2.id;
            }),
          });
        })
        .catch((error) => {
          console.log("delete err", error);
        });
    };

    this.handleEditClick = (item) => {
      // portfolioItem
      this.setState({
        portfolioToEdit: item,
      });
    };

    this.clearPortfolioToEdit = () => {
      this.setState({
        portfolioToEdit: {},
      });
    };
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            portfolioToEdit={this.state.portfolioToEdit}
          />
        </div>
        <div className="right-column">
          <PortfolioSidebarList
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.portfolioItems}
            handleEditClick={this.handleEditClick}
          />
        </div>
      </div>
    );
  }
}
