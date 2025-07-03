// Helper to format date
const formatDate = (dateString?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDate();
  const month = date.toLocaleDateString(undefined, { month: "short" });
  const dayOfWeek = date.toLocaleDateString(undefined, { weekday: "short" });

  return `${dayOfWeek} ${day} ${month}`;
};

export default formatDate;
