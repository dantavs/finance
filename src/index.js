import { createServer } from 'node:http'

async function handler(request, response){
    response.end("Hello world!")
}

const app = createServer(handler)
.listen(3000, () => console.log('listening at 3000'))

export{app}