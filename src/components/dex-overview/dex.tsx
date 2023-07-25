import { observer } from "mobx-react";
import React from "react";
import uniqid from "uniqid";
import { store } from "../../Store/store";
import { ButtonTokens } from "../buttonsGroupe/ButtonGroupeForm";
import Spinner from "../spinner/Spinner";

interface Props {}

const DexComponent = (props: Props) => {
  const { activeButtonDexPage, buttonDexPage, buttonDex } = store;

  const dexList = buttonDex.map((dex, index) => {
    return (
      <div className="" key={uniqid()}>
        <div
          key={uniqid()}
          className="flex w-full justify-between p-4 border-b border-inActive border-opacity-20"
        >
          <div className="lg:w-1/3">
            <div className="flex items-center ">
              <span className="mr-3 text-inActive"> {index+1}</span>
                <span className="font-medium  text-opacity-80  ">
                  {dex}
                </span>
            </div>
          </div>
          <div className="flex lg:w-2/3 w-full text-xs sm:text-base font-medium">
            <div className="flex md:w-1/5 w-1/3">
             
            </div>
            <div className="flex md:w-1/5 w-1/3  justify-center md:justify-start">
            
            
            </div>
            <div className="flex md:w-1/5 w-1/3  justify-center md:justify-start">
            
            
            </div>
            <div className="flex md:w-1/5 w-1/3 px-2 justify-center  md:justify-start">
             
             
            </div>
            <div className="md:flex md:w-1/5 hidden  md:flex-row justify-center  md:justify-start">
             
             
            </div>
            <div
              className={`md:flex md:w-1/5 hidden  md:flex-row justify-end  md:justify-start`}
            >

            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full border rounded-2xl mt-4 bg-form border-inActive text-xs sm:text-base ">
      <div className="flex  w-full  p-4 border-b border-inActive border-opacity-60">
        <div className="lg:w-1/3 w-1/4 font-medium text-inActive"># Name</div>

        <div className="flex lg:w-2/3 w-3/4">
          <ButtonTokens
            arrButtons={buttonDexPage}
            data={[]}
            key={uniqid()}
            active={activeButtonDexPage}
            type="dexoverview"
          />
        </div>
      </div>

      {dexList ? (
        dexList
      ) : (
        <div className="w-full h-full flex justify-center  items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export const Dex = observer(DexComponent);
