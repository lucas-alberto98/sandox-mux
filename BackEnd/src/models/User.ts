import { DataTypes, Model, Optional } from 'sequelize';
import { db } from './index';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}
export interface userCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

interface UserInstance
    extends Model<UserAttributes, userCreationAttributes>,
        UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

const User = db.sequelize.define<UserInstance>(
    'User',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING
        },
        password: {
            allowNull: true,
            type: DataTypes.STRING
        },
        role: {
            allowNull: true,
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'users'
    }
);

export default User;
