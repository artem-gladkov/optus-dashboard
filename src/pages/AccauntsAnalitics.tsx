import { useState } from "react";
import BackgraundAccaunts from "../components/background-accounts/bg-accaunts";

type Props = {};

export const AccauntsAnalitics = (props: Props) => {

  const [valueInput, setValueInput] = useState('')

  const changeInput = (e) =>{
    setValueInput(e.target.value)
  }

  const formSubmit = (e) =>{
    e.preventDefault()
    fetch('')
    console.log(valueInput)
  }

  return (
    <div className="mt-24 w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-10">Accaunts explorer</h1>
      <form onSubmit={formSubmit} className="w-full flex flex-col justify-center items-center">
        <input
        value={valueInput}
          onChange={changeInput}
          type="text"
          className="w-[70%] duration-300 focus:shadow-[0_0_12px_8px_#622ffa86] shadow-[0_0_12px_8px_#fb16d986] hover:shadow-[0_0_12px_8px_#fab50890] transition-shadow outline-none bg-headerActiveBTN  bg-opacity-50 border-blue border-opacity-40 h-12 rounded-3xl  px-4"
        />
      </form>
      

      <BackgraundAccaunts />
    </div>
  );
};
