import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjY4ZThlNmI0YzE2NjVkMjUxYjIwIn0sImlhdCI6MTY4MjY2NjMwOH0.XdiStxmVzt7Q5GuiHAZ3pJtflICd-TMgLY46PGjY3Lg"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/new`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjY4ZThlNmI0YzE2NjVkMjUxYjIwIn0sImlhdCI6MTY4MjY2NjMwOH0.XdiStxmVzt7Q5GuiHAZ3pJtflICd-TMgLY46PGjY3Lg"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    //add logic
    const note = {
      "_id": "644e69062411698d688ab66",
      "user": "644b68e8e6b4c1665d251b20",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-04-30T13:11:34.268Z",
      "__v": 0
    } 
    setNotes(notes.concat(note));
  }

  // delete a note
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjY4ZThlNmI0YzE2NjVkMjUxYjIwIn0sImlhdCI6MTY4MzA0OTgxN30.iL6JPrMYuy8ok0rmcbEmfLl0VaVouzA3UoUQeWlKA_I"
      }
    });    
    const json = await response.json();
    console.log(json);
    console.log("I am deleting note with id = ", id);
    const newNotes = notes.filter((note) => {return note._id !== id});
    setNotes(newNotes);
  }
  
  // edit a note
  const editNote = async(id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YjY4ZThlNmI0YzE2NjVkMjUxYjIwIn0sImlhdCI6MTY4MzA0OTgxN30.iL6JPrMYuy8ok0rmcbEmfLl0VaVouzA3UoUQeWlKA_I"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    //api
    for(let index = 0; index < notes.length; index ++){
      const element = notes[index];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
  }
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;