import React from 'react'
import { useEffect, useState, useRef } from 'react';
import axios from './../../../axios'
import { Link } from 'react-router-dom';
import Select from 'react-select';
import SwiperCore, { Grid, Autoplay } from "swiper";

import { Icon } from '../../icon/Icon';
import SectionProducts from '../../sectionProducts/SectionProducts';
import SectionSocial from '../../sectionSocial/SectionSocial';
import Showreel from '../../showreel/Showreel';

import "swiper/css";
import "swiper/css/grid";
import './mainPage.scss';



import mainBannerLine from '../../../img/main-banner-line.svg';
import mainBannerLineMob from '../../../img/main-banner-line-mob.svg';
import TypeWriterText from "../../typeWriterText";
import {connect, useSelector} from "react-redux";


SwiperCore.use([Autoplay]);

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;


const colourStyles = {
    control: (styles) => ({}),
    valueContainer: (styles) => ({}),
    placeholder: (styles) => ({}),
    indicatorSeparator: (styles) => ({ display: 'none' }),
    indicatorsContainer: (styles) => ({}),
    menu: (styles) => ({}),
    menuList: (styles) => ({}),
    option: (styles, state) => ({
        color: state.isSelected ? '#FF4D01' : 'inherit'
    }),
};

const classes = {
    control: (state) => state.menuIsOpen ? 'select active' : 'select',
    valueContainer: () => 'select__value',
    indicatorsContainer: () => 'select__icon',
    menu: () => 'select__dropdown',
    option: () => 'select__item',
    input: () => 'select__search'
}




