import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { ButtonTokens } from "../components/buttonsGroupe/ButtonGroupeForm";
import uniqid from "uniqid";
import Bg from "../components/background/bg";
import { store } from "../Store/store";
import { ChartsOverview } from "../components/charts/ChartsOverview";
import { toJS } from "mobx";
import Spinner from "../components/spinner/Spinner";
import { Tokens } from "../components/tokens/Tokens";
import { Pairs } from "../components/pairs/Pairs";
import { Transactions } from "../components/transactions/Transactions";
import { Dex } from "../components/dex-overview/dex";

interface Props {}

const OverviewDexComponent = (props: Props) => {
  const {
    pairsApi,
    overviewApi,
    getOverview,
    getPairs,
    getErrorOverview,
    activeButtonDex,
    updateOverview,
    updateHandlerButtonDexBo,
    dexListApi,
    getTransactions,
    getTrans,
  } = store;
  const [errorTransaction, setErrorTransaction] = useState(false);
  useEffect(() => {
    dexListApi();
    updateHandlerButtonDexBo(true);
    updateOverview({});
    if (getErrorOverview) {
      setErrorTransaction(true);
    }
    if (!getErrorOverview) {
      setErrorTransaction(false);
    }
    overviewApi("1");
    updateHandlerButtonDexBo(true);
    getTransactions("OPTUS");
    pairsApi("OPTUS")
  }, [activeButtonDex]);
//   console.log(toJS(getOverview));

  return (
    <div className="h-full py-14  relative bg-bg flex flex-col justify-center">
      <Bg />
      <div className="py-0 px-4 lg:px-14">
        <div className="flex flex-col z-50 relative">
          <div className=" flex  lg:flex mt-5 justify-center lg:flex-row flex-col">
            <div className="h-charts  w-full lg:w-1/2 pb-6 lg:mr-5 bg-form rounded-2xl justify-center items-center mb-14">
              {getOverview ? (
                <>
                  {!getErrorOverview ? (
                    <ChartsOverview
                      titleMarker={true}
                      type={"Liquidity"}
                      data={toJS(getOverview.liquidity_chart.usd)}
                    />
                  ) : (
                    "Произошла ошибка, но мы решаем эту проблему"
                  )}
                </>
              ) : getErrorOverview ? (
                "Произошла ошибка, но мы решаем эту проблему"
              ) : (
                <div className="w-full h-full flex justify-center  items-center">
                  <Spinner />
                </div>
              )}
            </div>

            <div className="h-charts  w-full lg:w-1/2 pb-6 lg:mr-5  bg-form  rounded-2xl justify-center items-center ">
              {getOverview ? (
                <>
                  {!getErrorOverview ? (
                    <ChartsOverview
                      colors={{
                        areaTopColor: "#7602eb",
                        areaBottomColor: "#7602eb3c",
                        lineColor: "#7602eb",
                      }}
                      titleMarker={true}
                      type={"Volume (24hrs)"}
                      data={toJS(getOverview.volume_chart.usd)}
                    />
                  ) : (
                    <Spinner />
                  )}
                </>
              ) : getErrorOverview ? (
                "Произошла ошибка, но мы решаем эту проблему"
              ) : (
                <div className="w-full h-full flex justify-center  items-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>

          <div className="md:flex mt-5 mb-5 bg-form text-inActive p-6 rounded-2xl hidden">
            <div className="mr-4">
              {" "}
              TON Price:{" "}
              <span className="text-text">
                {getOverview.ton_price?.value} ${" "}
              </span>{" "}
            </div>
            <div className="mr-4">
              {" "}
              Transaction (24H):{" "}
              <span className="text-text">
                {getOverview.transactions_24h?.value}
              </span>{" "}
            </div>
            <div className="mr-4">
              {" "}
              Pairs:{" "}
              <span className="text-text">
                {getOverview.pairs_number.value}
              </span>{" "}
            </div>
            <div className="mr-4">
              {" "}
              Fees (24H):{" "}
              <span className="text-text">
                {getOverview.fees_24h?.value} $
              </span>{" "}
            </div>
          </div>

          {/* Dexs */}
          <div className="flex  flex-col mt-10 text-text">
            <h1 className="font-medium text-2xl ">Dex informations</h1>
            <Dex />
          </div>

          {/* Coins */}

          <div className="flex  flex-col mt-10 text-text">
            <h1 className="font-medium text-2xl ">Coins dex informations</h1>
            <Tokens typePage="dexoverview" />
          </div>

          {/* Pairs */}

          <div key={uniqid()} className="flex  flex-col mt-10 text-text">
            <h1 className="font-medium text-2xl ">Pairs dex informations</h1>
            <Pairs typePage="dexoverview" data={getPairs} />
          </div>

          {/* Accaunts */}
          <div key={uniqid()} className="flex  flex-col mt-10 text-text">
            <h1 className="font-medium text-2xl "></h1>
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export const OverviewDex = observer(OverviewDexComponent);
