import { useState } from "react"

export default function FilterBar({applyFilters}) {
    const [search, setSearch]= useState("")
    const [chip, setChip]= useState("All")

    return (
        <div className="filters">
            <button className={chip==="All"? "chip active": "chip"} onClick={()=>setChip("All")}>
                All
            </button>
            <button className={chip==="Applied"? "chip active": "chip"} onClick={()=>setChip("Applied")}>
                Applied
            </button>
            <button className={chip==="Interviewing"? "chip active": "chip"} onClick={()=>setChip("Interviewing")}>
                Interviewing
            </button>
            <button className={chip==="Offer"? "chip active": "chip"} onClick={()=>setChip("Offer")}>
                Offer
            </button>
            <button className={chip==="Rejected"? "chip active": "chip"} onClick={()=>setChip("Rejected")}>
                Rejected
            </button>
            
            <input type="search" value={search}  onChange={(e)=>{
                setSearch(e.target.value);
                applyFilters(e.target.value, chip)}} />
        </div>
    )
}