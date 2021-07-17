import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = (props) => {
  const portfolioList = props.data.map((item) => {
    return (
      <div key={item.id} className="portfolio-item-thumb">
        <div className="portfolio-item-thumb-img">
          <img src={item.thumb_image_url} />
        </div>

        <div className="text-content">
          <div className="title">{item.name}</div>

          <div className="actions">
            <a
              className="action-icon"
              onClick={() => {
                props.handleEditClick(item);
              }}
            >
              <FontAwesomeIcon icon="edit" />
            </a>
            <a
              className="action-icon"
              onClick={() => {
                props.handleDeleteClick(item);
              }}
            >
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;
