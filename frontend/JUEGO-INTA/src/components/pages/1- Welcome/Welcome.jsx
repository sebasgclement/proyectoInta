import './Welcome.css';
import logo from '../../../assets/images/logo1.png';
const Welcome = () => {
  return (
    <div className="container">
      <div className="welcome-box">
        <p className="welcome-text">¡Bienvenido a Guardianes del Suelo!</p>
        <div className="user-icon">
          <img src={logo} alt="User Icon" />
        </div>
      </div>
    </div>
    );
};

export default Welcome;

