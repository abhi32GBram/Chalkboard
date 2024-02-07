import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center ">
            <Image src="/no-result-found.svg" alt="no result found" height={180} width={180}/>
            <h2 className="text-2xl font-semibold mt-6">
                No Result Found !
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">
                Try Searching for Something Else
            </p>
        </div>
    )
}