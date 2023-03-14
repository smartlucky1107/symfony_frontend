import React from 'react';
import './nav.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import logo from './logomain.png';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function Nav() {
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <Box sx={{ width: '100%' }}>
  
        {/* <Link to="/inner">Jak kupić?</Link> */}
      
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
      <Link to="/" className="nav-link">
      <img src={logo}  alt="logo" className="img_cust"/>
      </Link>
        {/* <Tab label="Jak kupić?" to="/inner"/> */}
        {/* <ul>
        <li>
        <Link to="/inner">Jak kupić?</Link>
        </li>
        <li>
        <Link to="/inner">O nas</Link>
        </li>
        <li>
        <Link to="/inner">Status transakcji</Link>
        </li>
        <li>
        <Link to="/inner">Pomoc</Link>
        </li>
        </ul> */}


     <nav id="navbar" className="navbar newnave w-100">           
      <ul className="w-100">
       <div className="wrapper-flex">
         <div className="rightmenu">
          <li> <Link to="/inner" className="nav-link">Jak kupić?</Link></li>
          <li><Link to="/onas" className="nav-link">O nas</Link></li>
          <li><Link to="/#" className="nav-link">Status transakcji</Link></li>
          <li> <Link to="/contact" className="nav-link">Pomoc</Link></li>
         </div>
         {/* <div className="leftmenu">
          <li class="rm10"><button type="button" class="btn btn-primary shade btn-sm w105">Zaloguj</button></li>
          <li><button type="button" class="btn btn-primary blu btn-sm w105 ml10">Załóż konto</button></li>
         </div> */}
       </div>         
      </ul>       
      <i className="bi bi-list mobile-nav-toggle"></i>
    </nav>



        {/* <Tab label="O nas" />
        <Tab label="Status transakcji" />
        <Tab label="Pomoc" /> */}
        <Stack spacing={2} direction="row">
      <Button variant="contained">Zaloguj</Button>
      <Button variant="contained">Załóż konto</Button>
      
    </Stack>
      </Tabs>
     
      
    </Box>
  );
}

export default Nav;
