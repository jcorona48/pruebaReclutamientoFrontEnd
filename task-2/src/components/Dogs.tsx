
import React, {useEffect} from 'react'

import useBreedsStore from '@/stores/useBreedsStore'
import Dog from './Dog'
import useDataStore from '@/stores/useDataStore'
const Dogs = ({breeds, data}) => {
    const setData = useDataStore(state => state.setData)
    
    const setBreads = useBreedsStore(state => state.setBreeds)
    const setFilterBreeds = useBreedsStore(state => state.setFilterBreeds)
    const filterBreeds = useBreedsStore(state => state.filterBreeds)
    useEffect(() => {
        setBreads(breeds)
        setFilterBreeds(breeds)
        setData(data)
    }, [breeds])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
            filterBreeds.map((breed, index) => (
                <Dog key={index} breed={breed} />
            ))
        }
	</div>
  )
}

export default Dogs