const Appbar = () => {
  return (
    <div className="shadow h-14 flex justify-between p-2 ">
      <div className=" h-full flex items-center font-medium text-lg text-black ml-4">
        PayTM
      </div>
      <div className="flex justify-center items-center gap-4 ">
        <div className="h-full flex justify-center items-center">Hello</div>
        <div className="w-8 h-8 flex justify-center items-center text-white bg-slate-600 mr-12 rounded-full  ">
          <div className="flex items-center text-xl ">U</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
