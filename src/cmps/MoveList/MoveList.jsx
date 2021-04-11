import './MoveList.scss'
import moment from 'moment'
export function MoveList(props) {
    const { moves, isHome } = props
    function getFormattedTime(time) {
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }
    return (
        <div className='move-list'>
            <ul className={isHome ? 'homepage' : 'details'}>
                {isHome && <h1>Your last 3 transactions</h1>}
                {moves.map((move, idx) => <li className='move-preview' key={idx}>
                    {isHome && <p><span>To:</span> {move.to}</p>}
                    <p><span>At:</span> {getFormattedTime(move.at)}</p>
                    <p><span>Amount:</span> {move.amount} BTC</p>
                    <hr />
                </li>)}
            </ul>
        </div>
    )
}
