const host = "https://metablogpk.vercel.app/api/v1";
import store from "../store/store";

async function signup(formData) {
  const body = {
    email: formData.Email,
    username: formData.Username,
    password: formData.Password,
    confirmPassword: formData["Confirm Password"],
  };

  try {
    const data = await fetch(`http://localhost:3000/api/v1/user/signup`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
///////////////////////LOGIN////////////////////////
async function login(formData) {
  const body = {
    email: formData.Email,
    password: formData.Password,
  };

  try {
    const data = await fetch(`http://localhost:3000/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

/////////////////////////FETCH BLOGS////////////////
async function blogs() {
  const data = await fetch("http://127.0.0.1:3000/api/v1/blog");
  return data.json();
}

///////////////////////get Blog////////////////////////
async function getBlog(id) {
  try {
    const data = await fetch(`http://127.0.0.1:3000/api/v1/blog/${id}`);
    return await data.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
///////////////////////////////CREATE COMMENT//////////
async function createComment(formData) {
  const token = JSON.parse(localStorage.getItem("token"));
  const body = {
    content: formData.content,
    auther_id: formData.auther_id,
    blog_id: formData.blog_id,
  };

  try {
    const data = await fetch(`http://localhost:3000/api/v1/comment`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
//////////////////////////////GET COMMENTS////////////////
async function getcomments(id) {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/blog/${id}/comment`);

    if (!res.ok) {
      throw new Error("Network not stable");
    }
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
/////////////////////////////////GET USER COMMENTS/////////////////
async function getUsercomments(blogId, userId) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/user/${userId}/comment/?blog_id=${blogId}`
  );
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}

/////////////////////////////////GET  COMMENTS/////////////////
async function fetchcomments({ pageParam = 1, queryKey }) {
  const userId = store.getState().account.user._id;

  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/comment/?limit=1&page=${pageParam}&auther_id[$ne]=${userId}&blog_id=${queryKey[1]}&status=accepted`
  );

  if (res.status === 404) {
    throw new Error("Not Found");
  }

  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}

////////////////////////////////notLoginfetchcomments  COMMENTS/////////////////
async function notLoginfetchcomments({ pageParam = 1, queryKey }) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/comment/?limit=1&page=${pageParam}&blog_id=${queryKey[1]}&status=accepted`
  );

  if (res.status === 404) {
    throw new Error("Not Found");
  }

  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}
/////////////////////////////////delete Comment USER COMMENTS/////////////////
async function deleteComment(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await fetch(`http://127.0.0.1:3000/api/v1/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}

/////////////////////////////////edit Comment USER COMMENTS/////////////////
async function editComment(data) {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await fetch(`http://127.0.0.1:3000/api/v1/comment/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify({ content: data.content }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}
/////////////////likeMessage///////////
async function likeMessage(formData) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await fetch(`http://127.0.0.1:3000/api/v1/messagelike`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Network not stable");
    }
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
/////////////////DISlikeMessage///////////
async function dislikeMessage(id) {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await fetch(`http://127.0.0.1:3000/api/v1/messagelike/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Network not stable");
    }
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getLatestBlog() {
  const res = await fetch(
    "http://127.0.0.1:3000/api/v1/blog/?sort=-createdAt&limit=1"
  );
  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////FETCH PAGINATION/////////////////
async function fetchBlogs(queryKey) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/blog/?limit=6&page=${queryKey.queryKey[1]}`
  );

  if (res.status === 404) {
    throw new Error("Not Found");
  }

  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}
/////////////////////////////////////////////////////////////////////
////////////////////////////Search///////////////////////
async function fetchSearch(queryKey) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/blog/search/?q=${queryKey.queryKey[1]}`
  );

  if (res.status === 404) {
    throw new Error("Not Found");
  }

  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////Latest Load More/////////////////
async function fetchLatestBlogs({ pageParam = 1 }) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/blog/?limit=6&page=${pageParam}`
  );

  if (res.status === 404) {
    throw new Error("Not Found");
  }

  if (!res.ok) {
    throw new Error("Network not stable");
  }
  return res.json();
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////Forget Password/////////////////
async function forgetPassword({ Email }) {
  console.log(Email);
  try {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/user/forgetpassword`,
      {
        method: "POST",
        body: JSON.stringify({ email: Email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (error) {
    throw new Error(error.messaqge);
  }
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////Reset Password/////////////////
async function resetPassword(body, token) {
  try {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/user/resetpassword/?token=${token}`,
      {
        method: "POST",
        body: JSON.stringify({
          password: body.Password,
          confirmPassword: body["Confirm Password"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await res.json();
  } catch (error) {
    throw new Error(error.messaqge);
  }
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////Reset Password/////////////////
async function verifiedEmail(queryKey) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/user/auth/verifyemail/?token=${queryKey.queryKey[1]}`
  );

  return res.json();
}
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////Update Profile/////////////////
async function updateProfile(data) {
  const form = new FormData();
  form.append("photo", data.photo[0]);
  const token = JSON.parse(localStorage.getItem("token"));
  const userId = store.getState().account.user._id;
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/v1/user/${userId}`, {
      method: "PATCH",
      body: form,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    throw new Error(error.messaqge);
  }
}

export {
  updateProfile,
  fetchLatestBlogs,
  fetchSearch,
  signup,
  login,
  blogs,
  fetchBlogs,
  getBlog,
  createComment,
  getcomments,
  getUsercomments,
  likeMessage,
  dislikeMessage,
  getLatestBlog,
  deleteComment,
  editComment,
  fetchcomments,
  notLoginfetchcomments,
  forgetPassword,
  resetPassword,
  verifiedEmail,
};
