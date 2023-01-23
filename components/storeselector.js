import useStore from '@/store'

export default function StoreSelector() {
    const { useMultiSearchStore } = useStore()
    const store = useMultiSearchStore()
    const websites = store.websiteCodeMap
  return (
    <div className="flex flex-col">
    <div className="grid md:grid-cols-3 grid-cols-2 w-full">
        {
            websites.map((website, index) => {
                return (
                    <div key={index} className="flex items-center bg-gray-300 hover:bg-gray-400 dark:bg-slate-800 dark:hover:bg-slate-700  accent-purple-700 p-2 rounded-md m-1"
                    onClick={() => {
                        store.setWebsites({
                            ...store.websites,
                            [website.code]: !store.websites[website.code],
                        })
                    }}
                    >
                        <input 
                            type="checkbox"
                            checked={store.websites[website.code]}
                            onChange={(e) => {
                                store.setWebsites({
                                    ...store.websites,
                                    [website.code]: e.target.checked,
                                })
                            }}
                        />
                        <label className="ml-2 text-sm">{website.name}</label>
                    </div>
                )
            }
            )
        }
    </div>

    <button className="bg-gray-300 hover:bg-gray-400 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded-md m-1" onClick={() => {
        let allSelected = {}
        let noneSelected = {}
        websites.forEach((website) => {
            allSelected[website.code] = true
            noneSelected[website.code] = false
        })
        
        if (JSON.stringify(store.websites) === JSON.stringify(allSelected)) {
            store.setWebsites(noneSelected)
        } else {
            store.setWebsites(allSelected)
        }
            
    }}>Select All</button>
      
        </div>

  )
}
