//Configure the below variables to match your Knack application
const vars = {
  //Change to a valid Knack application ID
  applicationId: 'insert your application id here',
  //Change scene_XX and view_XX to a public scene with a table of records you want to show in the data table
  apiCall: {
    scene: 'scene_XX',
    view: 'view_XX'
  },
  //Change the below field_ids to the field_ids that you want to show in the name and info columns respectively
  //These need to exist in the data returned by the API call to Knack
  nameField: 'field_XX',
  infoField: 'field_XX'
}

//The below should remain unchanged
import React from 'react';
import * as KnackAPI from 'knack-api-helper';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '16px !important'
}));

const DataTable = () => {

  const [isLoading, setIsLoading] = React.useState(true);
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const knackAPI = new KnackAPI({
        applicationId: vars.applicationId,
        auth: 'view-based'
      });
      const response = await knackAPI.getMany({
        scene: vars.apiCall.scene,
        view: vars.apiCall.view
      });
      setRecords(response.records);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Info</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from(new Array(10)).map((_, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    <Skeleton />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Skeleton />
                  </StyledTableCell>
                </TableRow>
              ))
            : records.map(record => (
                <TableRow key={record.id}>
                  <StyledTableCell>{record[vars.nameField]}</StyledTableCell>
                  <StyledTableCell>{record[vars.infoField]}</StyledTableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;