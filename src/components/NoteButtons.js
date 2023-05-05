import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import noteContext from '../context/notes/noteContext';
import {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const iconStyle = {color: '#7391c4', margin:'1em', cursor: 'pointer'}

export default function NoteButtons(props) {
  const context = useContext(noteContext);
  const {deleteNote, editNote} = context;
  const {note} = props;
  const  [updatedNote, setNote] = useState({title: note.title, description: note.description, tag: note.tag});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, updatedNote.title, updatedNote.description, updatedNote.tag);
    handleClose();
  }
  const onChange = (e) => {
    setNote({...updatedNote, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <i class="fa-sharp fa-solid fa-trash" onClick={() => deleteNote(note._id)} style={iconStyle}></i>
      <Button onClick={handleOpen}> <i class="fa-sharp fa-solid fa-pen-to-square" style={iconStyle}></i></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{textAlign: 'center'}}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update {note.title}
            </Typography>
            <TextField  sx={{m:2}} id="standard-basic" label="Note Title" name="title" value={updatedNote.title} onChange={onChange}  variant="standard" required/>
            <TextField  sx={{m:2}} id="standard-basic" label="Tag" name="tag" value={updatedNote.tag} onChange={onChange} variant="standard" required/>
            <br />
            <TextField sx={{m:2}} 
        placeholder="Type your note..."
            name="description"
            multiline
            rows={3}
            value={updatedNote.description}
            onChange={onChange}
            required  
          />
          <br />
            <Button disabled={updatedNote.title.length === 0 || updatedNote.description.length === 0} sx={{m:2}} variant="outlined" type="submit" onClick={handleClick} >Update Note</Button>
            <Button sx={{m:2}} variant="outlined" onClick={handleClose} >Close</Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}