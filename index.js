import app from "./app.js";
// The MongoDB API is the application's primary local backend.
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
