const express = require('express');
const app = express()
const cors = require('cors')
const { getPost, addPost, addLike, deletePost } = require('./querys')
const port = process.env.port || 3000


app.use(express.json())
app.use(cors())

app.listen(port, console.log(`Server running at : ${port}`))

app.get('/', (req, res) => {
    try {
        res.sendFile(__dirname + '/index.html')
    } catch (error){
        res.json({ message: ' No disponible, intentalo luego!'})
    }
})

app.get ('/posts', async (req, res) => {
    try{
        const post = await getPost()
        let modificado = post.map((p) => ({
            id: p.id,
            titulo: p.titulo,
            img: p.img,
            descripcion: p.descripcion,
            likes: p.likes
        }))
        res.json(modificado)
    }catch(error){
        res.json({message: 'No disponible, intentalo luego!'})
    }
})

app.post('/posts', async (req, res) => {
    try{
        const likes = 0
        const { titulo, url, descripcion } = req.body
        console.log(req.body)

        await addPost(titulo, url, descripcion, likes)
        res.send('Post added succesfully!')
    }catch(error) {
        res.json({message: 'No disponible, intentalo luego!'})
    }
})

app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params
    try{
        await addLike(id)
        res.status(200).json({
            message: 'Like agregado correctamente'
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params
        await deletePost(id)
        res.status(200).json ({
            message:'Post eliminado con exito!'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})