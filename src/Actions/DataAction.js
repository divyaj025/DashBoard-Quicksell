import axios from 'axios';

// Fetch all data (tickets and users)
export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: 'DATA_REQUEST' });

    const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");

    dispatch({ type: 'DATA_SUCCESS', payload: data });

  } catch (error) {
    dispatch({ type: 'DATA_FAILURE' });
  }
};

// Select and group data by status, user, or priority
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch({ type: 'SELECT_DATA_REQUEST' });

    let selectedData = [];
    let user = false;

    // Full list of all statuses that should be displayed
    const statusList = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

    // Handle grouping by status
    if (group === 'status') {
      // Iterate through all possible statuses
      statusList.forEach((status) => {
        // Find tickets that match the current status
        const filteredTickets = allTickets.filter(ticket => ticket.status === status);
        
        // Add the status and its corresponding tickets (or an empty array if no tickets exist)
        selectedData.push({
          title: status,
          value: filteredTickets.length > 0 ? filteredTickets : [], // Empty array if no tickets
        });
      });
    } 
    // Handle grouping by user
    else if (group === 'user') {
      user = true;
      allTickets?.allUser?.forEach((user) => {
        const userTickets = allTickets?.allTickets?.filter((ticket) => ticket.userId === user.id);
        selectedData.push({
          title: user.name,
          value: userTickets.length > 0 ? userTickets : [], // Empty array if no tickets
        });
      });
    } 
    // Handle grouping by priority
    else {
      const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];
      priorityList.forEach((priorityLabel, index) => {
        const filteredTickets = allTickets.filter(ticket => ticket.priority === index);
        selectedData.push({
          title: priorityLabel,
          value: filteredTickets.length > 0 ? filteredTickets : [], // Empty array if no tickets
        });
      });
    }

    // Sort selected data by title if requested
    if (orderValue === "title") {
      selectedData.forEach((group) => {
        group.value.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    // Sort selected data by priority if requested
    if (orderValue === "priority") {
      selectedData.forEach((group) => {
        group.value.sort((a, b) => b.priority - a.priority);
      });
    }

    // Dispatch the success action with the grouped data
    dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } });
    
  } catch (error) {
    dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message });
  }
};