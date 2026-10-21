const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Kitchen', 'Cashier', 'Waiter'],
        required: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true }

)

staffSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

staffSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model('Staff', staffSchema)