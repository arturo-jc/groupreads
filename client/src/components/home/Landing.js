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
                    <div className="row-reverse">
                        <div className="col-50 pad">                        
                        <img className='screenshot' src={screenshot} alt="" />   
                        </div>
                        <div className="col-50 pad">
                            <div className="card extend app-description">
                            <h3>Make a reading group</h3>
                                <p>GroupReads makes it easy to create a group where you and your friends can keep track of all the books you read together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
                    <section className='section-two'>
                        <div className="wrapper">
                            <div className="row">
                                <div className="col-30 pad">
                                    <div className="card extend feature-card">
                                        <i className="fas fa-book fa-4x"></i>
                                        <h3>Browse millions of books</h3>
                                    <p>GroupReads is powered by Google Books. If it exists, there is a good chance you'll find it here!</p>                            </div>
                                </div>
                                <div className="col-30 pad">
                                    <div className="card extend feature-card">
                                        <i className="fas fa-mobile-alt fa-4x"></i>
                                        <h3>Mobile friendly</h3>
                                        <p>Access your groups from anywhere with an internet connection!</p>
                                    </div>
                                </div>
                                <div className="col-30 pad">
                                    <div className="card extend feature-card">
                                    <i className="fas fa-wallet fa-4x"></i>
                                        <h3>Completely free</h3>
                                        <p>GroupReads is both free to use and free from ads!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                <section className='section-three'>
                    <div className="wrapper">
                    <div className="row">
                            <div className="col-50 pad">                        
                            <img className='screenshot' src={footage} alt="" />   
                            </div>
                            <div className="col-50 pad">
                                <div className="card extend app-description">
                                <h3>Stay on top of it</h3>
                                    <p>Keep track of your progress with a progress bar, bookmarks, posts, and more!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </Fragment>
    )
}

export default Landing;