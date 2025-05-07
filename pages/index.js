import Head from "next/head";
import LeasingCalculator from "../components/LeasingCalculator";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kalkulator Leasingu</title>
      </Head>
      <main className="min-h-screen bg-white p-6">
        <LeasingCalculator />
      </main>
    </div>
  );
}