import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ListWrapper } from "./list.style";

const List = ({ className, icon, text, link, ...props }) => (
  <ListWrapper className={className}>
    {link ? (
      <Link to={link}>
        {icon}
        {text}
      </Link>
    ) : (
      <Fragment>
        {icon}
        {text}
      </Fragment>
    )}
  </ListWrapper>
);

export default List;
