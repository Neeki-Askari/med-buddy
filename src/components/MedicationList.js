import React, { useState } from 'react';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import { theme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import axios from 'axios';

function MedicationList({ rows, getAllMeds}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.name);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const getSorting = (property) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, property)
      : (a, b) => -descendingComparator(a, b, property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const handleDelete = (selected) => {
    const userId = 14;
    axios.post(`/deleteMeds/${userId}`, {
        medNames: selected
    })
    .then(() => {
      getAllMeds()
      setSelected([]);
    })
    .catch((err) => console.error(err))
}


  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Medication Name' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'frequency', numeric: true, disablePadding: false, label: 'Frequency' },
    { id: 'time', numeric: true, disablePadding: false, label: 'Time of Day' },
    { id: 'prescriber', numeric: true, disablePadding: false, label: 'Prescriber' },
  ];

  const EnhancedTableHead = () => {
    return (
      <ThemeProvider theme={theme}>
        <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < rows.length}
                checked={rows.length > 0 && selected.length === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all medications' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{
                  '& .MuiTableCell-root': {
                    paddingRight: 0,
                  },
                }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </ThemeProvider>
    );
  };
  

  return (
   
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              bgcolor: 'rgba(6, 66, 115, 0.85)',
              color: 'white',
            }}
          >
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Medication List
            </Typography>

          </Toolbar>
          <TableContainer>
            <Table sx={{ minWidth: 400 }} aria-labelledby="tableTitle" size="medium">
              <EnhancedTableHead />
              <TableBody sx={{ bgcolor: 'rgba(6, 66, 115, 1)' }}>
                {stableSort(rows, getSorting(orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            sx={{
                              color: '#ffffff',
                            }}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: 'white' }}>
                          {row.name}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'white' }}>
                          {`${row.amountVal} ${row.amountUnit}`}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'white' }}>
                          {row.freqUnit === 'as needed'
                            ? row.freqUnit
                            : `${row.freqVal ? `${row.freqVal} time(s) a ` : ''}${row.freqUnit}`}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'white' }}>
                          {row.time}
                        </TableCell>
                        <TableCell align="right" sx={{ color: 'white' }}>
                          {row.prescriber}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <ThemeProvider theme={theme}>
          <Stack direction="row"  sx={{ bgcolor: 'rgba(6, 66, 115, 0.85)', width: "100%" }}>
          <Tooltip title="Delete">
            <IconButton disabled={selected.length === 0} color={selected.length > 0 ? "error" : "disabled"} onClick={() => handleDelete(selected)}>
              <DeleteIcon  />
            </IconButton>
          </Tooltip>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ width: "100%" }}
          />
        </Stack>      
        </ThemeProvider>
        </Paper>
      </Box>
   
  );
}

export default MedicationList;
