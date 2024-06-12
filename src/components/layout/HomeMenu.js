import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
    return (
        <section className="my-6">
            <div className="text-center mb-8">
                <SectionHeaders 
                    subHeader={"Preview our"}
                    mainHeader={"Menu"}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    )
}