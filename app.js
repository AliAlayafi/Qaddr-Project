const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));




// Import routes
const landingRoutes = require('./routes/landing');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');



app.use('/', landingRoutes); 
app.use('/login', loginRoutes); 
app.use('/register', registerRoutes); 



// Handle 404
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});












const PORT =  process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
