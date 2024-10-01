import React from "react";
import { useSelector } from "react-redux";
import { DiCodeigniter } from "react-icons/di";
import { AiOutlinePlus } from "react-icons/ai";
import "./DashView.css";
import Card from "../Card/Card";

// Import priority/status icons for column headers
import UrgentPriorityIcon from '../icons/SVG - Urgent Priority colour.svg';
import HighPriorityIcon from '../icons/Img - High Priority.svg';
import MediumPriorityIcon from '../icons/Img - Medium Priority.svg';
import LowPriorityIcon from '../icons/Img - Low Priority.svg';
import NoPriorityIcon from '../icons/No-priority.svg';

// Function to get the correct priority or status icon for column headers
const getPriorityIcon = (title) => {
  switch (title) {
    case "Urgent":
      return <img src={UrgentPriorityIcon} alt="Urgent" className="priority-icon" />;
    case "High":
      return <img src={HighPriorityIcon} alt="High" className="priority-icon" />;
    case "Medium":
      return <img src={MediumPriorityIcon} alt="Medium" className="priority-icon" />;
    case "Low":
      return <img src={LowPriorityIcon} alt="Low" className="priority-icon" />;
    default:
      return <img src={NoPriorityIcon} alt="No Priority" className="priority-icon" />;
  }
};

const DashView = () => {
  const { selectedData, user } = useSelector((state) => state.SelectDataReducer);

  return (
    selectedData && (
      <div className="dashContainer" style={{ justifyContent: "space-evenly" }}>
        {selectedData.map((column, index) => {
          const columnTitle = column.title;
          const columnValue = column.value;

          return (
            <div key={index} className="dashCardContainer">
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {/* Display priority/status icons or user avatars */}
                  {!user ? (
                    columnTitle === "No priority" || columnTitle === "Low" || columnTitle === "Medium" || columnTitle === "High" || columnTitle === "Urgent" ? (
                      <>{getPriorityIcon(columnTitle)}</>
                    ) : (
                      <DiCodeigniter />
                    )
                  ) : (
                    // Display user avatar when grouped by user
                    <>
                      <div
                        className="imageContainer relative"
                        style={{ width: "30px", height: "30px", display: "inline-block" }}
                      >
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                          alt="User Avatar"
                        />
                      </div>
                    </>
                  )}
                  <span>
                    {columnTitle} {columnValue.length}
                  </span>
                </div>
                <div className="rightView">
                  <AiOutlinePlus />{" "}
                  <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>

              {/* Display the list of cards, or a message if there are no tickets */}
              <div className="dashList flex-gap-10">
                {columnValue.length > 0 ? (
                  columnValue.map((ticket, ind) => (
                    <Card
                      key={ind}
                      id={ticket.id}
                      title={ticket.title}
                      tag={ticket.tag}
                      priority={ticket.priority} // Pass priority to Card for displaying correct priority icon
                      userAvatar={ticket.userAvatar}
                      status={ticket.status} // Pass user avatar to Card for user display
                    />
                  ))
                ) : (
                  <p>No records available</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default DashView;