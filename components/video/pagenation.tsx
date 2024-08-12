
'use client'
import {useState} from 'react'
type PageState = {
    totalDocuments: number,
    totalPages: number,
    currentPage: number,
    pageSize: number
  };
  
interface PagenatoinProps {
    pageState: PageState | undefined
  };
  

export default function Pagenation({pageState}: PagenatoinProps) {
    // console.log(pageState)
    const [curpage, setCurpage] = useState<number>(0)
    const handlePage = (page: number) => {
        console.log(page)
    }
    return (
        <>
        <div>
            <div className="flex flex-wrap">
                <button onClick={() => handlePage(curpage - 1)} className="pagenation_text">Prev</button>
                <button className="pagenation_active">1</button>
                <button onClick={() => handlePage(curpage + 1)}  className="pagenation_noactive">2</button>
                <button onClick={() => handlePage(curpage + 1)}  className="pagenation_text">Next</button>
            </div>
            <div className="big-gap"></div>
        </div>
        
        </>
    )
}