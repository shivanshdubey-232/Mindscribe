import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Newnote from './Newnote';
import BasicAlert from './BasicAlerts';

const Home = () => {
  const context = useContext(noteContext);
  const {notes, getNotes} = context;
  useEffect(() => {
    getNotes();
  }, [])
  return (
    <div>
      <BasicAlert message="this is a success"/>
      <h1 style= {{margin:'1em'}}>Add a note</h1>
      <div style = {{maxWidth : '900px', margin: 'auto'}}>
        <Newnote />
      </div>
      <h1 style= {{margin:'1em'}}>Your notes</h1>
      <div style = {{maxWidth : '900px', margin: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
        {notes.map((note)=>{
          return <NoteItem note = {note}/>
        })}
      </div>
    </div>
  )
}

export default Home
