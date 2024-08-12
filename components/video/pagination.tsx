
'use client'
import {useState} from 'react'
type PageState = {
    totalDocuments: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    changeCurpage: Function,
  };
  
interface PagenatoinProps {
    pageState: PageState | undefined
  };
  

export default function Pagination({pageState}: PagenatoinProps) {
    // console.log(pageState)
    const [curpage, setCurpage] = useState<number>(1)
    const handlePage = (page: number) => {        
        if(pageState?.totalPages && page >= 1 && page <= pageState?.totalPages && page !== curpage)  {
            setCurpage(page);
            // console.log(page)
            pageState.changeCurpage(page)
        }
    }
    return (
        <>
        <div>
            <div className="flex flex-wrap">
                <button onClick={() => handlePage(curpage - 1)} className="pagenation_text">Prev</button>
                <button className="pagenation_active">{curpage}</button>
                {
                    pageState?.totalPages && pageState?.totalPages > 1 ? (
                        <button onClick={() => handlePage(curpage + 1)}  className="pagenation_noactive">{curpage + 1}</button>
                    ): (<></>)
                }                
                {/* <button onClick={() => handlePage(curpage + 1)}  className="pagenation_noactive">{curpage + 1}</button> */}
                <button onClick={() => handlePage(curpage + 1)}  className="pagenation_text">Next</button>
            </div>
            <div className="big-gap"></div>
        </div>
        
        </>
    )
}