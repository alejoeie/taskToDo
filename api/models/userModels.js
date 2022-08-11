const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must include a name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "You must provide a password."],
    minlength: [8, "Password must have at least 8 characters."],
    select: false,
  },
  confirmPwd: {
    type: String,
    required: [true, "You must confirm your password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match.",
    },
    select: false
  },
});

// Usamos pre para manejar la data antes de que entre a la base de datos.
userSchema.pre('save', async function(next) {
  // Solo se corre esta funcion si las contrasenas se modifican
  if (!this.isModified('password')) return next();

  // Hacer un hash al password con un cost de 12.
  this.password = await bcrypt.hash(this.password, 12); //12 refers to the number of years. CPU intensive
  //hash -> encryption
  this.passwordConfirm = undefined; // PAra validarlo, y antes de darle save, que se elimine, para que no se vea la otra contra.
  next();
})

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next) {
  // this points to the current query
  this.find({active: { $ne: false }})
  next();
})

// Instance method
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  // this.password // will not be available
  return await bcrypt.compare(candidatePassword, userPassword);
}

// Creamos un modelo y luego lo exportamos para que pueda ser llamado a otros archivos.
const User = mongoose.model("User", userSchema);
module.exports = User;
