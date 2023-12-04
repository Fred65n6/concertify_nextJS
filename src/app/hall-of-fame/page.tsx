import React from "react";

const HallOfFame = () => {
  return (
    <>
      <div className="grid pt-8">
        <h1 className="text-4xl font-bold">
          We would like to thank the following researches:
        </h1>
        <ul className="pt-8">
          <li className="flex gap-8 pb-4">
            <p>(2017-04-15)</p>
            <p>Frank Denis</p>
            <p>-</p>
            <p>Reflected cross-site scripting</p>
          </li>
          <li className="flex gap-8 pb-4">
            <p>(2017-01-02)</p>
            <p>Alice Quinn</p>
            <p>-</p>
            <p>SQL injection</p>
          </li>
          <li className="flex gap-8 pb-4">
            <p>(2016-12-24)</p>
            <p>John Buchner</p>
            <p>-</p>
            <p>Stored cross-site scripting</p>
          </li>
          <li className="flex gap-8 pb-4">
            <p>(2016-06-10)</p>
            <p>Anna Richmond</p>
            <p>-</p>
            <p>A server configuration issue</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HallOfFame;
