import { Sparklines,SparklinesLine } from 'react-sparklines';
import './Chart.scss'
export function Chart({data}) {
        return (
            <div className="chart">
                {data &&<Sparklines data={data}  width={400} height={100} margin={10}>
                <SparklinesLine color="#ED3C5E" />
                </Sparklines>}

            </div>
        )
}
