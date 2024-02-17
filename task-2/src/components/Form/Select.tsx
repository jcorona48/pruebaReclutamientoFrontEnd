

import React from 'react'
import useBreedsStore from '@/stores/useBreedsStore'
import { capitalize } from '@/utils/Capitalize'
const Select = ({ label, id, name,options, defaultValue }) => {
    const setFilterBreeds = useBreedsStore(state => state.setFilterBreeds)
    const breeds = useBreedsStore(state => state.breeds)
    const handleChange = async (e) => {
        const selectedBreed = e.target.value
        
        if (selectedBreed === defaultValue) {
            setFilterBreeds(breeds)
            return
        }

        const dogsOfBreeds = new Array<string>(12).fill(selectedBreed)

        setFilterBreeds(dogsOfBreeds)
    }
    
  return (
    <>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <select  
            onChange={handleChange}
            id={name} 
            defaultValue={defaultValue}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value={defaultValue}>{defaultValue}</option>
            {
                options.map((option, index) => (
                <option key={`${option} - ${index}`} value={option}>{capitalize(option)}</option>
                ))
            }
        </select>
    
    </>
  )
}

export default Select