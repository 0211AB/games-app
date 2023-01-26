const io = require('socket.io-client')
const URL = 'http://localhost:8080'

const socket = io.connect(URL)

socket.on('connect', () => {
    console.log('Successfully connected!');
});

var mySocketId
// register preliminary event listeners here:

socket.on("createNewGame", statusUpdate => {
    console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
})

export {
    socket,
    mySocketId
}