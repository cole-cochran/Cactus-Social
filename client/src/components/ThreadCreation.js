import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {

    return (
      <div>
        <Box
          sx={{ width: 500, maxWidth: '100%', m: 2 }}
        >
          <TextField fullWidth label="Title" id="fullWidth" />
        </Box>
        
        
      </div>
    )
  };

  export default ThreadCreation;