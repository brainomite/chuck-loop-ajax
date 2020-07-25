/**
 * This function when invoked will poll a url every x MS, and
 * when there is new data, invoke a new data callback (a function that would
 * react to the new data. i.e displaying on a webpage)
 * when there is no new data (done) invoke a done callback (a function that may
 * do anything but an idea would be to stop a loading indicator)
 *
 * @param {string} sURL - A URL from where to "GET" the data from
 * @param {integer} pollDelayInMS - after how many ms should we check again?
 * @param {function} fNewDataCallBack - a function that will be passed a object
 *                                      representing the JSON response
 * @param {function} fDoneCallBack - a function that will be invoked if we see done === true
 */
function pollForNewData(sURL, pollDelayInMS, fNewDataCallBack, fDoneCallBack) {
  var request = new XMLHttpRequest();
  //  request we will be doing
  request.open("GET", sURL);

  // callback when data is loaded
  request.onload = function () {
    // I assumed that the data is a JSON transmission, lets make it a native JS
    // Object
    var responseObj = JSON.parse(request.responseText);
    if (responseObj.done === true) {
      // if done is true lets invoke the done callback
      fDoneCallBack();
    } else {
      // if its not done, lets invoke new data callback with the response object
      fNewDataCallBack(responseObj);
      // we want to run the process again! but wait pollDelayInMS milliseconds.
      setTimeout(function () {
        pollForNewData(sURL, pollDelayInMS, fNewDataCallBack, fDoneCallBack);
      }, pollDelayInMS);
    }
  };
  // let kick off the process.
  request.send();
}

const newDataCB = (response) => {
  // this function does two things, it'll log the response obj to the
  // browser debugger tool and it'll append a new robot
  console.log(response);
  $("#robot-list").append(
    `<li><img style="height: 10vh;" src="${response.robot}" alt="a robot"></li>`
  );
};

// this done callback for sake of expediency just does a windows.alert
const doneCB = () => window.alert("No more robots!");

$(document).ready(() => {
  $("#button").click(() => {
    const url = "http://127.0.0.1:4000/robots";

    // here is the kickoff of the function you requested

    // url = url we are sending a 'GET' request to
    // 500 = MS i wanted to wait between polling
    // newDataCB = function that will be invoked (notice it isn't invoked now)
    //             when there is new robots and we aint done
    // doneCB = function (not invoked) that will be invoked when we
    //          receive from the server {"done": true}
    pollForNewData(url, 500, newDataCB, doneCB);
  });
});
