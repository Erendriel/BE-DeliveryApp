const db = require("../config/config");
const bcrypt = require("bcryptjs");

const User = {};
User.findByEmail = (email, result) => {
  const sql = `
      SELECT
          id,
          email,
          name,
          lastName,
          image,
          password
      FROM
          users
      WHERE
          email = ?
      `;

  db.query(sql, [email], (err, user) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("User: ", user[0]);
      result(null, user[0]);
    }
  });
};

User.findById = (id, result) => {
  const sql = `
    SELECT
        id,
        email,
        name,
        lastName,
        image,
        password
    FROM
        users
    WHERE
        id = ?
    `;

  db.query(sql, [id], (err, user) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
    } else {
      console.log("User: ", user);
      result(null, user);
    }
  });
};

User.create = async (user, result) => {
  const hash = await bcrypt.hash(user.password, 10);
  const sql = `
    INSERT INTO 
        users(
            email,
            name,
            lastName,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?,?,?,?,?)
    `;
  db.query(
    sql,
    [
      user.email,
      user.name,
      user.lastName,
      user.phone,
      user.image,
      hash,
      new Date(),
      new Date(),
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        console.log("New User ID: ", res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = User;
