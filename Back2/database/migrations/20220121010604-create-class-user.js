module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("class_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      has_access: {
        type: Sequelize.BOOLEAN,
      },
      percentage_view: {
        type: Sequelize.INTEGER,
      },
      date_finish_course: {
        type: Sequelize.DATE,
      },
      student_id: {
        type: Sequelize.INTEGER,        
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      class_id: {
        type: Sequelize.INTEGER,        
        references: {
          model: {
            tableName: "classes",
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("class_users");
  },
};
