
import express from 'express'
import expressFileupload from 'express-fileupload'
import { Worker } from 'worker_threads'
import { join } from 'path'


console.log(process.cwd())

const app = express()
const port = 3000 

app.use(expressFileupload({
  useTempFiles: true,
  tempFileDir: '../uploads',
  limits: {
    fileSize: 10 * 1024 * 1024
  },
}))

app.get('/', (req, res) => {
  
  const worker = new Worker(join(process.cwd(), 'src', 'worker.js'), {
    workerData: "./uploads",
  })

  worker.on('message', (data) => {
    res.send(data)
  })

  // worker.on('error', (data) => {
  //   res.send(data)
  // })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
