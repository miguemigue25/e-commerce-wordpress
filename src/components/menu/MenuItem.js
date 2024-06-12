export default function MenuItem() {
    return (
        <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-green-800 hover:text-white hover:shadow-2xl hover:border-red hover:border-t-2 hover:shadow-black/80 transition-all">
            <div className="text-center">
                <img src="/enmolada.png" alt="" className="rounded-md max-h-auto max-h-30 block mx-auto" />
            </div>
            <h4 className="font-semibold uppercase text-lg my-2">Enmolada</h4>
            <p className=" text-black text-sm hover:text-white">
                sf sfsfs fs sdfasfaege sfasfafawswf sfsefsf
                fvdsvfsdfsf sfsefsf sfafsaf sfsfsdf sefsef.
            </p>
            <button className="bg-white text-black mt-4 rounded-full px-8 py-2 hover:bg-primary hover:text-black">
                Add to cart $12
            </button>
        </div>
    )
}