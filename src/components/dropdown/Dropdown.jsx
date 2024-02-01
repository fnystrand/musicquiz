export default function Dropdown({ children }) {
  return (
    <div className={`bg-grey-dark p-5 w-[30rem] rounded-lg absolute top-5 right-[52px] shadow-md`}>
      {children}
    </div>
  )
}
