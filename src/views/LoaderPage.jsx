import loaderGif from '../assets/img/loader.gif'

export function LoaderPage() {
    return (
        <main className='loader-page'>
            <img src={loaderGif} alt="" />
        </main>
    )
}