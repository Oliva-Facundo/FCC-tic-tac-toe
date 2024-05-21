import { Square } from './Square'

const Board = ({ board, updateBoard }) => {
  return (
    board.map((_, i) => (
      <Square key={i} index={i} updateBoard={updateBoard}>
        {board[i]}
      </Square>
    ))
  )
}

export default Board