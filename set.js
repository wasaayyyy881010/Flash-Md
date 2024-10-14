const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVBRNWdtWktJTytaYzBQK2ROWldyZm9ML2w2ZjJNd0dGakFvQ3lWK2dsdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSlBQYjgvUnFxY284WEUrMVNmbnFnWkJoenFiOUlobVhwUVd1ajhxa3RVUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRWtJWkFUK1BldUVGQ0VyRDM2OGJSZ3Q2L25mYmcyRk5oUTI5K25oTW40PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxdDFxUGszMFVCMEtxTTdleDJ3RTNoeWJqU2xKVWh0czNhdTV2MzBGYW5VPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9QVnp5dTVhZHNEK2Q0Qm1sS0pvRFBWMUd2VUdYZTh3MHNDRENxejZuSFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkI3cC9Lb2ZsK0NyL0NlVE56RmNRK3ptVWU5SGN0NEQyd3owNlNENFNpbGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUUzbEpqNGFuS2toczhyUFE5bUdBQzQ2RHUra1BNTkdtVlJ3RHNaU1JVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGdNU2VFYlB6aDRZY00xcktIK2FER0lWcHZtbGJFY1JMcEpRWCtEZ1dsQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImF3L2lGTndDcGpYaVF3Y0hUcmFQOWZJSWN1MUgrMGRQYWxEQXBUNUY3V1ZqZGFaMXI2dHg3UnFGczFTaEdSZng4UnFyWHcycnBJbUVZM2RGQmZuU0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY1LCJhZHZTZWNyZXRLZXkiOiJ1VGR5R0hOb0ZGeklIM01Hc2pReXpadmZBVW4zOEJmblJINkQ3YkhJOWNBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4T2k1ZXJrSFRXLXBqTm5CaDFOZjV3IiwicGhvbmVJZCI6Ijg2NzVhMDY2LTJjNjEtNGNmYi1hZjQ3LWZmNzI2NDUzZTNkMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIycktYNG9DVzlvM0JPbnViR3VSc016WU9sazA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHU3SGtSUGI5bFlrQUZFU25uZXVYUlhxRFJZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilc5VEwxQkFYIiwibWUiOnsiaWQiOiI5MjMxNzEwMTE4ODI6NzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lDR210OERFT1NJdHJnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhxV3hMY2ZjNXN0SGp6NksvWUxkUE1Id3puY2JyMmRwVHdnZUoxV0tJUTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjYzNjF4RXlPa1ZqdHg4UlowVVNqc1NoS2llSllnaEd3NGo4a0E5eHpaNjJpZlZCa29LSE51SEpLdzZjZXR6U21aUndrM0d4eGIxUysyQXpzRXZFcUF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUblRQK1k0MVZvdU8wcWRyekRaYmRQM2RYN0FpeVJLb3V6MzdTU01pelFHb3ByRWl6bk5yeGk4RWZGeUpGdllWN2M1OGpSdGNvaU5XRTdOZWx2RC9CZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzE3MTAxMTg4Mjo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjYWxzUzNIM09iTFI0OCtpdjJDM1R6QjhNNTNHNjluYVU4SUhpZFZpaUVOIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI4OTM5MTIxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxaNSJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
