function FormButton({ label, disable }) {
  return (
    <button
      type="submit"
      disabled={disable}
      className="text-white disabled:cursor-not-allowed w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium !rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 !px-5 !py-2.5 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 !mt-3 "
    >
      {label}
    </button>
  );
}

export default FormButton;
