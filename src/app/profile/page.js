"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";


export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setZipCode(data.zipCode);
                    setCity(data.city);
                    setState(data.state);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status])

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: userName,
                    image,
                    streetAddress,
                    phone,
                    zipCode,
                    city,
                    state,
                }),
            });
            if (response.ok)
                resolve()
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error!',
        });
    }

    async function handleFileChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: "POST",
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setImage(link);
                    })
                }
                throw new Error('Something went wrong');
            });

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete',
                error: 'Upload error',
            });
        }
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        redirect('/login');
    }


    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto mt-4">
                <div className="flex gap-4">
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
                        <input type="tel" placeholder="Phone Number"
                            value={phone} onChange={e => setPhone(e.target.value)} />
                        <input type="text" placeholder="Street Address"
                            value={streetAddress} onChange={e => setStreetAddress(e.target.value)} />
                        <input type="text" placeholder="City"
                            value={city} onChange={e => setCity(e.target.value)} />
                        <div className="flex gap-2">
                            <input type="text" placeholder="State"
                                value={state} onChange={e => setState(e.target.value)} />
                            <input type="text" placeholder="Zip Code"
                                value={zipCode} onChange={e => setZipCode(e.target.value)} />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    )
}