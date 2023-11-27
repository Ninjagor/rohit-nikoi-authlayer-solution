import React from 'react'

interface MaxWidthContentWrapperInterface {
  customStyles?: string;
  children: React.ReactNode;
}

const MaxWidthContentWrapper: React.FC<MaxWidthContentWrapperInterface> = ({ children, customStyles }) => {
  return (
    <>
      <section className={`w-full relative flex items-start justify-center `}>
        <div className={`w-full px-7 py-5 max-w-[1400px] flex items-start justify-start ${customStyles}`}>{children}</div>
      </section>
    </>
  )
}

export default MaxWidthContentWrapper
