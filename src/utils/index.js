export const getDateDifferenceFromNow = (fromDate) => {
    if (!fromDate) return "";

    const date = new Date(fromDate);

    // Format options
    const options = {
        year: "numeric",
        month: "short", // e.g., Jan, Feb, Mar
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Show AM/PM
    };

    // Example output: "Oct 17, 2025, 03:42 PM"
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
};
