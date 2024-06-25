export default function AddressInputs({ addressProps, setAddressProps }) {
    const { phone, streetAddress, zipCode, city, state } = addressProps;

    return (
        <>
            <input type="tel" placeholder="Phone Number"
                value={phone} onChange={e => setAddressProps('phone', e.target.value)} />
            <input type="text" placeholder="Street Address"
                value={streetAddress} onChange={e => setAddressProps('streetAddress', e.target.value)} />
            <input type="text" placeholder="City"
                value={city} onChange={e => setAddressProps('city', e.target.value)} />
            <div className="flex gap-2">
                <input type="text" placeholder="State"
                    value={state} onChange={e => setAddressProps('state', e.target.value)} />
                <input type="text" placeholder="Zip Code"
                    value={zipCode} onChange={e => setAddressProps('zipCode', e.target.value)} />
            </div>
        </>
    );
}