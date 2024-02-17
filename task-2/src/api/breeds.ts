import type { Breed } from "@/types/breed";


let breeds: Breed[] = [];

export const loadBreeds = async () => {
    const breedStorage = localStorage.getItem('breeds');
    if (breedStorage !== null) {
        breeds = JSON.parse(breedStorage);
        
        if(breeds.length > 0) return breeds;
    } 
    console.log('fetching breeds');
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    const breedsLoad: Breed[] = Object.keys(data.message).map((breed) => ({
        name: breed,
        subBreeds: data.message[breed],
        _id: crypto.randomUUID()
    }));

    localStorage.setItem('breeds', JSON.stringify(breedsLoad));

    breeds = breedsLoad;

    return breedsLoad;
};


/* 
const breeds: Breed[] = Object.keys(data.message).map((breed) => ({
    name: breed,
    subBreeds: data.message[breed],
    _id: crypto.randomUUID()
})); 

const breeds: Breed[] = await loadBreeds(); */

export const getBreeds = async () => {
    return breeds;
}

export const getBreed = async (id) => {

    localStorage.setItem('breeds', JSON.stringify(breeds));
    
    const breed = breeds.find(b => b._id === id);
    return breed;
};


export const createBreed = async (breed: Breed) => {
    const newBreed = {
        ...breed,
        _id: crypto.randomUUID()
    };
    breeds.push(newBreed);

    localStorage.setItem('breeds', JSON.stringify(breeds));

    return newBreed;
}

export const updateBreed = async (id, breed: Breed) => {
    const index = breeds.findIndex(b => b._id === id);
    breeds[index] = {...breed, _id: id };

    localStorage.setItem('breeds', JSON.stringify(breeds));

    return breed;
}

export const deleteBreed = async (id) => {
    const index = breeds.findIndex(b => b._id === id);
    breeds.splice(index, 1);

    localStorage.setItem('breeds', JSON.stringify(breeds));

}



