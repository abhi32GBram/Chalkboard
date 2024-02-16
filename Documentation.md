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
