import React from "react";
import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import PlayerDataService from "../services/player.services";
import CoachDataService from "../services/coach.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

const AddPlayer = (props) => {
  let [name, setName] = useState("");
  let [age, setAge] = useState(0);
  let [contactNo1, setContactNo1] = useState(0);
  let [contactNo2, setContactNo2] = useState(0);
  let [gender, setGender] = useState("");
  let [dob, setDOB] = useState("");
  let [teamName, setTeamName] = useState("");
  let [address, setAddress] = useState("");
  let [bootSize, setBootSize] = useState(0);
  let [jerseySize, setJerseySize] = useState("");
  let [shortSize, setShortSize] = useState("");
  let [role, setRoles] = useState("Player");
  let [work_study, setPlace] = useState("");

  // useEffect(() => {
  //   console.log("The addplayering is here is : ", props.id, props.type);
  //   if (props.id !== undefined && props.id !== "") {
  //     editHandler();
  //   }
  // }, [props.id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      teamName === "" ||
      dob === "" ||
      role === "" ||
      jerseySize === "" ||
      shortSize === "" ||
      bootSize === 0 ||
      work_study === ""
    ) {
      alertify.notify("All fields are mandatory!", "error", 2, function () {});
      return;
    } else {
      const newMember = {
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
      alertify.confirm(
        "Confirm adding this member?",
        function () {
          role === "Player"
            ? PlayerDataService.addPlayer(newMember).then(() => {
                alertify.success(
                  "Member" + name + " has been added successfully"
                );
                props.setPopup();
              })
            : CoachDataService.addCoach(newMember).then(() => {
                alertify.success(
                  "Member" + name + " has been added successfully"
                );
                props.setPopup();
              });
        },
        function () {
          alertify.error("Cancel");
          props.setPopup(false);
        }
      );
    }

    setName("");
    setAge(0);
    setDOB("");
    setAddress("");
    setContactNo1(0);
    setContactNo2(0);
    setGender("");
    setRoles("player");
    setPlace("");
    setTeamName("");
    setJerseySize("");
    setBootSize(0);
    setShortSize("");
  };

  return (
    <>
      <div className="p-4 box">
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="formPlayerName">
            <FloatingLabel
              className="mb-2"
              controlId="floatingSelect"
              label="Role"
            >
              <Form.Select
                aria-label="Role"
                value={role}
                onChange={(e) => setRoles(e.target.value)}
              >
                <option value="Player">Player</option>
                <option value="Coach">Coach</option>
              </Form.Select>
            </FloatingLabel>

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
                value={contactNo1 === 0 ? "" : parseInt(contactNo1)}
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
                value={contactNo2 === 0 ? "" : parseInt(contactNo2)}
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

            <FloatingLabel
              controlId="floatingInput"
              label="Age"
              className="mb-2"
            >
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
            {props.id !== undefined && props.id !== "" ? "Update" : "Add"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPlayer;
