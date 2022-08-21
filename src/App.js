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
  let [type, setType] = useState("");
  const [refresh, setRefresh] = useState(false);
  const getPlayerIdHandler = ({ id, type }) => {
    console.log("hi", id, type);

    popUpModal();
    setType(type);
    setMemberId(id);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const refreshNow = () => {
    setRefresh(!refresh);
  };
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
            <Offcanvas.Title>Add Members</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <AddPlayer
              setPopup={handleClose}
              setRefresh={refreshNow}
            ></AddPlayer>
          </Offcanvas.Body>
        </Offcanvas>
      ))}
      {!role ? (
        <PlayerList
          getPlayerId={getPlayerIdHandler}
          setModal={setAddModal}
          refresh={refresh}
          setRefresh={refreshNow}
        ></PlayerList>
      ) : (
        <MemberList
          getPlayerId={getPlayerIdHandler}
          setModal={setAddModal}
          setRefresh={refreshNow}
          refresh={refresh}
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
