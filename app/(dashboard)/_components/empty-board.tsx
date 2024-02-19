"use client"
// Import necessary components and hooks
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const EmptyBoard = () => {

    const router = useRouter()

    // Hook to handle the creation of a new board
    const { mutate, pending } = useApiMutation(api.board.create);
    // Hook to get the current organization context
    const { organization } = useOrganization();

    // Function to handle the click event for creating a new board
    const onClick = () => {
        // Check if there is an active organization
        if (!organization) return;
        // Call the mutation to create a new board
        mutate({
            orgId: organization.id,
            title: "Untitled"
        }).then((id) => {
            // Show success toast message upon successful creation
            toast.success("Board Created Successfully");
            router.push(`/board/${id}`)
        }).catch(() => {
            // Show error toast message if the creation fails
            toast.error("Oops ! Failed to Create Board");
        });
    };

    // Render the empty board UI
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
                {/* Disable the button while the mutation is pending */}
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    );
};