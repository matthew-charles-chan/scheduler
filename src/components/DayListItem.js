import React from "react";
import "components/DayListItem.scss";

const classnames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = function(spots) {
    switch (spots) {
    case 0:
      return 'no spots remaining';
    case 1:
      return `1 spot remaining`;
    default:
      return `${spots} spots remaining`;
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}