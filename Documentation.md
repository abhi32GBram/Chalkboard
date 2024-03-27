> # Setting Up Backend & Authentication 

- Convex is  a database and comprehensive cloud backend solution.
- This means it goes beyond just storing data (like a traditional database) to include server functions, backend functionality, and the interface that communicates with your application.
- With Convex, you have a backend database where you can store your application's state.
- This state refers to the current condition or status of your application at any given time.
- You can query this state using server functions, which can be written in either JavaScript or TypeScript.
- These functions allow you to retrieve, update, or delete data stored in your Convex backend database.
- Convex also includes client libraries that help synchronize state between the client (the user's device or browser) and the server.
- This ensures that all users see the same data and that changes made by one user are immediately visible to others.
- For setting up Convex with Next.js, you can refer to the quickstart guide provided in the official Convex documentation: [https://docs.convex.dev/quickstart/nextjs](https://docs.convex.dev/quickstart/nextjs).

---
> # Using Clerk for Authentication

- Clerk is a service that helps you set up and manage authentication in your application.
- Authentication is the process of verifying who a user is before they can access certain parts of your application.
- With Clerk, you can easily add features like sign up, log in, password reset, email verification, and more.
- This saves you from having to build these features from scratch, allowing you to focus on other aspects of your application.
- Clerk also handles security best practices for you, such as securely storing passwords and protecting against common attacks.
- By integrating Clerk into your application, you can ensure that only authorized users can access sensitive parts of your app, enhancing its security and privacy.


--- 

># Dashboard Layout and Organization Workspaces

## Integration of Clerk's Organizations Options

- Seamlessly integrated Clerk's organizations options into the application architecture, enabling users to establish new organization workspaces directly within the platform.
- This integration significantly improves the user experience by eliminating the need for external navigation during the setup phase of a new organization.

## Implementation of a Modal Dialog for Organization Creation

- Introduced a modal dialog system to streamline the creation of new organizations, ensuring a smooth interaction with Clerk's backend services.
- Utilized components from Shadcn UI to maintain a uniform and intuitive user interface across the application.
- Ensured a cohesive and unified user experience by aligning the modal dialog with the existing application design.

## Enhancement of Usability with Button Hints

- Enhanced the usability of the organization sidebar by incorporating tooltips that display the name of the associated organization.
- This feature simplifies the identification and understanding of button functions, contributing to a more accessible user interface.
- Leveraged Shadcn UI's component logic to implement these interactive elements effectively.

## Optimization of Organization Button Display

- Optimized the presentation of organization buttons by displaying the initials of the organization name, thereby facilitating rapid organization selection.
- This visual adjustment enhances user comprehension and reduces cognitive load during the organization selection process.

## Introduction of an 'Add New' Button for Simplified Organization Setup

- Introduced a dedicated 'Add New' button to expedite the process of adding new organization workspaces.
- Upon activation, this button prompts the modal dialog, allowing users to input the necessary details for the new organization workspace efficiently.

## Inclusion of Responsive Wireframes for Key Components

- Incorporated wireframes for key components of the application, including the organization sidebar, main sidebar, dashboard space, navbar, search bar, and the Clerk user button for signup/signin.
- These wireframes serve as a visual blueprint, offering insights into the application's layout and workflow, which aids stakeholders in understanding the design rationale and user journey.
- Ensured that the wireframes are responsive, accommodating various screen sizes and orientations for an optimal viewing experience across different devices.

--- 
> # Navbar & Search Input 

## Installing - React Query-String & `useHooks-ts` Package

Install using -  `npm install query-string`

* The `query-string` package is a lightweight JavaScript utility that assists with parsing and stringifying URL query strings.
* It is especially handy when working with URL query parameters in JavaScript applications.

- **Parsing**: Transform a query string into a JavaScript object.
- **Stringifying**: Convert a JavaScript object into a query string.
- **Extraction**: Retrieve a query string from a given URL.

Install using -  `npm i usehooks-ts`.

- **TypeScript-Based**: Written in TypeScript for strong typing support.
- **Custom Hooks**: Offers a variety of ready-to-use React hooks for common tasks.
- **Lightweight**: No additional dependencies, reducing bundle size.
- **Documentation**: Comprehensive usage examples and explanations provided.
- **Community Support**: Actively maintained with a growing community of contributors.
- **Resources**: More information available on the [official website](https://usehooks-ts.com/) and [GitHub repository](https://github.com/juliencrn/usehooks-ts).


### Responsive Navbar
- Implemented a responsive navigation bar that adapts to various screen sizes.

### Search Bar Functionality
- Integrated a search bar with a  500ms debounce mechanism to improve performance and user experience.
- Utilized `react-query-string` to process user input and perform direct queries based on the search criteria.

### Organization Sidebar
- Enhanced the organization sidebar with additional functionality, including the ability to manage organizations and invite members.

### Board Navigation Buttons
- Added "Favorites Board" and "Team Boards" buttons for easy navigation between different types of boards.
- Implemented quick navigation using `useSearchParams` from Next.js to update the URL query parameters without requiring a full page reload.

---
> # Mutations from Convex to make New Boards 

### Commit Summary: Adding New Board Feature

Here are the points revised to sound more professional:

#### Convex Mutations Integration
- This commit introduces the functionality to instantiate new boards via mutations leveraging Convex's robust toolkit for serverless applications.
- Mutations represent data manipulation operations executed on the server, enabling dynamic board creation within the user's dashboard.

#### Mutation Operations Capabilities
- Beyond the board creation mutation, this commit fortifies the backend to fully support mutations, ensuring the application can process data modification requests.
- The server-side logic has been optimized to handle such requests, guaranteeing a responsive and reliable user experience.

#### Enhanced Create Board Button
- The "Create Board" button on the empty board page has been enhanced to initiate a mutation request upon user interaction.
- This action results in the creation of a new board linked to the user's organization, streamlining the board addition process.

#### State Management Custom Hook
- A custom hook has been crafted to oversee the state of the "Create Board" button and associated UI elements during the mutation lifecycle.
- This hook encapsulates the `useMutation` hook from Convex, introducing state management features like loading indicators and disabling functionalities.
- Such enhancements offer immediate feedback to users, mitigating the risk of duplicate submissions and elevating the user interaction quality.

#### Integration of Sonner for Toast Notifications
- The commit seamlessly integrates the Sonner component from ShadcnUI, a specialized tool for presenting toast notifications.
- Sonner provides real-time updates to users regarding the success or failure of board creations, enriching the user experience with timely and visually engaging feedback.

---

> # Board Listings and Cards with Skeleton Loaders 

# `date-fns`

* `date-fns` is a modern JavaScript date utility library that provides a comprehensive set of functions for manipulating JavaScript dates in a browser & Node.js environment. 
* It offers a functional programming approach to handling dates and times, which can lead to more readable and maintainable code.
* `npm i date-fns` to install this package

## Key Features

- **Immutable**: All functions return a new date instance instead of changing the passed one, making it safe to use without side effects.
- **Tree Shaking**: The package supports tree shaking, which means you can import only the functions you need, reducing the size of your bundle.
- **Modular**: Functions are organized into separate modules, allowing you to install and import only what you need.
- **Locale Support**: It includes support for internationalization (i18n) and localization (l10n), enabling you to format dates according to different languages and regions.
- **Chaining**: Many functions allow chaining, which can make your code more concise and easier to read.
- **TypeScript Support**: The package comes with TypeScript definitions, making it suitable for projects using TypeScript.

## Board Cards Layout

* Implemented a dynamic layout for displaying board cards on the frontend. 
* This layout is designed to adapt to the data structure provided by the Convex backend service. 
* The layout inference process involves parsing the JSON response from the backend and dynamically generating the UI components accordingly.

## Card Creation Timestamps

* Utilizing the `date-fns` library, we have integrated timestamps within each card's footer to display the creation date and time.
*  This feature allows users to easily identify when a particular card was created, whether by themselves or another user.


## Create Board Button

* A dedicated "Create Board" button has been added to the user interface. 
* When clicked, this button triggers the `useMutation` API call to the backend, which creates a new board entry.
* Once the operation is successful, the newly created board is rendered on the screen in real-time.

## Toast Notifications

* Toast notifications have been incorporated using the `sonner` component from the `shadcnui` library.
* These notifications appear when the "Create Board" button is pressed, providing users with feedback on the success or failure of their action.

## Skeleton Loaders

* Skeleton loaders have been added to the boards page to handle cases where the user's internet connection is unstable.
* These loaders, also sourced from `shadcnui`, provide a placeholder for the actual content, giving the impression of a smooth loading experience even under less than ideal network conditions.

## Add to Favourites Button

* An "Add to Favourites" button has been introduced, allowing users to mark specific boards as favorites.
*  This feature is purely frontend-based for now, with conditional styling applied to indicate the favorite status.

--- 
> # Operations on Board Card (Copy Board Link, Update Title, Deleting Board)


### Click Dialog Actions Card



- **Copy Board Link**: Users can easily copy the URL of the board to share with others or to access it later.
- **Update Title**: The title of the board can be updated directly from the card, allowing for quick changes without navigating away from the current view.
- **Delete Board**: Users have the option to delete the entire board if it is no longer needed. This action will prompt a confirmation dialog to ensure the user's intention is clear.

### Mutation Functions for Convex DB

* To support the instantaneous performance of these actions on the board card, mutation functions have been added to the Convex DB.
*  These functions are designed to handle the creation, updating, and deletion of board data in real-time, ensuring that the user interface remains responsive and up-to-date with the underlying data.

### Modals and Dialogs from ShadcnUI

* The user interface for these actions has been enhanced using modals and dialogs from the ShadcnUI library.
*  These components provide a clean and intuitive way for users to interact with the board card, offering a consistent and modern look and feel.

### Modal-Provider for Conditional Rendering

* To prevent hydration errors, a modal-provider has been added to the application.
* This provider is responsible for conditionally rendering modals based on the user's actions.
*  By doing so, it ensures that modals are only rendered when necessary, reducing the likelihood of encountering issues related to server-side rendering versus client-side rendering discrepancies.

--- 

> # Functionality to Favourite/Unfavourite Boards


### Favouriting and Unfavouriting Boards

- **Favouriting**: To mark a board as a favourite, simply click on the star icon on the card. The star will fill in, indicating that the board has been added to your favourites.
- **Unfavouriting**: If you wish to remove a board from your favourites, click on the filled-in star icon. The star will revert to an empty state, signifying that the board is no longer marked as a favourite.

**Note**: As of the current release, while the board can be marked as a favourite, it is not yet displayed in the dedicated favourites route. This feature is planned for a future update.

### Database Changes for Favourited Boards

* To support the new favouriting functionality, we have created a table specifically for storing information about favourited boards.
* This table is linked to the user, board, and organization using a combination of `userId`, `boardId`, and `orgId`. 
* This structure allows for efficient querying and management of favourited boards.

### Conditional Rendering of Favourite Button

* The state of the favourite button on the board card is now conditionally rendered based on whether the board is marked as a favourite.
*  This means that the star icon will reflect the current favourite status of the board, providing users with a clear visual indication of their favourite boards.

### Validations and Error Handling

To ensure the reliability and robustness of the new favouriting feature, we have implemented validations and error handling on the frontend. This includes:

- **Input Validation**: The system checks for valid input before processing the favouriting action, preventing any invalid operations.
- **Error Toasts**: If an error occurs during the favouriting process, an error toast message will be displayed to the user, providing clear feedback on what went wrong.
- **Frontend Error Handling**: The frontend has been updated to handle potential errors gracefully, ensuring that the application remains stable and functional even in the event of unexpected issues.

--- 

> # Search Query Implemented 

# Convex Search Query for Boards


### Cascading Deletion of Favourited Board Relations

* We have addressed and improved the cascading deletion functionality for board relations that are marked as favourites. 
* When a board is deleted, the corresponding relation record in the favourites table is also removed to maintain consistency and prevent orphaned records.

- **Cascading Deletion**: When a favourited board is deleted, the system will automatically remove the associated relation record from the favourites table.
- **Reflecting Changes**: The deletion process ensures that the favourites table accurately reflects the current state of the user's favourites, with no stale or outdated entries.

### Search Query Implementation for Boards

* To enhance the search experience, we have implemented a search query feature for both the frontend and backend.
*  This allows users to filter the list of boards based on the text entered in the search box.

- **Frontend Search**: The search box on the frontend now supports live filtering of boards as the user types their query.
- **Backend Search**: The backend has been updated to handle search queries, processing the text input and returning a list of matching boards.

### Improved Search Experience for Favourites and Organization Boards

* We have expanded the search functionality to include both the favourites and organization boards, providing users with a more refined search experience.

- **Favourites Search**: Users can now search within their favourited boards, quickly finding the boards they have marked as important.
- **Organization Boards Search**: In addition to favourites, users can also search within the boards associated with their organization, making it easier to locate specific boards across different contexts.


* The `boards.ts` file in the Chalkboard project uses Convex to perform search queries on the `boards` collection.
*  The search functionality is implemented within the `handler` function of the `get` query, which allows users to search for boards by title within a specific organization.

## Search Query with Title

* If a search term is provided by the user, the code constructs a search query against the `boards` collection using the `withSearchIndex` method. This method specifies the search index to be used for the search operation.

```typescript
if (title) {
    boards = await ctx.db.query("boards").withSearchIndex("search_title", (q) => q
        .search("title", title)
        .eq("orgId", args.orgId)
    ).collect()
}
```

- `withSearchIndex("search_title", ...)`: Specifies the `search_title` index for the search.
- `.search("title", title)`: Performs the search on the `title` field of the documents in the `boards` collection, looking for matches with the provided `title`.
- `.eq("orgId", args.orgId)`: Filters the search results to only include boards that belong to the specified organization ID.
- `.collect()`: Collects the results of the query into an array.

## Search Query Without Title

If no search term is provided, the code queries the `boards` collection for all boards associated with the given organization ID. It uses the `withIndex` method to filter the results by the organization ID and orders them in descending order.

```typescript
else {
    boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect()
}
```

- `withIndex("by_org", ...)`: Specifies the `by_org` index for filtering the results by the organization ID.
- `.order("desc")`: Orders the results in descending order.
- `.collect()`: Collects the results of the query into an array.
---

> # Chalkboard Layout & Liveblocks Integration

## Live Blocks: Use Cases in App Development

* Live Blocks is a real-time collaboration infrastructure designed for building performant collaborative experiences. 
* It provides a fully integrated solution around core products like Presence, Broadcast, Document, and Comments, enabling developers to create a wide range of collaborative applications. 

- **Multiplayer Forms**: Enable users to fill out forms collaboratively, with changes synchronized in real-time across all participants.
- **Multiplayer Text Editor**: Create text editors where multiple users can edit the same document simultaneously, with automatic conflict resolution.
- **Multiplayer Creative Tools**: Develop applications for creative projects, such as design tools, where team members can work together on the same project in real-time.
- **Multiplayer Whiteboard**: Implement whiteboards for brainstorming sessions or educational purposes, where all participants can draw and write on the same board simultaneously.
- **Comments and Sharing**: Facilitate real-time comments and sharing of documents, allowing for immediate feedback and collaboration on various content types.
- **Document Browsing and Permissions**: Manage access to documents and content, ensuring that only authorized users can view or edit specific documents.

## Installation 

1. **Install Live Blocks Package**: Install the Live Blocks client library by running the following command in your project directory:
   ```
   npm install @liveblocks/client
   ```
   This package provides the necessary functions to interact with Live Blocks servers.

2. **Set Up the Live Blocks Client**: After installing the package, you need to set up the Live Blocks client in your application. Here's a basic example of how to create a client:
   ```javascript
   import { createClient } from "@liveblocks/client";

   const client = createClient({
     publicApiKey: "your_public_api_key_here",
   });
   ```
   Replace `"your_public_api_key_here"` with your actual Live Blocks public API key.

## Live Blocks: Wireframe Implementation and Setup

### Completed Setup of the Wireframe Implementation of the Board

* After being redirected from the main boards list page, the wireframe implementation of the board was completed.
 * This setup included placeholders for the canvas, tools, members, and board information.
 *  These placeholders serve as a visual guide for the layout and functionality of the board, ensuring that all necessary components are accounted for in the initial design phase.

### Completed Initialisation and Setup of Live Blocks

* The initialisation and setup of Live Blocks were completed to enable real-time collaboration features within the board.
*  This involved configuring the Live Blocks client with the necessary API keys and setting up the necessary data structures to manage the state of the board in real-time. 
* The setup ensures that all collaborative features, such as multiplayer editing, real-time updates, and presence tracking, are integrated seamlessly into the board.

### Added Skeleton Loaders for the Various Components of the Wireframes

* To enhance the user experience during the loading of the actual board content, skeleton loaders were added for the various components of the wireframes.
*  These loaders provide a visual indication that content is being loaded, improving the perceived performance of the application. 
* The skeleton loaders are displayed until the actual content is fetched and ready to be displayed, ensuring that users are not left with a blank screen or incomplete information.

### Created Functional Components for the Individual Dependencies

* Functional components were created for the individual dependencies of the board, including participants, toolbar, and board information.
*  These components are designed to be modular and reusable, allowing for easy integration and management of the board's features. 
* The participants component manages user presence and interactions, the toolbar component provides the necessary tools for editing and interacting with the board, and the board information component displays relevant information about the board, such as its name, description, and current status.

---
> # Board Authorization using Liveblocks 

### Added Authorization Workflow in Boards with Live Blocks

* To enhance the security and accessibility of the boards, an authorization workflow was implemented using Live Blocks.
*  This workflow ensures that only authorized users can access the board content, with a focus on verifying the user's identity and their association with the organization that owns the board.

#### User Verification Process

The process begins with the user attempting to access a board. The system then conducts a series of checks to authenticate the user and verify their permissions:

1. **User Authentication**: The user's credentials are verified to ensure they have a valid account.
2. **Organization Verification**: The system checks if the user belongs to the organization that owns the board. This is done by comparing the `userId` and `orgId` associated with the user and the board.
3. **Access Permissions**:
    *  If the `userId` and `orgId` match, the user is granted access to the board content. 
    * This ensures that only members of the same organization can view and interact with the board.

### Added Check Gateways for Organization-Specific Access


- **Same Organization Access**: Users are only allowed to access boards if their `orgId` matches the `orgId` associated with the board. This prevents unauthorized access to sensitive or confidential information.
- **Foreign Account Access Prevention**: 
    * If a user attempts to access a board by copying its URL and using a foreign account, the system will detect the mismatch in `orgId` and prevent access.
    *  Instead, the user will encounter an infinite loader and authentication errors in the developer tools.
    *  This mechanism serves as a deterrent against unauthorized access attempts and helps maintain the integrity and security of the board content.


--- 

> # User Room Authentication & Live User Avatars in Canvas 


- **Feature Addition**: 
    - We have enhanced the platform by introducing the capability for users to join the canvas of a common room.
    -  This feature is exclusively accessible to members of the organization, ensuring a secure and collaborative environment for team members.

#### Wireframe Enhancements for Organization Section and Live Room

- **Chalkboard Logo and Banner**: 
    - A chalkboard logo and banner have been integrated into the organization section and live room.
    - Clicking on these elements will redirect the user back to the organization boards section, providing a seamless navigation experience.

- **Board Title as a Button**: 
    - The board title has been transformed into a button, allowing users to rename the board on-the-spot.
     - This feature enhances the flexibility and customization options available to users, enabling them to easily adapt the board to their specific needs.

- **Utility Menu as Hamburger Menu**:
    -  A utility menu, represented as a hamburger menu, has been added.
    -  Upon clicking, this menu provides a range of options including copying the board link, deleting the board, and renaming the board.
    -  This addition streamlines the management of boards, offering users quick access to essential functionalities.

- **In-Room Member Avatars**:
    -  The top-right section of the canvas now displays the avatars of in-room members.
    -  This feature not only visually indicates the presence of other users in the canvas room but also shows their names, fostering a sense of community and collaboration among team members.
--- 

> # Toolbar Functionality Setup 

## Toolbar Section Enhancements

The toolbar section has been significantly enhanced to include a variety of tools, making it partially functional. The tools now available include:

- **Select**: Allows users to select objects on the canvas.
- **Rectangle**: Enables users to draw rectangles on the canvas.
- **Ellipse**: Allows users to draw ellipses on the canvas.
- **Text**: Provides the functionality to add text to the canvas.
- **Pencil**: Enables users to draw freehand on the canvas.
- **Sticky Notes**: Allows users to add sticky notes to the canvas for annotations or reminders.

## Undo and Redo Buttons

Two new buttons, Undo and Redo, have been added to the toolbar. These buttons are crucial for managing changes made on the canvas:

- **Canvas History Hooks**: These hooks are attached to the Undo and Redo buttons. They enable the functionality of undoing and redoing changes made on the canvas. This is achieved by maintaining a history of canvas states, allowing users to revert or reapply changes as needed.
- **Functionality Source**: The functionality for these buttons comes from the `useHistory` hook provided by Liveblocks. This hook manages the history of canvas states, facilitating the undo and redo operations.

## User Modes and Tool Selection

* The application now supports different user modes, with the ability to select tools based on the current mode.
*  The default tool selected in each mode is the **Select** tool. 
* This feature enhances the user experience by allowing for more intuitive and context-aware tool selection:

- **States and Selection**: The application maintains states that reflect the current user mode. Based on these states, the appropriate tool can be selected and made active on the canvas. This ensures that users can easily switch between tools and modes, enhancing the overall usability of the application.

## Backend Event Triggers

Several event triggers have been added to the backend to manage various user interactions with the canvas:

- **Pressing**: Triggered when a user presses a key or a mouse button. This can be used to initiate actions or modify the behavior of the application based on user input.
- **SelectionNet**: A specialized event that likely refers to a network of selection events. This could be used to manage complex selection scenarios, such as selecting multiple objects or handling selection in a networked environment.
- **Translation**: Triggered when an object on the canvas is moved or translated. This event is crucial for tracking and managing the movement of objects within the application.
- **Resizing**: Triggered when an object on the canvas is resized. This event allows the application to adjust the size of objects dynamically, enhancing the flexibility and precision of the canvas editing capabilities.
- **Free Draw**: Triggered when a user draws freely on the canvas. This event is essential for capturing and managing freehand drawings, providing a more expressive and creative canvas editing experience.

--- 

 > #  Real-Time Cursors in the Workspace


### Real-Time Cursor Display

- **Real-Time Updates**:
     -  The workspace now displays the cursors of all users who join the canvas in real time.
     -  This feature ensures that everyone's actions are immediately visible to others, fostering a more interactive and collaborative environment.

- **Unique Color Assignment**: 
    - Each user is assigned a unique color for their cursor and label in the user list located in the top right section of the canvas. 
    - This color-coding helps in quickly identifying different users and their actions within the workspace.

- **Low Latency**: 
    - The cursor position updates are powered by Convex DB, ensuring a fast response time of just 16ms. 
    - This minimal latency ensures that the workspace remains responsive and synchronized across all users.

#### Cursor Position Calculation

- The appearance and position of each user's cursor are determined by a callback function associated with the `onPointerMove` event listeners. 
 - This setup actively updates the coordinates of the pointer to the Convex server, which then reflects these updates to all users in the canvas session.
 -  This mechanism ensures that the cursor movements are accurately represented in real time, with minimal delay.

### Canvas Expansion and Zooming

- **Infinite Working Space**:
    - Users can now expand and zoom into the canvas using the mouse wheel. 
    - This feature provides a virtually infinite working space, allowing for extensive collaboration and creative exploration without the constraints of physical space.

### User Identification

- **Named Labels**:
    -  A named label is attached to each user's cursor, displaying their names. 
    - This feature simplifies the identification of fellow users in the canvas, making it easier to collaborate and communicate effectively.

--- 

 > # Drawing on the Canvas

*  This feature allows users to create rectangular shapes on the canvas, providing a basic drawing tool for users to start visualizing their ideas.
* For now its a rectangle with default stroke

### Working of Render on Chalkboard : 

- **LayerPreview Component**: Renders individual layers, including rectangles, on the canvas.
- **Utility Functions**:
     - `pointerEventToCanvasPoint`: Converts pointer events to canvas coordinates.
    - `insertLayer`: Inserts a new layer onto the canvas.
- **User Interaction**:
    - **Pointer Down**: Sets canvas mode to `CanvasMode.Inserting`.
    - **Pointer Move**: Updates user's cursor position.
    - **Pointer Up**: Inserts a new rectangle layer if in `CanvasMode.Inserting`.
    - **Layer Rendering**: `LayerPreview` renders the rectangle layer.


#### Using NanoID Package 

* The `nanoid` npm package is a compact, secure, and URL-friendly unique string ID generator designed for JavaScript applications. 
* It is particularly useful for generating IDs for various purposes such as database keys, session identifiers, and more.

- **Small Size**: It is only 116 bytes in size when minified and brotlied, making it an efficient choice for projects where minimizing the bundle size is important. It has no dependencies, ensuring that it does not introduce additional overhead 

- **Security**: `nanoid` uses a hardware random generator, making it safe for use in clusters and ensuring the uniqueness and security of the generated IDs 

- **Short IDs**: It employs a larger alphabet than UUID (`A-Za-z0-9_-`), which allows for shorter IDs. The default ID length is 21 characters, significantly reducing the size from 36 to 21 symbols, making it more compact than UUIDs 

- **Customization**: `nanoid` offers flexibility in generating IDs. You can generate IDs with custom lengths, use a non-secure ID with a custom alphabet and length, or even specify a custom alphabet for generating IDs. This customization is useful for scenarios where specific requirements for ID uniqueness, length, or character set are needed

- **Portability**: The package has been ported to over 20 programming languages, making it a versatile choice for projects that require cross-language compatibility 

- **Popularity and Maintenance**: `nanoid` is popular, with a significant number of weekly downloads, indicating its widespread use in the developer community. It has a healthy version release cadence and is actively maintained, with the latest version being published recently

- **Installation**: It can be easily installed via npm using the command `npm install nanoid`. For projects that require CommonJS modules, version 3.x of `nanoid` is still supported and can be installed using `npm install nanoid@3` 

--- 
> #  Canvas Layer Objects and Selection Features


### Selecting Layer Objects/Shapes

- **Feature Overview**:
    -  Users now have the ability to select individual layer objects or shapes directly on the canvas.
    -  This feature allows for more precise manipulation of objects within the canvas environment.

- **Implementation Details**: 
    - The selection functionality has been integrated into the canvas interface, enabling users to click on objects to select them.
     -  Once selected, users can perform various actions on the selected object, such as moving, resizing, or deleting it.

### Real-Time Layer Selection View

- **Feature Overview**:
    -  The application now supports real-time viewing of layer selections made by other users. When a user selects a shape on the canvas, the selection is visible to all other users in the same session. 
    - The color of the selected shape matches the user's ID or cursor color, providing a clear visual indication of who is currently selecting which object.

- **Implementation Details**: 
    - This feature leverages WebSocket technology to broadcast selection events to all connected clients. 
    - Upon receiving a selection event, the application updates the canvas to highlight the selected object with the corresponding user's color.
    -  This ensures that all users have a consistent view of the canvas and the current selections.

### Selection Net with Resize and Reposition Handlers

- **Feature Overview**:
    -  To further enhance the manipulation of objects on the canvas, we have introduced a selection net feature. 
    - This feature allows users to select an object and then use handlers to resize and/or reposition it around the canvas.
    -  The selection net ensures that users can easily adjust the size and position of objects without losing precision.

- **Implementation Details**: 
    - The selection net is implemented as an overlay on the selected object. 
    - It includes handles for resizing and moving the object. 
    - The application checks for the presence of a selection net and activates the appropriate handlers based on user interactions. 
    - This ensures that users can easily manipulate objects while maintaining the integrity of the canvas layout.

---