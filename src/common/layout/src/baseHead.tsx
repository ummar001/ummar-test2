import React, { FunctionComponent, PropsWithChildren } from "react";
import Head from "next/head";

interface IBaseHeadProps {
    pageName: string;
}

export const BaseHead: FunctionComponent<PropsWithChildren<IBaseHeadProps>> = ({
  children,
  pageName }) => {
  return (
    <>
      <Head>
        <title>Waycup - {pageName}</title>
        <meta name="description" content="Digital loyalty reward tools for independent coffee shops to compete with Starbucks, Costa, Pret a manger and more."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      {children}
    </>
  );
};
