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
import "bootstrap/dist/css/bootstrap.min.css";
import alertify from "alertifyjs";
import CoachDataService from "../services/coach.service";
import Offcanvas from "react-bootstrap/Offcanvas";
import Update from "./Update";
const MemberList = (props) => {
  let [members, setMembers] = useState([]);
  let [hasSearch, setSearch] = useState(false);
  let [searchMembers, setSearchMembers] = useState([]);
  let [searchName, setSearchName] = useState("");
  let [updateModal, setUpdateModal] = useState(false);
  let [selectedCoach, setSelectedCoach] = useState([]);
  let [selectedId, setSelectedId] = useState("");
  useEffect(() => {
    getCoaches();
  }, []);
  const showUpdate = (doc, id) => {
    setSelectedId(id);
    setSelectedCoach(doc);
    setUpdateModal(true);
  };
  const hideUpdate = () => {
    setSelectedCoach([]);
    setSelectedId("");
    setUpdateModal(false);
    getCoaches();
  };

  const getCoaches = async () => {
    setSearch(false);
    setSearchName("");
    const data = await CoachDataService.getAllCoach();
    setMembers([]);
    setMembers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteHandler = (id) => {
    alertify.confirm(
      "Confirm Delete?",
      function () {
        CoachDataService.deleteCoach(id).then(() => {
          alertify.notify("Deleted successfully", "success", 2, function () {});
          getCoaches();
        });
      },
      function () {
        alertify.error("Cancel");
        return;
      }
    );
  };

  const searchCoach = () => {
    console.log("the search is ", searchName);
    console.log("the list is ", members);
    setSearchMembers(
      members.filter((obj) => {
        return obj.name === searchName;
      })
    );
    if (
      members.filter((obj) => {
        return obj.name === searchName;
      }).length === 0
    ) {
      setSearch(false);
      alertify.notify("Members not found", "success", 2, function () {
        console.log("");
      });
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
              label="Search Coach Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Coach Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col xs lg="1">
            <Button variant="dark" size="lg" onClick={() => searchCoach()}>
              Search
            </Button>
          </Col>
          <Col xs lg="2">
            <Button
              className="btn btn-outline-dark btn-light"
              size="lg"
              onClick={() => getCoaches()}
            >
              Refresh List
            </Button>
          </Col>
        </Row>
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
            <th>Work Place</th>
          </tr>
        </thead>
        <tbody>
          {hasSearch && searchMembers.length !== 0
            ? searchMembers.map((doc, index) => {
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
            : members.map((doc, index) => {
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
            <Offcanvas.Title>"Update Members"</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Update
              hideModal={hideUpdate}
              data={selectedCoach}
              id={selectedId}
              role="Coach"
            ></Update>
          </Offcanvas.Body>
        </Offcanvas>
      ))}
    </>
  );
};

export default MemberList;
