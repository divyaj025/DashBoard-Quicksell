import React from 'react';
import './Card.css';

// Import status icons from the assets (replace paths as per your project structure)
import TodoStatusIcon from '../icons/To-do.svg';
import InProgressStatusIcon from '../icons/in-progress.svg';
import DoneStatusIcon from '../icons/Done.svg';
import CancelledStatusIcon from '../icons/Cancelled.svg';
import BacklogStatusIcon from '../icons/Backlog.svg';

// Import priority icons (already done)
import UrgentPriorityIcon from '../icons/SVG - Urgent Priority colour.svg';
import HighPriorityIcon from '../icons/Img - High Priority.svg';
import MediumPriorityIcon from '../icons/Img - Medium Priority.svg';
import LowPriorityIcon from '../icons/Img - Low Priority.svg';
import NoPriorityIcon from '../icons/No-priority.svg';

// Function to get the correct status icon based on the status
const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "todo":
      return <img src={TodoStatusIcon} alt="To-do" className="status-icon" />;
    case "in progress":
      return <img src={InProgressStatusIcon} alt="In Progress" className="status-icon" />;
    case "done":
      return <img src={DoneStatusIcon} alt="Done" className="status-icon" />;
    case "cancelled":
      return <img src={CancelledStatusIcon} alt="Cancelled" className="status-icon" />;
    case "backlog":
      return <img src={BacklogStatusIcon} alt="Backlog" className="status-icon" />;
    default:
      return null; // No icon for unknown statuses
  }
};

// Function to get the correct priority icon based on the priority level
const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return <img src={UrgentPriorityIcon} alt="Urgent" className="priority-icon" />;
    case 3:
      return <img src={HighPriorityIcon} alt="High" className="priority-icon" />;
    case 2:
      return <img src={MediumPriorityIcon} alt="Medium" className="priority-icon" />;
    case 1:
      return <img src={LowPriorityIcon} alt="Low" className="priority-icon" />;
    default:
      return <img src={NoPriorityIcon} alt="No Priority" className="priority-icon" />;
  }
};

const Card = ({ id, title, tag, priority, status, userAvatar }) => {
  return (
    <div className="cardContainer flex-gap-10" style={{ gap: '5px' }}>
      <div className="cardHeading flex-sb">
        {/* Display card ID */}
        <span style={{ textTransform: 'uppercase' }} className="color-grey">{id}</span>

        {/* Display user avatar */}
        <div className="imageContainer relative" style={{ width: '30px', height: '30px' }}>
          <img
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src={userAvatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"} // Default avatar if none is provided
            alt="User Avatar"
          />
        </div>
      </div>

      {/* Display status icon */}
      <div className="status-container">
          {getStatusIcon(status)}
      </div>

      {/* Display card title */}
      <div className="cardTitle" style={{ fontWeight: 200 }}>
        <p>{title}</p>
      </div>

      <div className="cardTags flex-sb">
        {/* Display priority icon */}
        <div className="priority-container">
          {getPriorityIcon(priority)}
        </div>

        

        {/* Display tag (e.g., Feature Request) */}
        {tag && (
          <div className="tags color-grey">
            <span>{tag}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;