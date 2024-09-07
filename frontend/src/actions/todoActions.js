export const createTodo = async (title, desc) => {
  try {
    const response = await fetch("http://localhost:6969/todo/createTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, desc }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeTodo = async (title) => {
  try {
    const response = await fetch("http://localhost:6969/todo/removeTodo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTodo = async () => {
  try {
    const response = await fetch("http://localhost:6969/todo/getTodo");
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(errorDetails || "Network response was not ok");
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error("Invalid response data: Expected an array");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTodo = async (title, newTitle, desc) => {
  try {
    const response = await fetch(
      `http://localhost:6969/todo/updateTodo/${title}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newTitle, desc }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(errorDetails || "Network response was not ok");
    }

    const data = await response.json();
    if (data && data._id) {
      return data;
    } else {
      throw new Error("Invalid response data: Missing _id field");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
