import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/footballFederation.png";
import "./App.css";
import { Container, Navbar, Nav, NavbarBrand } from "react-bootstrap";
import { Button } from "react-bootstrap";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/PlayerList";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../src/alertify/css/themes/bootstrap.css";
import MemberList from "../src/components/MemberList.js";
function App() {
  const [memberId, setMemberId] = useState("");
  let [modal, setAddModal] = useState(false);
  let [role, setRoles] = useState(false);
  const getPlayerIdHandler = (id) => {
    popUpModal();
    setMemberId(id);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const popUpModal = () => {
    setMemberId("");
    setShow(true);
  };
  let changeRole = () => {
    setRoles(!role);
  };
  return (
    <>
      <Navbar bg="light" className="header">
        <Container fluid>
          <NavbarBrand variant="dark">
            {" "}
            <img src={logo} className="App-logo" alt="logo" />
            Player / Coach Management
          </NavbarBrand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => changeRole()}>
                {!role ? "Coach" : "Players"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-success" onClick={() => popUpModal()}>
            Add Player
          </Button>
        </Container>
      </Navbar>
      {["end"].map((placement, idx) => (
        <Offcanvas
          key={idx}
          placement={placement}
          name={placement}
          show={show}
          onHide={handleClose}
          className="offcanvas offcanvas-end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {memberId !== undefined && memberId !== ""
                ? "Update Members"
                : "Add Members"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <AddPlayer
              id={memberId}
              setPlayerId={memberId}
              setPopup={handleClose}
              userRole={role}
            ></AddPlayer>
          </Offcanvas.Body>
        </Offcanvas>
      ))}
      {!role ? (
        <PlayerList
          getPlayerId={getPlayerIdHandler}
          setModal={setAddModal}
        ></PlayerList>
      ) : (
        <MemberList
          getPlayerId={getPlayerIdHandler}
          setModal={setAddModal}
        ></MemberList>
      )}
      {/* <div className="divSpacing">
        <MemberList
          getPlayerId={getPlayerIdHandler}
          setModal={setAddModal}
        ></MemberList>
      </div> */}
    </>
  );
}

export default App;
