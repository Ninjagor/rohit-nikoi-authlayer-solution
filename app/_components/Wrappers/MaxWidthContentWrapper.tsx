import React from 'react'

const MaxWidthContentWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <section className="w-full relative flex items-start justify-center">
        <div className="w-full px-7 py-5 max-w-[1400px] flex items-start justify-start">{children}</div>
      </section>
    </>
  )
}

export default MaxWidthContentWrapper
