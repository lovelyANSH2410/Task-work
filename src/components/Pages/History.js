import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Pagination } from "@mui/material";

function createData(id, started, ended, doneby) {
  return { id, started, ended, doneby };
}

const rows = [
  createData(
    159,
    "18/09/2023 | 12:15:00 PM",
    "Task (Keyword Research) Submitted",
    "Manoj Jaiswal"
  ),
  createData(
    237,
    "18/09/2023 | 12:15:00 PM",
    "Task (Keyword Research) Submitted",
    "Yogesh Jadhav"
  ),
  createData(262, "18/09/2023 | 12:15:00 PM", "Submitted", "Manoj Jaiswal"),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E9EFF6",
    color: "#696B78",
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "2px solid #f0f0f0",
    paddingLeft: theme.spacing(5),
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "white",
    color: "#7E84A3",
    fontSize: 14,
    textAlign: "left",
    borderBottom: "1px solid #f0f0f0",
    paddingLeft: theme.spacing(5),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function History() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the slice indices for the current page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", borderBottom: ".5px solid #e0e0e0", height:"750px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date & Time</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Done by</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.started}</StyledTableCell>
                <StyledTableCell>{row.ended}</StyledTableCell>
                <StyledTableCell>{row.doneby}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ display: "flex", justifyContent: "right", mt: 2 }}
      />
    </>
  );
}
