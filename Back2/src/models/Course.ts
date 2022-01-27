import { DataTypes, Model, Optional } from 'sequelize';
import { db } from './index';
import User from '../models/User';
import Class from './Class';

interface CourseAttributes {
    id: number;
    name: string;
    description: string;
    enable?: boolean;
    owner_user_id?: Number;
}
export interface CourseCreationAttributes
    extends Optional<CourseAttributes, 'id'> {}

interface CourseInstance
    extends Model<CourseAttributes, CourseCreationAttributes>,
        CourseAttributes {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

const Course = db.sequelize.define<CourseInstance>(
    'Course',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        enable: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'courses'
    }
);

Course.belongsTo(User, { foreignKey: 'owner_user_id', as: 'owner' });

export default Course;
