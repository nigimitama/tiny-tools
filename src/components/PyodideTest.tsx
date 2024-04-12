// import { loadPyodide } from "pyodide"

// function PyodideTest() {
//   async function execute() {
//     const pyodide = await loadPyodide()
//     console.log(pyodide.runPython("1 + 2"))
//   }

//   return (
//     <>
//       {execute()}
//     </>
//   )
// }

// // import { useState, useEffect } from 'react'

// // function PyodideTest() {
// //   const [output, setOutput] = useState("(loading...)");
// //   const runScript = code => {
// //     window.pyodide.loadPackage([]).then(() => {
// //       const output = window.pyodide.runPython(code);
// //       setOutput(output);
// //     })
// //   }

// //   useEffect(() => {
// //     window.languagePluginLoader.then(() => {
// //       fetch("1 + 1")
// //         .then(src => src.text())
// //         .then(runScript)
// //     })
// //   })
// //   return (
// //     <>
// //       {output}
// //     </>
// //   )
// // }

// export default PyodideTest
