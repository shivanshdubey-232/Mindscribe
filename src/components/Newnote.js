import * as React from 'react';
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Newnote() {
  const context = useContext(noteContext);
  const {addNote} = context;
  const  [note, setNote] = useState({title: "", description: "", tag: ""});
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Note Title" name="title" onChange={onChange}  variant="standard" />
      <TextField id="standard-basic" label="Tag" name="tag" onChange={onChange} variant="standard" />
      <br />
      <TextField
  placeholder="Type your note..."
      name="description"
      multiline
      rows={3}
      onChange={onChange}
    />
      <br />
      <Button variant="outlined" type="submit" onClick={handleClick}>Submit</Button>
    </Box>
  );
}