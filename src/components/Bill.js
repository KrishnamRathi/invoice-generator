import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Bill({items}) {
  const classes = useStyles();

  const getAmount = (item) => {
    const cost = item.price*item.quantity;
    return cost+cost*item.tax/100;
  }   

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price (₹)</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Tax (%)</TableCell>
            <TableCell align="right">Amount (₹)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.tax} %</TableCell>
              <TableCell align="right">{getAmount(row)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
