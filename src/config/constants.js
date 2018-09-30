exports.database = {
  address: process.env.DB_HOST || 'localhost',
  name: process.env.DB_NAME || 'shop',
  user: process.env.DB_USER || 'mateus',
  password: process.env.DB_PASSWORD,
};

exports.port = 5000;
