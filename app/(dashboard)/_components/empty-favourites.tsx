import Image from "next/image";

export const EmptyFavourites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/empty-favourite.svg" height={400} width={400} alt="Empty" />
            <h2 className="text-2xl font-semibold mt-6">
                No Favorite Boards!
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Try Favoriting a Board
            </p>
        </div>
    );
};
