export default function Button({
  text = "",
  bgColor = "bg-blue-mid",
  textColor = "text-white",
  onClick,
  className,
  type = null,
  icon = null,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`group relative flex items-center justify-center overflow-hidden ${bgColor} px-8 py-3 focus:outline-none focus:ring rounded-lg cursor-pointer ${className}`}>
      <span className={`relative text-lg ${textColor} transition-colors`}>
        {text}
        {icon}
      </span>
    </button>
  )
}
