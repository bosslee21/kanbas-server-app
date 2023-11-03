//if the app get respond then we can send the message to the client 
// app.get("/", (req, res) => { is the route
// restart server when we make the change
// express library pass req,res object to the callback function.
// req : coming from the client , res: going back to the client
function HelloRoutes(app) {


    // each "/" is a route so page will render when we go to "localhost:4000/{whatever}
    app.get("/", (req, res) => {
        res.send("Hello World");
    });
    app.get("/hello", (req, res) => {
        res.send("Hello is sent back as url");
    });
}
export default HelloRoutes;
// /hello listen from the client and send back the message it will
// res.send("Hello is sent back as url"); is the response
