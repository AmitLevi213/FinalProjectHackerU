 SoundScape Central is an innovative platform designed to elevate your music presence by offering a dynamic and immersive experience for both creators and enthusiasts. Through visually captivating cards, users can effortlessly explore and engage with a diverse array of musical compositions, albums, playlists, and more. With its intuitive interface, customizable design options, and interactive elements, SoundScape Central redefines the way music is showcased and experienced online, fostering connections between artists and their audience in an exciting and dynamic digital environment.
you can read the documentation here [Link Text](https://documenter.getpostman.com/view/29937654/2sA3rwNEzj#intro)
Live Demo :[Link Text](https://mp3-storage-58830.web.app/)
- ## Features
Authentication & Authorization
- **Local Authentication**: Email and password-based registration and login
- **Google Authentication**: Sign in with Google using Firebase Authentication
- **JWT Token**: Secure token-based authentication for API requests
-**Role-Based Access**: Different permissions for regular users, business users, and admins
### Users:
- **Get Users**: Retrieve a list of all users.
- **Register User**: Register a new user in the system.
- **Login**: Authenticate a user and provide a token.
- **Get User By ID**: Retrieve a user's details using their ID.
- **Edit User**: Update user information.
- **Delete User**: Remove a user from the system.
- **Patch User's Business Status**: Update the business status of a user.


### Cards:
- **Get Music Cards**: Retrieve a list of all cards.
- **Get User's Music Cards**: Retrieve a list of cards associated with a specific user.
- **Get Music Card By ID**: Retrieve details of a card using its ID.
- **Create Music Card**: Add a new card to the system.
- **Edit Music Card**: Update card information.
- **Like Music Card**: Like a specific card.
- **Delete Music Card**: Remove a card from the system.

- ## Technology Stack
- ### Frontend
- **React.js**
- **Material-UI**
- **Firebase Hosting**
- **Firebase Authentication**

- ### Backend
- **Node.js & Express**
- **MongoDB Atlas**
- **AWS EC2 for deployment**
- **JWT for authentication**

 ## SERVER
### Installation
1. Clone the repo:
```
git clone <repository-url>
```
2. Install dependencies:
```
npm install
```
3. Run the server locally:
```
npm run dev
```
4. Run the server on mongodb atlas:
```
npm run start
```
## CLIENT
1. Install dependencies:
```
npm install
```
2. Run the client side:
```
npm start
```
#### I am adding here the list of users and their passwords to make it easier to use
#### If you don't want to, you can sign up and build your user:
```
admin@gmail.com       Aa1234!
bussiness@gmail.com   Aa1234!
regular@gmail.com     Aa1234!

```


 ### Environment Configuration
Make sure to set up your environment variables:
- # Server (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=9191
```
 # Client (.env)
```
REACT_APP_API_URL=your_backend_url
```
 # Contributing
Feel free to submit issues and enhancement requests!

# License
MIT
