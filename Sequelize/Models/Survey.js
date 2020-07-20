module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define('survey', {
        code: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        secondName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        othersName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        secondLastName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        marriedSurName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        dpi: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nit: {
            type: Sequelize.STRING,
            allowNull: true
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        collegiate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telephone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dpiFile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        passportFile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        collegiateFile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        affidavitFile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        applicationLetterFile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        attachedFormFile: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });
    return Stock;
}
