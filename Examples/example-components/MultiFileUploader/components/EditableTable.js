// FilesTable.js
import React from 'react';
import { TableRow, TableCell, Table, TableBody, TableHead } from '@mui/material';
import EditableTableRow from './EditableTableRow.js';

const EditableTable = ({
  props
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {props.columns.map((column) => (
            <TableCell key={column.key}>{column.label}</TableCell>
          ))}
          <TableCell key="Remove" />
        </TableRow>
      </TableHead>
      <TableBody>
        {props.records.map((record, rowNum) => (
          <EditableTableRow
            key={rowNum}
            props={props}
            row={{rowNum, record}}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default EditableTable;