import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

const GoogleLocationSearch = ({ onPlaceSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = (description) => {
    setValue(description, false);
    clearSuggestions();
    onPlaceSelect(description); // Send location to parent
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Search by City or Region"
        className="w-full px-3 py-2 mb-4 bg-zinc-600 rounded"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "") {
            onPlaceSelect(""); // tell parent to reset filter
          }
        }}
        disabled={!ready}
      />

      {status === "OK" && (
        <ul className="absolute z-10 bg-white text-black rounded shadow mt-1 w-full max-h-48 overflow-y-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleLocationSearch;
