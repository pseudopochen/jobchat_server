# jobchat_server
The back-end of jobchat, which is a chatting app to connect job applicants with the hiring managers.

The front-end of jobchat is in a separate repository named "jobchat_client".

The back-end is built on top of Node, Express, Mongoose and Socket.io. 

It connects to a MongoDB Atlas server for storing and accessing two collections: "users" and "chats".

The "users" collection stores all user information and the corresponding Mongoose model, named "UserModel" in the code, handles CRUD.

The "chats" collection stores all chat messages between the applicant and the manager and the Mongoose model is named "ChatModel" in the code.

Real-time messaging is handled by socket.io. Every message emitted from server has the tag "serverToClient" and every message emitted by client has the tag "clientToServer".

At the current stage of implementation, the message emitted by the server is a broadcase to all connected clients.

The client-side code filters out messages that are not relevant to its current user.

All messages handled by socket.io are stored into the "chats" collection and flagged for their "read" status.

The client-side code will display the number of unread messages based on the "read" flag of each message the next time the user logs in.


