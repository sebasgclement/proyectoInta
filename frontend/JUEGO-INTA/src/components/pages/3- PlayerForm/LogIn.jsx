import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import './LogIn.css';

const LogIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useUser(); // Agrega esto para acceder a la función login del contexto

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = '¡El nombre de usuario es obligatorio!';
        if (!formData.password.trim()) newErrors.password = '¡La contraseña es obligatoria!';
        return newErrors;
    };

    const handleLogin = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        usuario: formData.username,
                        password: formData.password,
                    }),
                });

                const data = await response.json();
                console.log('Datos de la respuesta:', data);

                if (response.ok) {
                    // Asegúrate de que el ID del usuario esté en la respuesta
                    if (data.id) {
                        // Actualiza el contexto con el nombre de usuario y el ID
                        login(data.usuario, data.id); // Suponiendo que el nombre de usuario está en data.usuario
                        console.log('Nombre de usuario logueado:', data.usuario);
                        console.log('ID del usuario:', data.id);
                        // Redirigir a la pantalla de categorías si el login es exitoso
                        navigate('/categories');
                    } else {
                        console.error('ID de usuario no encontrado en la respuesta');
                    }
                } else {
                    // Mostrar errores si el login falla
                    setErrors({
                        username: data.error.includes('Usuario') ? data.error : '',
                        password: data.error.includes('Contraseña') ? data.error : '',
                    });
                }
            } catch (error) {
                console.error('Error durante la solicitud:', error);
            }
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className='form-container'>
            <form>
                <h2 className="form_subtitle">Guardianes del suelo</h2>
                <fieldset className="fieldset_form1 login-mode">
                    <legend className="fieldset_legends login-mode">INICIA SESIÓN</legend>

                    <div className="form_input">
                        <label>Nombre de Usuario
                            <input 
                                type="text" 
                                name="username" 
                                placeholder={errors.username || "Pensa en un nombre creativo..."} 
                                value={formData.username} 
                                onChange={handleChange}
                            />
                            {errors.username && <span className="error">{errors.username}</span>}
                        </label>
                    </div>

                    <div className="form_input">
                        <label>Contraseña
                            <input 
                                type="password" 
                                name="password" 
                                placeholder={errors.password || "Escribe una contraseña segura..."} 
                                value={formData.password} 
                                onChange={handleChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </label>
                    </div>
                </fieldset>

                <div className="button.group">
                    <button type="button" onClick={handleLogin}>
                        <span className="button_top">¡INICIAR SESIÓN!</span>
                    </button>
                    <span id='espacio'></span>
                    <button type="button" onClick={handleRegisterRedirect}>
                        <span className="button_top">REGISTRARSE</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;
