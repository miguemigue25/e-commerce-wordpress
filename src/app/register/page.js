"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);

        const response = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            setCreatingUser(false);
        } else {
            setError(true);
        }
        setUserCreated(true)
    }



    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created. <br />
                    Now you can {' '}
                    <Link className="underline hover:text-primary" href={"/login"}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred!<br />
                    Please try again later!
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    onChange={e => setEmail(e.target.value)} disabled={creatingUser} />
                <input type="password" placeholder="password" value={password}
                    onChange={e => setPassword(e.target.value)} disabled={creatingUser} />
                <button type="submit" disabled={creatingUser}>
                    Register
                </button>
                <div className="my-4 text-center text-primary">
                    or register thru Google
                </div>
                <button onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="" width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 pt-4 border-t">
                    Existing account?{' '}
                    <Link className="underline hover:text-primary" href={"/login"}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}