import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./TopNav.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../Actions/DataAction";

// Retrieve grouping choice from localStorage (fallback to 'status')
const getGroup = () => {
  return localStorage.getItem("group") || "status";
};

// Retrieve sorting choice from localStorage (fallback to 'priority')
const getOrder = () => {
  return localStorage.getItem("order") || "priority";
};

const TopNav = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);

  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());

  // Handle change in grouping (status/user/priority)
  const handleGroupValue = (e) => {
    const newGroupValue = e.target.value;
    setGroupValue(newGroupValue);
    localStorage.setItem("group", newGroupValue); // Save group value to localStorage
    setDisplayOnClick(false);
  };

  // Handle change in ordering (priority/title)
  const handleOrderValue = (e) => {
    const newOrderValue = e.target.value;
    setOrderValue(newOrderValue);
    localStorage.setItem("order", newOrderValue); // Save order value to localStorage
    setDisplayOnClick(false);
  };

  // Update data based on group and order selections
  useEffect(() => {
    if (groupValue === 'user') {
      dispatch(selectData(groupValue, { allTickets, allUser }, orderValue));
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [groupValue, orderValue, allTickets, allUser, dispatch]);

  return (
    <div className="top-header" style={{ paddingLeft: "10px" }}>
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <TiThList /> Display
        </button>

        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={handleGroupValue}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={handleOrderValue}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;