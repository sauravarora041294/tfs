import React from "react";
import { Icon } from "antd";
import s from "./PaginationItemRender.module.scss";

const PaginationItemRender = (current, type, originalElement) => {
  if (type === "prev") {
    return (
      <a>
        {" "}
        <span className={s.paginationPrev}>
          <Icon type="left" /> {" Previous"}
        </span>
      </a>
    );
  }
  if (type === "next") {
    return (
      <a>
        <span className={s.paginationNext}>
          Next <Icon type="right" />
        </span>
      </a>
    );
  }
  return originalElement;
};

export default PaginationItemRender;
