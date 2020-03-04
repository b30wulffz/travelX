import React, { useState, useEffect } from "react";
import { Row, Col, CardPanel, Autocomplete } from "react-materialize";

// useEffect(() => {
//   $(document).ready(function() {
//     $("input.autocomplete").autocomplete({
//       data: {
//         Apple: null,
//         Microsoft: null,
//         Google: "https://placehold.it/250x250"
//       }
//     });
//   });
// }, []);

const SearchForm = () => {
  return (
    <div className="searchCard">
      <Autocomplete
        options={{
          data: {
            "Gus Fring": null,
            "Saul Goodman": null,
            "Tuco Salamanca": "https://placehold.it/250x250"
          },
          onAutocomplete: value => {
            console.log(value);
          }
        }}
        placeholder="Insert here"
        style={{ width: "100vw" }}
        onChange={(event, value) => console.log(value)}
      />
    </div>
  );
};

export default SearchForm;
