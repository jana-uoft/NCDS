module.exports = {
  apps : [{
    name: "${name}",
    script: "./dist/server.js",
    env: {
      NODE_ENV: "${NODE_ENV}",
      cloudinary_name: "${cloudinary_name}",
      cloudinary_api_key: "${cloudinary_api_key}",
      cloudinary_api_secret: "${cloudinary_api_secret}",
      admin_email_user: "${admin_email_user}",
      admin_email_pass: "${admin_email_pass}",
      JWT_SECRET: "${JWT_SECRET}",
      MONGO_DB: "${MONGO_DB}",
      API_PORT: "${API_PORT}",
      REACT_APP_API_URL: "${REACT_APP_API_URL}"
    }
  }]
}