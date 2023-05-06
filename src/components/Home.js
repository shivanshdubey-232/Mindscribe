import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Newnote from './Newnote';
import BasicAlert from './BasicAlerts';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
  const context = useContext(noteContext);
  const {notes, getNotes} = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
      props.showAlert("Please login to continue", "warning");
    }
  }, [])
  return (
    <div>
      <BasicAlert alert={props.alert}/>
      <h1 style= {{marginTop:'2em'}}>Add a note</h1>
      <div style = {{maxWidth : '900px', margin: 'auto'}}>
        <Newnote showAlert={props.showAlert}/>
      </div>
      <h1 style= {{margin:'1em'}}>Your notes</h1>
      <h2>{notes.length === 0 && 'No notes to display :('}</h2>
      <div style = {{maxWidth : '900px', margin: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}> 
        {notes.map((note)=>{
          return <NoteItem note = {note} showAlert={props.showAlert}/>
        })}
      </div>
    </div>
  )
}

export default Home
