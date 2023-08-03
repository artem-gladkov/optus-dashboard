import { observer } from "mobx-react";
import { CustomLink } from "../customLink/CustomLink";
import { store } from "../../Store/store";
import { useParams } from "react-router-dom";
import { CoinsSvg, PairsSvg } from "../svg/Icon";

type Props = {
    toPairs: string;
    toCoins: string;
};

const RigthNavigationsComponent = ({toCoins, toPairs }: Props) => {
  const {
    updateActivePage,
    getActiveButtonDex,
  } = store;
  const { dex } = useParams();
  const pairs = "pairs";
  const tokens = "tokens";
  return (
    <div className="w-[5%] h-[100%] block z-50 mt-24 ">
      <div className="w-[5%] h-24 fixed flex flex-col rounded-r-2xl bg-form border border-inActive border-opacity-60">
        <CustomLink
          onClick={() => {
            updateActivePage(tokens);
          }}
          className="my-2 hover:text-text transition-all duration-400 py-1 rounded"
          to={toCoins}
        >
       
            <span className="lg:block hidden pl-1">Tokens</span>
            <span className="lg:hidden block pl-1"><CoinsSvg/></span>
        

        </CustomLink>
        <CustomLink
          onClick={() => {
            updateActivePage(pairs);
          }}
          className=" hover:text-text transition-all duration-400  py-1 rounded"
          to={toPairs}
        >
            <span className="lg:block hidden pl-1">Pairs</span>
            <span className="lg:hidden block pl-1"><PairsSvg/></span>

        </CustomLink>
      </div>
    </div>
  );
};

export const RigthNavigations = observer(RigthNavigationsComponent);
