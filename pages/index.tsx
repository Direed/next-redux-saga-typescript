import React from 'react';
import { NextPage } from 'next';
import MainPage from "../src/containers/Main/Main";

const Index: NextPage = () => <MainPage/>

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false));
//
//   if (!store.getState().placeholderData) {
//     store.dispatch(loadData());
//     store.dispatch(END);
//   }
//   await store.sagaTask?.toPromise();
// });

export default Index;
