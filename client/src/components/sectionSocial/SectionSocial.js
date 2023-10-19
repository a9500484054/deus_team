import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../axios'

import './sectionSocial.scss'

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const SectionSocial = () => {

    const [social, setSocial] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/api/social/`)
            .then((response) => {
                setSocial(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };

        window.addEventListener('isLoadingMainPage', handleLoad);

        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    });

    return social ? (
        <>
            {!isLoading &&
                <section className="section-social">
                    <div className="container">
                        <div className="section-social__wrap">
                            <h2 className="heading-secondary wow slideInLeft"
                                data-wow-duration="1s"
                                data-wow-delay="0.5s"
                                data-wow-offset="100">
                                Узнать нас ближе
                            </h2>
                            <div className="section-social__content">
                                {
                                    social.map((item, index) => {
                                        return (
                                            <Link to={item.link} className="section-social__item wow slideInRight"
                                                  data-wow-duration="1.5s"
                                                  data-wow-delay={`${index*0.2}s`}
                                                  data-wow-offset="100"
                                                  target="_blank" key={item.id}
                                                  style={{background: item.color}}>
                                                <div className="hidden">
                                                    <img src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null}
                                                         alt={item.name}/>
                                                    <div className="section-social__descr">{item.descr}</div>
                                                </div>

                                                    <div className="section-social__btn">
                                                        <div className="arrow" style={{'--custom-color': item.color}}></div>
                                                    </div>


                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    ) : null

}

export default SectionSocial;