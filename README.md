# My TypeScript Node.js Project

This is a TypeScript with Node.js project that demonstrates the use of OOP concepts and includes two main resources: users and posts. The project also uses the Helmet and Compression packages for security and performance optimization.

## Getting Started

To get started, clone this repository and install the dependencies:
```
git clone git@github.com:Omar3ain/nodejs-api-Typescript.git
npm install
```

## Running the Project

To run the project, use the following command:
```
npm start
```

This will start the Node.js server and serve the application on http://localhost:3000.

## Resources

### Users

The `users` resource allows users to register, login, and manage their accounts. User passwords are hashed using the bcrypt package for security. Authentication is done using JSON Web Tokens (JWT) for user authorization.

### Posts

The `posts` resource allows users to create, read, update, and delete posts. Users must be authenticated with a valid JWT to perform any actions on posts.

## Packages

### Helmet

The Helmet package is used to enhance the security of the application by setting various HTTP headers. By default, Helmet sets the following headers:

- `X-DNS-Prefetch-Control`: sets the DNS prefetch control header to prevent DNS prefetching
- `X-Frame-Options`: sets the X-Frame-Options header to prevent clickjacking attacks
- `Strict-Transport-Security`: sets the Strict-Transport-Security header to enforce HTTPS
- `X-Content-Type-Options`: sets the X-Content-Type-Options header to prevent MIME type sniffing
- `X-XSS-Protection`: sets the X-XSS-Protection header to enable the XSS protection filter

### Compression

The Compression package is used to improve the performance of the application by compressing the response data before sending it to the client. This reduces the amount of data that needs to be transmitted over the network, resulting in faster page load times.

## OOP Concepts

This project uses the following OOP concepts:

### Classes

Classes are used to define objects with properties and methods. In this project, I define a `PostController` class and a `UserController` class. The `Post` and `User` classes implements the `Controller` interface.

### Encapsulation

Encapsulation is used to hide the implementation details of a class from the outside world. In this project, we use private and protected access modifiers to control access to the properties and methods of the `PostController` and `UserController` classes.

## Conclusion

This project demonstrates the use of TypeScript with Node.js and OOP concepts. By using classes, inheritance, and encapsulation, we can create more modular, reusable, and maintainable code. The `users` and `posts` resources demonstrate the use of JWT and bcrypt for secure user authentication and authorization. The use of the Helmet and Compression packages improves the security and performance of the application.

I hope this README file helps you understand the concepts and resources used in this project. If you have any questions or feedback, please let me know.

Thank you for checking out my TypeScript with Node.js project!
