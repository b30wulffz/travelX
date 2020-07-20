import React from "react";
import { Grid, TextField, Avatar } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const MyAutoComplete = (props) => {
  return (
    <Autocomplete
      options={props.options}
      getOptionLabel={(option) => option.place}
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      renderOption={(option, { inputValue }) => {
        const matches = match(option.place, inputValue);
        const parts = parse(option.place, matches);

        return (
          <Grid container alignItems="center">
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </Grid>
            <Grid item>
              <Avatar alt={option.place} src={option.place_img} />
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default MyAutoComplete;
