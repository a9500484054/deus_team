import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import axios from '../../../axios'
import Select from 'react-select';

import Cta from '../../cta/Cta';

import './projects.scss'

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

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

const Projects = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [optionsTheme, setOptionsTheme] = useState([]);
    const [optionsType, setOptionsType] = useState([]);

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedType, setSelectedType] = useState(null);


    const loadProject = (cb) => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setProjects(response.data);
                console.log(response.data);
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const loadThemes = (cb) => {
        axios.get(`${apiUrl}/api/projects/`)
            .then((response) => {
                setProjects(response.data);
                console.log(response.data);
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const loadTypes = (cb) => {
        axios.get(`${apiUrl}/api/types/`)
            .then((response) => {
                console.log(response.data);
                let projectOptionsType = [];
                response.data.forEach((item, i) => {
                    const {id, name} = item;
                    projectOptionsType[i] = {value: id, label: name}
                })
                setOptionsType(projectOptionsType)
                if (!!cb) {
                    cb()
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        loadTypes(() => loadThemes(() => loadProject()))
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

    const filteredProjects = projects.filter(project => {
        return (selectedTheme ? project.projectTheme === selectedTheme.value : true) &&
            (selectedType ? project.projectType === selectedType.value : true) && project.visibility;
    });

    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        videoRefs.current[index].play();
        console.log("hovered", index)
    };

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        video.pause();
        // video.currentTime = 0; // Rewind the video to the beginning
    };

    const addVideoRef = (ref) => {
        videoRefs.current.push(ref);
    };


    return (
        <>
            {!isLoading &&
                <main className="projects">
                    <section className="projects-content">
                        <div className="container">
                            <div className="projects__head">
                                <h1 className="heading-primary">Наши проекты</h1>
                                {optionsTheme && optionsType ?
                                    <div className="projects__filters">
                                        <Select classNames={classes} options={optionsType} styles={colourStyles}
                                                onChange={handleTypeChange} placeholder="Тип проекта"/>
                                        <Select classNames={classes} options={optionsTheme} styles={colourStyles}
                                                onChange={handleThemeChange} placeholder="Тематика проекта"/>
                                    </div>
                                    : null}
                            </div>
                            <div className="projects__wrap">
                                {filteredProjects ? filteredProjects.map((project, index) => {
                                        return (
                                            project.controlURL ?
                                                <a href={`${project.projectURL}`} className="projects__item wow fadeInUpBig"
                                                   data-wow-duration="1s"
                                                   data-wow-delay="1s"
                                                   key={project.id} style={{background: project.color}}>
                                                    <div className="projects__item-img-wrap">
                                                        {
                                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                                ?
                                                                <video autoPlay loop muted playsInline controls>
                                                                    <source
                                                                        src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}
                                                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                                                </video> :
                                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                                    ?
                                                                    <div
                                                                        dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>
                                                                    :
                                                                    <img
                                                                        src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                                        alt={project.name} className="main-projects__img"/>
                                                        }

                                                    </div>
                                                    <div className="projects__item-name">{project.name}</div>
                                                </a> :
                                                <Link to={`/projects/${project.nameInEng}`} className="projects__item wow fadeInUpBig"
                                                      data-wow-duration="1s"
                                                      data-wow-delay="1.5s"
                                                      key={project.id} style={{background: project.color}}>
                                                    <div className="projects__item-img-wrap">
                                                        {
                                                            project.mainVideoFile && project.mainVideoFile !== 'undefined' && project.mainVideoFile !== 'null'
                                                                ?
                                                                <video autoPlay ref={(ref) => addVideoRef(ref)}
                                                                       onMouseEnter={() => handleMouseEnter(index)}
                                                                       onMouseLeave={() => handleMouseLeave(index)} muted
                                                                       playsInline>
                                                                    <source
                                                                        src={`${apiUrl}/uploads/${project.mainVideoFile.filename}`}
                                                                        type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;"/>
                                                                </video> :
                                                                project.mainVideo && project.mainVideo !== 'undefined' && project.mainVideo !== 'null'
                                                                    ?
                                                                    <div ref={(ref) => addVideoRef(ref)}
                                                                         dangerouslySetInnerHTML={{__html: project.mainVideo}}></div>
                                                                    :
                                                                    <img ref={(ref) => addVideoRef(ref)}
                                                                         src={project.image ? `${apiUrl}/uploads/${project.image.filename}` : null}
                                                                         alt={project.name} className="main-projects__img"/>
                                                        }

                                                    </div>
                                                    <div className="projects__item-name">{project.name}</div>
                                                </Link>
                                        )
                                    })
                                    : null}
                            </div>
                        </div>
                    </section>
                    <div className="wow fadeInUpBig"
                         data-wow-offset="2"
                         data-wow-duration="3s"
                         data-wow-delay="1s">
                        <Cta formName={'projects'}/>
                    </div>

                </main>
            }
        </>
    )

}

export default Projects;