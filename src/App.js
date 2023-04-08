import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_CONST } from "./ApiConstant";

function App() {
  const [createJob1, setCreateJob1] = useState(false);
  const [createJob2, setCreateJob2] = useState(false);
  const [id, setId] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [cmpName, setCmpName] = useState("");
  const [indName, setIndName] = useState("");
  const [location, setLocation] = useState("");
  const [remoteType, setRemoteType] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [expMinimum, setExpMinimum] = useState("");
  const [expMaximum, setExpMaximum] = useState("");
  const [quickApply, setQuickApply] = useState(false);
  const [extApply, setExtApply] = useState(false);
  const [totalEmp, setTotalEmp] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    setLoading(true);
    try {
      let data = await axios.get(API_CONST);

      setData(data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("err", err);
    }
  }

  async function handleSave() {
    try {
      setLoading(true);
      let data = {
        title: jobTitle,
        cmpName,
        indName,
        location,
        remoteType,
        expMin: expMinimum,
        expMax: expMaximum,
        salMin: minimum,
        salMax: maximum,
        applyType: quickApply ? "quickApply" : "externalApply",
        totalEmp,
      };

      let responseData;
      if (id) {
        responseData = await axios.put(API_CONST + "/" + id, data);
      } else {
        responseData = await axios.post(API_CONST, data);
      }

      console.log("responseDataresponseDataresponseData", responseData);
      if (responseData?.status === 201 || responseData?.status === 200) {
        setLoading(false);
        getJobs();

        handleClearData();
      }
    } catch (err) {
      setLoading(false);
      console.log("errr", err);
    }
  }

  function handleClearData() {
    setCreateJob2(false);
    setCreateJob1(false);
    setId(null);
    setJobTitle("");
    setCmpName("");
    setIndName("");
    setLocation("");
    setRemoteType("");
    setMaximum("");
    setMinimum("");
    setExpMaximum("");
    setExpMinimum("");
    setQuickApply("");
    setExtApply("");
    setTotalEmp("");
  }

  function handleStep2() {
    if (jobTitle === "" || cmpName === "" || indName === "") {
      alert("Please fill all mandatory fields!");
    } else {
      setCreateJob1(false);
      setCreateJob2(true);
    }
  }

  function handleCheckBox(val) {
    if (val === "quick") {
      setQuickApply(true);
      setExtApply(false);
    } else {
      setQuickApply(false);
      setExtApply(true);
    }
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      let responseData = await axios.delete(API_CONST + "/" + id);
      console.log("responseData", responseData);
      getJobs();
    } catch (err) {
      setLoading(false);
      console.log("errr", err);
    }
  }

  async function handleEdit(item) {
    console.log("item", item);
    setCreateJob1(true);
    setJobTitle(item?.title);
    setCmpName(item?.cmpName);
    setIndName(item?.indName);
    setLocation(item?.location);
    setRemoteType(item?.remoteType);
    setMinimum(item?.salMin);
    setMaximum(item?.salMax);
    setExpMaximum(item?.expMax);
    setExpMinimum(item?.expMin);
    setId(item?.id);

    if (item?.applyType === "quickApply") {
      setQuickApply(true);
      setExtApply(false);
    } else {
      setExtApply(true);
      setQuickApply(false);
    }
  }

  return (
    <>
      {loading && (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <div class="bg-lightblue-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => setCreateJob1(true)}
        >
          Create
        </button>
      </div>

      <div class="flex justify-between grid grid-cols-2 gap-2 ">
        {data?.map((item, index) => {
          return (
            <>
              <div
                class=" mb-6 rounded-lg bg-white p-6 shadow-md sm:flex ml-10 mr-10"
                key={index}
              >
                <img
                  src={require("./netflix.png")}
                  alt="product-image"
                  class="w-full rounded-lg sm:w-10 h-10"
                />
                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div class="mt-5 sm:mt-0">
                    <p class="mt-1 text-xl font-semi-bold text-gray-900 text-base/7 ">
                      {item.title}
                    </p>
                    <p class="mt-1 text-xm font-semi-bold text-gray-00 text-base/7">
                      {item.cmpName} - {item.indName}
                    </p>
                    <p class="mt-1 text-xm font-semi-bold text-gray-500 text-base/6">
                      {item.location} - {item.remoteType}
                    </p>

                    <p class="mt-2 text-xm font-semi-bold text-gray-800 text-base/6">
                      Part-Time(9.00 an - 5.00 pm IST)
                    </p>
                    <p class="mt-1 text-xm font-semi-bold text-gray-800 text-base/6">
                      Experience ({item.expMin} - {item.expMax} years)
                    </p>
                    <p class="mt-1 text-xm font-semi-bold text-gray-800 text-base/6">
                      INR ({item.salMin} - {item.salMax} / Month)
                    </p>
                    <p class="mt-1 text-xm font-semi-bold text-gray-800 text-base/6">
                      {item.totalEmp} employess
                    </p>

                    <div class="bg-white-50  py-3 sm:flex sm:flex-row"></div>

                    <div class="bg-white-50  py-3 sm:flex sm:flex-row">
                      <button
                        class="mr-5 bg-blue-100 hover:bg-blue-100 text-white  py-2 px-4 rounded"
                        style={{
                          backgroundColor:
                            item.applyType === "quickApply" ? "blue" : "white",
                          color:
                            item.applyType === "quickApply" ? "white" : "blue",
                          borderColor:
                            item.applyType === "quickApply" ? "white" : "blue",
                          borderWidth: 1,
                        }}
                      >
                        Apply Now
                      </button>

                      <button
                        class="mr-5 bg-blue-100 hover:bg-blue-100 text-white  py-2 px-4 rounded"
                        style={{
                          backgroundColor:
                            item.applyType === "externalApply"
                              ? "blue"
                              : "white",
                          color:
                            item.applyType === "externalApply"
                              ? "white"
                              : "blue",
                          borderColor:
                            item.applyType === "externalApply"
                              ? "white"
                              : "blue",
                          borderWidth: 1,
                        }}
                      >
                        External Apply
                      </button>
                    </div>

                    <div class="bg-white-50  py-3 sm:flex sm:flex-row">
                      <button
                        class="mr-5 bg-blue-100 hover:bg-blue-100 text-white  py-2 px-4 rounded"
                        style={{
                          backgroundColor: "blue",
                        }}
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        class="mr-5 bg-blue-100 hover:bg-blue-100 text-white  py-2 px-4 rounded"
                        style={{
                          backgroundColor: "red",
                        }}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {createJob1 && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center ml-4 mt-0 text-left">
                      <div class="flex flex-row justify-between  w-96">
                        <h3
                          class="text-base leading-6 text-gray-800"
                          id="modal-title"
                        >
                          Create a job
                        </h3>
                        <h3
                          class="text-base leading-6 text-gray-800"
                          id="modal-title"
                        >
                          Step 1
                        </h3>
                      </div>
                      <div class="mt-3">
                        <div class="flex flex-row">
                          <label
                            for="price"
                            class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                          >
                            Job title
                          </label>
                          <div class="text-red-400 ">*</div>
                        </div>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div class="-space-y-px rounded-md shadow-sm">
                            <div>
                              <input
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                id="job"
                                name="job"
                                type="text"
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                placeholder="ex: UX UI Designer"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mt-5">
                        <div class="flex flex-row">
                          <label
                            for="price"
                            class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                          >
                            Company name
                          </label>
                          <div class="text-red-400 ">*</div>
                        </div>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div class="-space-y-px rounded-md shadow-sm">
                            <div>
                              <input
                                value={cmpName}
                                onChange={(e) => setCmpName(e.target.value)}
                                id="cmpName"
                                name="cmpName"
                                type="text"
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                placeholder="ex: Google"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mt-5">
                        <div class="flex flex-row">
                          <label
                            for="price"
                            class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                          >
                            Industry
                          </label>
                          <div class="text-red-400 ">*</div>
                        </div>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div class="-space-y-px rounded-md shadow-sm">
                            <div>
                              <input
                                value={indName}
                                onChange={(e) => setIndName(e.target.value)}
                                id="indName"
                                name="indName"
                                type="text"
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                placeholder="ex: Information Technology"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-row justify-between  w-96">
                        <div class="mt-5">
                          <div class="flex flex-row">
                            <label
                              for="price"
                              class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                            >
                              Location
                            </label>
                          </div>
                          <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="-space-y-px rounded-md shadow-sm mr-3">
                              <div>
                                <input
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                  id="location"
                                  name="location"
                                  type="text"
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  placeholder="ex: Chennai"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="mt-5">
                          <div class="flex flex-row">
                            <label
                              for="price"
                              class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                            >
                              Remote type
                            </label>
                          </div>
                          <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="-space-y-px rounded-md shadow-sm">
                              <div>
                                <input
                                  value={remoteType}
                                  onChange={(e) =>
                                    setRemoteType(e.target.value)
                                  }
                                  id="remote"
                                  name="remote"
                                  type="text"
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  placeholder="ex: In-office"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => handleStep2()}
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {createJob2 && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center ml-4 mt-0 text-left">
                      <div class="flex flex-row justify-between  w-96">
                        <h3
                          class="text-base leading-6 text-gray-800"
                          id="modal-title"
                        >
                          Create a job
                        </h3>
                        <h3
                          class="text-base leading-6 text-gray-800"
                          id="modal-title"
                        >
                          Step 2
                        </h3>
                      </div>

                      <div class="flex flex-row justify-between  w-96">
                        <div class="mt-5 ">
                          <div class="flex flex-row">
                            <label
                              for="price"
                              class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                            >
                              Experience
                            </label>
                          </div>
                          <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="-space-y-px rounded-md shadow-sm mr-3">
                              <div>
                                <input
                                  onChange={(e) =>
                                    setExpMinimum(e.target.value)
                                  }
                                  value={expMinimum}
                                  id="expminimum"
                                  name="expminimum"
                                  type="text"
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  placeholder="ex: Minimum"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="mt-11 ">
                          <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="-space-y-px rounded-md shadow-sm">
                              <div>
                                <input
                                  onChange={(e) =>
                                    setExpMaximum(e.target.value)
                                  }
                                  value={expMaximum}
                                  id="expmaximum"
                                  name="expmaximum"
                                  type="text"
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  placeholder="ex: Maximum"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-row justify-between  w-96">
                        <div class="mt-5 ">
                          <div class="flex flex-row">
                            <label
                              for="price"
                              class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                            >
                              Salary
                            </label>
                          </div>
                          <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="-space-y-px rounded-md shadow-sm mr-3">
                              <div>
                                <input
                                  value={minimum}
                                  onChange={(e) => setMinimum(e.target.value)}
                                  id="minimum"
                                  name="minimum"
                                  type="text"
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  placeholder="ex: Minimum"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="mt-11">
                          <div class="relative mt-2 rounded-md shadow-sm">
                            <div class="-space-y-px rounded-md shadow-sm">
                              <div>
                                <input
                                  value={maximum}
                                  onChange={(e) => setMaximum(e.target.value)}
                                  id="maximum"
                                  name="maximum"
                                  type="text"
                                  class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  placeholder="ex: Maximum"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mt-3">
                        <div class="flex flex-row">
                          <label
                            for="price"
                            class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                          >
                            Total employee
                          </label>
                        </div>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <div class="-space-y-px rounded-md shadow-sm">
                            <div>
                              <input
                                value={totalEmp}
                                onChange={(e) => setTotalEmp(e.target.value)}
                                id="job"
                                name="job"
                                type="text"
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                placeholder="ex: 100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="mt-3">
                        <div class="flex flex-row">
                          <label
                            for="price"
                            class="block text-sm font-medium leading-6 text-gray-900 mr-1"
                          >
                            Apply type
                          </label>
                        </div>

                        <div class="flex items-center mt-2 flex-row ">
                          <div class="mr-4">
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              checked={quickApply}
                              class=" w-3 h-3 rounded-full bg-white-50 border-10"
                              onChange={() => handleCheckBox("quick")}
                            />
                            <label
                              for="link-checkbox"
                              class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300"
                            >
                              Quick apply
                            </label>
                          </div>
                          <div>
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              checked={extApply}
                              class=" w-3 h-3 rounded-full"
                              onChange={() => handleCheckBox("ext")}
                            />
                            <label
                              for="link-checkbox"
                              class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-300"
                            >
                              External apply{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => handleSave()}
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
