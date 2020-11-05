import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { NavHashLink as NavLink } from "react-router-hash-link";
import s from "./NavigationBar.module.scss";

const NavigationBar: React.FC = () => (
  <Navbar inverse collapseOnSelect fixedTop className={s.navbar}>
    <Navbar.Header>
      <Navbar.Brand className={s.nav_brand}>
        <img src="/img/rocketnew.png" className={s.navbarIcon} />
        <NavLink to="/" className={s.brand_link_primary}>
          The Future School
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle className={s.toggle}>
        <img src="/img/toggle.png" className={s.toggleImage} />
      </Navbar.Toggle>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav className={s.nav_primary}>
        <NavItem componentClass={NavLink} href="/">
          {"Home"}
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
