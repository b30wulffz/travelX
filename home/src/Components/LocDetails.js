import React from "react";

const LocDetails = props => {
  return (
    <div>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        {props.place}
        {/* |{' '} */}
      </div>
      <img width={240} src={props.place_img} />
      <div>{props.summary}</div>
    </div>
  );
};

export default LocDetails;
