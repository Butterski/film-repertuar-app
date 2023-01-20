export default function sortDates(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a.split(".").reverse().join("-"));
      const dateB = new Date(b.split(".").reverse().join("-"));
      return dateA - dateB;
    });
  }