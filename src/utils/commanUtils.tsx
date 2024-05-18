export const formatKey = (id: string) => {
    return id.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  export const capitalizeFirstLetter = (value: string | undefined) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  
  export const gridValueCheck = (key: string, value: string | number) => {
    if (typeof value === "string" && value.startsWith("http")) {
      return (
        <a
          href={value}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
      );
    } else if (key === 'is_disabled' || key === 'is_reserved') {
      return value ? "Yes" : "No";
    } else if (typeof value === "string") {
      return capitalizeFirstLetter(value);
    }
    return value;
  };
  