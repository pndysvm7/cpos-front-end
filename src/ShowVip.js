import React, { useState } from 'react';
import ShowVipCategory from './ShowVipCategory';
import axios from 'axios';
const BACKEND_URL = 'https://cpos-backend.vercel.app'



export default function ShowVip() {
    const formData2 = new FormData();

    const [vip, setVip] = useState(0);

    const [loading, setLoading] = useState(0);

    const onChange3 = (e) => {
        let findvip = e.target.files[0];
        formData2.append('file', findvip);
    }

    const submitForm2 = async () => {
        const url = `${BACKEND_URL}/vip`
        // let url = '/vip'
        // const url = 'http://localhost:8000/vip'
        setLoading(1);
        try {
            var answer = await axios.post(url, formData2);
            console.log(answer.data.data);
            console.log('uploaded file is', answer.data.file_name )
            console.log('numbers in this file are ', answer.data.numbers_in_this_file )
            if (answer) {
                setLoading(0);
            }
        }
        catch (e) {
            setLoading(0);
            console.log(e);
            console.log(e.message)
            let networkerror = 'error'
            if(e.message === 'Network Error') {
                networkerror = 'please check whether your backend is connected or not or you must be connected to an INTERNET Connection'
                console.log('please check whether your backend is connected or not or you must be connected to an INTERNET Connection')
            }
            console.log(e?.response)
            let abcd = [["error here"], ["statusCode: ", e?.response?.request?.status], ["errorMessage: ", e?.response?.data?.message ], [e?.message], [networkerror]];
            setVip(abcd);
            return;
        }
        console.log(answer, "i am response");
        let myarr = [];
        for await (let d of answer.data.data) {
            myarr.push(d);
        }
        setVip(myarr);
        formData2.delete('file');
    }









    return (

        <div>




            <div className="flex justify-center mt-10 mx-auto">

                <div className="  w-full max-w-xs">
                    <div className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="oldfile"
                            >
                                CSV File
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="file" name="file" onChange={onChange3}
                                placeholder="file"
                            />
                        </div>
                        <div className="mb-6">


                            <div class="flex justify-center ">


                                <input type="submit" onClick={submitForm2} className="mt-5 bg-green-600 hover:bg-blue-800 text-gray-800 font-bold py-2 px-4 rounded" />

                            </div>

                        </div>
                        <div className="flex items-center justify-between">


                        </div>
                    </div>

                </div>
            </div>



            <div>
                {loading === 1 ?
                    <div className="mt-20">

                        <div class="flex items-center justify-center space-x-2 animate-bounce">
                            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
                            <div class="w-8 h-8 bg-green-400 rounded-full"></div>
                            <div class="w-8 h-8 bg-black rounded-full"></div>
                            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div class="w-8 h-8 bg-red-400 rounded-full"></div>
                            <div class="w-8 h-8 bg-black rounded-full"></div>
                        </div>
                    </div>

                    :
                    vip.constructor !== Array ?

                        <div className="flex justify-center">Nothing</div>
                        :


                        <div className="flex justify-start">





                            {vip.map((item, index) => (
                                <ShowVipCategory arrcateg={item} index={index}
                                />



                            ))}
                        </div>





                }


            </div>


        </div>

    )
};



// <div className="flex justify-spaced b   ">



// <div className="w-full bg-gray-200 rounded-lg shadow-lg lg:w-1/12">

//     <ul class="divide-y-2  divide-gray-500">
//         Sum 9




//         {vip[0].map(h => (
//             <div>

//                 <tr>
//                     <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                         {h}
//                     </li>

//                 </tr>

//             </div>
//         ))}
//     </ul>
// </div>


// <div className="w-full bg-gray-200 rounded-lg shadow-lg lg:w-1/12">

//     <ul class="divide-y-2  divide-gray-500">
//         2 digit




//         {vip[1].map(h => (
//             <div>

//                 <tr>
//                     <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                         {h}
//                     </li>

//                 </tr>

//             </div>
//         ))}
//     </ul>
// </div>



// <div className="w-full  rounded-lg shadow-lg lg:w-1/12">

//     <div className="flex justify-center align-center font-bold bg-gray-900 text-white my-3 ">3 digit</div>

//     <ul class="divide-y-2  ">

//         {vip[2].map(h => (
//             <div>

//                 <tr>
//                     <li class="p-3  hover:bg-blue-600 hover:text-blue-200">
//                         {h}
//                     </li>

//                 </tr>

//             </div>
//         ))}
//     </ul>
// </div>






// <ul class="divide-y-2 divide-gray-500">

//     6 times repeat

//     {vip[3].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 bg-red-600 divide-gray-500">

//     7 times repeat

//     {vip[4].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 divide-gray-500">

//     ABCD_X_ABCD_y

//     {vip[5].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 divide-gray-500">

//     XY_ABBA_ABBA

//     {vip[6].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 divide-gray-500">

//     ABCC_X_ABBCC_Y

//     {vip[7].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>



// <ul class="divide-y-2 divide-gray-500">

//     ABC_XX_ABC_YY

//     {vip[8].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 divide-gray-500">

//     XY_A0B0C0D0

//     {vip[9].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 divide-gray-500">

//     XY_ABAB_CDCD

//     {vip[10].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>


// <ul class="divide-y-2 divide-gray-500">

//     ABC_ABC_WXYZ

//     {vip[11].map(h => (
//         <div>

//             <tr>
//                 <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
//                     {h}
//                 </li>

//             </tr>

//         </div>
//     ))}
// </ul>

// </div>