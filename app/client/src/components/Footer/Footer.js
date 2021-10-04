import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() { 
    return (
    <footer>
        <nav className="footer-inner">
            <section className="footer-item">
            <Link to="/"><img style={{ width: 50, marginLeft: "15px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwd3NfxM88PXPunpAXXcHFx43vGoWYU1Fnh6xM7Jp1OZh2Hu83unIeSjOPiF0ebj-x6w0&usqp=CAU" alt="mongo cars" /></Link>
                <h2><b className="color">Mongo </b>Cars.</h2>
            </section>

            <section className="footer-item">
                <h3>Explorar</h3>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </section>
          
            <section className="footer-item">
                <h3>Visitanos</h3>
                <p>Av. Hipólito Yrigoyen 8236</p>
                <p>Lomas de Zamora</p>
            </section>   

            <section className="footer-item">
                <h3>Seguinos</h3>
                <ul>
                    <li><Link to="">Instagram</Link></li>
                    <li><Link to="">Facebook</Link></li>
                </ul>
            </section>
        
            <section className="footer-item">
                <h3>Legal</h3>
                <ul>
                    <li><Link to="">Terminos</Link></li>
                    <li><Link to="">Privacidad</Link></li>
                </ul>
            </section>
          
            <section className="footer-item">
                <h3>Contactanos</h3>
                    <p><Link to="">+54 1593838925</Link></p>
            </section>
        </nav>
    </footer>);
 }

 export default Footer;

 