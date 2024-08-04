 SoundScape Central is an innovative platform designed to elevate
            your music presence by offering a dynamic and immersive experience
            for both creators and enthusiasts. Through visually captivating
            cards, users can effortlessly explore and engage with a diverse
            array of musical compositions, albums, playlists, and more. With its
            intuitive interface, customizable design options, and interactive
            elements, SoundScape Central redefines the way music is showcased
            and experienced online, fostering connections between artists and
            their audience in an exciting and dynamic digital
you can read the documentation here [Link Text](https://documenter.getpostman.com/view/29937654/2sA3rwNEzj#intro)
- ## Features
### Users:
- **Get Users**: Retrieve a list of all users.
- **Register User**: Register a new user in the system.
- **Login**: Authenticate a user and provide a token.
- **Get User By ID**: Retrieve a user's details using their ID.
- **Edit User**: Update user information.
- **Delete User**: Remove a user from the system.
- **Patch User's Business Status**: Update the business status of a user.
- **Login with Google**: Authenticate a user using their Google account.


### Cards:
- **Get Music Cards**: Retrieve a list of all cards.
- **Get User's Music Cards**: Retrieve a list of cards associated with a specific user.
- **Get Music Card By ID**: Retrieve details of a card using its ID.
- **Create Music Card**: Add a new card to the system.
- **Edit Music Card**: Update card information.
- **Like Music Card**: Like a specific card.
- **Delete Music Card**: Remove a card from the system.


- ## Authentication
The API uses JWT for authentication, with tokens containing properties for user roles (isBusiness, isAdmin) and user ID. Authorization middleware ensures appropriate permissions for protected endpoints. Additionally, there is a CORS policy that allows only approved IPs to send requests and a rate limiter that restricts requests to no more than 100 per second.
 
