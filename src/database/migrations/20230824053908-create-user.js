module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      user_name:  {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      email:  {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      bio:  {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      created_at: {
        type:Sequelize.DATE,
        allowNull:false,
      },
      updated_at: {
        type:Sequelize.DATE,
        allowNull:false,
      },
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
