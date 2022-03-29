import React, { useEffect, useState } from 'react';
import Login from "./login";
import Nav from "./nav";
import Home from "./home";
import './index.module.css';
import Register from "./reg";

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:3000/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
            }
        )();
    });


    return (
        <div className="App">
            <main className="form-signin">
                <Nav name={name} setName={setName} />
                <Home name={name} />

                <Login setName={setName} />

                <Register />
            </main>
            {/* 
                    <Route path="/" exact component={() => <Home name={name} />} />
                    <Route path="/login" component={() => <Login setName={setName} />} />
                    <Route path="/register" component={Register} />
                <*/}
        </div>
    );
}

export default App;
