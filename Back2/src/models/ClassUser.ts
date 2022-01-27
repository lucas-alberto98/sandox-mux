import { DataTypes, Model, Optional } from 'sequelize';
import { db } from './index';
import User from '../models/User';
import Class from '../models/Class';

interface ClassUserAttributes {
    id?: number;
    has_access: boolean;
    percentage_view?: boolean;
    date_finish_course?: Date;
    class_id?: Number;
    student_id?: Number;
}
export interface ClassUserCreationAttributes
    extends Optional<ClassUserAttributes, 'id'> {}

interface ClassUserInstance
    extends Model<ClassUserAttributes, ClassUserCreationAttributes>,
        ClassUserAttributes {
    student?: any;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

const ClassUser = db.sequelize.define<ClassUserInstance>(
    'ClassUser',
    {
        has_access: {
            allowNull: true,
            type: DataTypes.BOOLEAN
        },
        percentage_view: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        date_finish_course: {
            allowNull: true,
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'class_users'
    }
);

ClassUser.belongsTo(User, { foreignKey: 'student_id', as: 'student' });
ClassUser.belongsTo(Class, { foreignKey: 'class_id', as: 'class' });

export default ClassUser;
