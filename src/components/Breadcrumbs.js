import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Breadcrumbs.css';

function Breadcrumbs({ items }) {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <Link to={item.path}>{item.label}</Link>
          {index < items.length - 1 && <span className="separator">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumbs;
