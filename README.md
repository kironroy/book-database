# 🔗[Books Database live](https://books-database.netlify.app)

## Getting Started with Create React App

## Internal Links

- [React Default Scripts](#available-scripts)
- [Documentation](#learn-more)
- [Prompts](#prompts)
- [Page Details](#page-details)
- [Considerations](#considerations)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

⚙️ [Bulma CSS](https://bulma.io/)

📅[Firebase](https://firebase.google.com/)

Firebase Database is a cloud-hosted NoSQL database that allows developers to store and sync data in real time across multiple clients. It offers two main database solutions:

1. **Firebase Realtime Database** – This database stores data as JSON and synchronizes it across all connected devices in real time. Whenever data changes, all clients receive updates instantly. It also supports offline functionality, meaning data is cached locally and syncs when the device reconnects.

2. **Cloud Firestore** – A more advanced database that supports richer data models, complex queries, and scalability. It allows developers to structure data hierarchically and perform efficient queries while maintaining real-time synchronization.

### How Firebase Database Works:
- **Data Synchronization:** Instead of traditional HTTP requests, Firebase uses real-time data synchronization. Any change in the database is instantly reflected across all connected devices.
- **Offline Support:** Firebase caches data locally, allowing apps to function even when offline. Once the device reconnects, it syncs with the latest server state.
- **Security Rules:** Firebase provides security rules that define how data can be read or written, ensuring controlled access.
- **Cross-Platform Compatibility:** Firebase databases work seamlessly across iOS, Android, Web, and other platforms, allowing developers to build cross-platform applications.

Would you like guidance on setting up Firebase for your project?


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Prompts

## Kiron:
Please help me create a react web page that has a database of books that I own. I will host this website on Netlify, I want routing and I want to use google's firebase as my database.


## CoPilot:
To assist you effectively, could you clarify a few details about your project?

Book Database Features: What specific information about your books do you want to store (e.g., title, author, genre, publication year)? Should users be able to add, edit, or delete entries?

Routing Requirements: What pages do you envision for your website? For example, a homepage, a book list page, a book details page, etc.?

Firebase Integration: Do you already have a Firebase project set up, or would you like guidance on creating one?

Styling Preferences: Do you have a design or theme in mind for the website, or should I suggest a basic layout?

## Kiron: 
I kept the style of the app basic for now.

# Page Details 

## **Login.js**
This React component defines a **login page** for your book database application, using Firebase authentication.

### **Key Functionalities**:
1. **User Authentication**:
   - Uses `getAuth()` from Firebase to handle authentication.
   - Calls `signInWithEmailAndPassword(auth, email, password)` to verify the user's credentials.

2. **State Management**:
   - Maintains three pieces of state:
     - `email`: Stores user input for email.
     - `password`: Stores user input for password.
     - `error`: Tracks login errors.

3. **Form Submission**:
   - When the user submits the form, the `handleLogin` function:
     - Prevents default form submission behavior.
     - Tries to log in the user with Firebase authentication.
     - Redirects the user to the `/books` page upon success.
     - Displays an error message if authentication fails.

4. **Navigation**:
   - Uses `useNavigate()` from React Router to redirect authenticated users to `/books`.




## **BookForm.js**
The `BookForm.js` file is a **React component** designed to handle both adding and editing books in your app. It provides a **form UI** where users can enter book details—**title, author, subject, and format**—and submit them.

### **Why Is It in the Components Folder?**
It is stored in the `components/` folder because:
1. **Reusability** – This form is used in multiple pages (e.g., adding a book in `BookList.js`, editing a book in `BookDetails.js`).
2. **Separation of Concerns** – It keeps UI components separate from page logic.
3. **Modular Design** – React apps benefit from breaking features into smaller, reusable components.

### **How Does It Work?**
- The form **uses React state (`useState`)** to store user input.
- When submitted (`handleSubmit`), it **passes the book data** to a parent component via the `onSubmit` prop.
- The **Cancel button** (`onCancel` prop) allows discarding changes when editing.
- **Bootstrap classes** (`form-control`, `btn`, `container`, etc.) improve styling.

### **Where Is It Used?**
- `BookList.js` → for adding a book.
- `BookDetails.js` → for editing a book.

This ensures your app has a clean, reusable design. 

<hr>

## **BookDetails.js**
The `BookDetails.js` file is a **React page component** responsible for **displaying, editing, and deleting** individual books from the Firestore database. When a user clicks on a book in the list, this page retrieves and shows the book's details.

### **Why Is It in the Pages Folder?**
It’s placed inside `pages/` because it represents a **full page** rather than just a reusable UI element. Components in `pages/` are directly linked to routes (e.g., `/books/:bookId`) and structure the layout of distinct sections in your app.

### **How It Works:**
- **Fetches book data** from Firebase Firestore using `useEffect` and `getDoc()`.
- **Displays book details** (title, author, subject, format).
- **Allows editing** using `BookForm`, which updates the book in Firestore (`updateDoc()`).
- **Handles deletion** using `deleteDoc()` and redirects users back to the book list.
- **Uses Bootstrap styling** (`container`, `btn-warning`, `border`, etc.).
- **Manages page state** (`useState` for `isEditing` and `book`).

### **When Is It Used?**
- When a user clicks **"View Details"** in `BookList.js`, they are navigated to `/books/:bookId`, which loads this page.
- Allows users to **modify or remove** book entries.

This file ensures each book can be managed in a dedicated, structured way.

<hr>

## **BookList.js**
The `BookList.js` file is responsible for **displaying a list of books**, **adding new books**, and **deleting books** from the Firestore database. It retrieves book data using Firebase and dynamically updates the list when books are added or removed.

### **Why Is It in the Pages Folder?**
This file belongs in `pages/` because:
- It represents a **full page** in the app rather than just a reusable UI element.
- It is tied to a **specific route** (`/books`), meaning it functions as a standalone screen.
- It combines logic for **fetching, adding, and deleting books**, making it different from smaller components like `BookForm.js`, which only handles form inputs.

### **How It Works:**
1️⃣ **Fetches book data from Firestore** using `useEffect()` and `getDocs()` when the page loads.  
2️⃣ **Displays a list of books** with Bootstrap styling (`list-group`, `btn-sm`, etc.).  
3️⃣ **Allows users to add books** using `BookForm`, which sends new entries to Firestore (`addDoc()`).  
4️⃣ **Handles book deletion** (`deleteDoc()`) and updates the state to remove deleted entries.  
5️⃣ **Navigates to the Book Details page** when clicking **View Details** (`useNavigate()`).  

### **Where Is It Used?**
- This page is accessed from the **main book list** at `/books`.
- When a user clicks on "Books" in the navigation menu, they land on this page.
- From here, they can **view details** or **delete books**.

 **It’s the core book management page.**

 <hr>

 ## **Home.js**
The `Home.js` file serves as the **landing page** of your book database application. When users visit the root URL (`/`), they are greeted with a welcoming message explaining the purpose of the app. 

### **Why Is It in the Pages Folder?**
This file is placed in `pages/` because it represents a **full-page view** rather than just a reusable UI component. Pages typically correspond to **routes** in the app, meaning they define distinct sections that users navigate between. In this case:
- `Home.js` is loaded when the user visits `/`.
- It introduces users to the app with a **title and description**.
- It applies **Bootstrap styling** (`container`, `text-primary`, `text-muted`, etc.) for a clean look.

<hr>

## **App.js**
`App.js` is the **main entry point** for your React app, responsible for managing routes and the overall structure of your pages. It defines the **navigation bar** and connects pages like **Home**, **BookList**, and **BookDetails** through `Routes`.

### **Why Is It in the Root Folder?**
- `App.js` acts as the **central hub** for rendering all pages.
- It's usually placed at the root (`src/`) because React applications need a **single source of truth** for routing and layout.
- It serves as the **top-level component**, wrapping the entire app.

### **Does It Have to Be in the Route?**
Yes, `App.js` typically needs to be within the **main routing structure** to manage navigation correctly. However, if you removed it from routing:
1. **Moving Routing to `index.js`**
   ```jsx
   import { BrowserRouter } from "react-router-dom";
   import App from "./App";

   ReactDOM.createRoot(document.getElementById("root")).render(
     <BrowserRouter>
       <App />
     </BrowserRouter>
   );
   ```
   - Here, routing is handled in `index.js`, and `App.js` **doesn't need `<Routes>`**.

2. **Without Routing, App.js Would Lose Navigation**
   - If `App.js` **didn't include `<Routes>`**, you'd have to manage page changes manually.
   - Without React Router, navigating between pages would require **full-page reloads**, instead of smooth client-side transitions.

### **What If It Wasn’t in the Root?**
If `App.js` was moved inside `pages/`:
- It would be treated as just another **individual page**, breaking its role as the main structure.
- Other components would need an additional wrapper for layout.
- A new parent component would need to handle **global navigation**.

### **Summary**
✅ `App.js` is best kept at the **root** of `src/` to manage the full application layout.  
✅ It **must include routing** (`Routes`) to allow navigation.  
✅ **If removed from the route**, navigation would require manual updates.  

<hr>

## **AddBook.js**

This **AddBook** page is a React component designed to allow users to add books to a Firebase Firestore database. Here’s how it works:

### **Key Functionalities**
1. **Routing Navigation (`useNavigate`)**  
   - It uses the `useNavigate` hook from `react-router-dom` to enable navigation.
   - After successfully adding a book, the user is redirected to the homepage (`"/"`).

2. **Adding a Book to Firebase (`addDoc`)**  
   - `handleAdd` is an asynchronous function that adds a new book entry to the `"books"` collection in Firestore.
   - If successful, a message is logged (`"Book added!"`), and the user is redirected.
   - Errors are caught and logged in case the operation fails.

3. **Rendering the Book Form (`BookForm`)**  
   - The `BookForm` component is rendered within the `AddBook` page.
   - The form collects user input and submits book data to `handleAdd`.

4. **Styling with Bootstrap**  
   - `bootstrap/dist/css/bootstrap.min.css` is imported for styling.
   - The page layout includes a **container**, **rounded borders**, and **shadow effects** to improve visual presentation.

5. **"Back to My Books" Button**  
   - The button allows users to return to the homepage (`"/"`) without adding a book.
   - Uses `onClick={() => navigate("/")}` to navigate back.

### **Workflow in Action**
1. User accesses the page.
2. Fills in book details through `BookForm`.
3. Clicks "Submit," triggering `handleAdd`.
4. `addDoc` stores the book data in Firestore.
5. User is redirected to the main book list (`"/"`).

<hr>

# Considerations 
- Handwritten notes and design sketches 
- Make a sitemap before you jump into code
- Create wire-frames
- ADA compliance





