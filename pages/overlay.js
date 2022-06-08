import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [imageNum, setImageNum] = useState(0);
  useEffect(() => {
    const imageNumData = supabase.from("image-num").on("UPDATE", (payload) => {
      console.log(payload.new);
      setImageNum(payload.new.image_num);
    });

    imageNumData.subscribe();
  }, []);

  return (
    <div>
      <Head>
        <title>Seth GCX Overlay</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Image
          src={`/StJudesProgress_${imageNum}.jpg`}
          width="990"
          height="1080"
        />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      imageNum: 0,
    }, // will be passed to the page component as props
  };
}
