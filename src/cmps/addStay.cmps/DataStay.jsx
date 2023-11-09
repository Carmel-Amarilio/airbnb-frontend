import ReportIcon from '@mui/icons-material/Report';
import { useEffect } from 'react';

export function DataStay({ name, summary, price, setStay, setIsNext }) {

    useEffect(() => {
        if (name.length > 32 || name.length < 2 || summary.length > 500 || summary.length < 2 || price < 0) setIsNext(false)
        else setIsNext(true)
    }, [name, summary, price])

    if (price < 0) setStay("price", 0)

    function handleSearch(key, { target }) {
        let val = target.value
        setStay(key, val)
    }

    return (
        <section className="data-stay flex column">
            <article className=" title">
                <h3>Now, let's give your house a title</h3>
                <p>Short titles work best. Have fun with it—you can always change it later.</p>
                <textarea onChange={(ev) => handleSearch("name", ev)} value={name} type="text" />
                <p>{name.length}/32</p>
                {name.length > 32 && <p className="max-char flex align-center"><ReportIcon /> The maximum number of characters allowed is 32.</p>}
            </article>

            <article className=" summary">
                <h3>Create your description</h3>
                <p>Share what makes your place special.</p>
                <textarea onChange={(ev) => handleSearch("summary", ev)} value={summary} type="text" />
                <p>{summary.length}/500</p>
                {summary.length > 500 && <p className="max-char flex align-center"><ReportIcon /> The maximum number of characters allowed is 500.</p>}
            </article>
            <article className=' flex column'>
                <h3>set your price</h3>
                <p>You can change it anytime.</p>
                <div className='price'>
                    <label htmlFor="">₪</label>
                    <input onChange={(ev) => handleSearch("price", ev)} value={price} type="number" />
                </div>

            </article>

        </section>
    )
}