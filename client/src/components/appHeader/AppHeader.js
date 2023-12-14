import {useState, useEffect,} from 'react';
import axios from 'axios'
import {Link, NavLink, useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import './appHeader.scss';

import logo from '../../img/logo.svg';
import btn from '../../img/discuss-btn.png';
import RetryImage from "../../helpers/RetryImage";
import {Icon} from "../icon/Icon";


const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const AppHeader = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            let header = document.querySelector('.header')
            let whiteHeaders = document.querySelectorAll('.whiteHeader')

            const find = Array.from(whiteHeaders).find((whiteHeader) => {

                return window.scrollY >= whiteHeader.offsetTop && window.scrollY <= (whiteHeader.offsetHeight + whiteHeader.offsetTop)
            })
            if (!!find) {
                if (window.scrollY >= find.offsetTop) {
                    header.classList.add('white');
                } else {
                    header.classList.remove('white');
                }
                if (window.scrollY > find.offsetTop + find.offsetHeight) {
                    header.classList.remove('white');
                }
            } else {
                header.classList.remove('white');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
        window.dispatchEvent(event)

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

    const gotoAnchor = (e) => {
        setTimeout(() => {
            let element = document.getElementById(e.target.getAttribute('datahash'));
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }, 750)
    }


    const [menu, setMenu] = useState(false);
    const {headerData} = props;

    return (
        <>
            {!isLoading && headerData &&
                <>
                    <header className="header">
                        <div className="container">
                            <div className="header__wrap">
                                <Link to="/" className='header__logo'>
                                    {/*<img src={logo} alt="DEUS"/>*/}
                                    <Icon icon="headerLogo"  viewBox="0"/>
                                </Link>
                                <nav className="header__nav">
                                    <ul className="header__nav-list">
                                        <li className="header__nav-item hover-flip">
                                            <NavLink to="/projects">
                                            <span data-hover="Проекты">Проекты</span>
                                            </NavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <NavLink to="/services">
                                                <span data-hover="Услуги">Услуги</span>
                                            </NavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <NavLink to="/agency">
                                                <span data-hover="Агентство">Агентство</span>
                                            </NavLink>
                                        </li>
                                        <li className="header__nav-item hover-flip hidden-mobile">
                                            <NavLink to="/contacts">
                                                <span data-hover="Контакты">Контакты</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>

                                {headerData && headerData.phone ?
                                    (
                                        <div className="header__contacts hidden-mobile">
                                            {/*<Link to={`mailto:${headerData.email}`}*/}
                                            {/*      className="header__contacts-link">{headerData.email}</Link>*/}
                                            <Link to={`tel:${headerData.phone}`}
                                                  className="header__contacts-link">{headerData.phone}</Link>
                                        </div>
                                    ) :
                                    (
                                        <div className="header__contacts hidden-mobile">
                                            {/*<Link to="mailto:hello@de-us.ru"*/}
                                            {/*      className="header__contacts-link">hello@de-us.ru</Link>*/}
                                            <Link to="tel:+74951034351" className="header__contacts-link">+7 (495)
                                                103—4351</Link>
                                        </div>
                                    )
                                }


                                {/* <div onClick={handleClick} className="header__discuss hidden-mobile">
                            <img src={btn} alt="Обсудить проект" className="header__discuss-img" />
                            <div className="header__discuss-text">Обсудить проект</div>
                        </div> */}
                                <Link to="/contacts" className="header__discuss hidden-mobile" datahash="contactUs"
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
                                </Link>

                                <div className={`header__burger hidden-desktop ${menu ? 'active' : ''}`}
                                     onClick={() => setMenu(!menu)}>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className={`header__menu ${menu ? 'active' : ''}`}>
                        <div className="header__menu-wrap">
                            <nav className="header__menu-nav">
                                <ul className="header__menu-list">
                                    <li className="header__menu-item">
                                        <NavLink to="/projects" onClick={() => setMenu(!menu)}>Проекты</NavLink>
                                    </li>
                                    <li className="header__menu-item">
                                        <NavLink to="/services" onClick={() => setMenu(!menu)}>Услуги</NavLink>
                                    </li>
                                    <li className="header__menu-item">
                                        <NavLink to="/agency" onClick={() => setMenu(!menu)}>Агентство</NavLink>
                                    </li>
                                    {/* <li className="header__menu-item">
                                <NavLink to="/news" onClick={() => setMenu(!menu)}>Журнал</NavLink>
                            </li> */}
                                    <li className="header__menu-item">
                                        <NavLink to="/contacts" onClick={() => setMenu(!menu)}>Контакты</NavLink>
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
                                            <Link to={`tel:${headerData.phone}`}
                                                  className="header__menu-contacts-link">{headerData.phone}</Link>
                                        </div>
                                    ) : (
                                        <div className="header__menu-contacts">
                                            <Link to="tel:+74951034351" className="header__menu-contacts-link">+7 (495)
                                                103—4351</Link>
                                            {/*<Link to="mailto:hello@de-us.ru"*/}
                                            {/*      className="header__menu-contacts-link">hello@de-us.ru</Link>*/}
                                        </div>
                                    )
                            }

                            <div className="header__bot">
                                <Link to="/contacts" className="header__cta" datahash="contactUs"
                                      onClick={(e) => gotoAnchor(e)}>
                                    <img datahash="contactUs" onClick={(e) => gotoAnchor(e)} src={btn}
                                         alt="Обсудить проект"/>
                                    Обсудить проект
                                </Link>
                                {/* <a href='contacts#contactWithUsPart'>
                           
                        </a> */}
                                {/* <Link to="/" className="header__presa">Презентация агентства</Link> */}
                                {
                                    headerData && headerData.presentation ?
                                        <a href={`${apiUrl}/uploads/${headerData.presentation.filename}`}
                                           target='_blank' className="header__presa">Презентация агентства</a> :
                                        <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank'
                                           className="header__presa">Презентация агентства</a>
                                }
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