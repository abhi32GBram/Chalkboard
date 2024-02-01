import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image src="/logo.svg" alt="logo" width={230} height={230} className=" animate-bounce duration-700" />
        </div>
    )
}

