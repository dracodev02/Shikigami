const Decor = () => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 select-none">
      <img
        src="border-shiki.svg"
        className="absolute top-0 left-0 h-full object-cover"
      />
      <img
        src="bg-shiki.png"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 items-center justify-center w-[80%] max-w-desktop mx-auto px-2">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-purple.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-purple-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-yellow.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-yellow-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-pink.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-pink-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-green.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-green-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 max-md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-purple.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-purple-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 max-md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-yellow.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-yellow-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 max-md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-pink.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-pink-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 max-md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative group">
              <img
                src="zigzag-green.svg"
                className="w-full h-full object-cover group-hover:opacity-0 opacity-100 transition-all duration-300"
              />
              <img
                src="zigzag-green-light.svg"
                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-100 opacity-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Decor;
