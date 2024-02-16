
import React from 'react';
import { Button } from '@mui/material';

const SubmitButton = ({ isDisabled, onClick }) => {
	return (

		<Button
			variant="outlined"
			sx={{ px: 3, marginTop: '15px !important' }}
			disabled={isDisabled}
			onClick={onClick}
		>
			Submit
		</Button>
	);
};

export default SubmitButton;

//Note we add !important to margin top in sx, because Knack is overriding it to 0 margin