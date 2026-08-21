import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "u_id",
    },
    name: {
      type: DataTypes.STRING,
      field: "u_name",
      validate: {
        notEmpty: { msg: "enter the name please" },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      field: "u_email",
      validate: {
        isEmail: { msg: "enter a valid email format example@gmail.com" },
      },
    },
    password: {
      type: DataTypes.STRING,
      field: "u_password",
      validate: {
        notEmpty: { msg: "enter the name please" },
        checkPasswordLength(value) {
          if (value.length < 6) {
            throw new Error("password cannot be less than 6 characters", {
              cause: { status: 400 },
            });
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      field: "u_role",
    },
  },
  {
    hooks:{
      beforeCreate:(user)=>{
        const checkNameLength = ()=>{
          return user.name.length>2 ? 1 : 0;
        }
        let result = checkNameLength();
        if(!result)throw new Error ('name cannot be less than 3 characters', {
              cause: { status: 400 },
            });
      }
    },
    timestamps: true,
  },
);
