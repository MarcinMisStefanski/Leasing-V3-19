import Head from "next/head";
import LeasingCalculator from "../components/LeasingCalculator";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kalkulator Leasingu EVdlaCiebie</title>
      </Head>
      <main className="min-h-screen bg-white text-gray-800 p-6 font-sans">
        <LeasingCalculator />
      </main>
    </>
  );
}