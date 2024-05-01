
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../Model/model');
const validator = require('validator');
const nodemailer = require('nodemailer');
const JWT_SECRET_KEY = 'nidhisahu';

// Function to generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); 
};
 // Function to send OTP via email
const sendOTPEmail = (email, otp) => {
    const getUserEmailFromDatabase = () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0].email); 
                    } else {
                        reject(new Error('User not found'));
                    }
                }
            });
        });
    };
         getUserEmailFromDatabase()
        .then((userEmail) => {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "sahunidhi706@gmail.com", 
                    pass: "bepf evvi kzxz mgvo"   
                }
            });

            const mailOptions = {
                from: userEmail,  
                to: email,
                subject: 'OTP for Login',
                text: `Your OTP for login is: ${otp}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending OTP email:', error);
                } else {
                    console.log('OTP email sent:', info.response);
                }
            });
        })
        .catch((error) => {
            console.error('Error fetching user email from database:', error);
        });
};
// Signup controller function
function signup(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email ' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters ' });
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        connection.query(sql, [username, email, hash], (error, results) => {
            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('User created successfully');
            res.status(201).json({ message: 'User signed up successfully' });
        });
    });
}

// Login controller function
function login(req, res) {
    const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
    
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], (error, results) => {
            if (error) {
                console.error('Error finding user:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            // Compare passwords
            const user = results[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (!result) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                 
                const otp = generateOTP();
                sendOTPEmail(email, otp);
               
                // // Generate token
                const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
    
                // // Send response 
                res.status(200).json({ token, message: 'User logged in successfully' });
     });
        });}
// Protected route
function protectedroute (req, res){
    const token = req.headers.authorization;
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json({ message: 'Protected route accessed successfully', user: decoded });
    });
};

module.exports = { signup, login ,protectedroute };
