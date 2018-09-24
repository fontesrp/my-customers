export const localeDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.toLocaleDateString("en-NZ")} ${date.toLocaleTimeString(
    "en-NZ"
  )}`;
};
