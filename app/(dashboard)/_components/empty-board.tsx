import { Button } from "@/components/ui/button";
import Image from "next/image";

export const EmptyBoard = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center ">
            <Image src="/empty-board.svg" alt="empty board" height={180} width={180} />
            <h2 className="text-2xl font-semibold mt-6">
                Create your very first Board !
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">
                Manage Boards for your Organization
            </p>
            <div className="mt-6">
                <Button size="lg">
                    Create Board
                    </ Button >
            </div>
        </div>
    )
}