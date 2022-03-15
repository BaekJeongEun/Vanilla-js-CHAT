const express = require("express") // 필요한 express 라이브러리 담기, express 담으면 자동으로 node_modules를 보기 때문에 express 이름만 적어줘도 경로 없이 가져옴
const app = express(); // 실행한 것을 app에 담기
const path = require("path")

// socket을 사용할 땐 http를 통해 통신이 이루어져야 함
const http = require("http")
const server = http.createServer(app) // express가 http를 통해 실행될 수 있도록

// 설치한 socket.io 불러옴
const socketIO = require("socket.io")
const moment = require("moment")
const io = socketIO(server)

//console.log(__dirname) // 내가 가지고 있는 프로젝트 폴더를 가리킴
app.use(express.static(path.join(__dirname, "src"))) // join을 사용, 운영체제마다 다른 경로명을 위함
const PORT = process.env.PORT || 5000; // 포트가 지정되어 있으면 그것을 사용하고, 그게 아니라면 5000번 포트 사용


io.on("connection", (socket)=>{
    // js/chat.js에서 보내는 메세지 받기
    socket.on("chatting",(data)=>{
        // 받은 메세지 출력
        console.log(data)
        const{name, msg} = data;
        // 클라이언트에게 답장하기
        io.emit("chatting", {
            name:name,
            msg:msg,
            time : moment(new Date()).format("h:mm A")
        })
    })
})

// 서버 실행 명령어 (포트, 명령)
server.listen(PORT, ()=> console.log(`server is running ${PORT}`))


// nodemon 설치하여 js 파일의 변경 생길 때마다 서버 재실행 , npm install -g nodemon  -g는 global로 어느 프로젝트에서도 반영되게끔