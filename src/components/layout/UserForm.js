"use client";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [zipCode, setZipCode] = useState(user?.zipCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [state, setState] = useState(user?.state || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'zipCode') setZipCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'state') setState(value);
    }

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form className="grow"
                onSubmit={e => onSave(e, {
                    name: userName, image, phone,
                    streetAddress, city, state, zipCode, admin
                })}>
                <input type="text"
                    placeholder="First and Last Name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)} />
                <input type="email"
                    disabled={true}
                    value={user.email} />
                <AddressInputs
                    addressProps={{ phone, streetAddress, zipCode, city, state }}
                    setAddressProps={handleAddressChange} />
                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 flex gap-2 items-center mb-2" htmlFor="adminCb">
                            <input id="adminCb" type="checkbox" className=""
                                value={'1'} checked={admin} onChange={e => setAdmin(e.target.checked)} />
                            <span>ADMIN</span>
                        </label>
                    </div>
                )}
                <button className=" font-light" type="submit">Save</button>
            </form>
        </div>
    );
}