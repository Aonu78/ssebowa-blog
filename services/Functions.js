import { BASEURL } from "./BASEUrl";

export const FetchPosts = () => {

  const f_url = BASEURL + "posts/";
  fetch(f_url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      const data = {
        status: "success",
        data: responseJson,
      };
      return data;
    })
    .catch((error) => {
      const data = {
        status: "error",
        data: error,
      };

      return data;
    });
};
