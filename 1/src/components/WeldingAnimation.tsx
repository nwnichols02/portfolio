import React from 'react'
import '../styles/spark.css'

const WeldingAnimation: React.FC = () => {


  return (
    <>

      {/* <div className="fire-container">
        {[...Array(300)].map((_, index) => (
          <div
            key={index}
            className={"spark spark-var-" + index}
            style={{
              '--index': index
            } as React.CSSProperties}></div>
        ))}
      </div> */}
      <div className='track'>
        <div className="saw">
          {[...Array(300)].map(() => (
            <div
              className={"spark"}>
            </div>
          ))}
        </div>
      </div>

    </>

  )
}

export default WeldingAnimation