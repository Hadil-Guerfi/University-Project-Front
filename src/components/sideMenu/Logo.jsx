import log from "../../assests/logo.png";
const Logo = () => {
  return (
    <div className="h-32 text-xl text-white grid place-items-center w-4/5 font-bold	 relative  bg-center	">
      <img src={log} alt="none" className="absolute w-full h-full " />
    </div>
  );
};

export default Logo;
