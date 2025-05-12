import LeasingCalculator from '../components/LeasingCalculator';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 space-y-12">
      <LeasingCalculator />
      <ContactForm />
    </main>
  );
}
