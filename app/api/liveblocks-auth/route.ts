import { api } from "@/convex/_generated/api"
import { auth, currentUser } from "@clerk/nextjs"
import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"

// Initialize Convex and Liveblocks clients with necessary configurations
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
    secret: "sk_dev_ceiQuXQbHNh2W9t_aKlvsqX-VL-SjBwNcdQ4L8mY6G-2eAb_WtxjtAO77xFEyWXP"
})

// Define the POST function to handle authentication and authorization
export async function POST(request: Request) {
    // Authenticate the user and retrieve their authorization and user information
    const authorization = await auth()
    const user = await currentUser()

    // Log the authentication information for debugging purposes
    // console.log("AUTH_INFO ==>>", {
    //     authorization, user
    // })

    // Check if the user is authenticated
    if (!authorization || !user) {
        return new Response("Unauthorized User ", { status:  403 })
    }

    // Extract the room ID from the request body
    const { room } = await request.json()
    // Query the Convex API to get the board information
    const board = await convex.query(api.board.get, { id: room })

    // Log the board information for debugging purposes
    // console.log("BOARD_INFO ==>>", {
    //     room, board, boardOrgID: board?.orgId, userOrgId: authorization.orgId
    // })

    // Check if the user's organization ID matches the board's organization ID
    if (board?.orgId !== authorization.orgId) {
        return new Response("Unauthorized Access ", { status:  403 })
    }

    // Prepare user information for Liveblocks session
    const userInfo = {
        name: user.firstName || " Teammate",
        picture: user.imageUrl
    }

    // Log the user information for debugging purposes
    // console.log({ userInfo })

    // Prepare a Liveblocks session for the user
    const session = liveblocks.prepareSession(
        user.id,
        { userInfo: userInfo }
    )

    // Grant full access to the room for the user in the Liveblocks session
    if (room) {
        session.allow(room, session.FULL_ACCESS)
    }
    // Authorize the session and get the response
    const { status, body } = await session.authorize()

    // Log the authorization status and response for debugging purposes
    // console.log({ status, body }, ", ARE ALLOWED")

    // Return the response from the Liveblocks session authorization
    return new Response(body, { status })
}