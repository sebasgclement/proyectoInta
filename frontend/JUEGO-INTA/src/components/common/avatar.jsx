import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

const UserAvatar = () => {
    const { userName, score, logout } = useUser();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        handleClose(); // Cierra el menú después de cerrar sesión
    };

    if (!userName) return null;

    return (
        <Stack direction="row" spacing={2} style={{ position: 'absolute', top: 20, right: 20 }}>
            {/* Nuevo Avatar con el nombre del usuario completo */}
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square" onClick={handleMenuClick}>
                {userName.charAt(0)} {/* Muestra la inicial del nombre */}
            </Avatar>
            <Avatar sx={{ bgcolor: green[500] }} variant="rounded" onClick={handleMenuClick}>
                <AssignmentIcon />
            </Avatar>
            {/* Menú que muestra el puntaje y opción de cerrar sesión */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem disabled>{`Usuario: ${userName}`}</MenuItem>
                <MenuItem disabled>{`Puntaje: ${score}`}</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
        </Stack>
    );
};

export default UserAvatar;
