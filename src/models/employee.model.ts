import { DataTypes } from "sequelize";
import { sequelize } from "@/database/db";
import { id } from "zod/locales";

export const employeeModel = sequelize.define(
    "employee",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
             allowNull: false,
        },
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employeeEmail: {
            type: DataTypes.STRING,
        },
        Designation: {
            type: DataTypes.STRING,
        },
         Status : {
            type: DataTypes.BOOLEAN,
             defaultValue: true,
         },
        Experience : {
            type: DataTypes.INTEGER,
        },
        Rating : {
            type: DataTypes.FLOAT,
        },
        employeeImg : {
            type: DataTypes.STRING,
            defaultValue : 'https://icon-library.com/images/employee-icon-png/employee-icon-png-29.jpg',
        },
        employeeMobileNo: {
            type: DataTypes.STRING,
        },
        linkedInUrl: {
            type: DataTypes.STRING,
        },
        twitterUrl: {
            type: DataTypes.STRING,
        }
        

    },
    { tableName: "employee", freezeTableName: true, }
);

// await employeeModel.sync({ alter: true });