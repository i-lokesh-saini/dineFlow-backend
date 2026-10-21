const Staff = require("../../models/staff");
const jwt = require('jsonwebtoken');
require('dotenv').config();


// jwt token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}



module.exports.staffSignup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const userExist = await Staff.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already exists" });
        }


        const staff = await Staff.create({ name, email, password, role });
        const token = generateToken(staff._id, staff.role);


        res.status(201).json({
            id: staff._id,
            token: token,
            user: {
                name: staff.name,
                role: staff.role,
                email: staff.email,
            },
            message: "Staff created successfully",
        });

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "internal server error" })
    }
}


module.exports.staffLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const userExist = await Staff.findOne({ email })
        if (!userExist) {
            return res.status(404).json({ message: "user not found" })
        }

        const passwordMatch = await userExist.matchPassword(password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        const staff = await Staff.findOne({ email })

        const token = generateToken(staff._id, staff.role);

        res.status(200).json({
            id: staff._id,
            token: token,
            role: staff.role,
            message: "login successful",
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}