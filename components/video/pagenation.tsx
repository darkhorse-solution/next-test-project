

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
    return (
        <>
        <div>
            Hi
        </div>
        
        </>
    )
}