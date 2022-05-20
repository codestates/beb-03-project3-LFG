import axios from "axios";
import { getMetadata } from "./getMetadata";

export const myPageAxios = async (user, tabs, setData) => {
  switch (tabs) {
    case 0:
      // request myNFTs
      const {
        data: { myNftList },
      } = await axios.post("http://127.0.0.1:4002/myPage", {
        userAddress: user,
      });

      const promises = myNftList.map((d) => getMetadata(d.tokenURI));
      Promise.all(promises).then((resolve) => {
        setData((prev) =>
          resolve.map((data, idx) => {
            return {
              ...data.data,
              ...myNftList[idx],
            };
          })
        );
      });

      break;
    case 1:
      // request myListed Loans
      break;
    case 2:
      // request Funded Loans
      break;
    case 3:
      // requset trade I Offer and My Trade History
      const {
        data: { offerList },
      } = await axios.post("http://127.0.0.1:4002/trade/offer", {
        userAddress: user,
      });

      processTradeData(offerList, setData);
      break;
    case 4:
      // request Trade I Offered
      const {
        data: { offerList: respondList },
      } = await axios.post("http://127.0.0.1:4002/trade/respond", {
        userAddress: user,
      });

      processTradeData(respondList, setData);
      break;
    default:
      break;
  }
};

export const processTradeData = async (tradeData, setTradeData) => {
  tradeData.forEach((data) => {
    const receivePromise = data.respondNFTList.map((url) => getMetadata(url));
    const offerPromise = data.offerNFTList.map((url) => getMetadata(url));

    Promise.all([...receivePromise, ...offerPromise]).then((resolve) => {
      let images = resolve.map((resp) => resp.data.image);

      setTradeData((prev) => {
        let ids = prev.map((data) => data._id);
        if (ids.includes(data._id)) {
          return prev;
        }

        return [
          ...prev,
          {
            ...data,
            respondNFTList: images.slice(0, receivePromise.length),
            offerNFTList: images.slice(receivePromise.length),
          },
        ];
      });
    });
  });
};
