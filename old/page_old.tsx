export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bone p-6 text-center">
      {/* Ensure your logo is in the /public folder */}
      <img 
        src="/logo.png" 
        alt="arrel logo" 
        className="w-64 md:w-80 mb-8"
      />
      
      <h1 className="text-terracotta font-serif text-2xl md:text-3xl tracking-tight">
        coming up soon
      </h1>
      
      <p className="text-stone font-sans text-sm mt-4 uppercase tracking-[0.2em]">
        Autonomous Food Systems • Mediterranean Design
      </p>
    </main>
  );
}