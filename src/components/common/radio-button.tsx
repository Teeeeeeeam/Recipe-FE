interface RaidoButtonProps {
  boolean: boolean
}

const RadioButton = ({ boolean }: RaidoButtonProps) => {
  return (
    <>
      {boolean === true ? (
        <div className="rounded-full h-6 w-6 border border-green-100 flex items-center justify-center cursor-pointer transition-colors">
          <div className="p-[8px] rounded-full bg-green-100 "></div>
        </div>
      ) : (
        <div className="rounded-full h-6 w-6 border border-green-100 flex items-center justify-center cursor-pointer transition-colors"></div>
      )}
    </>
  )
}

export default RadioButton
