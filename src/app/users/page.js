"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const { loading, data } = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        })
    }, []);

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'NOT AN ADMIN';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="mb-2 p-1 px-6 flex text-center items-center gap-2">
                        <div className="border bg-gray-100 border-blue-400 flex-wrap grow px-4 p-2 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 hover:border-2 hover:border-blue-600">
                            <div>
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic items-center">No name</span>)}
                            </div>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <Link className="bg-gray-100 button hover:border-2 hover:border-blue-600"
                                href={'/users/' + user._id}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}