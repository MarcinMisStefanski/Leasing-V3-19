import Head from "next/head";
import LeasingCalculator from "../components/LeasingCalculator";
import OfferForm from "../components/OfferForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Leasing EVdlaCiebie</title>
      </Head>
      <main className="min-h-screen bg-gray-100 text-gray-900 p-6 font-sans">
        <LeasingCalculator />
        <OfferForm />
      </main>
    </>
  );
}