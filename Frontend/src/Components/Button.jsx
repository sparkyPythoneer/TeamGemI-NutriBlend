function Button({ props, onClick }) {
    return (
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={onClick}>
        {props}
      </button>
    );
  }
  
  export default Button;