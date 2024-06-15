"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status])

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();
        setSaved(false);
        setIsSaving(true);

        const response = await fetch('/api/profile', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: userName, image }),
        });
        setIsSaving(false);
        if (response.ok) {
            setSaved(true);
        }
    }

    async function handleFileChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            const response = await fetch('/api/upload', {
                method: "POST",
                body: data,
            });
            const link = await response.json();
            setImage(link);
        }
    }

    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        redirect('/login');
    }


    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
                {saved && (
                    <h2 className="text-center bg-green-200 p-4 rounded-lg border-2 border-green-500">
                        Profile saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-200 p-4 rounded-lg border-2 border-blue-500">
                        Saving...
                    </h2>
                )}
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            {image && (
                                <Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250} alt="" />
                            )}
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange} />
                                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and Last Name"
                            value={userName} onChange={e => setUserName(e.target.value)} />
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}