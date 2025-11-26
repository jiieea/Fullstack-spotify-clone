const Loader = () => {
    return (
      <div className="flex justify-center items-end h-6 w-10">
        <div className="w-1 h-2.5 mx-0.5 bg-green-500 rounded-sm loading-bar" />
        <div className="w-1 h-2.5 mx-0.5 bg-green-500 rounded-sm loading-bar-delay-1" />
        <div className="w-1 h-2.5 mx-0.5 bg-green-500 rounded-sm loading-bar-delay-2" />
        <div className="w-1 h-2.5 mx-0.5 bg-green-500 rounded-sm loading-bar-delay-3" />
      </div>
    );
  }
  
  export default Loader;