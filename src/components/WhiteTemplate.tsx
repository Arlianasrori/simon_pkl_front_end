export default function WhiteTemplate(props: any) {
    return (
        <div className="bg-white mt-[24vh] ml-[21vw] p-7 rounded-md shadow-md w-[76vw]">
            {props.children}
        </div>
    )
}
export function BlueTemplate(props: any) {
    return (
        <div className="flex items-center justify-center  min-h-screen bg-gray-100">
            <div className="relative mt-[20vh] ml-[21vw] min-w-[70vw] h-[90vh] bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="absolute top-0 w-full h-2/3 bg-accentColor" style={{ borderRadius: '0 0 30% 30%' }}>{props.children}</div>
                
            </div>
        </div>

    )
}