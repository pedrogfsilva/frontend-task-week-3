import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // make an axios call to the backend using useeffect
  useEffect(( ) => {
    getAllTasks();
  },[]);

  const getAllTasks = () => {
    axios.get("http://ec2-54-197-216-215.compute-1.amazonaws.com:3001/task").then((response) => {
      setTasks(response.data);
    });
  };

  // make an axios post call to the backend
  const makePostCall = () => {
    axios.post("http://ec2-54-197-216-215.compute-1.amazonaws.com:3001/task", {
      name: name,
      description: description,
      hours: hours,
    }).then((result) => {
      console.log(result);
      getAllTasks();
      setName("");
      setDescription("");
      setHours("");
    }).catch((error) => {console.log(error)});
  };

  useEffect(( ) => {
    getAllEmployees();
  },[]);

  const getAllEmployees = () => {
    axios.get("http://ec2-54-197-216-215.compute-1.amazonaws.com:3001/employees").then((response) => {
      setEmployees(response.data);
    });
  };

  const makePostCallEmployee = () => {
    axios.post("http://ec2-54-197-216-215.compute-1.amazonaws.com:3001/employees", {
      name: employeeName,
      address: employeeAddress,
    }).then((result) => {
      console.log(result)
      getAllEmployees();
      setEmployeeName("");
      setEmployeeAddress("");
    }).catch((error) => {console.log(error)});
  };

  return (
    <>
      <Stack direction="row" spacing={33}>
        <Grid>
          <h3>Adicionar Task</h3>
          <Stack spacing={1}>
            <input type='text' placeholder='nome' onChange={(e) => setName(e.target.value)} value={name} />
            <input type='text' placeholder='descrição'  onChange={(e) => setDescription(e.target.value)} value={description} />
            <input type='number' placeholder='horas'  onChange={(e) => setHours(e.target.value)} value={hours} />
            <Button variant='contained' onClick={() => makePostCall()}>Adicionar</Button>
          </Stack>
          <TableContainer sx={{ marginTop: 3 }} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="right">Nome</StyledTableCell>
                  <StyledTableCell align="right">Descrição</StyledTableCell>
                  <StyledTableCell align="right">Horas</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.description}</StyledTableCell>
                    <StyledTableCell align="right">{row.hours}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        </Grid>
        <Grid item>
          <h3>Adicionar Funcionário</h3>
          <Stack spacing={1}>
            <input type='text' placeholder="nome" onChange={(e) => setEmployeeName(e.target.value)} value={employeeName} />
            <input type='text' placeholder="endereço" onChange={(e) => setEmployeeAddress(e.target.value)} value={employeeAddress} />
            <Button variant="contained" onClick={() => makePostCallEmployee()}>Adicionar</Button> 
          </Stack>
          <TableContainer sx={{ marginTop: 3 }} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="right">Nome</StyledTableCell>
                  <StyledTableCell align="right">Endereço</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <StyledTableRow key={employee.ID}>
                    <StyledTableCell component="th" scope="row">
                      {employee.ID}
                    </StyledTableCell>
                    <StyledTableCell align="right">{employee.NAME}</StyledTableCell>
                    <StyledTableCell align="right">{employee.ADDRESS}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        </Grid>
      </Stack>
    </>
  );
};

export default App;