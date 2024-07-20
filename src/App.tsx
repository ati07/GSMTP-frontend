import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
// function createData(
//   : string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function App() {
  const [rows, setRows] = useState<any[]>([])
  const baseUrl = import.meta.env.VITE_REACT_API_URL
  const getClient = async () => {
    let clientData = await axios.get(`${baseUrl}/client`)
    console.log('clientData', clientData.data.result)
    let data: any[] = []
    let d = clientData.data.result.map((i: any, j: number) => {
      if (i.pcId) {
        data.push(i)
        // return i
      }
    })
    setRows(data)
  }
  useEffect(() => {
    getClient()
  }, [])
  return (
    <Box>
      <Typography component='h1' style={{fontSize:'3rem',fontWeight:'bold'}}> Clients Details</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="center">License Key</TableCell>
            <TableCell align="center">Machine Id</TableCell>
            <TableCell align="center">Expiry Date</TableCell>
            <TableCell align="center">Verify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length>0?rows.map((row) => (
            <TableRow
              key={row?.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.username}
              </TableCell>
              <TableCell align="center">{row?.licenseKey}</TableCell>
              <TableCell align="center">{row?.pcId}</TableCell>
              <TableCell align="center">{new Date(row?.expireDate).toLocaleDateString()}</TableCell>
              <TableCell align="center">{row?.verify?<CheckIcon style={{color:'green'}}/>:<CloseIcon style={{color:'red'}}/>}</TableCell>
            </TableRow>
          )):"No Data"}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
