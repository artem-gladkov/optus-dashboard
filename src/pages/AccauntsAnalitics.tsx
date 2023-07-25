import BackgraundAccaunts from "../components/background-accounts/bg-accaunts"

type Props = {}

export const AccauntsAnalitics = (props: Props) => {
  return (
    <div className="mt-24 w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-5">Accaunts explorer</h1>
      <input type="text" className="w-[70%] shadow-[0_0_20px_rgba(251, 22, 217, 0.565)] bg-headerActiveBTN  bg-opacity-30 border-blue border-opacity-40 h-12 rounded-3xl  px-4"/>

      <BackgraundAccaunts/>
    </div>
  )
}
