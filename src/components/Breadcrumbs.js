import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Breadcrumbs.css';

function Breadcrumbs({ items }) {
  const navigate = useNavigate();

  function handleClick(path) {
    if (path) {
      navigate(path);
    }
  }

  return (
    <div className="breadcrumbs">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <span
            className={`breadcrumb-item${item.path ? ' clickable' : ''}`}
            onClick={() => handleClick(item.path)}
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span className="breadcrumb-separator">/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumbs;
