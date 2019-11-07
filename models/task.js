'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    task_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customer_id: { type: DataTypes.INTEGER },
    personnel_id: { type: DataTypes.INTEGER },
    task_status_id: { type: DataTypes.INTEGER },
    created_by: { type: DataTypes.INTEGER },
    modified_by: { type: DataTypes.INTEGER },
    created: DataTypes.DATE,
    last_modified: { type: DataTypes.DATE, default: Date.now() },
    in_progress: { type: DataTypes.DATE },
    completed: { type: DataTypes.DATE },
    deferred: { type: DataTypes.DATE },
    inserted: { type: DataTypes.DATE },
    customer_first_name: { type: DataTypes.STRING, validate: { max: 100 }},
    customer_last_name: { type: DataTypes.STRING, validate: { max: 100 }},
    customer_city: { type: DataTypes.STRING, validate: { max: 100 }},
    customer_username: { type: DataTypes.STRING, validate: { max: 100 }},
    personnel_first_name: { type: DataTypes.STRING, validate: { max: 100 }},
    personnel_other_name: { type: DataTypes.STRING, validate: { max: 100 }},
    personnel_phone: { type: DataTypes.STRING, validate: { max: 50 }},
    task_status_name: { type: DataTypes.STRING, validate: { max: 50 }},
    customer_location: { type: DataTypes.STRING, validate: { max: 200 }},
    customer_gender: { type: DataTypes.STRING, validate: { max: 10 }},
    customer_age: { type: DataTypes.INTEGER },
    customer_access_code: { type: DataTypes.INTEGER },
    customer_splash_page: { type: DataTypes.INTEGER },
    customer_mpesa: { type: DataTypes.INTEGER },
    customer_autoplay: { type: DataTypes.INTEGER },
    customer_comments: { type: DataTypes.STRING },
    customer_updated: { type: DataTypes.DATE },
    customer_updated_by: { type: DataTypes.INTEGER },
    agentId: { type: DataTypes.INTEGER },
    customerId: { type: DataTypes.INTEGER },

  }, {
    timestamps: false,
    tableName: 'task'
  });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Personnel,{
      foreignKey: 'personnel_id'
    });
  };
  return Task;
};
