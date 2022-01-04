import React, {Fragment} from 'react'

const Landing = () => {
    return (
        <Fragment>
            <section className='section-one'>
                <header className='header'>
                    <div className='wrapper header-wrapper'>
                        <h1 className='heading'>Join GroupReads</h1>
                        <h2 className='sub-heading'>Because reading is more fun with friends!</h2>
                    </div>
                </header>
                <div className='wrapper'>
                    <div className="row">
                        <div className="col-50">
                        <h3>Make a reading group</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel pellentesque eros. Donec aliquam non lectus quis sagittis.</p>
                        </div>
                        <div className="col-50">
                        <h3>Make a reading group</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel pellentesque eros. Donec aliquam non lectus quis sagittis.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-two'>
            <div className='wrapper'>
                    <div className="row">
                        <div className="col-50">
                        <h3>Make a reading group</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel pellentesque eros. Donec aliquam non lectus quis sagittis.</p>
                        </div>
                        <div className="col-50">
                        <h3>Make a reading group</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel pellentesque eros. Donec aliquam non lectus quis sagittis.</p>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Landing;