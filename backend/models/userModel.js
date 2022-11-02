const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Preencha o nome por favor"],
    },
    email: {
      type: String,
      required: [true, "Preencha o email por favor"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email Invalido",
      ],
    },
    password: {
      type: String,
      required: [true, "Preencha a password"],
      minLength: [6, "Password deve conter mais de 6 caracteres"],
      //   maxLength: [23, "Password deve conter menos de 23 caracteres"],
    },
    photo: {
      type: String,
      required: [true, "Por favor adicione uma foto"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "+351",
    },
    bio: {
      type: String,
      default: "bio",
      maxLength: [250, "Password não pode conter mais de 250 caracteres"],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
