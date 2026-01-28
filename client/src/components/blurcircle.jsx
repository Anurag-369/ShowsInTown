const blurCircle = ({top="auto", left="auto", right="auto", bottom="auto"}) => {
    
    return (
      <div 
        className="absolute-x-20 h-50 w-50 aspect-square rounded-full bg-primary/30 blur-3xl" 
        style={{top: top, left: left, right: right, bottom: bottom}}
      >
        
      </div>
    )
  }
  
  export default blurCircle