import { DataTypes, Model, Optional } from 'sequelize';
import { db } from './index';
import Course from './Course';

interface ClassAttributes {
    id: number;
    status?: string;
    start?: Date;
    finish?: Date;
    course_id?: Number;
    name: string;
}
export interface classCreationAttributes
    extends Optional<ClassAttributes, 'id'> {}

interface ClassInstance
    extends Model<ClassAttributes, classCreationAttributes>,
        ClassAttributes {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

const Class = db.sequelize.define<ClassInstance>(
    'Class',
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
        status: {
            allowNull: true,
            type: DataTypes.STRING
        },
        start: {
            allowNull: true,
            type: DataTypes.DATE
        },
        finish: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'classes'
    }
);

Class.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

export default Class;
