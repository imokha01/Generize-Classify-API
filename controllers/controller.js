import { getGender } from "./service.js";

export const classifyName = async (req, res) => {
  const { name } = req.query;

  //! 400 - missing name parameter
  if (name === undefined || name === "") {
    return res.status(400).json({
      status: "error",
      message: "Missing or empty name parameter"
    });
  }

  //! 422 - name must be a string (array covers ?name=John&name=Jane case)
  if (Array.isArray(name) || typeof name !== "string") {
    return res.status(422).json({
      status: "error",
      message: "Name parameter must be a string"
    });
  }

  //! 200 - success
  try {
    const { gender, probability, count } = await getGender(name);

    //! 200 - success but no prediction found
    if (!gender || count === 0) {
      return res.status(200).json({
        status: "error",
        message: "No prediction available for the provided name"
      });
    }

    //Rename count to sample_size for clarity
    const sample_size = count;

    //Consider it confident if probability is at least 70% and sample size is at least 100
    const is_confident = probability >= 0.7 && sample_size >= 100;

    //! 200 - success with prediction
    return res.status(200).json({
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.log("Error in classifyName:", error);
    res
      .status(error.status || 500)
      .json({
        status: "error",
        message: error.message || "Internal Server Error"
      });
  }
};
