import './footer.css';

const Footer = () =>  {
  return (
    <footer className="footer">
        <div className="logo-circle">
          <img src="./Icons/logo.svg" alt="logo" />
          </div>
        <div className="footer-icons">
          <a href="mailto:example@example.com">
            <img src="./Icons/Mail.svg" alt="Email" className="icon"/>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="./Icons/Facebook.svg" alt="Facebook" className="icon"/>
          </a>
          <a href="tel:+1234567890">
            <img src="./Icons/Phone.svg" alt="Phone" className="icon"/>
          </a>
        </div>
      </footer>
  );
}

export default Footer;
