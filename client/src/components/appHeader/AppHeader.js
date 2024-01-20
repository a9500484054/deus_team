import {useEffect, useState,} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import './appHeader.scss';
import btn from '../../img/discuss-btn.png';
import RetryImage from "../../helpers/RetryImage";
import {Icon} from "../icon/Icon";
import DelayedLink, {DelayedNavLink} from "./DelayedLink";
import {setIsLoadingMainPageEvent} from "../../axios";
import {gotoAnchor} from "../anchors";


const apiUrl = ''

const AppHeader = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [prevScroll, setPrevScroll] = useState(0);
    const [lastShowPos, setLastShowPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [visibleDesktop, setVisibleDesktop] = useState(true);
    const location = useLocation()

    useEffect(() => {
        const defaultColor = [
            /^\/$/,
            /^\/contacts$/,
            /^\/news$/,
            /^\/login$/,
            /^\/services\/.*$/,
            /^\/projects\/.*$/
        ];
        let header = document.querySelector('.header')
        let headerMob = document.querySelector('.headerMob')

        if (!!header) {
            if (defaultColor.some(pattern => pattern.test(location.pathname))) {
                header.classList.remove('white');

            } else {
                header.classList.add('white');

            }
        }

    }, [isLoading, location])

    useEffect(() => {
        const handleScroll = () => {
            let header = document.querySelector('.header')
            let headerMob = document.querySelector('.headerMob')
            let whiteHeaders = document.querySelectorAll('.whiteHeader')
            let menu = document.querySelector('.activeMenu')


            const find = Array.from(whiteHeaders).find((whiteHeader) => {
                return !!headerMob?
                    window.scrollY + window.innerHeight >= whiteHeader.offsetTop && window.scrollY + window.innerHeight <= (whiteHeader.offsetHeight + whiteHeader.offsetTop)
                    :
                    window.scrollY >= whiteHeader.offsetTop && window.scrollY <= (whiteHeader.offsetHeight + whiteHeader.offsetTop)
            })


            if (!!headerMob) {
                if (!!find && !menu) {
                    const offsetBot = find.offsetHeight + find.offsetTop
                    if (headerMob.offsetTop < offsetBot) {
                        headerMob.classList.add('white');
                    } else {
                        headerMob.classList.remove('white');
                    }
                } else if (Array.from(whiteHeaders).length > 1) {
                    headerMob.classList.remove('white');
                }
            } else if (!!header) {
                if (!!find && !menu) {

                    if (window.scrollY >= find.offsetTop) {
                        header.classList.add('white');
                        headerMob.classList.add('white');
                    } else {
                        header.classList.remove('white');
                        headerMob.classList.remove('white');
                    }
                    if (window.scrollY > find.offsetTop + find.offsetHeight) {
                        header.classList.remove('white');
                        headerMob.classList.remove('white');
                    }
                } else if (Array.from(whiteHeaders).length > 0) {
                    header.classList.remove('white');
                    headerMob.classList.remove('white');
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;

            if (scrolled > 0 && scrolled > prevScroll) {
                setVisible(false);
                setLastShowPos(scrolled);
            } else if (scrolled <= Math.max(lastShowPos - 100, 0)) {
                setVisible(true);
            }
            setPrevScroll(scrolled);

        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScroll, lastShowPos]);

    useEffect(()=>{
        const hiddenHeader = () => {
            const scrollMob = window.scrollY;
            if (window.innerWidth <= 767) {
                console.log("mob", scrollMob)
                if (scrollMob < 40) {
                    setVisibleDesktop(true);
                } else {
                    setVisibleDesktop(false);
                }
            }
        }

        window.addEventListener('scroll', hiddenHeader);
        return () => {
            window.removeEventListener('scroll', hiddenHeader);
        };
    },)

    useEffect(() => {
        setIsLoadingMainPageEvent(true)

        const handleLoad = (e) => {
            if (e.detail.isLoading !== isLoading) {
                setIsLoading(e.detail.isLoading);
            }
        };

        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/contacts#contactUs');
    };


    const [menu, setMenu] = useState(false);
    const {headerData} = props;

    return (
        <>
            {!isLoading && headerData &&
                <>
                    <header className={`header ${visibleDesktop ? "activeScroll": "hiddenScroll"} ${menu ? 'hidden-mobile' : ''} `}>
                        <div className="container">
                            <div className="header__wrap">
                                <DelayedLink to="/" className='header__logo'>
                                    <Icon icon="headerLogo" viewBox="0"/>
                                </DelayedLink>
                                <nav className={`header__nav ${visible ? '' : 'hidden'}`}>
                                    <ul className="header__nav-list">
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/projects">
                                                <span data-hover="Проекты">Проекты</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/services">
                                                <span data-hover="Услуги">Услуги</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/agency">
                                                <span data-hover="Агентство">Агентство</span>
                                            </DelayedNavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <DelayedNavLink to="/contacts">
                                                <span data-hover="Контакты">Контакты</span>
                                            </DelayedNavLink>
                                        </li>
                                    </ul>
                                </nav>

                                {headerData && headerData.phone ?
                                    (
                                        <div
                                            className={`header__contacts hover-flip hidden-mobile ${visible ? '' : 'hidden'}`}>
                                            {/*<Link to={`mailto:${headerData.email}`}*/}
                                            {/*      className="header__contacts-link">{headerData.email}</Link>*/}
                                            <Link to={`tel:${headerData.phone}`}
                                                  className="header__contacts-link">
                                                <span data-hover={headerData.phone}> {headerData.phone}</span>
                                            </Link>
                                        </div>
                                    ) :
                                    (
                                        <div
                                            className={`header__contacts hover-flip hidden-mobile ${visible ? '' : 'hidden'}`}>
                                            {/*<Link to="mailto:hello@de-us.ru"*/}
                                            {/*      className="header__contacts-link">hello@de-us.ru</Link>*/}
                                            <Link to="tel:+74951034351" className="header__contacts-link">
                                                <span data-hover="+7 (495) 103—4351 ">+7 (495) 103—4351 </span></Link>
                                        </div>
                                    )
                                }


                                {/* <div onClick={handleClick} className="header__discuss hidden-mobile">
                            <img src={btn} alt="Обсудить проект" className="header__discuss-img" />
                            <div className="header__discuss-text">Обсудить проект</div>
                        </div> */}
                                <DelayedLink to="/contacts" className="header__discuss hidden-mobile"
                                             datahash="contactUs"
                                             onClick={(e) => gotoAnchor(e)}>
                                    {
                                        headerData.headerPhoto ?
                                            (
                                                <RetryImage datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                            src={`${apiUrl}/uploads/${headerData.headerPhoto.filename}`}
                                                            alt="Обсудить проект" className="header__discuss-img"/>
                                            ) : (
                                                <img datahash="contactUs" onClick={(e) => gotoAnchor(e)} src={btn}
                                                     alt="Обсудить проект" className="header__discuss-img"/>
                                            )
                                    }
                                    <div datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                         className="header__discuss-text">Обсудить проект
                                    </div>
                                </DelayedLink>

                                <div className={`header__burger hidden-desktop ${menu ? 'activeMenu active' : ''}`}
                                     onClick={() => setMenu(!menu)}>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <header className={`headerMob hidden-desktop ${visibleDesktop ? "hiddenScroll": "activeScroll"}`}>
                        <div className="">
                            <div className="headerMob__wrap">
                                <DelayedLink to="/" className='headerMob__logo'>
                                    <Icon icon="headerLogo" viewBox="0"/>
                                </DelayedLink>

                                <div className={`header__burger hidden-desktop ${menu ? 'activeMenu active' : ''}`}
                                     onClick={() => setMenu(!menu)}>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={`header__menu ${menu ? 'activeMenu active' : ''}`}>
                        <div className="header__menu-wrap">

                            <div className="">
                                <div style={{display: "flex", flexWrap: "wrap"}}>
                                    <DelayedLink to="/" className='header__logo'>
                                        <Icon icon="headerLogo" viewBox="0"/>
                                    </DelayedLink>

                                    <div
                                        className={`header__burger hidden-desktop ${menu ? 'activeMenu active' : ''}`}
                                        onClick={() => setMenu(!menu)}>
                                        <span></span>
                                    </div>
                                </div>
                            </div>

                            <nav className="header__menu-nav">
                                <ul className="header__menu-list">
                                    <li className="header__menu-item">
                                        <DelayedNavLink to="/projects"
                                                        onClick={() => setMenu(!menu)}>Проекты</DelayedNavLink>
                                    </li>
                                    <li className="header__menu-item">
                                        <DelayedNavLink to="/agency"
                                                        onClick={() => setMenu(!menu)}>Агентство</DelayedNavLink>
                                    </li>
                                    <li className="header__menu-item">
                                        <DelayedNavLink to="/services"
                                                        onClick={() => setMenu(!menu)}>Услуги</DelayedNavLink>
                                    </li>
                                    {/* <li className="header__menu-item">
                                <NavLink to="/news" onClick={() => setMenu(!menu)}>Журнал</NavLink>
                            </li> */}
                                    <li className="header__menu-item">
                                        <DelayedNavLink to="/contacts"
                                                        onClick={() => setMenu(!menu)}>Контакты</DelayedNavLink>
                                    </li>
                                </ul>
                                <div>
                                </div>
                            </nav>
                            {
                                headerData && headerData.phone ?
                                    (
                                        <div className="header__menu-contacts">
                                            {/*<Link to={`mailto:${headerData.email}`}*/}
                                            {/*      className="header__menu-contacts-link">{headerData.email}</Link>*/}
                                            <DelayedLink to={`tel:${headerData.phone}`}
                                                         className="header__menu-contacts-link">{headerData.phone}</DelayedLink>
                                        </div>
                                    ) : (
                                        <div className="header__menu-contacts">
                                            <DelayedLink to="tel:+74951034351" className="header__menu-contacts-link">+7
                                                (495)
                                                103—4351</DelayedLink>
                                            {/*<Link to="mailto:hello@de-us.ru"*/}
                                            {/*      className="header__menu-contacts-link">hello@de-us.ru</Link>*/}
                                        </div>
                                    )
                            }

                            <div className="header__bot hidden-desktop">
                                <DelayedLink to="/contacts" className="header__discuss" datahash="contactUs"
                                             onClick={(e) => gotoAnchor(e)}>
                                    {
                                        headerData.headerPhoto ?
                                            (
                                                <RetryImage datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                                            src={`${apiUrl}/uploads/${headerData.headerPhoto.filename}`}
                                                            alt="Обсудить проект" className="header__discuss-img"/>
                                            ) : (
                                                <img datahash="contactUs" onClick={(e) => gotoAnchor(e)} src={btn}
                                                     alt="Обсудить проект" className="header__discuss-img"/>
                                            )
                                    }
                                    <div datahash="contactUs" onClick={(e) => gotoAnchor(e)}
                                         className="header__discuss-text">Обсудить проект
                                    </div>
                                </DelayedLink>
                                {/*        /!* <a href='contacts#contactWithUsPart'>*/}
                                {/*   */}
                                {/*</a> *!/*/}
                                {/*        /!* <Link to="/" className="header__presa">Презентация агентства</Link> *!/*/}
                                {/*        {*/}
                                {/*            headerData && headerData.presentation ?*/}
                                {/*                <a href={`${apiUrl}/uploads/${headerData.presentation.filename}`}*/}
                                {/*                   target='_blank' className="header__presa">Презентация агентства</a> :*/}
                                {/*                <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank'*/}
                                {/*                   className="header__presa">Презентация агентства</a>*/}
                                {/*        }*/}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    )

}

export default connect(
    (state) => ({headerData: state.app.headerData})
)(AppHeader)