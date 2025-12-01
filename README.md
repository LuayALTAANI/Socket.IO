# Socket.IO Realtime Demo

This repository is a simple **client–server demo using Socket.IO** to show how real-time, bidirectional communication works between a browser and a Node.js backend.

It’s a good starting point if you’re learning Socket.IO or want a minimal example to build on.

---

## Features

- Real-time communication over WebSockets (via Socket.IO)
- Separation of **client** and **server** code
- Simple, easily extendable structure for small demos or tutorials

---

## Project Structure

├── client/     # Front-end (REACT) using the Socket.IO client
├── server/     # Back-end (Node.js) using the Socket.IO server


client/
Contains the browser code – typically:

An index.html page

A small JS file that connects to the Socket.IO server

Optional CSS for styling

server/
Contains the Node.js server – typically:

An entry point (e.g. index.js or server.js)

Socket.IO setup to handle client connections and events

If you rename or restructure files, be sure to update the paths and script references accordingly.

 Getting Started
1. Clone the repository
git clone https://github.com/LuayALTAANI/Socket.IO.git
cd Socket.IO

2. Install server dependencies

From the server folder:

cd server
npm install


If there is no package.json yet, create one with npm init -y and install Socket.IO and Express (or your preferred HTTP framework):

npm install express socket.io

3. Run the server

Still inside server/:

nodemon index.js


 Running the Client

From the client folder:

npm install

# from the client/ directory

nodemon


Then open the URL shown in the terminal (often http://localhost:3000).
