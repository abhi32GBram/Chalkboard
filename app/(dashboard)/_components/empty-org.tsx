
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"


export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center  justify-center" >
            <Image src="/placeholder-3d.svg" alt="empty org page" width={400} height={400} />
            <h2 className="text-2xl  font-semibold mt-6">
                Welcome to Chalkboard
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">
                Create an Organization to get Started
            </p>
            <div className="pt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create Organization Workspace
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none  max-w-[480px]">
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}