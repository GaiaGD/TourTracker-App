import TTLogo from "../../public/TT-logo.svg";

export default function ErrorPage(){
    return (
        <div className="h-screen bg-black grid place-content-center">
            <div className="flex justify-center">
                <div className="m-4">
                    <div className="flex justify-center">
                    <img className="w-80 h-auto" src={TTLogo} />
                    </div>
                    <h1 className="text-2xl text-center mt-8">Sorry! Page not found 😔</h1>
                </div>
            </div>
        </div>
    )
}