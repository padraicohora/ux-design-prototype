import React, {useState} from "react";
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Button, Collapse,
    UncontrolledDropdown, NavbarText, Container
} from "reactstrap";
import Icon from "./Icon";
import {ACCOUNT_CIRCLE} from "../constants/icons";
// import {NavLink} from "react-router-dom";

const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return <div>
        <Navbar color="light" light expand="md">
            <Container>
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button color="primary">Book Now</Button>
                        </NavItem>
                        <NavItem>
                            <Button color={"transparent"}><Icon svg={ACCOUNT_CIRCLE}/></Button>
                        </NavItem>
                    </Nav>

                </Collapse></Container>
        </Navbar>
    </div>
}
export default Navigation
