export default function GameOver({ winner,restart }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner && <p>{winner} has won! </p>}
            {!winner && <p>{winner} has draw! </p>}
            <p><button  onClick={restart}>Rematch</button></p>
        </div>
    )
}