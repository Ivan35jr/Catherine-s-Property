import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from './supabase'
import type { Listing } from './data'

type Ctx = { listings: Listing[]; closed: Listing[]; all: Listing[]; loading: boolean }
const DataCtx = createContext<Ctx>({ listings: [], closed: [], all: [], loading: true })

export function DataProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('listings').select('*').then(({ data }) => {
      // rename `description` back to `desc` so your components don't change
      setItems((data ?? []).map(({ description, ...rest }) => ({ ...rest, desc: description })) as Listing[])
      setLoading(false)
    })
  }, [])

  const listings = items.filter(l => !l.status)
  const closed = items.filter(l => l.status)
  return <DataCtx.Provider value={{ listings, closed, all: items, loading }}>{children}</DataCtx.Provider>
}
export const useData = () => useContext(DataCtx)    