import React, { Component } from "react";
import Spinner from "../components/Spinner";

class FaceDetect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      isLoading: false,
      showResult: false,
      requestResult: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let files = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = (e) => {
      this.setState({ image: e.target.result });
    };
  }

  handleSubmit(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    this.setState({ isLoading: true, showResult: false, requestResult: [] });
    fetch("/api/detect-faces", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          showResult: true,
          requestResult: data,
        });
      });

    event.preventDefault();
  }

  render() {
    const isPreviewImageUploaded = this.state.image;
    const isLoading = this.state.isLoading;
    const showResult = this.state.showResult;
    const data = this.state.requestResult.data;
    const resultDisplay = [];

    let showImage = "";

    if (isPreviewImageUploaded) {
      showImage = (
        <img
          className="rounded max-h-80 max-w-80"
          src={this.state.image}
          alt=""
        />
      );
    }

    if (showResult) {
      if(data) {
        
        for(let i = 0; i < data.length; i++) {
          resultDisplay.push(
            <img
              key={i}
              className="rounded max-h-80 max-w-80"
              src={data[i]}
              alt=""
            />
          );
        }
      }
      
    }

    return (
      <div className="w-full flex flex-col items-center">
        <div className="mt-8">
          <label>Image Preview</label>
          <div className="flex justify-center w-96 bg-gray-200 rounded-lg border mt-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            {showImage}
          </div>
        </div>
        <form
          className="w-2/5 flex flex-col items-center mt-8"
          onSubmit={this.handleSubmit}
        >
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.handleChange}
          />

          <button
            type="submit"
            className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          >
            Start
          </button>
        </form>

        <div className="mt-16 grid">
          <label className="mb-4 font-bold text-xl">Face Detected: </label>
          {isLoading && !showResult ? <Spinner /> : ""}
          {showResult && !data ? <p>No face detected</p> : ""}
          <div className="grid grid-cols-4 gap-4">
            {showResult && data ? resultDisplay : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default FaceDetect;
