import React from 'react';
import { Alert, Button } from '@mui/material';

const ErrorBanner = ({ handleReset }) => {
	return (
		<>
			<Alert severity="error">One or more files failed to upload. Please try again after logging out and logging back in. If that doesn't help, please contact the app developer.</Alert>
			<Button onClick={handleReset}>Try again</Button>
		</>
	)

}

export default ErrorBanner;