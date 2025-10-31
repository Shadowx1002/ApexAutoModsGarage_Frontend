export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col bg-black">
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        <div className="flex flex-wrap border-2 items-center justify-center border-[#F77603] my-5 mb-20 py-1 mt-28 w-full md:w-[1350px] border-l-0 border-r-0 gap-3">
          
          <div className="relative w-full md:w-[1350px] h-[400px] md:h-[550px] rounded-3xl  flex flex-col justify-center items-center overflow-hidden">
            
            
            <div className="absolute inset-0 bg-[url('car.jpg')] bg-cover bg-center opacity-40 z-0"></div>
            
            {/* Form */}
            <div className="relative z-10 w-full flex flex-col items-center">
              <input
                type="email"
                placeholder="Email"
                className="mb-4 px-4 py-3 rounded-xl w-4/5 md:w-1/3 focus:outline-none bg-white/80 text-black"
                style={{ fontFamily: "Judson" }}
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-4 px-4 py-3 rounded-xl w-4/5 md:w-1/3 focus:outline-none bg-white/80 text-black"
                style={{ fontFamily: "Judson" }}
              />
              <button
                className="bg-[#F77603] hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition w-4/5 md:w-1/3"
                style={{ fontFamily: "Judson" }}
              >
                Login
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
