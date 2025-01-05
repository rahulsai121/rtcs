import { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, TextField, Button, Container } from '@mui/material';
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState('')
    const router = useRouter();

    const handleLogin = async () => {
        if (!username) return alert('Please enter a username');
        try {

            const response = await axios.post('http://localhost:5000/api/login', { username });
            localStorage.setItem('sessionId', response.data.sessionId);
            localStorage.setItem('username', username);
            router.push('/comments');
        } catch (error) {
            alert('Error logging in');
        }
    }


    return (
        <Container>
            <Typography variant="h1" component="h2" sx={{ m: 3 }}>
                Login
            </Typography>

            <TextField
                label="Username"
                fullWidth
                value={username}
                sx={{ m: 3 }}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Button variant="contained" onClick={handleLogin} sx={{ m: 3 }}>
                Login
            </Button>
        </Container>
    )
}

export default Login