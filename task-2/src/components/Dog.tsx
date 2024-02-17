
import React, {useEffect, useState} from 'react'
import { capitalize } from '@/utils/Capitalize'
import useDataStore from '@/stores/useDataStore';
const Dog = ({ breed }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isHover, setIsHover] = useState(false);
    const [subBreeds, setSubBreeds] = useState([]);
    const data = useDataStore(state => state.data);

    useEffect(() => {
        async function getBreed() {
            const data = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) => res.json());
            const imageUrl = data.message;
            setImageUrl(imageUrl);
        }

        const subBreeds = data.message[breed];
        setSubBreeds(subBreeds);
        getBreed();
    }, [breed])


    const handleEnter = (e) => {
        setIsHover(true);
    }

    const handleLeave = (e) => {
        setIsHover(false);
    }
  return (
    <article className="min-w-36 rounded-lg truncate flex flex-col relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
        <div className={`absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-black text-white bg-opacity-50 overflow-y-auto ${isHover ? "block" : "hidden"}`}>
            <ul className='flex-1 w-full flex flex-col gap-2 items-center content-center overflow-y pb-8'>
                {
                    subBreeds.map((subBreed, index) => (
                        <li key={index} className="text-white text-center">{capitalize(subBreed)}</li>
                     ))
                }

                {
                    subBreeds.length === 0 && <li className="text-white text-center">No hay sub razas</li>
                }
            </ul>
        </div>
        <picture className='flex-1 max-h-48 min-h-48' >
            <img src={imageUrl} alt={breed} loading="lazy" className='w-full h-full object-cover object-center' />
        </picture>
        <footer className='absolute bottom-0 w-full bg-black text-white bg-opacity-50'>
            <h2 className="text-white text-center">{capitalize(breed)}</h2>
        </footer>
    </article>
  )
}

export default Dog