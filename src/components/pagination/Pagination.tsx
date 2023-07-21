import uniqid from "uniqid";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

interface Props {
  totalItem: number;
  itemPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  dex: string;
  type:string;
}

const PaginationComponent = ({
  totalItem,
  itemPerPage,
  setCurrentPage,
  currentPage,
  dex,
  type
}: Props) => {
  const [activePages, setActivePages] = useState(currentPage);
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++) {
    pages.push(i);
  }

  const backPages = () => {
    if (activePages > 1) {
      setActivePages((activePages) => {
        return (activePages = activePages - 1);
      });
    }
  };

  const plusPages = () => {
    if (activePages < pages.length - 1) {
      setActivePages((activePages) => {
        return (activePages = activePages + 1);
      });
    }
  };

  const updateActive = (page) => {
    setCurrentPage(page);
    if (page < pages.length - 1) {
      setActivePages(page);
    } else {
      setActivePages(pages[pages.length - 1]);
    }
  };



  useEffect(()=>{
    if(type !== 'transactions'){
      setActivePages(1);
      setCurrentPage(1);
    }
  }, [itemPerPage, dex])

  useEffect(() => {
    setCurrentPage(activePages);
  }, [activePages]);


  const styleButton =
    "font-medium mr-3 text-inActive px-3 py-1 rounded-lg hover:text-text";
  const pagesComponent = pages.map((page) => {
    return (
      <button
        onClick={() => {
          updateActive(page);
        }}
        type="button"
        className={
          page !== currentPage
            ? styleButton
            : `${styleButton} text-text bg-active px-3 py-1`
        }
        key={uniqid()}
      >
        {page}
      </button>
    );
  });
  return (
    <div className="p-3 flex items-center">
      <div className="text-3xl mr-3 pb-2">
      <button
        key={uniqid()}
        onClick={() => {
          setActivePages(1);
        }}
        className="mr-2"
      >
        &laquo;
      </button>
      <button type="button" onClick={backPages}>
        &#8249;
      </button>
      </div>
      <div>
      {pagesComponent[activePages - 1]} 
      {pagesComponent[activePages]}
      {pagesComponent[activePages + 1]}
      </div>
        <div className="text-3xl pb-2">
        <button type="button" className="mr-2" onClick={plusPages}>
        &#8250;
      </button>
      <button
        key={uniqid()}
        onClick={() => {
          setActivePages(pages.length);
        }}
      >
        &raquo;
      </button>
        </div>
      
    </div>
  );
};

export const Pagination = observer(PaginationComponent);
