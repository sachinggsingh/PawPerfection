import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const Profile = () => {
  return (
    <>
      <Navbar />
      <section className="py-16 px-6 text-balck">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Level Up Your Skills 🚀</h2>
          <p className="text-lg mb-6">
            Explore interactive projects, sharpen your coding knowledge, and become
            job-ready with hands-on experience.
          </p>
          <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};