const MainPage = (props) => {
    const [isActive, setIsActive] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState([]);
    const [allTags, setAllTags] = useState(new Set());
    const [working, setWorking] = useState([]);
    const [showreels, setShowreels] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [total, setTotal] = useState(0);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);


    const onAcc = ({e,index}) => {
        let accItem = e.target.closest('.tab-parent');
        setIsActive(prevState => {
            const newActiveState = [...prevState];
            newActiveState[index] = !newActiveState[index];
            return newActiveState;
        });
        if (accItem.classList.contains('active')) {
            accItem.classList.remove('active');
            accItem.classList.remove('wow');
        } else {
            accItem.classList.add('active');
            accItem.classList.add('wow');
            accItem.classList.add('fadeInDown');
        }
    }

    useEffect(() => {
        axios.get(`${apiUrl}/api/news`)
            .then((response) => {
                const newsWithTags = response.data.map((news) => {
                    return axios.get(`${apiUrl}/api/tags/${news.tags}`)
                        .then((tagResponse) => {
                            news.tags = tagResponse.data.name;
                            return news;
                        })
                        .catch((error) => {
                            console.log(error);
                            return news;
                        });
                });

                Promise.all(newsWithTags)
                    .then((news) => {
                        setNews(news);
                        const tags = new Set(news.flatMap((news) => news.tags));
                        setAllTags(tags);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/working/`)
            .then((response) => {
                setWorking(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/showreels/`)
            .then((response) => {
                setShowreels(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if(!!props.services){
            const sortedData = props.services.sort((a, b) => a.position - b.position);
            setServices(sortedData);
        }
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
            setAllProjects(response.data);
            setTotal(response.data.length)
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/themes/`)
            .then((response) => {
                console.log(response.data);
                let projectOptionsTheme = [];
                response.data.forEach((item, i) => {
                    const { id, name } = item;
                    projectOptionsTheme[i] = { value: id, label: name }
                })
                setOptionsTheme(projectOptionsTheme)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/types/`)
            .then((response) => {
                console.log(response.data);
                let projectOptionsType = [];
                response.data.forEach((item, i) => {
                    const { id, name } = item;
                    projectOptionsType[i] = { value: id, label: name }
                })
                setOptionsType(projectOptionsType)
            })
            .catch((error) => {
                console.log(error);
            });
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
    },[]);

    const handleThemeChange = (selectedOption) => {
        setSelectedTheme(selectedOption);
    };

    const handleTypeChange = (selectedOption) => {
        setSelectedType(selectedOption);
    };

    const filteredProjects = allProjects.filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
    }).slice(0, 3);

    const foundShowreel = showreels.find(showreel => showreel.mainShowreel === true);



    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        videoRefs.current[index].play();
        console.log("hovered", index)
    };

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        video.pause();
        video.currentTime = 0; // Rewind the video to the beginning
    };

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };

    const sortColumns=(...elements)=> {
        const columns = elements.reduce((acc, element, index) => {
            const columnIndex = index % 3;
            acc[columnIndex].push(element);
            return acc;
        }, [[], [], []]);

        return columns;
    }

    return (
        <>
            {!isLoading &&
                <main className="main">
                                    <section className="main-banner wow fadeIn"
                                             data-wow-duration="0.1s"
                                             data-wow-delay="0.1s"
                                             data-wow-offset="100"
                                             style={{background: "rgba(0,0,0,0.82)"}}>
                                        <div className="container">
                                            <div className="main-banner__wrap">
                                                <div className="main-banner__content">
                                                     <h1 className="heading-primary wow fadeIn"
                                                         data-wow-duration="0.5s"
                                                         data-wow-delay="0.3s">
                                                         <TypeWriterText
                                                             text={"Создавайте вместе с нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей"}
                                                         />
                                                     </h1>
                                                    <div className="rollCircleMain">
                                                        <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank'
                                                           className="btn --circle --orange wow rollIn"
                                                           data-wow-duration="1s"
                                                           data-wow-delay="2.5s"
                                                        >Презентация агентства</a>
                                                    </div>
                                                    <img src={mainBannerLine} alt="Touch Money"
                                                         className="main-banner__line hidden-mobile wow fadeIn"
                                                         data-wow-duration="0.5s"
                                                         data-wow-delay="3.7s"/>
                                                    <img src={mainBannerLineMob} alt="Touch Money"
                                                         className="main-banner__line hidden-desktop wow fadeIn"
                                                         data-wow-duration="0.5s"
                                                         data-wow-delay="3.7s"/>
                                                </div>
                                                <div className="main-banner__project hidden-mobile">
                                                    <div className="main-banner__project-marquee wow fadeIn"
                                                         data-wow-duration="0.5s"
                                                         data-wow-delay="0.3s">
                                                        {!!allProjects && sortColumns(...allProjects.map((val) => (
                                                            <Link to={`/projects/${val.id}`} target="_blank" key={val.id}>
                                                                <img className="main-banner__project-img" alt=''
                                                                     src={val.image ? `${apiUrl}/uploads/${val.image.filename}` : null}
                                                                />
                                                            </Link>
                                                        ))).map((column, index) => (
                                                            <div className="main-banner__project-marquee__column">
                                                                <div style={{gap: "0.5em",
                                                                    display: "flex",
                                                                    flexDirection: "column",}}
                                                                     key={index}>
                                                                    {column}
                                                                </div>
                                                                <div style={{gap: "0.5em",
                                                                    display: "flex",
                                                                    flexDirection: "column",}}
                                                                     key={index + "_2"}>
                                                                    {column}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

            {/* {mainProjects ? mainProjects.map(project => { */}
                {/* return ( */}
                    {/* <section className="main-banner" key={project.id} style={{ background: project.color }}> */}
                        {/* <div className="container"> */}
                            {/* <div className="main-banner__wrap"> */}
                                {/* <div className="main-banner__content"> */}
                                    {/* <h1 className="heading-primary">{project.bannerText}</h1> */}
                                    {/* <h1 className="heading-primary">Создавайте вместе с&nbsp;нами новые впечатления о Вашей компании, которые превзойдут ожидания потребителей</h1> */}
                                    {/* <a href={`${apiUrl}/uploads/DEUS.pdf`} target='_blank' className="btn --circle --orange">Презентация агентства</a> */}
                                {/* </div> */}
                                {/* <div className="main-banner__project hidden-mobile"> */}
                                    {/* <div className="main-banner__project-name">{project.name}</div> */}
                                    {/* <img src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} className="main-banner__project-img" />
                                    <Link to={`/projects/${project.id}`} className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                                </div> */}
                                {/* <Swiper
                                    autoplay={{ delay: 3000 }}
                                    slidesPerView={1}
                                    grid={{
                                        rows: 1,
                                    }}
                                    spaceBetween={10}
                                    modules={[Grid]}
                                    onSlideChange={(e) => slideChange(e)}
                                    className="main-banner__project hidden-mobile"
                                    style={{width:'910px'}}
                                    loop={true}
                                    >
                                   {
                                        projects.map((project) => (
                                            <SwiperSlide key={project.id}>
                                                {project.mainVideoFile ? (
                                                    <video className="main-banner__project-img" muted controls>
                                                        <source src={project.mainVideoFile ? `${apiUrl}/uploads/${project.mainVideoFile.filename}` : null}/>
                                                    </video>
                                                ) : (
                                                    <img
                                                        className="main-banner__project-img"
                                                        src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                        alt={project.name}
                                                    />
                                                )}
                                                <Link to={`/projects/${project.id}`} className="main-banner__project-link btn --circle --b-white">Перейти <br /> к проекту</Link>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper> */}
                            {/* </div> */}
                        {/* </div> */}
                        {/* <img src={mainBannerLine} alt="Touch Money" className="main-banner__line hidden-mobile" />
                        <img src={mainBannerLineMob} alt="Touch Money" className="main-banner__line hidden-desktop" />
                    </section> */}
                {/* )
            }) : null} */}

            <section className="main-projects wow fadeIn"
            data-wow-duration="0.1s"
            data-wow-delay="0.1s">
                <div className="container">
                    <div className="main-projects__head wow fadeInUp"
                         data-wow-offset="100"
                         data-wow-duration="0.5s"
                         data-wow-delay="0.2s">
                        <h2 className="heading-secondary">Проекты</h2>
                        <div className="main-projects__filters hidden-mobile">
                            <Select classNames={classes} options={optionsType} styles={colourStyles} onChange={handleTypeChange} placeholder="Тип проекта" />
                            <Select classNames={classes} options={optionsTheme} styles={colourStyles} onChange={handleThemeChange} placeholder="Тематика проекта" />
                        </div>
                        <Link to="/projects" className="btn --orange hidden-mobile">Все проекты</Link>
                    </div>
                    <div className="main-projects__wrap">
                        {filteredProjects ? filteredProjects.map((project,index) => {
                            return (
                                project.controlURL ?
                                <a href={`${project.projectURL}`} className="main-projects__item"
                                   key={project.id}>
                                    <div className="main-projects__img-wrap">
                                        {
                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                ?
                                            <video className="wow slideInLeft"
                                                   data-wow-duration="0.5s"
                                                   data-wow-delay={`${index* 0.2}s`}
                                                   data-wow-offset="100"
                                                   ref={(ref) => addVideoRef(ref)} autoPlay muted playsInline loop>
                                                <source src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                            </video> :
                                            project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                ?
                                                <div ref={(ref) => addVideoRef(ref)} dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                :
                                                <img ref={(ref) => addVideoRef(ref)} src={project.image
                                                    ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                     alt={project.name}
                                                     className="main-projects__img wow fadeIn"
                                                     data-wow-duration="2s"
                                                     data-wow-delay={`${index* 0.350}s`}
                                                     data-wow-offset="100" />
                                        }
                                    </div>
                                    <div className="main-projects__name wow fadeIn"
                                         data-wow-duration="2s"
                                         data-wow-delay={`${index* 0.300}s`}
                                         data-wow-offset="100">{project.name}</div>
                                    <div className="main-projects__descr">{project.descrProject}</div>
                                </a> :
                                <Link to={`/projects/${project.nameInEng}`} className={`main-projects__item wow ${index < 1 ? 'fadeInLeft' : 'fadeIn'}`}
                                      data-wow-duration="0.5s"
                                      data-wow-delay={`${index === 0 ? `0.1` : (0.1 + index * 0.2)}s`}
                                      data-wow-offset="100"
                                      key={project.id}>
                                    <div className="main-projects__img-wrap">
                                            {
                                                project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                    ?
                                                <video
                                                       ref={(ref) => addVideoRef(ref)} autoPlay muted playsInline loop>
                                                    <source src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                                </video> :
                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                    ?
                                                    <div ref={(ref) => addVideoRef(ref)} dangerouslySetInnerHTML={{ __html: project.mainVideo }}></div>
                                                    :
                                                    <img  className="main-projects__img"
                                                          ref={(ref) => addVideoRef(ref)} src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null} alt={project.name} />
                                            }
                                    </div>
                                    <div className="main-projects__name">{project.name}</div>
                                    <div className="main-projects__descr">{project.descrProject}</div>
                                </Link>
                            )
                        })
                            : null}
                    </div>
                </div>
            </section>

            {working ?
                <section style={{display: 'none'}} className="main-working">
                    <div className="container">
                        <h3 className="heading-tertiary">Работаем сейчас над</h3>
                        <div className="main-working__wrap">
                            {
                                working.map(item => {
                                    return (
                                        <div className="main-working__item" key={item.id}>
                                            <div className="main-working__img-wrap">
                                                <img src={item.image ? `${apiUrl}/uploads/${item.image.filename}` : null} alt={item.name} className="main-working__img" />
                                            </div>
                                            <div className="main-working__name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                : null}

            <section className="main-services wow fadeIn"
                     data-wow-duration="0.1s"
                     data-wow-delay="0.1s"
                     data-wow-offset="10"  >

                <div className="container">
                    <div className="main-services__wrap">
                        <div className="main-services__info">
                            <h2 className="heading-secondary">Услуги</h2>
                            {
                                foundShowreel ?
                                    <div className="wow fadeIn"
                                         data-wow-duration="0.5s"
                                         data-wow-delay="0.2s"
                                         data-wow-offset="10">

                                        <Showreel data={foundShowreel} key={foundShowreel.id}/>
                                    </div>
                                    : null
                            }

                        </div>
                        <div className="main-services__content">
                            {props.services ? props.services.map((service, index) => {
                                return (
                                    service.isInvisible ?
                                        <div className="main-services__item tab-parent wow fadeInDown"
                                             data-wow-duration="0.5s"
                                             data-wow-delay={`${index *.25}s`}
                                             key={service.id}>
                                            <div className="main-services__head" onClick={(e) => onAcc({ e, index })}>
                                                 <div className="main-services__num">{index < 9 ? 0 : ''}{index + 1}</div>
                                                <div className="main-services__name">{service.name}</div>
                                                <div className="main-services__btn">
                                                    <Icon icon="arr-acc" />
                                                </div>
                                            </div>
                                            <div className="main-services__acc">
                                                <div className={`main-services__descr wow ${isActive[index] ? 'fadeInRight' : ''}`}
                                                     data-wow-duration="0.5s"
                                                     data-wow-delay="0.5"
                                                >{service.descr}
                                                </div>
                                                <div className="main-services__bot"
                                                >
                                                    {/* <div className="main-services__gallery">
                                                    <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                                    <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                                    <img src={serviceImg} alt="Фирменный стиль" className="main-services__img" />
                                                </div> */}
                                                    <Link to={`/services/${service.path}`} className={`btn --b-orange wow ${isActive[index] ? 'fadeInRight' : ''} `}

                                                          data-wow-duration="0.5s"
                                                          data-wow-delay="0.5"
                                                    >Подробнее</Link>
                                                </div>
                                            </div>
                                        </div> : null
                                )
                            }) : null}
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="main-news">
                <div className="container">
                    <div className="main-news__wrap">
                        <div className="main-news__info">
                            <h2 className="heading-secondary">Журнал</h2>
                            <div className="main-news__info-wrap">
                                {[...allTags].map((tag, i) => (
                                    <Link to={`/news?tag=${tag}`} className="main-news__info-item" key={i}>#{tag}</Link>
                                ))}
                            </div>
                        </div>
                        <div className="main-news__content">
                            {news.map((item) => {
                                return (
                                    <Link to={`/news/${item.id}`} className="news__item" key={item.id}>
                                        <div className="news__img-wrap">
                                            <img src={`${apiUrl}/uploads/${item.image.filename}`} alt="Дизайн" className="news__img" />
                                        </div>
                                        <div className="news__text">
                                            <div className="news__tag">{item.tags}</div>
                                            <div className="news__name">{item.name}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section> */}

            <SectionSocial />

            {/*<SectionProducts />*/}
                </main>
            }
        </>
    )

}

export default connect(
    (state) => (
        {
            services: state.app.services,
        }
    )
)(MainPage)