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
        <Card variant="outlined" sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}>
          <React.Fragment>
            <CardContent>
              <Typography sx={{ mb: 1.5, 
                                fontSize: 14,
                                backgroundColor: "#7391C4",
                                color: 'white',
                                borderRadius:'5%',
                                margin: "auto",
                                padding: "0.2em 1em 0.2em 1em",
                                width:"fit-content",
                              }} color="text.secondary">
                {note.tag}
              </Typography>
              <Typography sx={{ fontSize: 18, 
                                margin: "0.8em",}}  gutterBottom>
                {note.title}
              </Typography>
              <hr />

              <div sx={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}>
                <Typography variant="body2" color="text.secondary" 
                  sx={{
                        marginTop:"1em",
                      }}>
                  {note.description}
                  <br />
                  <hr />
                  <NoteButtons note = {note} showAlert={props.showAlert}/>
                
                </Typography>
              </div>
            </CardContent>
          </React.Fragment>  
        </Card>
    </Box>
  );
}
export default NoteItem