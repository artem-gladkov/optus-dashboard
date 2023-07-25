import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { store } from "../../Store/store";
import { ButtonTokens } from "../buttonsGroupe/ButtonGroupeForm";
import uniqid from "uniqid";
import { useEffect, useState } from "react";
import { Icon } from "../svg/Icon";
import useMedia from "../../hooks/useMedia";
import { Navigations } from "../navigations/Navigations";
import { SearchInput } from "../searchInput/SearchInput";
import { toJS } from "mobx";

interface Props {}

const RoutesNavigationComponent = (props: Props) => {
  const matches = useMedia("(min-width: 1164px)");
  const pairs = "pairs";
  const tokens = "tokens";
  const over = "OPTUS";
  const dexoverview = "dexoverview";
  const { dex } = useParams();
  console.log(dex)
  const [burger, setBurger] = useState(false);
  const {
    getActiveButtonDex,
    handlerButtonDex,
    activeButtonDex,
    buttonDex,
    updateActivePage,
    activePage,
    updateHandlerButtonDexBo,
    updateActiveButtonDex,
    updateHandlerButtonDex,
  } = store;
  const [hidden, setHidden] = useState(false);
  const hiddenNav = (hidden: boolean) => {
    setHidden(hidden);
  };
  const pathnameWindow = window.location.pathname;
  const visiblebtnDex =
    pathnameWindow.includes("dexoverview") || pathnameWindow === "/";
  useEffect(() => {
    dex
      ? updateActiveButtonDex(pathnameWindow.split("/")[2])
      : updateActiveButtonDex("OPTUS");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(pathnameWindow.split("/"))

  return (
    <header className="w-full z-50 relative">
      <div className="flex w-full  fixed  bg-form items-center  px-8 py-3 justify-between">
        <div className="font-bold  w-1/5 flex ">
          <Link
            className="flex items-center"
            onClick={() => {
              updateHandlerButtonDexBo(true);
            }}
            to={`/`}
          >
            <Icon />
          </Link>
          {!visiblebtnDex ? (
            <div className="ml-6">
              <button
                onClick={updateHandlerButtonDex}
                className="flex items-center"
              >
                <span className="px-2">{activeButtonDex || "OPTUS"}</span>
                <div className="rotate-90 text-2xl">&#8250;</div>
              </button>
              <div className="absolute bg-form px-2  rounded">
                {!handlerButtonDex && (
                  <ButtonTokens
                    arrButtons={buttonDex}
                    key={uniqid()}
                    active={activeButtonDex}
                    type="buttonDex"
                    page={activePage}
                  />
                )}
              </div>
            </div>
          ) : null}
        </div>

        {matches ? (
          <Navigations dexProp={getActiveButtonDex} />
        ) : (
          <>
            <div className="flex flex-end text-inActive">
              <div
                onClick={() => {
                  setBurger((v) => !v);
                }}
                className={`ml-4 mt-1 w-7 h-7 rounded flex flex-col justify-between bg-bg hover:bg-inActive transition-all duration-300 cursor-pointer ${
                  burger ? "rotate-90" : ""
                }`}
              >
                <span className="w-7 h-1 bg-text rounded"></span>
                <span className="w-7 h-1 bg-text rounded"></span>
                <span className="w-7 h-1 bg-text rounded"></span>
              </div>
              <div
                className={
                  burger
                    ? "bg-form  mt-10 absolute right-0  z-50 text-text"
                    : "hidden"
                }
              >
                {matches ? null : (
                  <div className="flex flex-col text-inActive rounded border">
                    <SearchInput
                      hiddenNav={(hidden: boolean) => {
                        hiddenNav(hidden);
                      }}
                    />
                    <div className={`${hidden ? "hidden" : ""}`}>
                      <div className="mb-2">
                        <Link
                          onClick={() => {
                            updateHandlerButtonDexBo(true);
                            updateActivePage("");
                          }}
                          className=" hover:text-text transition-all duration-400 px-4 py-2 rounded-xl"
                          to={`overview/${dex ? dex : over}`}
                        >
                          Overview
                        </Link>
                      </div>
                      <div className="mb-2">
                        <Link
                          className="  hover:text-text transition-all duration-400 px-4 py-2 rounded-xl"
                          to={`/dexoverview`}
                        >
                          Overview dex
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {matches ? (
          <div className="w-1/5">
            <SearchInput />
          </div>
        ) : null}
      </div>
    </header>
  );
};

export const Header = observer(RoutesNavigationComponent);
