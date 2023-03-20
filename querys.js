const { Pool } = require('pg')

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'likeme',
    allowExitOnIdle: true
});

const addPost = async (titulo, img, descripcion, likes) => {
    const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4)"
    const values = [titulo, img, descripcion, likes]
    const result = await pool.query(query, values)
    console.log("Post succesfully Added!")
}

const getPost = async () => {
    const { rows } = await pool.query("SELECT * from posts")
    console.log(rows)
    return rows
}


module.exports = { addPost, getPost }