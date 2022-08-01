import React from "react";

const ResultModal = ({
  hasWon,
  hasLost,
}: {
  hasWon: boolean;
  hasLost: boolean;
}) => {
  return <div>ResultModal : Winner ? {JSON.stringify(hasWon)} </div>;
};

export default ResultModal;
