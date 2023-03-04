import Head from 'next/head';
import React from 'react';
import SongForm from '../../components/forms/SongForm';

export default function CreateBoard() {
  return (
    <>
      <Head>
        <title>Add a New Song</title>
      </Head>
      <SongForm />
    </>
  );
}
