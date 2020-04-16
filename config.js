module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "NotaSecreta!",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "5O14pdJstL",
    password: process.env.MYSQL_PASS || "B3Yb3zyQrz",
    database: process.env.MYSQL_DB || "5O14pdJstL",
    port: "3306",
  },
  mysqlService: {
    host: process.env.MYSQ_SRV_HOST || "localhost",
    port: process.env.MYSQ_SRV_PORT || 3001,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
};
