import Nav from './nav';
import Inner from './inner';
import Footer from './footer';
import Home from './home';
import Contact from './contact';
import './App.css';
import * as React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import logo from './bitcoin.png';
import logo1 from './calender.png';
import logo2 from './computericon.png';
import logo3 from './magnifying.png';
import logo4 from './laptop.png';
import logo5 from './manon.png';
import logo6 from './image2.png';
import logo7 from './image3.png';
import logo8 from './image4.png';
import logo9 from './chat.png';
import Onas from './onas';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
 

  return (
  <div>
     
     <BrowserRouter>
     <Nav></Nav>
     <Route  path="/inner" component={Inner}></Route>
     <Route  path="/contact" component={Contact}></Route>
     <Route  path="/onas" component={Onas}></Route>
     <Route  path="/" exact={true} component={Home}></Route>
     </BrowserRouter>

<Footer></Footer>
  </div>
   
  );
}

export default App;
