import flexibleUrl from '../assets/img/flexible.jpg'
import portugalUrl from '../assets/img/portugal.png'
import ItalyUrl from '../assets/img/Italy.png'
import USUrl from '../assets/img/US.png'
import FranceUrl from '../assets/img/France.png'
import greeceUrl from '../assets/img/greece.png'

export function WhereSec({setSearchStay}) {
    return (
        <section className="where sec">
            <h4>Search by region</h4>
            <section className="popular-countries">
                <div>
                    <img src={flexibleUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: ""}))} />
                    <p>I’m flexible</p>
                </div>
                <div>
                    <img src={portugalUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "Portugal"}))}/>
                    <p>Portugal</p>
                </div>
                <div>
                    <img src={ItalyUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "Italy"}))} />
                    <p>Italy</p>
                </div>
                <div>
                    <img src={USUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "United State"}))} />
                    <p>United States</p>
                </div>
                <div>
                    <img src={FranceUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "France"}))} />
                    <p>France</p>
                </div>
                <div>
                    <img src={greeceUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "Greece"}))} />
                    <p>Greece</p>
                </div>

            </section>
        </section>
    )
}