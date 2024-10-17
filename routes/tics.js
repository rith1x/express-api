import express from 'express';
// import { readFileSync } from 'fs';
const router = express.Router();
const rooms ={};
class Room{
    #roomCode
    #playerCount
    #board
    #moves
    constructor(roomCode) {
        this.#roomCode = roomCode;
        this.#moves = 0
        this.#playerCount = 1;  // Default player count
        this.#board = [['', '', ''], ['', '', ''], ['', '', '']];  // Empty board
    }
    get roomCode(){
        return this.#roomCode
    }
    get playerCount(){
        return this.#playerCount
    }
    get moves(){
        return this.#moves
    }
    get board(){
        return this.#board
    }
    set roomCode(roomcode){
        this.#roomCode = roomcode
    }
    set playerCount(playercount){
        this.#playerCount = playercount
    }
    set board(board){
        this.#board = board
    }
    set moves(moves){
        this.#moves = moves
    }
}

function codeGen(){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
    let gen = ''
    while(gen.length != 6){
        gen+=chars[Math.floor(Math.random() * chars.length)]
    }
    return gen
}


router.get('/new',(req,res)=>{
    let rc = codeGen()
    rooms[rc] = new Room(rc)
    res.json({roomCode:rc,board:rooms[rc].board,role:"x"})
})

router.get('/join/:rc',(req,res)=>{
    let roomCode = req.params.rc
    if(rooms[roomCode]){
        let room = rooms[roomCode];
        if(room.playerCount === 1){
            room.playerCount = 2
            res.json({roomCode:roomCode,board:room.board,role:"o"})
        }else{
            res.json({msg:"Room is already full!"})
        }
    }else{
        res.json({msg:"Room doesn't exist"})
    }
})

router.get('/play/:rc/:r/:x/:y',(req,res)=>{
    // code | turn | x | y |
    let room = rooms[req.params.rc]
    if(room.playerCount == 2){
        if(room.board[req.params.x][req.params.y] === ''){
            room.board[req.params.x][req.params.y] = req.params.r

            res.json({board:room.board,moves:room.moves,win:getWinner(room.board)})
        }else{
            res.json({msg:"Invalid Move"})
        }

    }else{
        res.json({msg:"Room is not full!"})
    }

})

function getWinner(board) {
    for (let row = 0; row < 3; row++) {
        if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            return board[row][0]; // Return 'X' or 'O'
        }
    }
    for (let col = 0; col < 3; col++) {
        if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            return board[0][col]; // Return 'X' or 'O'
        }
    }
    if (
        board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2] ||
        board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]
    ) {
        return board[1][1]; // Return the winning symbol
    }
    return null; // No winner
}



export default router