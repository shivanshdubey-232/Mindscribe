import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Newnote from "./Newnote";
import BasicAlert from "./BasicAlerts";
import { useNavigate } from "react-router-dom";

const iconStyle = { color: "#7391c4", margin: "0.5em" };
const Home = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
      props.showAlert("Please login to continue", "warning");
    }
  });

  return (
    <div>
      <BasicAlert alert={props.alert} />
      <h1 style={{ marginTop: "2em" }}>
        <i class="fa-sharp fa-solid fa-pen-to-square" style={iconStyle}></i>Add
        a note{" "}
      </h1>
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <Newnote showAlert={props.showAlert} />
      </div>
      <h1 style={{ margin: "1em" }}>
        <i class="fa-regular fa-clipboard" style={iconStyle}></i>Your notes
      </h1>
      <h2>{notes.length === 0 && "No notes to display :("}</h2>
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          marginBottom: "2em",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          borderRadius: "1%",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          padding: "1em",
        }}
      >
        {notes.map((note) => {
          return <NoteItem note={note} showAlert={props.showAlert} />;
        })}
      </div>
    </div>
  );
};

export default Home;
