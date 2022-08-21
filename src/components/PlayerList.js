import React from "react";
import { useEffect, useState } from "react";
import {
  Form,
  FloatingLabel,
  Table,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import PlayersDataService from "../services/player.services";
import "bootstrap/dist/css/bootstrap.min.css";
import alertify from "alertifyjs";
import Offcanvas from "react-bootstrap/Offcanvas";
import Update from "./Update";

const PlayerList = (props) => {
  let [players, setPlayers] = useState([]);
  let [search, setSearch] = useState(false);
  let [searchPlayers, setSearchPlayers] = useState([]);
  let [selectedPlayer, setSelectedPlayer] = useState([]);
  let [selectedId, setSelectedId] = useState("");
  let [name, setName] = useState("");
  let [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    getPlayers();
  }, []);

  const showUpdate = (doc, id) => {
    setSelectedId(id);
    setSelectedPlayer(doc);
    setUpdateModal(true);
  };
  const hideUpdate = () => {
    setSelectedPlayer([]);
    setSelectedId("");
    setUpdateModal(false);
    getPlayers();
  };
  const getPlayers = async () => {
    setSearch(false);
    setName("");
    PlayersDataService.getAllPlayers().then((data) => {
      setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const deleteHandler = (id) => {
    alertify.confirm(
      "Confirm Message",
      function () {
        PlayersDataService.deletePlayer(id).then(() => {
          alertify.notify("Deleted successfully", "success", 2, function () {
            getPlayers();
          });
        });
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };

  const searchPlayer = () => {
    setSearchPlayers(
      players.filter((obj) => {
        return obj.name === name;
      })
    );
    if (
      players.filter((obj) => {
        return obj.name === name;
      }).length === 0
    ) {
      setSearch(false);
      alertify.notify("Player not found", "success", 2, function () {});
    } else {
      setSearch(true);
    }
  };
  return (
    <>
      <Container className="mb-3">
        <Row className="justify-content-md-center my-auto">
          <Col xs lg="5">
            <FloatingLabel
              controlId="floatingInput"
              label="Search Player Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Player Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col xs lg="1">
            <Button variant="dark" size="lg" onClick={() => searchPlayer()}>
              Search
            </Button>
          </Col>
          <Col xs lg="2">
            <Button
              className="btn btn-outline-dark btn-light"
              size="lg"
              onClick={() => getPlayers()}
            >
              Refresh List
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <div></div>
      </Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Contact No.1</th>
            <th>Contact No.2</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th>Team Name</th>
            <th>Jersey Size</th>
            <th>Short Size</th>
            <th>Boot Size</th>
            <th>School</th>
          </tr>
        </thead>
        <tbody>
          {search && searchPlayers.length !== 0
            ? searchPlayers.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{doc.age}</td>
                    <td>{doc.gender}</td>
                    <td>{doc.contactNo1}</td>
                    <td>{doc.contactNo2}</td>
                    <td>{doc.dob}</td>
                    <td>{doc.address}</td>
                    <td>{doc.teamName}</td>
                    <td>{doc.jerseySize}</td>
                    <td>{doc.shortSize}</td>
                    <td>{doc.bootSize}</td>
                    <td>{doc.work_study}</td>

                    <td>
                      <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => showUpdate(doc, doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            : players.map((doc, index) => {
                return (
                  <tr key={doc.id}>
                    <td>{index + 1}</td>
                    <td>{doc.name}</td>
                    <td>{doc.age}</td>
                    <td>{doc.gender}</td>
                    <td>{doc.contactNo1}</td>
                    <td>{doc.contactNo2}</td>
                    <td>{doc.dob}</td>
                    <td>{doc.address}</td>
                    <td>{doc.teamName}</td>
                    <td>{doc.jerseySize}</td>
                    <td>{doc.shortSize}</td>
                    <td>{doc.bootSize}</td>
                    <td>{doc.work_study}</td>

                    <td>
                      <Button
                        variant="secondary"
                        className="edit"
                        onClick={(e) => showUpdate(doc, doc.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="delete"
                        onClick={(e) => deleteHandler(doc.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
      {["end"].map((placement, idx) => (
        <Offcanvas
          key={idx}
          placement={placement}
          name={placement}
          show={updateModal}
          onHide={hideUpdate}
          className="offcanvas offcanvas-end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Update Members</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Update
              hideModal={hideUpdate}
              data={selectedPlayer}
              id={selectedId}
              role="Player"
            ></Update>
          </Offcanvas.Body>
        </Offcanvas>
      ))}
    </>
  );
};

export default PlayerList;
