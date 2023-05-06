import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NoteButtons from './NoteButtons';

const NoteItem = (props) => {
  const {note} = props;
  return (
    <Box sx={{ m:'1em', width: {
      lg: '250px',
      md: '200px',
      xs: '150px'
    }}}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {note.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {note.tag}
              </Typography>
              <Typography variant="body2">
                {note.description}
                <br />
                
                <NoteButtons note = {note} showAlert={props.showAlert}/>
               
              </Typography>
            </CardContent>
          </React.Fragment>  
        </Card>
    </Box>
  );
}
export default NoteItem