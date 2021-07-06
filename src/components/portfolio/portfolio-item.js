import React from 'react';
import { Link } from 'react-router-dom';


export default function(props) {
    // Data that we'll need
    // - background image: thimb_image_url
    // - logo
    // - description: description
    // - id: id

    const { id, description, thumb_image_url, logo_url } = props.item;
    console.log(thumb_image_url);
  return (
    <div>
      <img src={thumb_image_url} />
      <img src={logo_url} />
      <div>{description}</div>
      <Link to={`/portfolio/${id}`}>Link</Link>
    </div>
  )
}