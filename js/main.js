//Models
var board = []

//loop to create board array of 30 arrays of 30 empty strings
for(var i = 0; i < 40; i++) {
        var row = []
    for(var x = 0; x < 40; x++) {
        row.push('')
   }
    board.push(row)
}

//loop to make walls
for(var i = 0; i < board.length; i++) {
    board[0][i] = '-'
    board[39][i] = '-'
    board[i][0] = '-'
    board[i][39] = '-'
}


//draw
function draw() {
    var $board = $('.board')
    //40 rows
    for(var i = 0; i < board.length; i++) {
        $board.append('<div class="row"></div>')
    }
    //40 squares each row
    for(var x = 0; x < 40; x++) {
        var $row = $('.row')
        $row.append('<div class = "unit"></div>')
    } 

}

draw()

function hideStartScreen () {
    $startScreen = $('#start-screen')
    
    $startScreen.css('display', 'none')
    $('.board').css('top', '80px')

}





