import flexibleUrl from '../assets/img/flexible.jpg'
import MiddleEastUrl from '../assets/img/MiddleEast.png'
import ItalyUrl from '../assets/img/Italy.png'
import USUrl from '../assets/img/US.png'
import FranceUrl from '../assets/img/France.png'
import SouthAmericaUrl from '../assets/img/SouthAmerica.png'

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
                    <img src={MiddleEastUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "Middle East"}))}/>
                    <p>Middle East</p>
                </div>
                <div>
                    <img src={ItalyUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "Italy"}))} />
                    <p>Italy</p>
                </div>
                <div>
                    <img src={USUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "United States"}))} />
                    <p>United States</p>
                </div>
                <div>
                    <img src={FranceUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "France"}))} />
                    <p>France</p>
                </div>
                <div>
                    <img src={SouthAmericaUrl} onClick={()=> setSearchStay(prev => ({...prev, destinations: "South America"}))} />
                    <p>South America</p>
                </div>

            </section>
        </section>
    )
}