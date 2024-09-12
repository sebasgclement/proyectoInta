import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext'; // Asegúrate de que la ruta sea correcta
import './PlayerForm.css';

const PlayerForm = () => {
    const { login } = useUser(); // Obtiene la función login del contexto
    const [teamMembers, setTeamMembers] = useState([]);
    const [name, setName] = useState('');
    const [placeholder, setPlaceholder] = useState('Escribe un nombre aquí');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        school: '',
        teamName: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleAddMember = (e) => {
        e.preventDefault();
        if (name && teamMembers.length < 5) {
            setTeamMembers([...teamMembers, name]);
            setName('');
            setPlaceholder('¡Usuario cargado!');
            setTimeout(() => setPlaceholder('Escribe un nombre aquí'), 1000);
        } else {
            setPlaceholder('Debe agregar un nombre válido');
        }
    };

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
        if (!formData.firstName.trim()) newErrors.firstName = '¡El nombre es obligatorio!';
        if (!formData.lastName.trim()) newErrors.lastName = '¡El apellido es obligatorio!';
        if (!formData.school.trim()) newErrors.school = '¡Ingrese el nombre de su escuela!';
        if (!formData.teamName.trim()) newErrors.teamName = '¡El nombre del equipo es obligatorio!';
        if (teamMembers.length < 1) newErrors.teamMembers = 'Debe agregar al menos un miembro al equipo';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/usuarios/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: formData.firstName,
                        apellido: formData.lastName,
                        usuario: formData.username,
                        password: formData.password,
                        escuela: formData.school,
                        integrantes: teamMembers.join(', '), // Almacena los miembros del equipo en una cadena separada por comas
                        nombre_equipo: formData.teamName,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el registro es exitoso, actualizar el contexto de usuario
                    login(formData.username); // Actualiza el contexto con el nombre de usuario
                    navigate('/categories'); // Redirigir a la pantalla de categorías
                } else {
                    // Si el servidor devuelve errores, mostrarlos en el formulario
                    setErrors({
                        username: data.usuario ? data.usuario[0] : '',
                        password: data.password ? data.password[0] : '',
                    });
                }
            } catch (error) {
                console.error('Error durante la solicitud:', error);
                setErrors({ general: 'Hubo un problema con la solicitud, intenta nuevamente.' });
            }
        }
    };

    return (
        <div className='form-container player-form'>
            <form onSubmit={handleSubmit}>
                <h2 className="form_subtitle">Guardianes del suelo</h2>
                
                <fieldset className="fieldset_form1">
                    <legend className="fieldset_legends">¿NUNCA JUGASTE? REGISTRATE</legend>

                    <div className="form_input">
                        <label>Nombre de Usuario
                            <input 
                                type="text" 
                                name="username" 
                                placeholder={errors.username || "Pensa en un nombre creativo..."} 
                                value={formData.username} 
                                onChange={handleChange}
                            />
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
                        </label>
                    </div>

                    <div className="form_input">
                        <label>Nombre
                            <input 
                                type="text" 
                                name="firstName" 
                                placeholder={errors.firstName || "Ingrese su nombre..."} 
                                value={formData.firstName} 
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form_input">
                        <label>Apellido
                            <input 
                                type="text" 
                                name="lastName" 
                                placeholder={errors.lastName || "Ingrese su apellido..."} 
                                value={formData.lastName} 
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form_input">
                        <label>¿De qué escuela venís?
                            <input 
                                type="text" 
                                name="school" 
                                placeholder={errors.school || "Escribe el nombre de tu escuela..."} 
                                value={formData.school} 
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form_input">
                        <label>¿Quiénes van a ser parte del equipo? (5 por equipo)
                            <input 
                                list="miembros" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={placeholder}
                            />
                            <datalist id="miembros" name="miembros"></datalist>
                        </label>
                        <button onClick={handleAddMember}>
                            <span id="member" className="button_top ">AGREGAR MIEMBRO</span>
                        </button>
                        <ul>
                            {teamMembers.map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="form_input">
                        <label>¿Cómo se va a llamar tu equipo?
                            <input 
                                type="text" 
                                name="teamName" 
                                placeholder={errors.teamName || "Ej: Los Guardianes Rojos"} 
                                value={formData.teamName} 
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </fieldset>

                <div className="button.group">
                    <button type="submit">
                        <span className="button_top">¡A JUGAR YA!</span>
                    </button>
                </div>

                {errors.general && <p className="error-message">{errors.general}</p>}
            </form>
        </div>
    );
};

export default PlayerForm;
