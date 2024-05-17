export function checkState(board) {
    for (let i = 0; i < 3; i++) {
        if (board[i * 3] === board[i * 3 + 1] && board[i * 3 + 1] === board[i * 3 + 2] && board[i * 3] !== '') {
            return { result: `${board[i * 3]} wins`, winningIndices: [i * 3, i * 3 + 1, i * 3 + 2] }
        }
        if (board[i] === board[i + 3] && board[i + 3] === board[i + 6] && board[i] !== '') {
            return { result: `${board[i]} wins`, winningIndices: [i, i + 3, i + 6] }
        }
    }

    if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {
        return { result: `${board[0]} wins`, winningIndices: [0, 4, 8] }
    }
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {
        return { result: `${board[2]} wins`, winningIndices: [2, 4, 6] }
    }

    if (!board.includes('')) {
        return { result: 'It is a tie', winningIndices: [] }
    }

    let xCount = 0, oCount = 0;
    board.forEach(cell => {
        if (cell === 'X') xCount++;
        if (cell === 'O') oCount++;
    });

    return { result: xCount > oCount ? 'O to play' : 'X to play', winningIndices: [] }
}