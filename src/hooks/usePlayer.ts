import { create } from "zustand"

interface PlayerStore {
    ids :string[],
    activeId ?: string,
    setId : (id : string) => void,
    setIds : (ids : string[]) => void,
    reset : () => void
}

const usePlayerSong = create<PlayerStore>((set) => ({
    ids : [],
    acttiveId :undefined,
    setId : (id : string) => set({activeId : id}),
    setIds : (ids : string[]) => set({ ids : ids}),
    reset : () => set({ ids : [] , activeId : undefined})
}))


export default usePlayerSong;