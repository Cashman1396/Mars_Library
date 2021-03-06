import React from 'react';
// Redux stuff
import { useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {smallImage} from '../util';

//Assets
import controller from '../assets/controller.svg';
import playstation from '../assets/sony.svg';
import steam from '../assets/steam.svg';
import xbox from '../assets/xbox.svg';
import nintendo from '../assets/switch.svg';
import apple from '../assets/apple.svg';
import epic from '../assets/epic.svg';

//Rating
import styled from 'styled-components'
import starEmpty from '../assets/star-empty.png';
import starFull from '../assets/star-full.png'
import { motion } from 'framer-motion';


const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ff7676;
    }
    &::-webkit-scrollbar-track {
        background: white;
    }
`;

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 2rem 5rem;
    background: white;
    position: absolute;
    left: 10%;
    z-index: 10;
    color: black;
    img {
        width: 100%;
    }
`;

const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        width: 2rem;
        height: 2rem;
        display: inline;
    }
`;

const Info = styled(motion.div)`
    text-align: center;  
`;

const Platforms = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    img {
        margin-left: 3rem;
    }
`;

const Media = styled(motion.div)`
    margin-top: 5rem;
    img {
        width: 100%;
    }
`;

const Description = styled(motion.div)`
    margin: 5rem 0rem;
`;



const GameInfo = ({pathId}) => {
    const history = useHistory();

    //Exit Detail Handler
    const exitDetailHandler = (e) => {
        const element = e.target;
        if (element.classList.contains('shadow')) {
            document.body.style.overflow = 'auto';
            history.push('/');
        }
    };


    const getRating = () => {
        const stars = [];
        const rating = Math.floor(game.rating);
        for(let i = 1; i <= 5; i++){
            if (i <= rating) {
                stars.push(<img alt="star" key={i} src={starFull}></img>);
            } else {
                stars.push(<img alt="star" key={i} src={starEmpty}></img>);
            }
        }
        return stars;
    };


    const getPlatform = (platform) => {
        switch(platform){
            case "PlayStation 4":
                return playstation;
            case "Xbox One":
                return xbox;
            case "PC":
                return steam;
            case "Nintendo Switch":
                return nintendo;
            case "iOS":
                return apple;
            default:
                return controller;
         }
    }
    const getStores = (store) => {
        switch(store) {
            case "PlayStation Store":
                return playstation;
            case "Steam":
                return steam;
            case "Epic Games":
                return epic;
            case "Xbox Store":
                return xbox;
            default:
                return controller;
        }
    }

//Data 
const { game, screen, isLoading } = useSelector((state) => state.detail);
console.log(game.stores);
return (
    <>
     {!isLoading && (
        <CardShadow className='shadow' onClick={exitDetailHandler}>
            <Detail layoutId={pathId}>
                <Stats><div className="rating">
                        <motion.h3 layoutId={`title${pathId}`}>{game.name}</motion.h3>
                        <p>Rating: {game.rating}/ 5</p>
                        {getRating()}
                        </div>
                        <Info>
                            <h3>Platforms</h3>
                            <Platforms>
                                {game.platform.map((data) => (
                                    <img
                                    alt={data.platform.id}
                                    key={data.platform.id}
                                    src={getPlatform(data.platform.name)}></img>
                                ))}
                            </Platforms>
                        </Info>
                </Stats>
                <Media>
                    <motion.img 
                    layoutId={`image ${pathId}`}
                    src={smallImage(game.background_image, 1280)} 
                    alt={game.background_image}
                    ></motion.img>
                </Media>
                <Description>
                    <p>{game.description_raw}</p>
                </Description>
                <div class="gallery">
                    {screen.results.map((screen) => (
                        <img src={smallImage(screen.image, 1280)} alt="" />
                    ))}
                </div>
            </Detail>
        </CardShadow>
     )}
    </>

    )    
 }



export default GameInfo