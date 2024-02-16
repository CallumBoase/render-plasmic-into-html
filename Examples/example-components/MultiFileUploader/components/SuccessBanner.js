import React from 'react';
import { Button, Alert } from '@mui/material';

const SuccessBanner = ({ handleReset }) => {
	return (
		<>
			<Alert severity="success">File uploads created successfully!!</Alert>
			<Button onClick={handleReset}>Upload some more</Button>
		</>
	)
	
}

export default SuccessBanner;