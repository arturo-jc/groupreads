import React, {Fragment} from 'react';
import screenshot from "./screenshot.jpg"
import footage from "./footage.gif"

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
                        <div className="col-50 pad">                        
                        <img className='screenshot' src={screenshot} alt="" />   
                        </div>
                        <div className="col-50 pad">
                            <div className="card extend">
                                <h3>Make a reading group</h3>
                                <p>GroupReads makes it eady to...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-two'>
            <div className='wrapper'>
                    <div className="row">
                        <div className="col-50 pad">
                            <div className="card app-description">
                                <h3>Make a reading group</h3>
                                <p>GroupReads makes it easy to create a group where you and your friends can keep track of all the books you read together.
                                </p>
                            </div>
                        </div>
                        <div className="col-50 pad">
                            <img src={footage} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Landing;