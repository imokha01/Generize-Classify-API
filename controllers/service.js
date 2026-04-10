
//TODO: Called a Genderize External API using name query 

const GENDERIZE_URL = "https://api.genderize.io";

export const getGender = async name => {
  const res = await fetch(`${GENDERIZE_URL}?name=${name}`);
  if (!res.ok) {
    const error = new Error(
      `Upstream API error: ${res.status} ${res.statusText}`
    );
    error.status = 502;
    throw error;
  }

  const { gender, probability, count } = await res.json();
  return { gender, probability, count };
};
