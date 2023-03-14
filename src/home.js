import Nav from './nav';
import Inner from './inner';
import Onas from './onas';
import Contact from './contact';
import Footer from './footer';
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
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
function Home() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '300px',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  return (
  <div>
     
     <BrowserRouter>
     
     <Route  path="/inner" component={Inner}></Route>
     <Route  path="/onas" component={Onas}></Route>
     <Route  path="/contact" component={Contact}></Route>
     </BrowserRouter>
<section>
<div className="container">
      <div className="row paddingclass">
        <div className="col-lg-6 align-self-center">
          <h1 data-aos="fade-up">Najlepsze miejsce kupna i sprzedaży kryptowalut</h1>
          <p data-aos="fade-up" data-aos-delay="400" className="mt30">Korzystaj z błyskawicznych transakcji zakupu i sprzedaży Bitcoin.
            Wypłacaj środki w wygodny sposób, przelewem na konto.
            Szybko, łatwo i bezpiecznie, dzięki sprawdzonej platformie.
            </p>
          <div data-aos="fade-up" data-aos-delay="600">
            <div className="text-center text-lg-start mt30">
              
              <Button variant="contained">Załóż konto</Button>
            </div>
          </div>
        </div>
      
        <div className="col-md-6" >
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={{border:" 1px solid #7175f3", backgroundColor: "#e6e7fc",width: "210px",color:" #7175f3",borderRadius: "8px",fontWeight: 600}} label="Kup" value="1" />
            <Tab  style={{border:" 1px solid #7175f3", backgroundColor: "#e6e7fc",width: "210px",color:" #7175f3",borderRadius: "8px",fontWeight: 600}} label="Sprzedaj" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <label className="new-label">Chce kupić :</label>
              <div className="input-group cst-inputbox">          
                <input type="text" className="form-control cst-input" aria-label="Text input with dropdown button" value="5"/>
                <button className="btn btn-outline-secondary cst-outline dropdown-toggle themelabel" type="button" data-bs-toggle="dropdown" aria-expanded="false">BTC</button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>
    
              <label className="new-label">Zapłacę :</label>
              <div className="input-group cst-inputbox mb-3">     
                <input type="text" className="form-control cst-input" aria-label="Text input with dropdown button" value="53232.54"/>
                <button className="btn btn-outline-secondary cst-outline dropdown-toggle themelabel" type="button" data-bs-toggle="dropdown" aria-expanded="false">PLN</button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </div>

              <div className="progress ">
                <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="text-center mb-3" style={{color: "#d4d4d4;"}}>Cena odswieżana co 5 sekund</div>
             
           
              <Button className="btn btn-secondary w-100" variant="contained">Kup BTC</Button>
      
              </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
        </div>
       
      </div>
    </div>
</section>
<section className="counts">
      <div className="container" data-aos="fade-up">

        <div className="row gy-4">

          <div className="col-lg-3 col-md-6">
            <div className="count-main-box">
            <div className="count-box">
              <img src={logo} width="80"/>
              <div>
                <h6>Bitcoin (BTC)</h6>
                <p> Valumen:243.52 PLN</p>
              </div>
            </div>
            <div className="count-box-sub">
            <h4><span>$ 4852.00 </span><sup>+6.45%</sup></h4>
            <p>Ostatnia cena:2425.235 PLN</p>
            </div>
          </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-main-box">
              <div className="count-box">
                <img src={logo} width="80"/>
                <div>
                  <h6>Bitcoin (BTC)</h6>
                  <p> Valumen:243.52 PLN</p>
                </div>
              </div>
              <div className="count-box-sub">
              <h4><span>$ 4852.00 </span><sup>+6.45%</sup></h4>
              <p>Ostatnia cena:2425.235 PLN</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-main-box">
              <div className="count-box">
                <img src={logo} width="80"/>
                <div>
                  <h6>Bitcoin (BTC)</h6>
                  <p> Valumen:243.52 PLN</p>
                </div>
              </div>
              <div className="count-box-sub">
              <h4><span>$ 4852.00 </span><sup>+6.45%</sup></h4>
              <p>Ostatnia cena:2425.235 PLN</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="count-main-box">
              <div className="count-box">
                <img src={logo} width="80"/>
                <div>
                  <h6>Bitcoin (BTC)</h6>
                  <p> Valumen:243.52 PLN</p>
                </div>
              </div>
              <div className="count-box-sub">
              <h4><span>$ 4852.00 </span><sup>+6.45%</sup></h4>
              <p>Ostatnia cena:2425.235 PLN</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <div className="text-center"><button type="button" className="btn btn-outline-primary w200">Pokaż wszystkie</button></div>

    <section class="firstBock">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="offset-lg-1 col-lg-5 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <h1>Kup kryptowalut W 3 krokach</h1>
            <div className="row pt-4">
              <div className="col-sm-3 align-self-center mb1rem"><img src={logo1} class="img-fluid"/></div>
              <div className="col-sm-9 align-self-center"><p>Z dostępnej listy wybierz interesującą Cię kryptowalutę. Następnie wpisz liczbę wirtualnych tokenów lub kwotę, którą chcesz przeznaczyć na zakup. Kurs jest aktualizowany na bieżąco.</p></div>
                <div className="col-sm-3 align-self-center mb1rem"><img src={logo2} class="img-fluid"/></div>
                <div className="col-sm-9 align-self-center"><p>Uzupełnij dane szczegółowe swojej płatności. Pamiętaj, by podać poprawny adres porttfela kryptowalutowego oraz danych personalnych!</p></div>
                  <div className="col-sm-3 align-self-center mb1rem"><img src={logo3} class="img-fluid"/></div>
                  <div className="col-sm-9 align-self-center"><p>Kryptowaluty są wysyłane automatycznie na podany w formularzu adres portfela. Dodatkowo na adres e-mail otrzymasz wiadomość, pozwalającą Ci śledzić status transakcji na platformie.</p></div>
                </div>
            </div>
            

          <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src={logo4} class="img-fluid" alt=""/>
          </div>

        </div>
      </div>

    </section>

    <section className="thirdBox">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h1>Polecaj i zarabiaj!</h1>
              <p>
                Nasza platforma wymiany kryptowalut oferuje prosty oraz transparentny system poleceń. Jako polecający otrzymujesz procentowy zysk z 
                każdej transakcji dokonanej przez osobę poleconą. Dołącz do programu poleceń już dzisiaj i czerp zyskiz uzyskanej prowizji!
              </p>
              <div class="text-center text-lg-start">              
                <button type="button" class="btn btn-secondary w200">Zacznij zarabiać</button>
              </div>
            </div>
          </div>

          <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src={logo5} className="img-fluid" alt=""/>
          </div>

        </div>
      </div>
    </section>

    <section className="fourthBox">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center " data-aos="zoom-out" data-aos-delay="200">
            <img src={logo6} class="img-fluid" alt=""/>
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">          
            <div className="content">
              <h1>Korzystny kurs</h1>
              <p>
                W swoim portfolio mamy całą gamę najpopularniejszych kryptowalut. Zapewniamy najbardziej korzystne kursy sprzedaży i kupna. Dla Twojej wygody na bieżąco
                aktualizujemy kursy walut.             
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="fifthBox">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h1>Błyskawiczne transackje</h1>
              <p>
                Zakupione kryptowaluty od razu po odnotowaniu płatności są wysyłane na adres Twojego portfela. Transakcje realizowane są w najszybszy możliwy sposób
                przy użyciu zautomatyzowanego systemu.            
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">      
            <img src={logo7} className="img-fluid" alt=""/>              
          </div>
        </div>
      </div>
    </section>

    <section className="sixBox">
  <div className="container" data-aos="fade-up">
    <div className="row">
      <div className="col-lg-6 d-flex align-items-center " data-aos="zoom-out" data-aos-delay="200">
        <img src={logo8} class="img-fluid" alt=""/>
      </div>
      <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">          
        <div className="content">
          <h1>Gwarancja bezpieczeństwa</h1>
          <p>
            Stawiamy na najnowocześniejsze zabezpieczenia technologiczne. Działamy legalnie, postępujemy zgodnie z wytyczonymi procedurami oraz posiadamy stosowne
            licencje. Twoje dane personalne są zabezpieczane w strzeżonym systemie.             
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<footer className="footer">

<div className="footer-newsletter">
  <div className="container">
    <div className="row">
      <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
        <h1>Wymieniaj gdziekolwiek jestes, kup Bitcoina<br/> juz dzis!</h1>
       
      </div>
      <div className="offset-lg-2 col-lg-4 align-self-center">
        <form action="" >
          <div className="input-group emailbox">
            <input type="text" className="form-control emailinput" placeholder="Poda's adres e-mail"/>
            <button className="btn btn-outline-secondary emailsend" type="button" ><i className="bi bi-chevron-right"></i></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<div class="intereactpops fixme">

<img src={logo9} className="img-fluid" width="70" onclick="openchatForm()"/>  
</div>

<div className="chat-popup" id="chatForm">
<form action="/" className="form-container">
  <h6>Chat</h6>

  <label for="msg"><b>Message</b></label>
  <textarea placeholder="Type message.." name="msg" required></textarea>
 <div class="d-flex justify-content-between">
  <button type="submit" className="btn">Send</button>
  <button type="button" className="btn cancel" onclick="closechatForm()">Close</button>
  </div>
</form>
</div>
</footer>

  </div>
   
  );
}

export default Home;
