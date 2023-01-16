import create from 'zustand'

const useSingleSearchStore = create(set => ({
    results : [],
    setResults : (results) => set({results}),
    sortedBy : 'price',
    setSortedBy : (sortedBy) => set({sortedBy}),
    sortOrder : 'asc',
    setSortOrder : (sortOrder) => set({sortOrder}),
    selectedConditions : [],
    setSelectedConditions : (selectedConditions) => set({selectedConditions}),
    foilFilter: false,
    setFoilFilter: (foilFilter) => set({foilFilter}),
    setResults : (results) => set({results})
}))

