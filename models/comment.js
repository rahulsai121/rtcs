const Sequelize=require('sequelize')
const sequelize=require('../utility/database')

const Comment=sequelize.define('comments',{
    username:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    comment:{
      type:Sequelize.TEXT,
      allowNull:false,
    },
  })
  
  module.exports=Comment;