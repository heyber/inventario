export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-500 text-white p-6 text-center shadow">
        <h1 className="text-3xl font-bold">Tu Producto de Plátano</h1>
        <p className="text-sm mt-2">Convierte tu cultivo en negocio rentable</p>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4">
          Harina de plátano 100% natural
        </h2>
        <p className="max-w-xl text-gray-600">
          Dale valor agregado a tu cultivo con un producto saludable, rentable y con alta demanda.
        </p>

        <button className="mt-6 text-lg px-6 py-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition">
          Quiero más información
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-10 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">100% Natural</h3>
          <p className="text-gray-600 text-sm">
            Sin químicos ni conservantes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">Alta demanda</h3>
          <p className="text-gray-600 text-sm">
            Ideal para mercados saludables y panadería.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold text-lg mb-2">Fácil producción</h3>
          <p className="text-gray-600 text-sm">
            Aprovecha tu cultivo sin grandes inversiones.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 text-sm">
        © 2026 - Proyecto de Prueba
      </footer>
    </main>
  );
}