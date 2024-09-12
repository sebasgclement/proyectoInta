import{ useEffect} from 'react';
import './BlackScreen.css'; // Asegúrate de que este archivo contiene las clases CSS definidas
import PropTypes from 'prop-types'
const BlackScreen = ({ isVisible, onTransitionEnd }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onTransitionEnd(); // Llama a la función pasada por props después de la transición
            }, 1000); // Duración de la transición

            return () => clearTimeout(timer);
        }
    }, [isVisible, onTransitionEnd]);

    return (
        <div className={`black-screen ${isVisible ? 'visible' : ''}`}></div>
    );
};

BlackScreen.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onTransitionEnd: PropTypes.func.isRequired,
};

export default BlackScreen;



