const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();


const PORT =  process.env.PORT;
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true, limit: '20mb' }));  // Increase limit to 10MB for URL-encoded bodies
app.use(express.json({ limit: '20mb' }));  // Increase limit to 10MB for JSON bodies

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));





mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));



// Import routes
const landingRoutes = require('./routes/landing');
const Users_Login_Route = require('./routes/user-login');
const Users_Logout_Route = require('./routes/logout');
const Users_Register_Route = require('./routes/user-register');
const Users_Main_Route = require('./routes/user-main');



app.use('/', landingRoutes); 
app.use('/login', Users_Login_Route); 
app.use('/logout', Users_Logout_Route); 
app.use('/register', Users_Register_Route); 
app.use('/main', Users_Main_Route); 


// Employees
const Employees_Route = require('./routes/employees');
const Managers_Route = require('./routes/managers');


app.use('/employees', Employees_Route); 
app.use('/managers', Managers_Route); 




// // Test Create Najem Reports
// const Najem = require('./models/Najem');
// app.get('/test', async (req, res) => {
//     try {
//         // Create a test Najem report
//         const testNajem = new Najem({
//             accident_id: 12345679,
//             damage_info: ['front', 'rear-right'], 
//             description: "Test report for front and rear-right damages.",
//             images: ['base64_image_1', 'base64_image_2'], 
//         });

//         // Save to the database
//         const savedNajem = await testNajem.save();

//         // Send success response
//         return res.status(200).json({
//             message: 'Test Najem report created successfully!',
//             data: savedNajem,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Error creating test Najem report.',
//             error: error.message,
//         });
//     }
// });




// Handle 404
app.use((req, res) => {
    res.status(404).render("Not-Found");
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
