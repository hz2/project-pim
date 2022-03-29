import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useState } from 'react';

const Login = (props: { setName: (name: string) => void }) => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);
    }

    if (redirect) {
        router.push('/demo/home')
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <input type="email" className="form-control" placeholder="Email address" required
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;
