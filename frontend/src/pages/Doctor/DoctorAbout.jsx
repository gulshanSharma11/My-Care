import React from 'react';
import {formatDate} from '../../utils/formatDate';


const DoctorAbout = () => {
  return (
    <div>
    <div>
      <h3 className="text-[20px]  leading-[30px] text-headingColor font-semibold flex items-center gap-2">About Of
      <span className="text-irisBlueColor font-bold text-[24px] leading-9">
Gulshan Sharma
      </span>
      </h3>
      <p className="text_para">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod iste odit quam ullam aliquid animi, aliquam ex expedita, tenetur necessitatibus voluptatem sit alias et eaque corporis accusamus laboriosam doloremque! Temporibus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nam quas dolorem nobis dolore corporis alias earum ab laboriosam illum.
      </p>
    </div>
    <div className="mt-12">
      <h3 className="text-[20px]  leading-[30px] text-headingColor font-semibold">Education</h3>
      <ul className="pt-4 md:p-5">
        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
          <div>
            <span className="text-irisBlueColor  text-[15px] leading-6 font-semibold">{formatDate("04-18-2001")} - {formatDate("09-18-2004")}</span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              PHD in Surgeon
            </p>
          </div>
          <p className="text-[14px] leading-5 font-medium text-textColor">
              New Apollo Hospital, Chandni Chowk
            </p>
        </li>
        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
          <div>
            <span className="text-irisBlueColor  text-[15px] leading-6 font-semibold">{formatDate("04-16-2005")} - {formatDate("11-18-2007")}</span>
            <p className="text-[16px] leading-6 font-medium text-textColor">
              PHD in Surgeon
            </p>
          </div>
          <p className="text-[14px] leading-5 font-medium text-textColor">
              New Hutiya Hospital, Chor Bazar
            </p>
        </li>
      </ul>
    </div>

    <div className="mt-12">
      <h3 className="text-[20px]  leading-[30px] text-headingColor font-semibold">Experience</h3>
      <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
        <li className="p-4 rounded bg-[#fff9ea]">
          <span className="text-yellowColor text-[15px] leading-6 font-semibold">
            {formatDate("07-07-2010")} -{formatDate('08-11-2014')}
          </span>
          <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Hutiya Hospital, Chor Bazar
            </p>
        </li>
        <li className="p-4 rounded bg-[#fff9ea]">
          <span className="text-yellowColor text-[15px] leading-6 font-semibold">
            {formatDate("07-09-2014")} -{formatDate('08-11-2019')}
          </span>
          <p className="text-[16px] leading-6 font-medium text-textColor">
              Sr. Surgeon
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              New Hutiya Hospital, Chor Bazar
            </p>
        </li>
      </ul>
      </div>
      
    </div>
  )
}

export default DoctorAbout