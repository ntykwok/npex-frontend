import React from "react";
// eslint-disable-next-line



const JsonToCard = ({jsonData}) => {
  return (
    <div className="card-container">
      {jsonData.map((item,key) => (
        <div key={key} className="card">    
             <h2>{item[0]}</h2>
                  <p>Time Left: {parseInt(JSON.parse(JSON.stringify(item[1])).hex,16)} sec</p>
                  <p>Highest Bid: {parseInt(JSON.parse(JSON.stringify(item[2])).hex,16)/10**18} ETH</p>
        </div>
      ))}
    </div>
  );
};

export default JsonToCard;