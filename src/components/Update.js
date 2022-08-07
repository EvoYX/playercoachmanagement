import React from "react";
import { useState, useEffect } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import PlayerDataService from "../services/player.services";
import CoachDataService from "../services/coach.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";
const Update = (props) => {
  let [name, setName] = useState(props.data.name);
  let [age, setAge] = useState(props.data.age);
  let [contactNo1, setContactNo1] = useState(props.data.contactNo1);
  let [contactNo2, setContactNo2] = useState(props.data.contactNo2);
  let [gender, setGender] = useState(props.data.gender);
  let [dob, setDOB] = useState(props.data.dob);
  let [teamName, setTeamName] = useState(props.data.teamName);
  let [address, setAddress] = useState(props.data.address);
  let [bootSize, setBootSize] = useState(props.data.bootSize);
  let [jerseySize, setJerseySize] = useState(props.data.jerseySize);
  let [shortSize, setShortSize] = useState(props.data.shortSize);
  let [role, setRoles] = useState(props.role);
  let [work_study, setPlace] = useState(props.data.work_study);

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("contact 1", contactNo1, contactNo2);
    const updateMember = {
      name,
      contactNo1,
      contactNo2,
      gender,
      role,
      dob,
      age,
      address,
      teamName,
      jerseySize,
      shortSize,
      bootSize,
      work_study,
    };
    props.role === "Player"
      ? PlayerDataService.updatePlayer(props.id, updateMember).then((data) => {
          console.log("result", data);
          alertify.success("Member details update successfully!");
          // props.setPopup(false);
          // PlayerDataService.getAllPlayers().then((data) => {
          //   data.docs.map((doc) => {
          //     console.log(doc.data(), doc.id);
          //   });
          // });
          props.hideModal();
        })
      : await CoachDataService.updateCoach(props.id, updateMember).then(() => {
          alertify.success("Member details update successfully!");
          props.hideModal();
          // CoachDataService.getAllCoach().then((data) => {
          //   data.docs.map((doc) => {
          //     console.log(doc.data(), doc.id);
          //   });
          // });
        });
  };
  return (
    <div>
      <form onSubmit={handleEdit}>
        <Form.Group className="mb-1" controlId="formPlayerName">
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-2"
          >
            <Form.Control
              className="form-control form-control-sm"
              type="text"
              placeholder="Player Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-2"
            controlId="floatingSelect"
            label="Gender"
          >
            <Form.Select
              aria-label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="ContactNo1"
            className="mb-2"
          >
            <Form.Control
              type="number"
              placeholder="ContactNo1"
              value={contactNo1 === 0 ? "" : contactNo1}
              onChange={(e) => setContactNo1(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="ContactNo2"
            className="mb-2"
          >
            <Form.Control
              type="number"
              placeholder="ContactNo2"
              value={contactNo2 === 0 ? "" : contactNo2}
              onChange={(e) => setContactNo2(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Date-Of-Birth"
            className="mb-2"
          >
            <Form.Control
              type="date"
              placeholder="DOB"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Age" className="mb-2">
            <Form.Control
              type="number"
              placeholder="Team"
              value={age === 0 ? "" : age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Address"
            className="mb-2"
          >
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Team Name"
            className="mb-2"
          >
            <Form.Control
              type="text"
              placeholder="Team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-2"
            controlId="floatingSelect"
            label="Jersey Size"
          >
            <Form.Select
              aria-label="jersey selection"
              value={jerseySize}
              onChange={(e) => setJerseySize(e.target.value)}
            >
              <option>Select Jersey Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            className="mb-2"
            controlId="floatingSelect"
            label="Shorts Size"
          >
            <Form.Select
              aria-label="short selection"
              value={shortSize}
              onChange={(e) => setShortSize(e.target.value)}
            >
              <option>Select Shorts Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Boot Size"
            className="mb-2"
          >
            <Form.Control
              type="number"
              placeholder="Boot Size"
              value={bootSize === 0 ? "" : parseInt(bootSize)}
              onChange={(e) => setBootSize(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-2"
            controlId="floatingSelect"
            label="School/Work"
          >
            <Form.Control
              type="text"
              placeholder="Your School/Your Work"
              value={work_study}
              onChange={(e) => setPlace(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button type="submit" value="Submit" variant="outline-info">
          Update
        </Button>
      </form>
    </div>
  );
};

export default Update;
