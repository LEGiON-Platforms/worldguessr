

export default function Blur({children}) {
    return (
        <>
            <div className="h-fit w-fit bg-blue-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
                {children}
            </div>
        </>
    )
}