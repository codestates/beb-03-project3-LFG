import axios from "axios";
import { setNFTData } from "./getMetadata";

export const getContribution = async (user, setScore) => {
  const response = await axios.post(
    "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/point",
    {
      userAddress: user.toLowerCase(),
    }
  );

  setScore((prev) => response.data);
};

export const myPageAxios = async (
  user,
  tabs,
  setNFTs,
  setData,
  setLoans,
  setLoading
) => {
  switch (tabs) {
    case 0:
      // request myNFTs
      setLoading(true);
      const {
        data: { myNftList },
      } = await axios.post(
        "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/myPage",
        {
          userAddress: user,
        }
      );
      const promises = myNftList.map((d) => setNFTData(d.tokenURI));
      Promise.all(promises).then((resolve) => {
        setNFTs((prev) =>
          resolve.map((data, idx) => {
            return {
              ...data,
              ...myNftList[idx],
            };
          })
        );
      });
      setLoading(false);
      break;
    case 1:
      // request myListed Loans
      let { data } = await axios.get(
        "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/loan"
      );
      let promises1 = data.loanList.map((d) => setNFTData(d.tokenURI));
      Promise.all(promises1).then((result) => {
        setLoans((prev) =>
          result.map((elem, idx) => {
            return {
              ...elem,
              ...data.loanList[idx],
            };
          })
        );
      });
      break;
    case 2:
      // request Funded Loans
      let response = await axios.get(
        "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/loan"
      );
      let data2 = response.data;
      let promises2 = data2.loanList.map((d) => setNFTData(d.tokenURI));
      Promise.all(promises2).then((result) => {
        setLoans((prev) =>
          result.map((elem, idx) => {
            return {
              ...elem,
              ...data2.loanList[idx],
            };
          })
        );
      });
      break;
    case 3:
      // requset trade I Offer and My Trade History
      const {
        data: { offerList },
      } = await axios.post(
        "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/trade/offer",
        {
          userAddress: user.toLowerCase(),
        }
      );

      processTradeData(offerList, setData);
      break;
    case 4:
      // request Trade I Offered
      const {
        data: { respondList },
      } = await axios.post(
        "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/trade/respond",
        {
          userAddress: user.toLowerCase(),
        }
      );

      processTradeData(respondList, setData);
      break;
    default:
      break;
  }
};

export const processTradeData = async (tradeData, setTradeData) => {
  tradeData.forEach((data) => {
    const receivePromise = data.respondNFTList.map((data) =>
      setNFTData(data.tokenURI)
    );
    const offerPromise = data.offerNFTList.map((data) =>
      setNFTData(data.tokenURI)
    );

    Promise.all([...receivePromise, ...offerPromise]).then((metadata) => {
      setTradeData((prev) => {
        let ids = prev.map((data) => data._id);
        if (ids.includes(data._id)) {
          return prev;
        }

        let resList = data.respondNFTList.map((d, idx) => {
          return {
            ...d,
            ...metadata[idx],
          };
        });

        let offList = data.offerNFTList.map((d, idx) => {
          return {
            ...d,
            ...metadata[receivePromise.length + idx],
          };
        });

        return [
          ...prev,
          {
            ...data,
            respondNFTList: resList,
            offerNFTList: offList,
            offerPaidKlay:
              data.offerPaidKlay === ""
                ? 0
                : parseInt(data.offerPaidKlay) / 1e18,
            respondPaidKlay:
              data.respondPaidKlay === ""
                ? 0
                : parseInt(data.respondPaidKlay) / 1e18,
          },
        ];
      });
    });
  });
};

// let offerDummy = [
//   {
//     _id: "62874660c358c10dd5bd7f8b",
//     tradeId: 11,
//     offerAddress: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
//     respondAddress: "0xF5421BE9Ddd7f26a86a82A8ef7D4161F7d4461B6",
//     offerNFTList: [
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 1000,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/1000",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//     ],
//     respondNFTList: [
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 2000,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/2000",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 0,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/0",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//     ],
//     offerPaidKlay: "1000000000000000000",
//     respondPaidKlay: "12000000000000000000",
//     status: "CREATED",
//   },
// ];
// let respondDummy = [
//   {
//     _id: "628729b91540425338f146c2",
//     tradeId: 12,
//     offerAddress: "0xF5421BE9Ddd7f26a86a82A8ef7D4161F7d4461B6",
//     respondAddress: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
//     offerNFTList: [
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 777,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/777",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//     ],
//     respondNFTList: [
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 444,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/444",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//     ],
//     offerPaidKlay: "7000000000000000000",
//     respondPaidKlay: "12000000000000000000",
//     status: "CREATED",
//   },
//   {
//     _id: "62874660c358c10dd5f146c2",
//     tradeId: 13,
//     offerAddress: "0xF5421BE9Ddd7f26a86a82A8ef7D4161F7d4461B6",
//     respondAddress: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
//     offerNFTList: [
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 999,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/999",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 99,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/99",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//     ],
//     respondNFTList: [
//       {
//         projectName: "TFT",
//         team: "Test NFT",
//         tokenId: 256,
//         tokenURI:
//           "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/256",
//         nftAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
//       },
//     ],
//     offerPaidKlay: "88000000000000000000",
//     respondPaidKlay: "14000000000000000000",
//     status: "CANCELLED",
//   },
// ];
