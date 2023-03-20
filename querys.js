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

const addLike = async (id) => {
    const query = 'UPDATE posts SET likes = likes +1 WHERE id = $1'
    const values = [id]
    const result = await pool.query(query, values)
    console.log('Like agregado!')
    console.log(values)
}

const deletePost = async (id) => {
    const query = 'DELETE FROM posts WHERE id =$1'
    const values = [id]
    const result = await pool.query(query, values)
    console.log('Post Eliminado con exito! ')
}



module.exports = { addPost, getPost, addLike, deletePost }