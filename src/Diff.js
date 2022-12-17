import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';
import './Spinner.css'
const BACKEND_URL = 'https://cpos-backend.vercel.app'

export default function Diff() {
    const headers = [
        { label: "Cell Number", key: "phone" },
    ]

    var [datajson, setDataJson] = useState([]);
    const csvReport = {
        data: datajson,
        headers: headers,
        filename: 'Newly_Added_Numbers.csv'
    };
    
    const [loading, setLoading] = useState(0);
    let [oldFile,setOldFile] = useState('')
    let [newFile,setNewFile] = useState('')



    const [data, setData] = useState(["hello data will be shown here"]);



    const onChange1 = (e) => {
        setOldFile(e.target.files[0])
        // let oldfile = (e.target.files[0]);
        // formData.append('file', oldfile);
    }

    const onChange2 = (e) => {
        setNewFile(e.target.files[0])
        // let newfile = (e.target.files[0]);
        // formData.append('file', newfile);
    }

    const submitForm1 = async () => {
        let formData = new FormData();
        formData.append('file', oldFile);
        formData.append('file', newFile);
        console.log(formData)
        setLoading(1)
        const url = `${BACKEND_URL}/hello`
        console.log(url)
        // const url = '/hello';
        // const url = 'http://localhost:8000/hello'
        try {
            var ans = await axios.post(url, formData);
            // console.log(ans);
            if (ans) {
                setLoading(0);
            }
        }
        catch (e) {
            setLoading(0);
            console.log(e);
            let abcd = ['files sahi se upload karo bhaiya'];

            setData(abcd);
            return;
        }
        console.log(ans, "i am response");
        let myarr = [];
        let datajsontobeset = [];

        for await (let d of ans.data) {
            let objectphone = {}
            myarr.push(d);
            objectphone.phone = d;
            datajsontobeset.push(objectphone);
        }
        setData(myarr);
        setDataJson(datajsontobeset);
        formData.delete('file');
    }







    return (
        <div>

            <div className="flex justify-center mt-10 mx-auto">

                <div className="  w-full max-w-xs ">
                    <div className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="oldfile"
                            >
                                Old CSV File
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="file" name="file" onChange={onChange1}
                                placeholder="oldfile"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="newfile"
                            >
                                New CSV File
                            </label>
                            <input
                                className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                type="file" name="file" onChange={onChange2}
                                placeholder="newfile"
                            />

                            <div class="flex justify-center ">

                                <input type="submit" onClick={submitForm1} className="mt-5 bg-green-600 hover:bg-blue-800 text-gray-800 font-bold py-2 px-4 rounded" />

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
                            {/* <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
                            <div class="w-8 h-8 bg-green-400 rounded-full"></div>
                            <div class="w-8 h-8 bg-black rounded-full"></div>
                            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div class="w-8 h-8 bg-red-400 rounded-full"></div>
                            <div class="w-8 h-8 bg-black rounded-full"></div> */}
                            <div className="loader"></div>
                        </div>
                        
                    </div>

                    :
                    <div className="flex justify-center ">

                        <div class="w-full bg-gray-200 rounded-lg shadow-lg lg:w-1/3">
                            <ul class="divide-y-2 divide-gray-500">


                                <CSVLink {...csvReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center my-10"> Export Data to CSV</CSVLink>

                                {data.map(h => (
                                    <div>

                                        <tr>
                                            <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
                                                {h}
                                            </li>

                                        </tr>

                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                }

            </div>









        </div>
    )
};
