const express = require('express')
const cors = require('cors')

const sequelize = require('./utility/database')
const Comment = require('./models/comment')


const app = express()


app.use(cors());
app.use(express.json())
let io

app.post('/api/login', (req, res) => {
    const { username } = req.body
    if (!username) {
        return res.status(400).json({ error: 'Username is required' })
    }
    const sessionId = `session-${Date.now()}`
    res.json({ sessionId })
})

app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({ })
        res.json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch comments' })
    }
})

app.post('/api/comments', async (req, res) => {
    const { username, comment } = req.body
    if (!username || !comment) {
        return res.status(400).json({ error: 'Username and comment are required' })
    }

    try {
        const newComment = await Comment.create({ username, comment })
        io.emit('new-comment', newComment)
        res.json(newComment,'something')
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to post comment' ,error})
    }
})

const PORT = 5000

sequelize.sync()
    .then(() => {
        console.log('Database synced')
        const server = app.listen(PORT, () => {
            console.log('Server is running on this PORT--', PORT)
        })
        io = require('socket.io')(server, {
            cors: {
                origin: '*'
            }
        })
    })


