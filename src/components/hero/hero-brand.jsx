const HeroBrand = () => {
  return (
    <div className="max-w-[660px] flex flex-col gap-[25px]">
      <h1 className="fs-1 font-semibold">h Helado de Vainilla </h1>

      <p className="text-white/75 font-medium fs-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="flex gap-[40px]">
        <button className="hero-btn">Ordenar</button>
        <button className="hero-btn bg-white/15 border-0">Reserva</button>
      </div>
    </div>
  );
};

export default HeroBrand;
