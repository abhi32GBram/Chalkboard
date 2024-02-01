"use client"

import { UserButton } from "@clerk/nextjs"

const Navbar = () => {
    return (
        <div className="flex items-center  gap-x-4 p-5  bg-green-600">
            <div className="hidden lg:flex  lg:flex-1 bg-pink-800">
                Search
                {/* ADD THE SEARCH BOX */}
            </div>

            <UserButton />

        </div>
    )
}

export default Navbar