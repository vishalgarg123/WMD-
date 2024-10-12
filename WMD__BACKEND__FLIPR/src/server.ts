import app from "./app"

// Define the port number on which the server will listen
const port = 3000; 

// Start the server and listen for incoming requests on the specified port
app.listen(port, () => {
  // Log a message to the console when the server is running
  console.log(`Server is running on My Home port:${port}`); 
});
