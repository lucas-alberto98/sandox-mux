import { DataTypes, Model, Optional } from "sequelize";
import { db } from "./index";
import Course from "../models/Course";
import User from "./User";

interface VideoAttributes {
  id: number;
  title: string;
  description: string;
  permission?: string;
  mux_assets_id?: string;
  mux_upload_id: string;
  thumbnail?: string;
  total_time?: Number;
  owner_user_id?: Number;
  course_id?: Number;
}
export interface VideoCreationAttributes
  extends Optional<VideoAttributes, "id"> {}
interface VideoInstance
  extends Model<VideoAttributes, VideoCreationAttributes>,
    VideoAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const Video = db.sequelize.define<VideoInstance>(
  "Video",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    permission: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    mux_assets_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    mux_upload_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    thumbnail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    total_time: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "videos",
  }
);
Video.belongsTo(Course, { foreignKey: "course_id", as: "course" });
Video.belongsTo(User, { foreignKey: "owner_user_id", as: "owner" });

export default Video;
